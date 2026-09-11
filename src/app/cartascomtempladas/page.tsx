"use client"

import { useEffect, useMemo, useState } from "react"
import Navbar from "@/components/extras/navbar/page"
import Footer from "@/components/extras/footer/page"

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
      const categoriaCorrigida = corrigirTexto(
        carta.categoria
      ).toLowerCase()

      const statusCorrigido = corrigirTexto(
        carta.status
      ).toLowerCase()

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
    const categoriaCarta = corrigirTexto(carta.categoria)

    const mensagem = `Olá! Tenho interesse em uma carta contemplada de ${categoriaCarta}.

Carta: #${carta.id}
Crédito: R$ ${carta.valorCredito}
Entrada: R$ ${carta.entrada}
Parcela: R$ ${carta.valorParcela}
Prazo: ${carta.parcelas} parcelas
Administradora: ${corrigirTexto(carta.administradora)}

Gostaria de receber mais informações sobre essa carta.`

    return `https://wa.me/5583987355437?text=${encodeURIComponent(
      mensagem
    )}`
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      {/* HERO */}
      <section className="bg-black px-6 py-20 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/60">
            R3 Estratégia Patrimonial
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Cartas Contempladas
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-white/70 md:text-xl">
            Encontre oportunidades de crédito já contempladas para aquisição
            de veículos, imóveis e outros objetivos.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* FILTROS */}
          <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm md:p-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* BUSCAR */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Buscar
                </label>

                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Código ou administradora"
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 text-gray-900 outline-none focus:border-black"
                />
              </div>

              {/* CATEGORIA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Categoria
                </label>

                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-900 outline-none focus:border-black"
                >
                  <option value="todos">
                    Todas
                  </option>

                  <option value="veículo">
                    Veículo
                  </option>

                  <option value="imóvel">
                    Imóvel
                  </option>
                </select>
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-900 outline-none focus:border-black"
                >
                  <option value="todos">
                    Todos
                  </option>

                  <option value="disponível">
                    Disponível
                  </option>

                  <option value="reservada">
                    Reservada
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-5 text-sm text-gray-500">
              {cartasFiltradas.length} cartas encontradas
            </div>
          </div>

          {/* CARREGANDO */}
          {carregando && (
            <div className="py-20 text-center text-gray-500">
              Carregando cartas contempladas...
            </div>
          )}

          {/* ERRO */}
          {!carregando && erro && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              {erro}
            </div>
          )}

          {/* CARTAS */}
          {!carregando && !erro && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cartasFiltradas.map((carta) => {
                const statusCorrigido = corrigirTexto(carta.status)

                const disponivel = statusCorrigido
                  .toLowerCase()
                  .includes("disponível")

                return (
                  <article
                    key={carta.id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
                  >
                    {/* TOPO DO CARD */}
                    <div className="bg-[#111111] px-6 py-5 text-white">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/50">
                            Carta #{carta.id}
                          </p>

                          <h2 className="mt-1 text-xl font-semibold">
                            {corrigirTexto(carta.categoria)}
                          </h2>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            disponivel
                              ? "bg-white text-black"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {statusCorrigido}
                        </span>
                      </div>
                    </div>

                    {/* CORPO */}
                    <div className="p-6">
                      <div className="mb-6">
                        <p className="text-sm text-gray-500">
                          Crédito
                        </p>

                        <p className="mt-1 text-3xl font-bold text-gray-950">
                          R$ {carta.valorCredito}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <p className="text-sm text-gray-500">
                            Entrada
                          </p>

                          <p className="mt-1 font-semibold text-gray-900">
                            R$ {carta.entrada}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Parcela
                          </p>

                          <p className="mt-1 font-semibold text-gray-900">
                            R$ {carta.valorParcela}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Prazo
                          </p>

                          <p className="mt-1 font-semibold text-gray-900">
                            {carta.parcelas} parcelas
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Administradora
                          </p>

                          <p className="mt-1 font-semibold text-gray-900">
                            {corrigirTexto(carta.administradora)}
                          </p>
                        </div>
                      </div>

                      {/* WHATSAPP */}
                      <div className="mt-6 border-t border-gray-100 pt-5">
                        <a
                          href={gerarLinkWhatsApp(carta)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-12 w-full items-center justify-center rounded-xl bg-black font-medium text-white transition hover:bg-neutral-800"
                        >
                          Tenho interesse
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {!carregando &&
            !erro &&
            cartasFiltradas.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                Nenhuma carta encontrada com esses filtros.
              </div>
            )}
        </div>
      </section>

      <Footer />
    </main>
  )
}