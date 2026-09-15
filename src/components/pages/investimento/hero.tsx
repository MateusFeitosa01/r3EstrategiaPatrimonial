"use client";

import React from "react";

export function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-black text-white sm:min-h-[600px] md:min-h-[650px]">
      {/* =========================
          IMAGEM DE FUNDO
      ========================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-no-repeat

          /* CELULAR */
          bg-[size:75%_auto]
          bg-[position:90%_center]

          /* TABLET */
          sm:bg-[size:65%_auto]
          sm:bg-[position:90%_center]

          /* DESKTOP */
          md:bg-cover
          md:bg-[position:center_right]
        "
        style={{
          backgroundImage: "url('/img/logo/aquisicao.png')",
        }}
      />

      {/* =========================
          DEGRADÊ ESCURO PARA O TEXTO
      ========================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/80
          to-black/10
        "
      />

      {/* =========================
          SOMBRA INFERIOR
      ========================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/40
          via-transparent
          to-black/20
        "
      />

      {/* =========================
          CONTEÚDO
      ========================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          w-full
          max-w-7xl
          items-center
          px-6
          md:px-10
        "
      >
        <div className="max-w-4xl">
          {/* EYEBROW */}
          <p
            className="
              mb-4
              text-sm
              font-medium
              uppercase
              tracking-[0.25em]
              text-white/60
            "
          >
            AQUISIÇÃO
          </p>

          {/* TÍTULO */}
          <h1
            className="
              max-w-4xl
              text-4xl
              font-black
              leading-tight
              text-white
              md:text-6xl
            "
          >
            Planeje hoje. Conquiste no seu tempo.
          </h1>

          {/* DESCRIÇÃO */}
          <p
            className="
              mt-6
              max-w-3xl
              text-lg
              leading-relaxed
              text-white/70
              md:text-xl
            "
          >
            Utilize o consórcio como uma estratégia inteligente para aquisição
            de imóveis, veículos e outros bens, com planejamento e condições
            que se adaptam aos seus objetivos.
          </p>

          {/* BOTÃO */}
          <a
            href="#simulacoes"
            className="
              mt-9
              inline-flex
              rounded-full
              bg-white
              px-7
              py-3.5
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-black
              transition
              hover:bg-white/85
            "
          >
            Ver simulações
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;