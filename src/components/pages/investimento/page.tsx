import React from "react";
import InvestmentHero from "./hero";
import ServiceCards, { ServiceKey } from "./serviceCards";
import Cta from "./cta";
import AlavancagemSection from "./AlavancagemSection";
import PrevidenciaTimeline from "./PrevidenciaTimeline";

interface InvestmentTabProps {
  highlighted?: ServiceKey;
  onSelectService?: (key: ServiceKey) => void;
}

export const InvestmentTab: React.FC<InvestmentTabProps> = ({
  highlighted,
  onSelectService,
}) => {
  return (
    <section
      className="w-full bg-white font-sans text-neutral-900"
      aria-label="Soluções de investimento"
    >
      {/* HERO */}
      <InvestmentHero />

      {/* 3 SERVIÇOS */}
      <ServiceCards />

      {/* ALAVANCAGEM PATRIMONIAL E FINANCEIRA */}
      <AlavancagemSection />

      {/* PREVIDÊNCIA APLICADA */}
      <PrevidenciaTimeline />

      {/* CTA FINAL - SEMPRE ÚLTIMA SEÇÃO */}
      <Cta />
    </section>
  );
};

export default InvestmentTab;