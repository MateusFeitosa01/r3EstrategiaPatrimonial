"use client";

import React, { useEffect, useState } from "react";
import { FlippingCard } from "@/components/ui/flipping-card";

export type ServiceKey =
  | "alavancagem-financeira"
  | "alavancagem-patrimonial"
  | "previdencia-aplicada";

interface ServiceCard {
  key: ServiceKey;
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string;
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
    className="h-full w-full"
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
    className="h-full w-full"
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
    className="h-full w-full"
  >
    <circle cx="12" cy="12" r="9" />
    <path
      d="M12 7v5l3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
      "Transforme a contemplação em oportunidade de rentabilidade através da venda estratégica da carta contemplada.",
    details:
      "Utilize o consórcio como uma ferramenta de planejamento para acessar crédito de forma programada, preservar sua liquidez e direcionar recursos para novos objetivos financeiros.",
  },
  {
    key: "alavancagem-patrimonial",
    icon: <IconBars />,
    title: "Alavancagem Patrimonial",
    description:
      "Utilize o crédito de forma estratégica para adquirir ativos, ampliar seu patrimônio e acelerar sua construção patrimonial.",
    details:
      "Planeje a aquisição de imóveis e outros bens de forma estratégica, transformando o consórcio em uma ferramenta para ampliar, diversificar e fortalecer seu patrimônio ao longo do tempo.",
  },
  {
    key: "previdencia-aplicada",
    icon: <IconClock />,
    title: "Previdência Aplicada",
    description:
      "Transforme o pagamento mensal das parcelas em uma estratégia de construção de reserva, rentabilidade e valorização para o futuro.",
    details:
      "Uma estratégia de poupança programada em que você constrói seu planejamento através do pagamento mensal das parcelas. Após a contemplação, o crédito pode permanecer aplicado, gerando rentabilidade e valorização ao longo do tempo.",
  },
];

/* =========================================================
   SERVICE CARDS
========================================================= */

export const ServiceCards: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<ServiceKey | null>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const updateDevice = () => {
      setIsMobileOrTablet(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  const handleCardSwipe = (key: ServiceKey) => {
    setFlippedCard((current) => {
      if (current === key) {
        return null;
      }

      return key;
    });
  };

  return (
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-[18px] px-[18px] py-[55px] sm:px-6 sm:py-[70px] md:grid-cols-2 md:px-[30px] md:py-[80px] lg:grid-cols-3 lg:px-[40px] lg:py-[100px] lg:pb-[120px]">
      {SERVICES.map((service) => {
        const frontContent = (
          <div className="flex h-full w-full flex-col justify-between p-[26px] sm:p-7 md:p-[34px]">
            <div>
              <span className="mb-[24px] flex h-[30px] w-[30px] items-center justify-center text-neutral-900 dark:text-white sm:h-[34px] sm:w-[34px] md:mb-[32px]">
                {service.icon}
              </span>

              <span className="mb-[15px] block text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-inherit sm:text-[19px]">
                {service.title}
              </span>

              <span className="block text-[13px] font-normal leading-[1.7] text-neutral-500 dark:text-neutral-400">
                {service.description}
              </span>
            </div>

            <span className="inline-flex items-center gap-[9px] text-[12px] font-medium tracking-[0.4px] text-neutral-900 dark:text-white">
              {isMobileOrTablet
                ? "Clique para ver mais"
                : "Passe o mouse para ver mais"}

              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-250 group-hover/flipping-card:translate-x-1"
              >
                <path
                  d="M3 7h8M8 3l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        );

        const backContent = (
          <div className="flex h-full w-full flex-col justify-between p-[26px] sm:p-7 md:p-[34px]">
            <div>
              <span className="mb-[15px] block text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-white">
                {service.title}
              </span>

              <p className="text-[13px] font-normal leading-[1.7] text-neutral-300">
                {service.details || service.description}
              </p>
            </div>
          </div>
        );

        return (
          <div key={service.key} className="w-full">
            <FlippingCard
              height={430}
              className="!w-full border-neutral-200 bg-white text-neutral-900 transition-all duration-700 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)]"
              frontContent={frontContent}
              backContent={backContent}
              isFlipped={flippedCard === service.key}
              onClick={() => handleCardSwipe(service.key)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCards;

