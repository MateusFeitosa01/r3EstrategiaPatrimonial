'use client'
import { useEffect } from "react";
import ScrollExpandMedia from "./hero";
import NossaEstrategia from "./nossaEstrategia";
import PorqueConsorcio from "./porqueConsorcio";
import Avaliacao from "./avaliacao";
import Formulario from "./forms";
import Navbar from "@/components/extras/navbar/page";
import FAQ from "./duvidasFrequentes";
import Footer from "@/components/extras/footer/page";

export default function Home() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <ScrollExpandMedia
        scrollToExpand="↓ Role para explorar"
        textBlend={false}
      >
        <section id="estrategia">
          <NossaEstrategia />
        </section>

        <section id="porque-consorcio">
          <PorqueConsorcio />
        </section>

        <section id="avaliacoes">
          <Avaliacao />
        </section>

        <section id="formulario">
          <Formulario />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <Footer />
      </ScrollExpandMedia>
    </>
  );
}