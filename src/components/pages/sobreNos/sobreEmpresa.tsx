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
        description="Na R3 Estratégia Patrimonial, acreditamos que grandes conquistas começam com planejamento, confiança e decisões inteligentes. Por isso, desenvolvemos estratégias personalizadas para quem busca construir, rentabilizar e acelerar seu patrimônio.
Nosso compromisso é tornar cada decisão mais clara, segura e estratégica, construindo relações duradouras baseadas em transparência, confiança e resultados."
        image="/img/time/R3_-35.jpg.jpeg"
        imageAlt="Sobre a R3 Consórcios & Investimentos"
      />

      {/* SEGUNDA SEÇÃO - IMAGEM À ESQUERDA */}
      <Component
        imagePosition="left"
        label="SOBRE A HS"
        title={
          <>
            PARCERIA QUE IMPULSIONA{" "}
            <span className="text-black/40">
              CONQUISTAS.
            </span>
          </>
        }
        description="A R3 Estratégia Patrimonial trabalha em parceria com uma das maiores administradoras independentes de consórcios do Brasil, com mais de 30 anos de experiência nos segmentos de imóveis e veículos.
Essa parceria nos permite oferecer soluções flexíveis, condições diferenciadas e estratégias personalizadas, tanto para aquisição de bens quanto para quem busca utilizar o consórcio como ferramenta de construção e aceleração patrimonial.
Unimos a solidez de uma grande administradora à estratégia e ao acompanhamento da R3 para proporcionar aos nossos clientes segurança, planejamento e novas possibilidades para o patrimônio. "
        image="/img/logo/logoHsPreta.jpeg"
        imageAlt="Nossa missão"
      />
    </div>
  );
}

