"use client";

import { useEffect, useRef, useState } from "react";
import CountingNumber from "@/components/originkit/ui/numbers";

const numbersData = [
  {
    id: "01",
    category: "CONTEMPLAÇÕES",
    value: 1.8,
    suffix: "MIL",
    prefix: "+",
    description: "Contemplações mensais",
  },
  {
    id: "02",
    category: "ECONOMIA",
    value: 1.7,
    suffix: " BILHÕES",
    prefix: "+",
    description: "Inseridos na economia do país em 2024",
  },
  {
    id: "03",
    category: "CRÉDITOS",
    value: 20.8,
    suffix: " BILHÕES",
    prefix: "+",
    description: "De créditos comercializados em 2024",
  },
  {
    id: "04",
    category: "BENS",
    value: 20.8,
    suffix: " MIL",
    prefix: "+",
    description: "Bens entregues",
  },
];

export default function NossosNumeros() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Para observar apenas a primeira entrada:
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-4 py-20 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start">

        {/* CABEÇALHO */}
        <div className="mb-12 w-full max-w-3xl text-left">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-black/60 md:text-base">
            Números que fazem a diferença
          </h3>

          <h1 className="text-3xl font-black uppercase tracking-tight text-black md:text-5xl">
            NOSSA FORÇA EM NÚMEROS
          </h1>
        </div>

        {/* GRID */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
          {numbersData.map((number) => (
            <div
              key={number.id}
              className="group flex h-[420px] flex-col justify-between rounded-3xl border border-black/10 p-8 text-black shadow-xl transition-colors duration-300 hover:bg-black"
            >
              {/* TOPO */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4 transition-colors duration-300 group-hover:border-white/10">
                <span className="text-xs font-bold tracking-widest text-black/40 group-hover:text-white/40">
                  {number.id}
                </span>

                <span className="text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-white/40">
                  {number.category}
                </span>
              </div>

              {/* NÚMERO */}
              <div className="my-auto py-10">
                <div className="flex flex-wrap items-baseline">
                  <span className="ml-2 text-2xl font-black text-black transition-colors duration-300 group-hover:text-white md:text-3xl">
                    {number.prefix}
                  </span>

                  {/* Só renderiza quando entrar na tela */}
                  {isVisible && (
                    <CountingNumber
                      from={0}
                      target={number.value}
                      className="text-5xl font-black tracking-tight text-black transition-colors duration-300 group-hover:text-white md:text-6xl"
                    />
                  )}

                  <span className="ml-2 text-2xl font-black text-black transition-colors duration-300 group-hover:text-white md:text-3xl">
                    {number.suffix}
                  </span>
                </div>

                <p className="mt-5 max-w-xs text-sm leading-relaxed text-black/70 transition-colors duration-300 group-hover:text-white/70">
                  {number.category}
                </p>
              </div>

              {/* RODAPÉ */}
              <div className="flex items-center justify-between border-t border-black/10 pt-4 text-xs font-bold uppercase tracking-wider text-black transition-colors duration-300 group-hover:border-white/10 group-hover:text-white">
                <span>{number.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}