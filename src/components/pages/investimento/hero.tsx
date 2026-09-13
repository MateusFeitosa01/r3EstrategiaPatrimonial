import React from "react";

export const InvestmentHero: React.FC = () => {
  return (
    <div className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-black text-white sm:min-h-[600px] md:min-h-[650px]">
      {/* IMAGEM DO DIAMANTE */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-[position:center_right]"
        style={{
          backgroundImage: "url('/img/logo/financas.png')",
        }}
      />

      {/* DEGRADÊ ESCURO PARA O TEXTO */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />

      {/* SOMBRA INFERIOR */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 md:px-10">
        <div className="max-w-4xl">
          {/* EYEBROW */}
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/60">
            METODOLOGIA R3
          </p>

          {/* TÍTULO */}
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
            Soluções estratégicas para cada etapa do seu investimento.
          </h1>

          {/* DESCRIÇÃO */}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Estratégias personalizadas para potencializar seus recursos,
            construir patrimônio e planejar seu futuro com segurança e
            inteligência financeira.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentHero;