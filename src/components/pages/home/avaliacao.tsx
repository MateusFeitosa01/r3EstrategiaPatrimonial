"use client";

import Testimonials from "@/components/originkit/ui/testimonials";

export default function Avaliacao() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
        <div className="text-left mb-12 w-full max-w-3xl">
            <h3 className="text-sm md:text-base font-semibold text-black/60 tracking-widest uppercase mb-3">
                NÃO CONFIA AINDA?
            </h3>
            <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase">
                O QUE ESTÃO FALANDO DE NÓS
            </h1>
            </div>
      

      <Testimonials />
    </section>
  );
}