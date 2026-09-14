"use client";

import React from "react";
import { Car, Home, ArrowUpRight } from "lucide-react";
import { TabelaCredito, ItemCredito } from "./tabelaCredito";

const creditosVeiculos: ItemCredito[] = [
  {
    credito: "R$ 70.000,00",
    parcela: "R$ 812,00",
    meiaParcela: "R$ 406,00",
    prazo: "100 meses",
  },
  {
    credito: "R$ 100.000,00",
    parcela: "R$ 966,86",
    meiaParcela: "R$ 483,43",
    prazo: "120 meses",
  },
  {
    credito: "R$ 130.000,00",
    parcela: "R$ 1.256,66",
    meiaParcela: "R$ 628,33",
    prazo: "120 meses",
  },
  {
    credito: "R$ 300.000,00",
    parcela: "R$ 2.900,00",
    meiaParcela: "R$ 1.450,00",
    prazo: "120 meses",
  },
];

const creditosImoveis: ItemCredito[] = [
  {
    credito: "R$ 200.000,00",
    parcela: "R$ 1.230,00",
    meiaParcela: "R$ 615,00",
    prazo: "200 meses",
  },
  {
    credito: "R$ 400.000,00",
    parcela: "R$ 2.460,00",
    meiaParcela: "R$ 1.230,00",
    prazo: "200 meses",
  },
  {
    credito: "R$ 700.000,00",
    parcela: "R$ 3.913,00",
    meiaParcela: "R$ 1.956,50",
    prazo: "220 meses",
  },
  {
    credito: "R$ 1.000.000,00",
    parcela: "R$ 5.166,00",
    meiaParcela: "R$ 2.583,00",
    prazo: "240 meses",
  },
];

export function SecaoSimulacoes() {
  return (
    <section
      id="simulacoes"
      className="relative overflow-hidden bg-white px-5 py-16 md:px-8 md:py-24"
    >
      {/* brilho decorativo */}
      <div
        className="
          pointer-events-none
          absolute -left-32 top-20
          h-72 w-72
          rounded-full
          bg-black/[0.025]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-32 bottom-0
          h-80 w-80
          rounded-full
          bg-black/[0.025]
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            CABEÇALHO
        ================================================= */}
        <div className="mb-12 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/40">
            Simulações de crédito
          </p>

          <h2 className="text-3xl font-black tracking-[-0.04em] text-black md:text-5xl">
            Encontre o crédito ideal para o seu próximo objetivo.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/50 md:text-lg">
            Compare valores de crédito, meia parcela e prazo em algumas das
            nossas possibilidades.
          </p>
        </div>

        {/* =================================================
            TABELAS
        ================================================= */}
        <div className="grid gap-7 lg:grid-cols-2">

          {/* VEÍCULOS */}
          <div
            className="
              group relative overflow-hidden
              rounded-[30px]
              border border-black/[0.08]
              bg-white/55
              p-2
              shadow-[0_25px_80px_rgba(0,0,0,0.10)]
              backdrop-blur-2xl
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_30px_90px_rgba(0,0,0,0.14)]
            "
          >
            {/* brilho */}
            <div
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-br
                from-white/80
                via-transparent
                to-black/[0.025]
              "
            />

            {/* reflexo superior */}
            <div
              className="
                pointer-events-none
                absolute left-8 right-8 top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-black/10
                to-transparent
              "
            />

            <div className="relative z-10">
              <TabelaCredito
                titulo="Crédito de veículos"
                dados={creditosVeiculos}
                Icone={Car}
              />
            </div>
          </div>

          {/* IMÓVEIS */}
          <div
            className="
              group relative overflow-hidden
              rounded-[30px]
              border border-black/[0.08]
              bg-white/55
              p-2
              shadow-[0_25px_80px_rgba(0,0,0,0.10)]
              backdrop-blur-2xl
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_30px_90px_rgba(0,0,0,0.14)]
            "
          >
            {/* brilho */}
            <div
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-br
                from-white/80
                via-transparent
                to-black/[0.025]
              "
            />

            {/* reflexo superior */}
            <div
              className="
                pointer-events-none
                absolute left-8 right-8 top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-black/10
                to-transparent
              "
            />

            <div className="relative z-10">
              <TabelaCredito
                titulo="Crédito de imóveis"
                dados={creditosImoveis}
                Icone={Home}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            AVISO + CTA
        ================================================= */}
        <div
          className="
            group relative mt-8 overflow-hidden
            rounded-[26px]
            border border-black/[0.08]
            bg-white/50
            p-5
            shadow-[0_18px_55px_rgba(0,0,0,0.07)]
            backdrop-blur-2xl
            transition-all duration-500
            hover:shadow-[0_22px_65px_rgba(0,0,0,0.10)]
            md:p-7
          "
        >
          {/* brilho */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/80
              via-transparent
              to-black/[0.025]
            "
          />

          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl
                  border border-black/10
                  bg-black/[0.04]
                "
              >
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <p className="max-w-3xl text-sm leading-relaxed text-black/50">
                Valores, condições e disponibilidade podem sofrer alterações.
                Consulte um especialista da R3 Estratégia Patrimonial para
                confirmar as condições vigentes.
              </p>
            </div>

            <a
              href="/#formulario"
              className="
                group/button
                flex shrink-0 items-center justify-center gap-2
                rounded-full
                bg-black
                px-6 py-3
                text-center
                text-sm font-bold
                uppercase tracking-wide
                text-white
                shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-black/85
                hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
              "
            >
              Quero fazer uma simulação

              <ArrowUpRight
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover/button:translate-x-0.5
                  group-hover/button:-translate-y-0.5
                "
              />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default SecaoSimulacoes;