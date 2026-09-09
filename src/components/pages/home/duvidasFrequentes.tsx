"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/originkit/ui/accordion";

export default function FAQ() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12 w-full max-w-3xl">
            <h3 className="text-sm md:text-base font-semibold text-black/60 tracking-widest uppercase mb-3">
                FAQ
            </h3>
            <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase">
                Perguntas Frequentes
            </h1>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              O que é um consórcio?
            </AccordionTrigger>

            <AccordionContent>
              O consórcio é uma modalidade de compra planejada em que
              um grupo de pessoas contribui mensalmente para adquirir
              um bem,serviço ou utilizada também como ferramenta de investimento.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Como funciona a contemplação?
            </AccordionTrigger>

            <AccordionContent>
              São até 6 formas de contemplação, combinando sorteio e diferentes modalidades de 
              lance para criar uma estratégia personalizada e aumentar as possibilidades de antecipar a contemplação.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              O consórcio possui juros?
            </AccordionTrigger>

            <AccordionContent>
              Sem juros de financiamento: no consórcio, 
              você paga taxa de administração e conta com planejamento para construir seu patrimônio.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Como funciona uma carta contemplada?
            </AccordionTrigger>

            <AccordionContent>
              É uma carta de crédito já contemplada, adquirida mediante um valor de entrada, 
              que permite utilizar o crédito para a compra imediata do veículo, imóvel ou outro bem desejado.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              Posso utilizar o crédito para comprar um imóvel usado?
            </AccordionTrigger>

            <AccordionContent>
              Sim. A carta de crédito pode ser utilizada para adquirir imóveis novos ou usados,
               oferecendo mais flexibilidade para escolher o imóvel que melhor atende aos seus objetivos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}