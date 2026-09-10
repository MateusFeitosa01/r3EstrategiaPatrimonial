"use client"

import { useEffect, useMemo, useState } from "react"
import Navbar from "@/components/extras/navbar/page";
import Footer from "@/components/extras/footer/page";

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
      const categoriaCorrigida = corrigirTexto(carta.categoria).toLowerCase()
      const statusCorrigido = corrigirTexto(carta.status).toLowerCase()

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

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar/>
      {/* HERO */}
      <section className="bg-black text-white px-6 py-20 md:px-10">
        <div className="max-w-7xl mx-auto">

          <p className="text-sm uppercase tracking-[0.25em] text-white/60 mb-4">
            R3 Estratégia Patrimonial
          </p>

          <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
            Cartas Contempladas
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl">
            Encontre oportunidades de crédito já contempladas para aquisição
            de veículos, imóveis e outros objetivos.
          </p>

        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="px-4 md:px-8 py-12">

        <div className="max-w-7xl mx-auto">

          {/* FILTROS */}
          <div className="bg-white rounded-3xl p-5 md:p-7 shadow-sm mb-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>

                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Código ou administradora"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-black text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>

                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-black text-gray-900 bg-white"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-black text-gray-900 bg-white"
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
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5">
              {erro}
            </div>
          )}

          {/* CARTAS */}
          {!carregando && !erro && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {cartasFiltradas.map((carta) => {
                const statusCorrigido = corrigirTexto(carta.status)

                const disponivel = statusCorrigido
                  .toLowerCase()
                  .includes("disponível")

                return (
                  <article
                    key={carta.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition"
                  >

                    {/* TOPO DO CARD */}
                    <div className="bg-[#111111] text-white px-6 py-5">

                      <div className="flex items-center justify-between gap-4">

                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/50">
                            Carta #{carta.id}
                          </p>

                          <h2 className="text-xl font-semibold mt-1">
                            {corrigirTexto(carta.categoria)}
                          </h2>
                        </div>

                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
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

                        <p className="text-3xl font-bold text-gray-950 mt-1">
                          R$ {carta.valorCredito}
                        </p>

                      </div>

                      <div className="grid grid-cols-2 gap-5">

                        <div>
                          <p className="text-sm text-gray-500">
                            Entrada
                          </p>

                          <p className="font-semibold text-gray-900 mt-1">
                            R$ {carta.entrada}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Parcela
                          </p>

                          <p className="font-semibold text-gray-900 mt-1">
                            R$ {carta.valorParcela}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Prazo
                          </p>

                          <p className="font-semibold text-gray-900 mt-1">
                            {carta.parcelas} parcelas
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Administradora
                          </p>

                          <p className="font-semibold text-gray-900 mt-1">
                            {corrigirTexto(carta.administradora)}
                          </p>
                        </div>

                      </div>

                      <div className="border-t border-gray-100 mt-6 pt-5">

                        <button
                          type="button"
                          className="w-full h-12 rounded-xl bg-black text-white font-medium hover:bg-neutral-800 transition"
                        >
                          Tenho interesse
                        </button>

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
            <Footer/>
    </main>
  )
}