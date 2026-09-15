import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_BODY_SIZE = 10_000;
const MAX_REQUESTS = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const requestLog = new Map<string, number[]>();

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  );

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isRateLimited = (key: string) => {
  const now = Date.now();

  if (requestLog.size > 1000) {
    for (const [storedKey, timestamps] of requestLog) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_WINDOW_MS)) {
        requestLog.delete(storedKey);
      }
    }
  }

  const recentRequests = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  );

  if (recentRequests.length >= MAX_REQUESTS) {
    requestLog.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(key, recentRequests);
  return false;
};

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);

    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, message: "Dados enviados excedem o limite permitido." },
        { status: 413 }
      );
    }

    const clientKey =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { success: false, message: "Muitas solicitações. Tente novamente mais tarde." },
        { status: 429, headers: { "Retry-After": "900" } }
      );
    }

    // Instancia o Resend apenas no momento da requisição
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("ERRO: Variável RESEND_API_KEY não definida.");
      return NextResponse.json(
        {
          success: false,
          message: "Erro de configuração no servidor (Chave de API ausente).",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const bodyText = await request.text();

    if (bodyText.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, message: "Dados enviados excedem o limite permitido." },
        { status: 413 }
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { success: false, message: "JSON inválido." },
        { status: 400 }
      );
    }

    if (!isRecord(body)) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos." },
        { status: 400 }
      );
    }

    const {
      nome,
      email,
      telefone,
      cidade,
      tipoConsorcio,
      valorCredito,
      termosAceitos,
    } = body as Record<string, unknown>;

    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof telefone !== "string" ||
      typeof cidade !== "string" ||
      typeof tipoConsorcio !== "string" ||
      typeof valorCredito !== "string" ||
      termosAceitos !== true
    ) {
      return NextResponse.json(
        { success: false, message: "Dados do formulário inválidos." },
        { status: 400 }
      );
    }

    const campos = [nome, email, telefone, cidade, valorCredito];
    if (
      campos.some((campo) => campo.trim().length === 0 || campo.length > 200) ||
      !isValidEmail(email) ||
      !["imovel", "veiculo", "investimentos"].includes(tipoConsorcio)
    ) {
      return NextResponse.json(
        { success: false, message: "Dados do formulário inválidos." },
        { status: 400 }
      );
    }

    const nomeSeguro = escapeHtml(nome.trim());
    const emailSeguro = escapeHtml(email.trim());
    const telefoneSeguro = escapeHtml(telefone.trim());
    const cidadeSegura = escapeHtml(cidade.trim());
    const valorCreditoSeguro = escapeHtml(valorCredito.trim());

    // Formata o tipo escolhido
    const tipoFormatado =
      tipoConsorcio === "imovel"
        ? "Imóvel"
        : tipoConsorcio === "veiculo"
        ? "Veículo"
        : tipoConsorcio === "investimentos"
        ? "Investimentos"
        : tipoConsorcio;

    // Envia o e-mail
    const { data, error } = await resend.emails.send({
      from: "R3 Estratégia Patrimonial <onboarding@resend.dev>",
      to: ["r3corretoradeconsorcios@gmail.com"],
      replyTo: email.trim(),
      subject: `Nova solicitação - ${nome.trim()}`,
      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          color: #111111;
        ">
          <div style="
            background-color: #111111;
            padding: 30px;
            text-align: center;
          ">
            <h1 style="
              color: #ffffff;
              margin: 0;
              font-size: 24px;
            ">
              R3 Estratégia Patrimonial
            </h1>
            <p style="
              color: #cccccc;
              margin: 8px 0 0;
            ">
              Nova solicitação através do site
            </p>
          </div>

          <div style="padding: 30px;">
            <h2>Dados do cliente</h2>
            <p><strong>Nome:</strong><br />${nomeSeguro}</p>
            <p><strong>E-mail:</strong><br />${emailSeguro}</p>
            <p><strong>Telefone / WhatsApp:</strong><br />${telefoneSeguro}</p>
            <p><strong>Cidade:</strong><br />${cidadeSegura}</p>

            <hr style="
              border: none;
              border-top: 1px solid #dddddd;
              margin: 25px 0;
            " />

            <h2>Interesse do cliente</h2>
            <p><strong>Tipo:</strong><br />${tipoFormatado}</p>
            <p><strong>Valor do crédito:</strong><br />${valorCreditoSeguro}</p>

            <hr style="
              border: none;
              border-top: 1px solid #dddddd;
              margin: 25px 0;
            " />

            <p style="
              font-size: 12px;
              color: #777777;
            ">
              Este contato foi enviado automaticamente através
              do formulário do site da R3 Estratégia Patrimonial.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Erro Resend:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Não foi possível enviar a solicitação.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Solicitação enviada com sucesso.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno ao enviar a solicitação.",
      },
      { status: 500 }
    );
  }
}