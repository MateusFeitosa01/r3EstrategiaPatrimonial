import { Component } from "@/components/originkit/ui/parallaxScroll";

export default function SobreEmpresa() {
  return (
    <div>
      {/* PRIMEIRA SEÇÃO - IMAGEM À DIREITA */}
      <Component
        imagePosition="right"
        label="Sobre a empresa"
        title={
          <>
            Planejamento para transformar{" "}
            <span className="text-black/40">
              objetivos em conquistas.
            </span>
          </>
        }
        description="Na R3 Consórcios & Investimentos, acreditamos que conquistar grandes objetivos exige planejamento, confiança e escolhas inteligentes. Por isso, trabalhamos para oferecer soluções financeiras alinhadas aos objetivos de cada cliente."
        secondaryDescription="Nosso compromisso é tornar cada etapa mais clara, segura e estratégica, construindo relacionamentos baseados em transparência e confiança."
        image="/img/time/R3_-35.jpg.jpeg"
        imageAlt="Sobre a R3 Consórcios & Investimentos"
      />

      {/* SEGUNDA SEÇÃO - IMAGEM À ESQUERDA */}
      <Component
        imagePosition="left"
        label="SOBRE A HS"
        title={
          <>
            Construindo caminhos para{" "}
            <span className="text-black/40">
              grandes conquistas.
            </span>
          </>
        }
        description="Nosso objetivo é oferecer soluções que ajudem nossos clientes a planejar o futuro com segurança, clareza e estratégia."
        secondaryDescription="Trabalhamos para transformar sonhos em planos concretos, acompanhando cada etapa da jornada."
        image="/img/logo/logoHs.jpg"
        imageAlt="Nossa missão"
      />
    </div>
  );
}

