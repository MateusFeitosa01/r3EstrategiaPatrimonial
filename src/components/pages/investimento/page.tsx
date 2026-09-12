"use client";

import React, { useState } from "react";
import "./InvestmentTab.css";

export type ServiceKey =
  | "alavancagem-financeira"
  | "alavancagem-patrimonial"
  | "previdencia-aplicada";

interface ServiceCard {
  key: ServiceKey;
  icon: React.ReactNode;
  title: string;
  description: string;
}

/* =========================================================
   ÍCONES
========================================================= */

const IconTrendUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d="M3 17l6-6 4 4 8-8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 7h6v6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBars = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <rect x="4" y="12" width="3" height="8" />
    <rect x="10.5" y="7" width="3" height="13" />
    <rect x="17" y="3" width="3" height="17" />
  </svg>
);

const IconClock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path
      d="M12 7v5l3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconHome = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d="M4 11l8-7 8 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 10v9h12v-9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCard = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <rect x="3" y="6" width="18" height="13" rx="1.5" />
    <path d="M3 10.5h18" />
  </svg>
);

/* =========================================================
   SERVIÇOS
========================================================= */

const SERVICES: ServiceCard[] = [
  {
    key: "alavancagem-financeira",
    icon: <IconTrendUp />,
    title: "Alavancagem Financeira",
    description:
      "Estratégias para potencializar recursos e ampliar oportunidades por meio de um planejamento financeiro inteligente.",
  },
  {
    key: "alavancagem-patrimonial",
    icon: <IconBars />,
    title: "Alavancagem Patrimonial",
    description:
      "Estratégias voltadas para acelerar a construção de patrimônio utilizando oportunidades e planejamento estratégico.",
  },
  {
    key: "previdencia-aplicada",
    icon: <IconClock />,
    title: "Previdência Aplicada",
    description:
      "Planejamento estratégico de longo prazo para construção, proteção e organização do patrimônio.",
  },
];

/* =========================================================
   PROPS
========================================================= */

interface InvestmentTabProps {
  highlighted?: ServiceKey;
  onSelectService?: (key: ServiceKey) => void;
}

/* =========================================================
   COMPONENTE
========================================================= */

export const InvestmentTab: React.FC<InvestmentTabProps> = ({
  highlighted = "alavancagem-patrimonial",
  onSelectService,
}) => {
  const [active, setActive] = useState<ServiceKey>(highlighted);

  return (
    <section
      className="inv-tab"
      aria-label="Soluções de investimento"
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <div className="inv-tab__hero">

        {/* IMAGEM DO DIAMANTE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
            md:bg-[position:center_right]
          "
          style={{
            backgroundImage: "url('/img/logo/financas.png')",
          }}
        />

        {/* DEGRADÊ ESCURO PARA O TEXTO */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-r
            from-black
            via-black/80
            to-black/10
          "
        />

        {/* SOMBRA INFERIOR */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-black/20
          "
        />

        {/* CONTEÚDO */}
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            w-full
            max-w-7xl
            items-center
            px-6
            md:px-10
          "
        >
          <div className="max-w-4xl">

            {/* EYEBROW */}
            <p
              className="
                mb-4
                text-sm
                uppercase
                tracking-[0.25em]
                text-white/60
              "
            >
              METODOLOGIA R3
            </p>

            {/* TÍTULO */}
            <h1
              className="
                max-w-4xl
                text-4xl
                font-black
                leading-tight
                text-white
                md:text-6xl
              "
            >
              Soluções estratégicas para cada etapa do seu investimento.
            </h1>

            {/* DESCRIÇÃO */}
            <p
              className="
                mt-6
                max-w-3xl
                text-lg
                leading-relaxed
                text-white/70
                md:text-xl
              "
            >
              Estratégias personalizadas para potencializar seus recursos,
              construir patrimônio e planejar seu futuro com segurança e
              inteligência financeira.
            </p>

          </div>
        </div>
      </div>

      {/* =====================================================
          CARDS DE SERVIÇOS
      ====================================================== */}
      <div className="inv-tab__grid">
        {SERVICES.map((service) => (
          <button
            key={service.key}
            type="button"
            className={
              "inv-tab__card" +
              (active === service.key
                ? " inv-tab__card--active"
                : "")
            }
            onClick={() => {
              setActive(service.key);
              onSelectService?.(service.key);
            }}
          >
            {/* ÍCONE */}
            <span className="inv-tab__card-icon">
              {service.icon}
            </span>

            {/* TÍTULO */}
            <span className="inv-tab__card-title">
              {service.title}
            </span>

            {/* DESCRIÇÃO */}
            <span className="inv-tab__card-desc">
              {service.description}
            </span>

            {/* LINK */}
            <span className="inv-tab__card-link">
              Saiba mais

              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M3 7h8M8 3l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default InvestmentTab;