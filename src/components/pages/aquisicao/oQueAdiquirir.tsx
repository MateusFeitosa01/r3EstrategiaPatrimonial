"use client";

import React from "react";
import {
  LucideIcon,
  Home,
  Car,
  Hammer,
  Factory,
  LandPlot,
  Tractor,
  Building2,
  Warehouse,
  Bike,
  Truck,
  Sailboat,
} from "lucide-react";

interface Possibilidade {
  label: string;
  Icone: LucideIcon;
}

const possibilidadesImoveis: Possibilidade[] = [
  { label: "Construção", Icone: Hammer },
  { label: "Reforma", Icone: Factory },
  { label: "Terreno", Icone: LandPlot },
  { label: "Fazenda", Icone: Tractor },
  { label: "Casa", Icone: Home },
  { label: "Apartamento", Icone: Building2 },
  { label: "Sala comercial", Icone: Warehouse },
];

const possibilidadesVeiculos: Possibilidade[] = [
  { label: "Carro", Icone: Car },
  { label: "Moto", Icone: Bike },
  { label: "Caminhão", Icone: Truck },
  { label: "Maquinário agrícola", Icone: Tractor },
  { label: "Náutico", Icone: Sailboat },
];

function CardPossibilidade({
  item,
  dark = false,
}: {
  item: Possibilidade;
  dark?: boolean;
}) {
  const Icone = item.Icone;

  return (
    <div
      className={`
        group relative overflow-hidden rounded-[20px]
        border p-4
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1.5
        ${
          dark
            ? `
              border-white/[0.14]
              bg-white/[0.07]
              shadow-[0_12px_35px_rgba(0,0,0,0.30)]
              hover:border-white/[0.25]
              hover:bg-white/[0.11]
              hover:shadow-[0_20px_45px_rgba(0,0,0,0.40)]
            `
            : `
              border-black/[0.08]
              bg-white/45
              shadow-[0_12px_35px_rgba(0,0,0,0.08)]
              hover:border-black/[0.15]
              hover:bg-white/65
              hover:shadow-[0_20px_45px_rgba(0,0,0,0.13)]
            `
        }
      `}
    >
      {/* brilho interno */}
      <div
        className={`
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          ${
            dark
              ? "from-white/[0.10] via-transparent to-transparent"
              : "from-white/70 via-transparent to-transparent"
          }
        `}
      />

      {/* reflexo superior */}
      <div
        className={`
          pointer-events-none absolute left-4 right-4 top-0 h-px
          ${
            dark
              ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-white to-transparent"
          }
        `}
      />

      <div className="relative z-10">
        <div
          className={`
            mb-4 flex h-10 w-10 items-center justify-center
            rounded-xl border
            transition-all duration-500
            group-hover:scale-105
            ${
              dark
                ? "border-white/15 bg-white/10 text-white"
                : "border-black/10 bg-black/[0.04] text-black"
            }
          `}
        >
          <Icone className="h-[19px] w-[19px] stroke-[1.8]" />
        </div>

        <p
          className={`
            text-sm font-semibold tracking-[-0.1px]
            ${dark ? "text-white" : "text-black"}
          `}
        >
          {item.label}
        </p>

        <div
          className={`
            mt-3 h-px w-0
            transition-all duration-500
            group-hover:w-full
            ${
              dark
                ? "bg-white/30"
                : "bg-black/20"
            }
          `}
        />
      </div>
    </div>
  );
}

export function OQueAdquirir() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* CABEÇALHO */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
            O que você pode adquirir
          </p>

          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            Crédito para transformar seus próximos planos em patrimônio.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* =================================================
              IMÓVEIS
          ================================================= */}
          <div
            className="
              group relative overflow-hidden
              rounded-[32px]
              border border-black/[0.07]
              bg-[#f3f3f3]/80
              p-6
              shadow-[0_25px_70px_rgba(0,0,0,0.08)]
              backdrop-blur-xl
              md:p-8
            "
          >
            {/* brilho do painel */}
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

            <div className="relative z-10">

              <div className="mb-7 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-black text-white
                    shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                  "
                >
                  <Home className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                    Imóveis
                  </p>

                  <h3 className="text-2xl font-black tracking-tight">
                    Crédito para imóveis
                  </h3>
                </div>
              </div>

              <p className="mb-7 max-w-xl leading-relaxed text-black/60">
                Use sua carta de crédito para construir, reformar ou adquirir
                diferentes tipos de imóveis de acordo com o seu planejamento.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {possibilidadesImoveis.map((item) => (
                  <CardPossibilidade
                    key={item.label}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* =================================================
              VEÍCULOS
          ================================================= */}
          <div
            className="
              group relative overflow-hidden
              rounded-[32px]
              border border-white/[0.10]
              bg-black
              p-6
              text-white
              shadow-[0_25px_70px_rgba(0,0,0,0.22)]
              md:p-8
            "
          >
            {/* brilho do painel */}
            <div
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-br
                from-white/[0.10]
                via-transparent
                to-transparent
              "
            />

            {/* brilho lateral */}
            <div
              className="
                pointer-events-none
                absolute -right-20 -top-20
                h-56 w-56
                rounded-full
                bg-white/[0.04]
                blur-3xl
              "
            />

            <div className="relative z-10">

              <div className="mb-7 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-white text-black
                    shadow-[0_10px_30px_rgba(255,255,255,0.12)]
                  "
                >
                  <Car className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                    Veículos
                  </p>

                  <h3 className="text-2xl font-black tracking-tight">
                    Crédito para veículos
                  </h3>
                </div>
              </div>

              <p className="mb-7 max-w-xl leading-relaxed text-white/60">
                Escolha o crédito ideal para comprar veículos de uso pessoal,
                profissional, agrícola ou náutico.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {possibilidadesVeiculos.map((item) => (
                  <CardPossibilidade
                    key={item.label}
                    item={item}
                    dark
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OQueAdquirir;