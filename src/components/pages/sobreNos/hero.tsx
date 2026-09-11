export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[650px] overflow-hidden bg-black text-white">

      {/* IMAGEM DO DIAMANTE */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-[position:center_right]"
        style={{
          backgroundImage: "url('/img/logo/diamente.png')",
        }}
      />

      {/* DEGRADÊ ESCURO PARA O TEXTO */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />

      {/* SOMBRA INFERIOR */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
        <div className="max-w-4xl">

          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/60">
            QUEM SOMOS
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Planejamos hoje as conquistas que você quer viver amanhã.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Somos uma empresa especializada em consórcios, ajudando pessoas e
            empresas a planejarem a aquisição de imóveis, veículos e outros
            bens de forma estratégica e consciente.
          </p>

        </div>
      </div>
    </section>
  );
}