"use client";

import React from "react";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[650px] overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-[position:center_right]"
        style={{ backgroundImage: "url('/img/logo/aquisicao.png')" }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/60">
            AQUISIÇÃO
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
            Planeje hoje. Conquiste no seu tempo.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Utilize o consórcio como uma estratégia inteligente para aquisição
            de imóveis, veículos e outros bens, com planejamento e condições que
            se adaptam aos seus objetivos.
          </p>

          <a
            href="#simulacoes"
            className="mt-9 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/85"
          >
            Ver simulações
          </a>
        </div>
      </div>
    </section>
  );
}