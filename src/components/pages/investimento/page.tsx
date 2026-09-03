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

const IconTrendUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
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
  >
    <rect x="3" y="6" width="18" height="13" rx="1.5" />
    <path d="M3 10.5h18" />
  </svg>
);

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

interface InvestmentTabProps {
  highlighted?: ServiceKey;
  onSelectService?: (key: ServiceKey) => void;
}

export const InvestmentTab: React.FC<InvestmentTabProps> = ({
  highlighted = "alavancagem-patrimonial",
  onSelectService,
}) => {
  const [active, setActive] = useState<ServiceKey>(highlighted);

  return (
    <section className="inv-tab" aria-label="Soluções de investimento">
      <div className="inv-tab__hero">
        <span className="inv-tab__eyebrow">
            METODOLOGIA R3 
        </span>

         <h1 className="inv-tab__heading">
            Soluções estratégicas para cada etapa do seu investimento.
        </h1>
    </div>
      <div className="inv-tab__grid">
        {SERVICES.map((service) => (
          <button
            key={service.key}
            type="button"
            className={
              "inv-tab__card" +
              (active === service.key ? " inv-tab__card--active" : "")
            }
            onClick={() => {
              setActive(service.key);
              onSelectService?.(service.key);
            }}
          >
            <span className="inv-tab__card-icon">
              {service.icon}
            </span>

            <span className="inv-tab__card-title">
              {service.title}
            </span>

            <span className="inv-tab__card-desc">
              {service.description}
            </span>

            <span className="inv-tab__card-link">
              Saiba mais

              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
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

