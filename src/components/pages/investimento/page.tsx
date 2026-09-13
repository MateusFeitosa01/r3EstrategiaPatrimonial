import React from "react";
import InvestmentHero from "./hero";
import ServiceCards, { ServiceKey } from "./serviceCards";
import StackSpread from "@/components/originkit/ui/cta";

interface InvestmentTabProps {
  highlighted?: ServiceKey;
  onSelectService?: (key: ServiceKey) => void;
}

export const InvestmentTab: React.FC<InvestmentTabProps> = ({
  highlighted,
  onSelectService,
}) => {
  return (
    <>
    <section
      className="min-h-screen w-full bg-white font-sans text-neutral-900"
      aria-label="Soluções de investimento"
    >
      <InvestmentHero />
      <ServiceCards/>
    
     
    </section>
    
    </>
  );
};

export default InvestmentTab;