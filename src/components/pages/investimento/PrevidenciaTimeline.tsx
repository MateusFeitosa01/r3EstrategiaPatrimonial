"use client";

import {
  CalendarDays,
  CircleDollarSign,
  Landmark,
  TrendingUp,
  CheckCircle2,
  Flag,
} from "lucide-react";

/* =========================================================
   DADOS DA LINHA DO TEMPO
========================================================= */

const etapas = [
  {
    mes: "Mês 1",
    titulo: "Início do planejamento",
    descricao:
      "Início da estratégia com um crédito de R$ 300.000,00 e prazo total de 200 meses.",
    destaque: "R$ 300 mil",
    Icone: CalendarDays,
  },

  {
    mes: "Meses 1–19",
    titulo: "Parcela reduzida",
    descricao:
      "Até a contemplação, o planejamento considera o pagamento mensal da parcela reduzida.",
    destaque: "R$ 922/mês",
    Icone: CircleDollarSign,
  },

  {
    mes: "Mês 20",
    titulo: "Contemplação",
    descricao:
      "Nesta simulação, a contemplação acontece no mês 20. A partir desse momento, o crédito entra em uma nova etapa da estratégia.",
    destaque: "Carta contemplada",
    Icone: CheckCircle2,
  },

  {
    mes: "Após a contemplação",
    titulo: "Crédito em rentabilidade",
    descricao:
      "Após a contemplação, o crédito permanece aplicado em fundo de investimento referenciado ao CDI, considerando a rentabilidade utilizada na simulação da administradora.",
    destaque: "Rentabilidade mensal",
    Icone: Landmark,
  },

  {
    mes: "Uma vez por ano",
    titulo: "Atualização anual do crédito",
    descricao:
      "Ao longo do planejamento, o crédito também passa pela atualização anual considerada na estratégia, aplicada uma vez a cada ano.",
    destaque: "5% ao ano*",
    Icone: TrendingUp,
  },

  {
    mes: "Após a contemplação",
    titulo: "Continuidade do planejamento",
    descricao:
      "Após a contemplação, o pagamento passa a considerar a parcela integral e a recomposição das parcelas reduzidas utilizadas antes da contemplação, seguindo as condições estabelecidas no plano.",
    destaque: "Continuidade do plano",
    Icone: CircleDollarSign,
  },

  {
    mes: "Mês 200",
    titulo: "Valor projetado ao final",
    descricao:
      "Ao final do prazo, a simulação da administradora projeta a evolução do crédito inicial de R$ 300 mil para aproximadamente R$ 1,9 milhão, considerando as condições utilizadas nesta estratégia.",
    destaque: "≈ R$ 1,9 milhão*",
    Icone: Flag,
  },
];

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function PrevidenciaTimeline() {
  return (
    <section className="w-full bg-[#f5f5f5] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            CABEÇALHO
        ===================================================== */}

        <div className="mb-14 max-w-4xl md:mb-16">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
            Previdência Aplicada
          </span>

          <h2 className="text-3xl font-black tracking-tight text-black md:text-5xl">
            Veja como a estratégia evolui ao longo do tempo.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-black/60 md:text-lg">
            Uma simulação de planejamento com crédito inicial de
            R$ 300 mil, parcela reduzida até a contemplação,
            contemplação simulada no mês 20 e prazo total de 200 meses.
          </p>
        </div>

        {/* =====================================================
            RESUMO
        ===================================================== */}

        <div className="mb-16 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
          <Resumo
            label="Crédito inicial"
            valor="R$ 300 mil"
          />

          <Resumo
            label="Parcela reduzida"
            valor="R$ 922"
          />

          <Resumo
            label="Contemplação"
            valor="Mês 20"
          />

          <Resumo
            label="Prazo"
            valor="200 meses"
          />

          <Resumo
            label="Valor projetado"
            valor="≈ R$ 1,9 mi"
            destaque
          />
        </div>

        {/* =====================================================
            LINHA DO TEMPO
        ===================================================== */}

        <div className="relative">

          {/* LINHA CENTRAL */}
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-black/15 md:left-1/2" />

          <div className="space-y-10 md:space-y-16">
            {etapas.map((etapa, index) => {
              const { Icone } = etapa;

              const esquerda = index % 2 === 0;
              const etapaFinal = etapa.mes === "Mês 200";

              return (
                <div
                  key={`${etapa.mes}-${etapa.titulo}`}
                  className="relative grid md:grid-cols-2 md:gap-20"
                >

                  {/* ÍCONE DA LINHA DO TEMPO */}
                  <div
                    className={`
                      absolute left-0 top-0 z-10
                      flex h-12 w-12 items-center justify-center
                      rounded-full
                      shadow-lg
                      md:left-1/2 md:-translate-x-1/2
                      ${
                        etapaFinal
                          ? "bg-white text-black ring-4 ring-black"
                          : "bg-black text-white"
                      }
                    `}
                  >
                    <Icone className="h-5 w-5" />
                  </div>

                  {/* CARD */}
                  <div
                    className={`
                      ml-16 md:ml-0
                      ${
                        esquerda
                          ? "md:col-start-1 md:pr-5"
                          : "md:col-start-2 md:pl-5"
                      }
                    `}
                  >
                    <div
                      className={`
                        rounded-[26px] border p-6
                        transition-all duration-300
                        md:p-8
                        ${
                          etapaFinal
                            ? "border-black bg-black text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                            : "border-black/10 bg-white text-black shadow-[0_15px_45px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
                        }
                      `}
                    >

                      {/* PERÍODO */}
                      <span
                        className={`
                          text-xs font-bold uppercase tracking-[0.18em]
                          ${
                            etapaFinal
                              ? "text-white/45"
                              : "text-black/40"
                          }
                        `}
                      >
                        {etapa.mes}
                      </span>

                      {/* TÍTULO */}
                      <h3 className="mt-3 text-xl font-black md:text-2xl">
                        {etapa.titulo}
                      </h3>

                      {/* DESCRIÇÃO */}
                      <p
                        className={`
                          mt-4 text-sm leading-relaxed md:text-base
                          ${
                            etapaFinal
                              ? "text-white/60"
                              : "text-black/55"
                          }
                        `}
                      >
                        {etapa.descricao}
                      </p>

                      {/* VALOR EM DESTAQUE */}
                      <div
                        className={`
                          mt-6 inline-flex rounded-full
                          px-4 py-2 text-sm font-bold
                          ${
                            etapaFinal
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }
                        `}
                      >
                        {etapa.destaque}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            RESULTADO FINAL
        ===================================================== */}

        <div className="mt-20 overflow-hidden rounded-[32px] bg-black px-6 py-10 text-white md:px-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                Projeção no mês 200
              </span>

              <h3 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                De R$ 300 mil para aproximadamente
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                Uma estratégia de longo prazo que combina planejamento,
                contemplação, atualização do crédito e rentabilidade ao
                longo do período.
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
                Valor projetado
              </p>

              <p className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
                R$ 1,9 mi
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            AVISO DA SIMULAÇÃO
        ===================================================== */}

        <div className="mt-10 border-t border-black/10 pt-6">
          <p className="max-w-5xl text-xs leading-relaxed text-black/40">
            * Simulação meramente ilustrativa, baseada nas condições
            e critérios considerados na projeção da administradora
            para um crédito inicial de R$ 300.000,00, prazo de
            200 meses e contemplação simulada no mês 20.
            Os valores apresentados podem variar de acordo com a
            contemplação, atualização do crédito, rentabilidade,
            condições do grupo e demais regras aplicáveis.
            A projeção apresentada não representa garantia de
            resultado futuro.
          </p>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   CARD DO RESUMO
========================================================= */

function Resumo({
  label,
  valor,
  destaque = false,
}: {
  label: string;
  valor: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={`
        rounded-[22px] border p-5 md:p-6
        ${
          destaque
            ? "border-black bg-black text-white"
            : "border-black/10 bg-white text-black"
        }
      `}
    >
      <p
        className={`
          text-xs font-semibold uppercase tracking-[0.15em]
          ${
            destaque
              ? "text-white/45"
              : "text-black/40"
          }
        `}
      >
        {label}
      </p>

      <p className="mt-2 text-xl font-black md:text-2xl">
        {valor}
      </p>
    </div>
  );
}