"use client";

import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealTitle,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtain,
} from "@/components/originkit/ui/cardAnimado";

const cardsData = [
  {
    id: "01",
    title: "PLANEJAMENTO",
    description:
      "Organize seus objetivos financeiros com um plano estruturado, pensado para transformar seus projetos em conquistas.",
    category: "CONSÓRCIO ESTRATÉGICO",
    linkText: "Saber mais →",
  },
  {
    id: "02",
    title: "PODER DE COMPRA",
    description:
      "Tenha acesso a uma carta de crédito para realizar seus objetivos com poder de compra e maior liberdade de escolha.",
    category: "PRESERVAÇÃO DE CAPITAL",
    linkText: "Conhecer opções →",
  },
  {
    id: "03",
    title: "FLEXIBILIDADE",
    description:
      "Escolha entre diferentes planos, prazos e valores de crédito para encontrar uma solução que se adapte aos seus objetivos.",
    category: "SOLUÇÕES PERSONALIZADAS",
    linkText: "Ver opções →",
  },
];

export default function NossaEstrategia() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        {/* Cabeçalho */}
        <div className="text-left mb-12 w-full max-w-3xl">
          <h3 className="text-sm md:text-base font-semibold text-black/60 tracking-widest uppercase mb-3">
            Ainda tem dúvidas?
          </h3>
          <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase">
            POR QUE CONSÓRCIO?
          </h1>
        </div>

        {/* Grid de Cards com Cortina */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {cardsData.map((card) => (
            <CardCurtainReveal
              key={card.id}
              /* 1. Adicionada a classe 'group' aqui */
             className="group h-[420px] rounded-3xl border border-black/10 bg-black/5 hover:bg-white text-black shadow-xl cursor-pointer justify-between p-2 transition-colors duration-300"
            >
              {/* Efeito da cortina de revelação */}
              <CardCurtain className="bg-black rounded-3xl" />

              <CardCurtainRevealBody className="flex flex-col justify-between h-full z-10">
                {/* Categoria / Número */}
                <div className="flex justify-between items-center text-xs font-semibold tracking-widest uppercase text-black group-hover:text-black/60 transition-colors duration-300">
                  <span>{card.category}</span>
                  <span>{card.id}</span>
                </div>

                {/* Conteúdo Central */}
                <div className="my-auto">
                  <CardCurtainRevealTitle className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black group-hover:text-black transition-colors duration-300 mb-4">
                    {card.title}
                  </CardCurtainRevealTitle>

                  <CardCurtainRevealDescription className="text-sm text-black-300 group-hover:text-black/80 transition-colors duration-300 leading-relaxed">
                    {card.description}
                  </CardCurtainRevealDescription>
                </div>

                {/* Rodapé do Card */}
                <CardCurtainRevealFooter className="pt-4 border-t border-white/10 group-hover:border-black/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black group-hover:text-black/70 transition-colors duration-300">
                  <span>{card.linkText}</span>
                  <span>R3 Soluções</span>
                </CardCurtainRevealFooter>
              </CardCurtainRevealBody>
            </CardCurtainReveal>
          ))}
        </div>
      </div>
    </section>
  );
}