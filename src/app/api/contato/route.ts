import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nome,
      email,
      telefone,
      cidade,
      tipoConsorcio,
      valorCredito,
      termosAceitos,
    } = body;

    // Validação dos campos
    if (
      !nome ||
      !email ||
      !telefone ||
      !cidade ||
      !tipoConsorcio ||
      !valorCredito
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Preencha todos os campos obrigatórios.",
        },
        { status: 400 }
      );
    }

    if (!termosAceitos) {
      return NextResponse.json(
        {
          success: false,
          message: "É necessário aceitar os termos.",
        },
        { status: 400 }
      );
    }

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

      replyTo: email,

      subject: `Nova solicitação - ${nome}`,

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

            <p>
              <strong>Nome:</strong><br />
              ${nome}
            </p>

            <p>
              <strong>E-mail:</strong><br />
              ${email}
            </p>

            <p>
              <strong>Telefone / WhatsApp:</strong><br />
              ${telefone}
            </p>

            <p>
              <strong>Cidade:</strong><br />
              ${cidade}
            </p>

            <hr style="
              border: none;
              border-top: 1px solid #dddddd;
              margin: 25px 0;
            " />

            <h2>Interesse do cliente</h2>

            <p>
              <strong>Tipo:</strong><br />
              ${tipoFormatado}
            </p>

            <p>
              <strong>Valor do crédito:</strong><br />
              ${valorCredito}
            </p>

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
          error,
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