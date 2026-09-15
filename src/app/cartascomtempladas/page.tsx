"use client"

import { useEffect, useMemo, useState } from "react"
import Navbar from "@/components/extras/navbar/page"
import Footer from "@/components/extras/footer/page"
import LiquidGlassButton from "@/components/originkit/ui/light-glass-button"
import { MorphingSquare } from "@/components/originkit/ui/loading" // Ajuste o caminho se necessário

type Carta = {
  id: string
  categoria: string
  administradora: string
  valorCredito: string
  entrada: string
  parcelas: number
  valorParcela: string
  status: string
  taxa: string
  fundo: string
}

export default function Page() {
  const [cartas, setCartas] = useState<Carta[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  const [categoria, setCategoria] = useState("todos")
  const [status, setStatus] = useState("todos")
  const [busca, setBusca] = useState("")

  useEffect(() => {
    async function carregarCartas() {
      try {
        setCarregando(true)
        setErro("")

        const response = await fetch("/api/cartas-contempladas")
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Não foi possível carregar as cartas."
          )
        }

        setCartas(data.cartas)
      } catch (error) {
        console.error("Erro ao carregar cartas:", error)

        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar as cartas."
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarCartas()
  }, [])

  const corrigirTexto = (texto: string) => {
    if (!texto) return ""

    try {
      return decodeURIComponent(escape(texto))
    } catch {
      return texto
    }
  }

  const cartasFiltradas = useMemo(() => {
    return cartas.filter((carta) => {
      const categoriaCorrigida =
        corrigirTexto(carta.categoria).toLowerCase()

      const statusCorrigido =
        corrigirTexto(carta.status).toLowerCase()

      const correspondeCategoria =
        categoria === "todos" ||
        categoriaCorrigida.includes(categoria.toLowerCase())

      const correspondeStatus =
        status === "todos" ||
        statusCorrigido.includes(status.toLowerCase())

      const correspondeBusca =
        !busca ||
        carta.id.toLowerCase().includes(busca.toLowerCase()) ||
        corrigirTexto(carta.administradora)
          .toLowerCase()
          .includes(busca.toLowerCase()) ||
        corrigirTexto(carta.categoria)
          .toLowerCase()
          .includes(busca.toLowerCase())

      return (
        correspondeCategoria &&
        correspondeStatus &&
        correspondeBusca
      )
    })
  }, [cartas, categoria, status, busca])

  const gerarLinkWhatsApp = (carta: Carta) => {
    const telefone = "5583987355437"

    const mensagem = `Olá! Tenho interesse na carta contemplada #${carta.id}.

Categoria: ${corrigirTexto(carta.categoria)}
Crédito: R$ ${carta.valorCredito}
Entrada: R$ ${carta.entrada}
Parcela: R$ ${carta.valorParcela}
Prazo: ${carta.parcelas} parcelas
Administradora: ${corrigirTexto(carta.administradora)}

Gostaria de receber mais informações.`

    return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* =========================================================
          HERO (Ajustado com padrões responsivos do componente Hero)
      ========================================================== */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-black text-white sm:min-h-[600px] md:min-h-[650px]">

        {/* IMAGEM DE FUNDO */}
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
            backgroundImage: "url('/img/logo/contemplacao.png')",
          }}
        />

        {/* DEGRADÊ PARA LEITURA DO TEXTO */}
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

        {/* SOMBRA INFERIOR */}
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

        {/* CONTEÚDO HERO */}
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
              R3 ESTRATÉGIA PATRIMONIAL
            </p>

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
              Encontre a carta contemplada ideal para o seu próximo objetivo.
            </h1>

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
              Tenha acesso a oportunidades de crédito já contempladas para
              aquisição de imóveis, veículos e outros bens, com segurança,
              estratégia e acompanhamento especializado.
            </p>

          </div>
        </div>
      </section>

      {/* =========================================================
          CONTEÚDO
      ========================================================== */}
      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-[#f5f5f5]
          px-4
          py-20
          md:px-8
        "
      >

        {/* LUZES */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className="
              absolute
              -top-40
              left-[3%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-white
              opacity-90
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              right-[-12%]
              top-[20%]
              h-[550px]
              w-[550px]
              rounded-full
              bg-black/[0.035]
              blur-[110px]
            "
          />

          <div
            className="
              absolute
              bottom-[-200px]
              left-[20%]
              h-[550px]
              w-[550px]
              rounded-full
              bg-white
              opacity-90
              blur-[110px]
            "
          />

          <div
            className="
              absolute
              left-[40%]
              top-[45%]
              h-[300px]
              w-[300px]
              rounded-full
              bg-white/[0.55]
              blur-[100px]
            "
          />

        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* =====================================================
              FILTROS
          ====================================================== */}
          <div
            className="
              relative
              mb-10
              overflow-hidden
              rounded-[30px]
              border
              border-white/70
              bg-white/[0.42]
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.07)]
              backdrop-blur-[30px]
              backdrop-saturate-150
              md:p-7
            "
          >

            {/* VIDRO */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[30px]
                bg-gradient-to-br
                from-white/55
                via-white/10
                to-white/[0.02]
              "
            />

            {/* REFLEXO */}
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-40
                h-[280px]
                w-[420px]
                rounded-full
                bg-white/80
                opacity-80
                blur-[70px]
              "
            />

            {/* BRILHO */}
            <div
              className="
                pointer-events-none
                absolute
                left-10
                right-10
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-white
                to-transparent
                opacity-90
              "
            />

            <div className="relative z-10">

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* BUSCA */}
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-black/60">
                    Buscar
                  </label>

                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Código ou administradora"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/70
                      bg-white/[0.45]
                      px-4
                      text-black
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                      outline-none
                      backdrop-blur-xl
                      placeholder:text-black/40
                      transition-all
                      duration-300
                      focus:border-black/40
                      focus:bg-white/[0.6]
                    "
                  />
                </div>

                {/* CATEGORIA */}
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-black/60">
                    Categoria
                  </label>

                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="
                      h-12
                      w-full
                      cursor-pointer
                      rounded-xl
                      border
                      border-white/70
                      bg-white/[0.45]
                      px-4
                      text-black
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:border-black/40
                      focus:bg-white/[0.6]
                    "
                  >
                    <option value="todos">Todas</option>
                    <option value="veículo">Veículo</option>
                    <option value="imóvel">Imóvel</option>
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-black/60">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
                      h-12
                      w-full
                      cursor-pointer
                      rounded-xl
                      border
                      border-white/70
                      bg-white/[0.45]
                      px-4
                      text-black
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:border-black/40
                      focus:bg-white/[0.6]
                    "
                  >
                    <option value="todos">Todos</option>
                    <option value="disponível">Disponível</option>
                    <option value="reservada">Reservada</option>
                  </select>
                </div>

              </div>

              <div className="mt-5 text-sm font-medium text-black/50">
                {cartasFiltradas.length} cartas encontradas
              </div>

            </div>
          </div>

          {/* =====================================================
              CARREGANDO
          ====================================================== */}
          {carregando && (
            <div className="flex flex-col items-center justify-center py-24">
              <MorphingSquare
                className="bg-black"
                message="Carregando cartas contempladas..."
                messagePlacement="bottom"
              />
            </div>
          )}

          {/* =====================================================
              ERRO
          ====================================================== */}
          {!carregando && erro && (
            <div
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/70
                bg-white/[0.45]
                p-5
                text-black/70
                shadow-[0_15px_45px_rgba(0,0,0,0.06)]
                backdrop-blur-[25px]
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  bg-white/70
                  blur-[60px]
                "
              />

              <span className="relative z-10">
                {erro}
              </span>

            </div>
          )}

          {/* =====================================================
              CARTAS
          ====================================================== */}
          {!carregando && !erro && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {cartasFiltradas.map((carta) => {

                const statusCorrigido =
                  corrigirTexto(carta.status)

                const disponivel =
                  statusCorrigido
                    .toLowerCase()
                    .includes("disponível")

                return (
                  <article
                    key={carta.id}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-white/70
                      bg-white/[0.38]
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                      backdrop-blur-[30px]
                      backdrop-saturate-150
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:bg-white/[0.48]
                      hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                    "
                  >

                    {/* VIDRO */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[30px]
                        bg-gradient-to-br
                        from-white/55
                        via-white/10
                        to-white/[0.02]
                      "
                    />

                    {/* REFLEXO SUPERIOR */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-32
                        h-[260px]
                        w-[320px]
                        rounded-full
                        bg-white/80
                        opacity-70
                        blur-[70px]
                        transition-all
                        duration-700
                        group-hover:scale-110
                        group-hover:opacity-100
                      "
                    />

                    {/* REFLEXO INFERIOR */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-[-100px]
                        left-[-100px]
                        h-[250px]
                        w-[250px]
                        rounded-full
                        bg-white/[0.35]
                        opacity-60
                        blur-[80px]
                      "
                    />

                    {/* LINHA SUPERIOR */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-8
                        right-8
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white
                        to-transparent
                        opacity-90
                      "
                    />

                    {/* CABEÇALHO */}
                    <div
                      className="
                        relative
                        z-10
                        border-b
                        border-white/10
                        bg-black/[0.88]
                        px-6
                        py-5
                        text-white
                      "
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                            Carta #{carta.id}
                          </p>

                          <h2 className="mt-1 text-xl font-bold tracking-tight">
                            {corrigirTexto(carta.categoria)}
                          </h2>

                        </div>

                        <span
                          className={`
                            shrink-0
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-semibold

                            ${
                              disponivel
                                ? `
                                    border-white
                                    bg-white
                                    text-black
                                  `
                                : `
                                    border-white/10
                                    bg-white/10
                                    text-white/70
                                  `
                            }
                          `}
                        >
                          {statusCorrigido}
                        </span>

                      </div>
                    </div>

                    {/* CORPO */}
                    <div
                      className="
                        relative
                        z-10
                        bg-white/[0.08]
                        p-6
                      "
                    >

                      {/* CRÉDITO */}
                      <div className="mb-7">

                        <p className="text-sm font-semibold uppercase tracking-wide text-black/50">
                          Crédito
                        </p>

                        <p className="mt-1 text-3xl font-black tracking-tight text-black">
                          R$ {carta.valorCredito}
                        </p>

                      </div>

                      {/* INFORMAÇÕES */}
                      <div className="grid grid-cols-2 gap-x-5 gap-y-6">

                        {/* ENTRADA */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Entrada
                          </p>

                          <p className="mt-1 font-bold tracking-tight text-black">
                            R$ {carta.entrada}
                          </p>

                        </div>

                        {/* PARCELA */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Parcela
                          </p>

                          <p className="mt-1 font-bold tracking-tight text-black">
                            R$ {carta.valorParcela}
                          </p>

                        </div>

                        {/* PRAZO */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Prazo
                          </p>

                          <p className="mt-1 font-bold tracking-tight text-black">
                            {carta.parcelas} parcelas
                          </p>

                        </div>

                        {/* ADMINISTRADORA */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Administradora
                          </p>

                          <p className="mt-1 font-bold tracking-tight text-black">
                            {corrigirTexto(carta.administradora)}
                          </p>

                        </div>

                      </div>

                      {/* BOTÃO WHATSAPP */}
                      <div
                        className="
                          mt-7
                          border-t
                          border-black/[0.07]
                          pt-5
                        "
                      >

                        <LiquidGlassButton
                          label="TENHO INTERESSE"
                          link={gerarLinkWhatsApp(carta)}
                          newTab={true}
                          colors={{
                            fill: "#000000",
                            textColor: "#ffffff",
                          }}
                          font={{
                            fontFamily: "Montserrat",
                            fontWeight: 600,
                            fontSize: 15,
                          }}
                          padding="10px 20px"
                          rounded={50}
                          width="100%"
                        />

                      </div>

                    </div>

                  </article>
                )
              })}

            </div>
          )}

          {/* =====================================================
              NENHUM RESULTADO
          ====================================================== */}
          {!carregando &&
            !erro &&
            cartasFiltradas.length === 0 && (
              <div className="py-20 text-center">

                <p className="text-sm font-semibold uppercase tracking-widest text-black/50">
                  Nenhum resultado
                </p>

                <p className="mt-2 text-black/40">
                  Nenhuma carta encontrada com esses filtros.
                </p>

              </div>
            )}

        </div>
      </section>

      <Footer />
    </main>
  )
}