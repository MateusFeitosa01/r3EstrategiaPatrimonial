"use client"

import { useEffect, useMemo, useState } from "react"
import Navbar from "@/components/extras/navbar/page"
import Footer from "@/components/extras/footer/page"
import LiquidGlassButton from "@/components/originkit/ui/light-glass-button"

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
          HERO
      ========================================================== */}
      <section className="relative h-[80vh] min-h-[650px] overflow-hidden bg-black text-white">

        {/* IMAGEM */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
            md:bg-[position:center_right]
          "
          style={{
            backgroundImage: "url('/img/logo/contemplacao.png')",
          }}
        />

        {/* DEGRADÊ */}
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

        {/* SOMBRA */}
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
            max-w-7xl
            items-center
            px-6
            md:px-10
          "
        >
          <div className="max-w-4xl">

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/60">
              R3 ESTRATÉGIA PATRIMONIAL
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Encontre a carta contemplada ideal para o seu próximo objetivo.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
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
          bg-[#f5f5f5]
          py-20
          px-4
          md:px-8
          overflow-hidden
        "
      >

        {/* LUZES */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className="
              absolute
              -top-40
              left-[3%]
              w-[500px]
              h-[500px]
              rounded-full
              bg-white
              blur-[100px]
              opacity-90
            "
          />

          <div
            className="
              absolute
              top-[20%]
              right-[-12%]
              w-[550px]
              h-[550px]
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
              w-[550px]
              h-[550px]
              rounded-full
              bg-white
              blur-[110px]
              opacity-90
            "
          />

          <div
            className="
              absolute
              top-[45%]
              left-[40%]
              w-[300px]
              h-[300px]
              rounded-full
              bg-white/[0.55]
              blur-[100px]
            "
          />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* =====================================================
              FILTROS
          ====================================================== */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/70
              bg-white/[0.42]
              backdrop-blur-[30px]
              backdrop-saturate-150
              shadow-[0_20px_60px_rgba(0,0,0,0.07)]
              p-5
              md:p-7
              mb-10
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
                -top-40
                -right-20
                w-[420px]
                h-[280px]
                rounded-full
                bg-white/80
                blur-[70px]
                opacity-80
              "
            />

            {/* BRILHO */}
            <div
              className="
                pointer-events-none
                absolute
                top-0
                left-10
                right-10
                h-px
                bg-gradient-to-r
                from-transparent
                via-white
                to-transparent
                opacity-90
              "
            />

            <div className="relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* BUSCA */}
                <div>
                  <label className="block text-sm font-semibold text-black/60 tracking-wide uppercase mb-2">
                    Buscar
                  </label>

                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Código ou administradora"
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-white/70
                      bg-white/[0.45]
                      backdrop-blur-xl
                      text-black
                      placeholder:text-black/40
                      outline-none
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                      focus:border-black/40
                      focus:bg-white/[0.6]
                      transition-all
                      duration-300
                    "
                  />
                </div>

                {/* CATEGORIA */}
                <div>
                  <label className="block text-sm font-semibold text-black/60 tracking-wide uppercase mb-2">
                    Categoria
                  </label>

                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-white/70
                      bg-white/[0.45]
                      backdrop-blur-xl
                      text-black
                      outline-none
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                      focus:border-black/40
                      focus:bg-white/[0.6]
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    <option value="todos">Todas</option>
                    <option value="veículo">Veículo</option>
                    <option value="imóvel">Imóvel</option>
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-sm font-semibold text-black/60 tracking-wide uppercase mb-2">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      border
                      border-white/70
                      bg-white/[0.45]
                      backdrop-blur-xl
                      text-black
                      outline-none
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                      focus:border-black/40
                      focus:bg-white/[0.6]
                      transition-all
                      duration-300
                      cursor-pointer
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
            <div className="py-20 text-center text-black/50">
              Carregando cartas contempladas...
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
                backdrop-blur-[25px]
                shadow-[0_15px_45px_rgba(0,0,0,0.06)]
                p-5
                text-black/70
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  -top-20
                  -right-20
                  w-48
                  h-48
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

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
                      backdrop-blur-[30px]
                      backdrop-saturate-150
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
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
                        -top-32
                        -right-24
                        w-[320px]
                        h-[260px]
                        rounded-full
                        bg-white/80
                        blur-[70px]
                        opacity-70
                        transition-all
                        duration-700
                        group-hover:opacity-100
                        group-hover:scale-110
                      "
                    />

                    {/* REFLEXO INFERIOR */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-[-100px]
                        left-[-100px]
                        w-[250px]
                        h-[250px]
                        rounded-full
                        bg-white/[0.35]
                        blur-[80px]
                        opacity-60
                      "
                    />

                    {/* LINHA SUPERIOR */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        top-0
                        left-8
                        right-8
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
                        px-6
                        py-5
                        bg-black/[0.88]
                        text-white
                        border-b
                        border-white/10
                      "
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                            Carta #{carta.id}
                          </p>

                          <h2 className="text-xl font-bold tracking-tight mt-1">
                            {corrigirTexto(carta.categoria)}
                          </h2>

                        </div>

                        <span
                          className={`
                            shrink-0
                            text-xs
                            font-semibold
                            px-3
                            py-1.5
                            rounded-full
                            border

                            ${
                              disponivel
                                ? `
                                    bg-white
                                    text-black
                                    border-white
                                  `
                                : `
                                    bg-white/10
                                    text-white/70
                                    border-white/10
                                  `
                            }
                          `}
                        >
                          {statusCorrigido}
                        </span>

                      </div>
                    </div>

                    {/* =================================================
                        CORPO
                    ================================================== */}
                    <div
                      className="
                        relative
                        z-10
                        p-6
                        bg-white/[0.08]
                      "
                    >

                      {/* CRÉDITO */}
                      <div className="mb-7">

                        <p className="text-sm font-semibold text-black/50 uppercase tracking-wide">
                          Crédito
                        </p>

                        <p className="text-3xl font-black text-black tracking-tight mt-1">
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

                          <p className="font-bold text-black mt-1 tracking-tight">
                            R$ {carta.entrada}
                          </p>

                        </div>

                        {/* PARCELA */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Parcela
                          </p>

                          <p className="font-bold text-black mt-1 tracking-tight">
                            R$ {carta.valorParcela}
                          </p>

                        </div>

                        {/* PRAZO */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Prazo
                          </p>

                          <p className="font-bold text-black mt-1 tracking-tight">
                            {carta.parcelas} parcelas
                          </p>

                        </div>

                        {/* ADMINISTRADORA */}
                        <div>

                          <p className="text-sm font-medium text-black/50">
                            Administradora
                          </p>

                          <p className="font-bold text-black mt-1 tracking-tight">
                            {corrigirTexto(carta.administradora)}
                          </p>

                        </div>

                      </div>

                      {/* =================================================
                          BOTÃO WHATSAPP
                      ================================================== */}
                      <div
                        className="
                          border-t
                          border-black/[0.07]
                          mt-7
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

                <p className="text-sm font-semibold text-black/50 tracking-widest uppercase">
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