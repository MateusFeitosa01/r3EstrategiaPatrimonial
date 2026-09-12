import Image from "next/image";
import {
  Bike,
  Building2,
  Car,
  Check,
  Factory,
  Hammer,
  Home,
  LandPlot,
  Sailboat,
  Tractor,
  Truck,
  Warehouse,
} from "lucide-react";

const telefoneWhatsApp = "5583987355437";

const creditosVeiculos = [
  {
    credito: "R$ 70.000,00",
    parcela: "R$ 812,00",
    meiaParcela: "R$ 406,00",
    prazo: "100 meses",
  },
  {
    credito: "R$ 100.000,00",
    parcela: "R$ 966,86",
    meiaParcela: "R$ 483,43",
    prazo: "120 meses",
  },
  {
    credito: "R$ 130.000,00",
    parcela: "R$ 1.256,66",
    meiaParcela: "R$ 628,33",
    prazo: "120 meses",
  },
  {
    credito: "R$ 300.000,00",
    parcela: "R$ 2.900,00",
    meiaParcela: "R$ 1.450,00",
    prazo: "120 meses",
  },
];

const creditosImoveis = [
  {
    credito: "R$ 200.000,00",
    parcela: "R$ 1.230,00",
    meiaParcela: "R$ 615,00",
    prazo: "200 meses",
  },
  {
    credito: "R$ 400.000,00",
    parcela: "R$ 2.460,00",
    meiaParcela: "R$ 1.230,00",
    prazo: "200 meses",
  },
  {
    credito: "R$ 700.000,00",
    parcela: "R$ 3.913,00",
    meiaParcela: "R$ 1.956,50",
    prazo: "220 meses",
  },
  {
    credito: "R$ 1.000.000,00",
    parcela: "R$ 5.166,00",
    meiaParcela: "R$ 2.583,00",
    prazo: "240 meses",
  },
];

const veiculos = [
  {
    titulo: "Moto",
    credito: "R$ 50.000,00",
    meiaParcela: "R$ 290,00",
    imagem: "/img/logo/financas.png",
    Icone: Bike,
  },
  {
    titulo: "Carro",
    credito: "R$ 120.000,00",
    meiaParcela: "R$ 680,00",
    imagem: "/img/logo/financas.png",
    Icone: Car,
  },
  {
    titulo: "Lancha",
    credito: "R$ 90.000,00",
    meiaParcela: "R$ 580,00",
    imagem: "/img/logo/financas.png",
    Icone: Sailboat,
  },
  {
    titulo: "Caminhão",
    credito: "R$ 600.000,00",
    meiaParcela: "R$ 2.290,00",
    imagem: "/img/logo/financas.png",
    Icone: Truck,
  },
];

const imoveis = [
  {
    titulo: "Terreno",
    credito: "R$ 100.000,00",
    meiaParcela: "R$ 343,00",
    imagem: "/img/logo/contemplacao.jpg",
    Icone: LandPlot,
  },
  {
    titulo: "Apartamento",
    credito: "R$ 300.000,00",
    meiaParcela: "R$ 922,00",
    imagem: "/img/logo/contemplacao.jpg",
    Icone: Building2,
  },
  {
    titulo: "Casa",
    credito: "R$ 500.000,00",
    meiaParcela: "R$ 1.397,00",
    imagem: "/img/logo/contemplacao.jpg",
    Icone: Home,
  },
  {
    titulo: "Construção",
    credito: "R$ 800.000,00",
    meiaParcela: "R$ 2.245,00",
    imagem: "/img/logo/contemplacao.jpg",
    Icone: Hammer,
  },
];

const possibilidadesImoveis = [
  { label: "Construção", Icone: Hammer },
  { label: "Reforma", Icone: Factory },
  { label: "Terreno", Icone: LandPlot },
  { label: "Fazenda", Icone: Tractor },
  { label: "Casa", Icone: Home },
  { label: "Apartamento", Icone: Building2 },
  { label: "Sala comercial", Icone: Warehouse },
];

const possibilidadesVeiculos = [
  { label: "Carro", Icone: Car },
  { label: "Moto", Icone: Bike },
  { label: "Caminhão", Icone: Truck },
  { label: "Maquinário agrícola", Icone: Tractor },
  { label: "Náutico", Icone: Sailboat },
];

function linkWhatsApp(
  titulo: string,
  credito: string,
  meiaParcela: string
) {
  const mensagem = `Olá! Tenho interesse no crédito para ${titulo} de ${credito}, com meia parcela de ${meiaParcela}. Gostaria de receber mais informações.`;

  return `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(
    mensagem
  )}`;
}

function TabelaCredito({
  titulo,
  dados,
  Icone,
}: {
  titulo: string;
  dados: typeof creditosVeiculos;
  Icone: typeof Car;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 bg-black px-5 py-5 text-white md:px-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
          <Icone className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-extrabold uppercase tracking-tight md:text-xl">
          {titulo}
        </h3>
      </div>

      <div className="divide-y divide-black/10">
        {dados.map((item) => (
          <div
            key={item.credito}
            className="grid gap-4 px-5 py-6 md:grid-cols-[1fr_1.2fr] md:items-center md:px-7"
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                Crédito
              </p>

              <p className="text-2xl font-black tracking-tight text-black">
                {item.credito}
              </p>

              <p className="mt-2 text-sm text-black/50">
                Prazo: {item.prazo}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f4f4f4] p-4 md:text-right">
              <p className="text-sm text-black/45 line-through">
                {item.parcela}
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-black/55">
                Meia parcela
              </p>

              <p className="mt-1 text-2xl font-black text-black md:text-3xl">
                {item.meiaParcela}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardOportunidade({
  item,
}: {
  item: (typeof veiculos)[number];
}) {
  const { Icone } = item;

  return (
    <article className="group w-[300px] shrink-0 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_14px_45px_rgba(0,0,0,0.10)] sm:w-[340px]">
      <div className="relative h-44 overflow-hidden bg-black">
        <Image
          src={item.imagem}
          alt={item.titulo}
          fill
          sizes="340px"
          className="object-cover opacity-70 transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <Icone className="h-6 w-6" />
          </div>

          <h3 className="text-2xl font-black">
            {item.titulo}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
            Crédito
          </p>

          <p className="mt-1 text-2xl font-black text-black">
            {item.credito}
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-black p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Meia parcela
          </p>

          <p className="mt-1 text-3xl font-black">
            {item.meiaParcela}
          </p>
        </div>

        <a
          href={linkWhatsApp(
            item.titulo,
            item.credito,
            item.meiaParcela
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
        >
          Tenho interesse
        </a>
      </div>
    </article>
  );
}

function Carrossel({
  titulo,
  subtitulo,
  itens,
}: {
  titulo: string;
  subtitulo: string;
  itens: typeof veiculos;
}) {
  const repetidos = [...itens, ...itens, ...itens, ...itens];

  return (
    <section className="overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
          Possibilidades de aquisição
        </p>

        <h2 className="max-w-4xl text-3xl font-black tracking-tight text-black md:text-5xl">
          {titulo}
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg">
          {subtitulo}
        </p>
      </div>

      <div className="relative mt-10 w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-white to-transparent md:w-28" />

        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div className="testimonial-marquee flex w-max gap-5 px-5 hover:[animation-play-state:paused] md:px-8">
          {repetidos.map((item, index) => (
            <CardOportunidade
              key={`${item.titulo}-${index}`}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AquisicaoPage() {
  return (
    <main className="bg-white text-black">
      <section className="relative overflow-hidden bg-black px-5 pb-20 pt-36 text-white md:px-8 md:pb-28 md:pt-44">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/img/logo/financas.png"
            alt=""
            fill
            priority
            className="object-cover object-right"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/45" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/50">
            Aquisição
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Planeje hoje. Conquiste no seu tempo.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
            Utilize o consórcio como uma estratégia inteligente para
            aquisição de imóveis, veículos e outros bens, com planejamento
            e condições que se adaptam aos seus objetivos.
          </p>

          <a
            href="#simulacoes"
            className="mt-9 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/85"
          >
            Ver simulações
          </a>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
              O que você pode adquirir
            </p>

            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Crédito para transformar seus próximos planos em patrimônio.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] bg-[#f5f5f5] p-6 md:p-8">
              <div className="mb-7 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <Home className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                    Imóveis
                  </p>

                  <h3 className="text-2xl font-black">
                    Crédito para imóveis
                  </h3>
                </div>
              </div>

              <p className="mb-7 leading-relaxed text-black/60">
                Use sua carta de crédito para construir, reformar ou
                adquirir diferentes tipos de imóveis de acordo com o seu
                planejamento.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {possibilidadesImoveis.map(({ label, Icone }) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-white p-4"
                  >
                    <Icone className="mb-3 h-5 w-5" />

                    <p className="text-sm font-semibold">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] bg-black p-6 text-white md:p-8">
              <div className="mb-7 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                  <Car className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                    Veículos
                  </p>

                  <h3 className="text-2xl font-black">
                    Crédito para veículos
                  </h3>
                </div>
              </div>

              <p className="mb-7 leading-relaxed text-white/60">
                Escolha o crédito ideal para comprar veículos de uso
                pessoal, profissional, agrícola ou náutico.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {possibilidadesVeiculos.map(({ label, Icone }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <Icone className="mb-3 h-5 w-5" />

                    <p className="text-sm font-semibold">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="simulacoes"
        className="bg-[#f3f3f3] px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
              Simulações de crédito
            </p>

            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Encontre o crédito ideal para o seu próximo objetivo.
            </h2>

            <p className="mt-4 max-w-2xl text-black/55">
              Compare valores de crédito, meia parcela e prazo em algumas
              das nossas possibilidades.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
            <TabelaCredito
              titulo="Crédito de veículos"
              dados={creditosVeiculos}
              Icone={Car}
            />

            <TabelaCredito
              titulo="Crédito de imóveis"
              dados={creditosImoveis}
              Icone={Home}
            />
          </div>

          <div className="mt-8 flex flex-col gap-5 rounded-[24px] border border-black/10 bg-white p-5 md:flex-row md:items-center md:justify-between md:p-7">
            <p className="max-w-3xl text-sm leading-relaxed text-black/50">
              Valores, condições e disponibilidade podem sofrer alterações.
              Consulte um especialista da R3 Estratégia Patrimonial para
              confirmar as condições vigentes.
            </p>

            <a
              href="/#formulario"
              className="shrink-0 rounded-full bg-black px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-black/80"
            >
              Quero fazer uma simulação
            </a>
          </div>
        </div>
      </section>

      <Carrossel
        titulo="Escolha o seu próximo veículo."
        subtitulo="Planeje a aquisição do seu próximo bem com uma estratégia que cabe nos seus objetivos."
        itens={veiculos}
      />

      <div className="h-px bg-black/10" />

      <Carrossel
        titulo="Encontre o imóvel para o seu próximo passo."
        subtitulo="Do primeiro terreno ao imóvel dos seus planos, transforme seus objetivos em uma estratégia de aquisição."
        itens={imoveis}
      />

      <section className="bg-black px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[30px] border border-white/10 bg-white/5 p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-white/45">
              <Check className="h-4 w-4" />

              <span className="text-xs font-bold uppercase tracking-[0.18em]">
                Planejamento personalizado
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Encontre uma estratégia de aquisição feita para o seu objetivo.
            </h2>
          </div>

          <a
            href="/#formulario"
            className="shrink-0 rounded-full bg-white px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/85"
          >
            Falar com a R3
          </a>
        </div>
      </section>
    </main>
  );
}