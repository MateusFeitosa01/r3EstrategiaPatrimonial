"use client";

import dynamic from "next/dynamic";
import LazySection from "@/components/originkit/LazySection";

const Hero = dynamic(() => import("./hero"));

const SobreEmpresa = dynamic(() =>
  import("./sobreEmpresa")
);

const NossoTime = dynamic(() =>
  import("./nossoTime").then((mod) => mod.NossoTime)
);

const NossosNumeros = dynamic(() =>
  import("./nossosNumeros")
);

const StackSpread = dynamic(() =>
  import("@/components/originkit/ui/cta")
);

export default function SobreNos() {
  return (
    <div>
      {/* Carrega imediatamente */}
      <Hero />

      {/* Carrega quando estiver próximo da tela */}
      <LazySection minHeight="600px">
        <SobreEmpresa />
      </LazySection>

      <LazySection minHeight="600px">
        <NossoTime title="Pessoas que transformam planejamento em conquistas." />
      </LazySection>

      <LazySection minHeight="500px">
        <NossosNumeros />
      </LazySection>

      <LazySection minHeight="100vh">
        <StackSpread />
      </LazySection>
    </div>
  );
}