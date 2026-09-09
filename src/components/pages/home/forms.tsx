"use client"

import React, { useState } from "react"
import Image from "next/image"

export default function Forms() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    tipoConsorcio: "imovel",
    valorCredito: "",
    termosAceitos: false,
  })

  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState("")

  // =========================
  // CAMPOS NORMAIS
  // =========================

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // =========================
  // TELEFONE
  // =========================

  const formatarTelefone = (valor: string) => {
    let numeros = valor.replace(/\D/g, "")

    numeros = numeros.slice(0, 13)

    // Com DDI +55
    if (numeros.startsWith("55") && numeros.length > 11) {
      const ddi = numeros.slice(0, 2)
      const ddd = numeros.slice(2, 4)
      const numero = numeros.slice(4)

      if (numero.length <= 4) {
        return `+${ddi} (${ddd}) ${numero}`
      }

      if (numero.length <= 8) {
        return `+${ddi} (${ddd}) ${numero.slice(0, 4)}-${numero.slice(4)}`
      }

      return `+${ddi} (${ddd}) ${numero.slice(0, 5)}-${numero.slice(5, 9)}`
    }

    // Sem DDI
    numeros = numeros.slice(0, 11)

    if (numeros.length <= 2) {
      return numeros
    }

    if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    }

    if (numeros.length <= 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(
        2,
        6
      )}-${numeros.slice(6)}`
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7, 11)}`
  }

  // =========================
  // VALOR DO CRÉDITO
  // =========================

  // O estado guarda apenas números.
  // Exemplo:
  // "300000" -> R$ 300.000,00

  const formatarCredito = (valor: string) => {
    if (!valor) return ""

    const numero = Number(valor)

    if (Number.isNaN(numero)) return ""

    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleCreditoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valorExibido = e.target.value

    // Remove tudo que não é número
    let numeros = valorExibido.replace(/\D/g, "")

    /*
      Como o campo exibido possui ",00",
      removemos os dois últimos zeros da máscara.

      Exemplo:
      R$ 300.000,00
      vira:
      30000000

      removendo os últimos 2:
      300000
    */
    if (formData.valorCredito && numeros.length >= 2) {
      numeros = numeros.slice(0, -2)
    }

    setFormData((prev) => ({
      ...prev,
      valorCredito: numeros,
    }))
  }

  // Digitação do crédito usando teclado
  const handleCreditoKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Permitir navegação
    if (
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      return
    }

    // Apagar último número
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault()

      setFormData((prev) => ({
        ...prev,
        valorCredito: prev.valorCredito.slice(0, -1),
      }))

      return
    }

    // Permitir somente números
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault()

      setFormData((prev) => ({
        ...prev,
        valorCredito: prev.valorCredito + e.key,
      }))
    }
  }

  // =========================
  // ENVIO
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (enviando) return

    setEnviando(true)
    setMensagem("")

    try {
      // Formata o crédito antes de enviar para o e-mail
      const dadosParaEnvio = {
        ...formData,
        valorCredito: formatarCredito(formData.valorCredito),
      }

      const response = await fetch("/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnvio),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || "Não foi possível enviar sua solicitação."
        )
      }

      setMensagem(
        "Solicitação enviada com sucesso! Em breve entraremos em contato."
      )

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        cidade: "",
        tipoConsorcio: "imovel",
        valorCredito: "",
        termosAceitos: false,
      })
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)

      setMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação. Tente novamente."
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[28px] overflow-hidden shadow-2xl">

          {/* ========================= */}
          {/* IMAGEM */}
          {/* ========================= */}

          <div className="relative min-h-[600px] lg:min-h-[760px]">

            <Image
              src="/img/R3_-35.jpg.jpeg"
              alt="R3 Estratégia Patrimonial"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Escurecimento somente na parte inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 via-30% to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">

              <p className="text-white/80 text-sm md:text-base uppercase tracking-[0.25em] mb-3">
                R3 Estratégia Patrimonial
              </p>

              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] max-w-xl">
                QUAL SEU PRÓXIMO PASSO?
              </h2>

              <p className="text-white/80 text-base md:text-lg mt-5 max-w-lg">
                Fale com nossa equipe e descubra a estratégia mais adequada
                para os seus objetivos.
              </p>

            </div>
          </div>

          {/* ========================= */}
          {/* FORMULÁRIO */}
          {/* ========================= */}

          <div className="bg-[rgb(157,159,162)] px-6 py-10 md:px-12 md:py-14 lg:px-16">

            <div className="max-w-xl mx-auto">

              <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
                Solicite uma simulação
              </h2>

              <p className="text-white/90 text-lg md:text-xl mb-8">
                Preencha os campos abaixo para receber nosso atendimento.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NOME */}

                <div className="flex flex-col">

                  <label
                    htmlFor="nome"
                    className="text-white text-lg mb-2"
                  >
                    Nome completo
                  </label>

                  <input
                    id="nome"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                    className="w-full h-[48px] px-4 rounded-2xl border border-white/70 bg-transparent text-gray-900 placeholder:text-gray-600 outline-none transition focus:border-white focus:ring-2 focus:ring-white/20"
                  />

                </div>

                {/* EMAIL */}

                <div className="flex flex-col">

                  <label
                    htmlFor="email"
                    className="text-white text-lg mb-2"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seuemail@email.com"
                    required
                    className="w-full h-[48px] px-4 rounded-2xl border border-white/70 bg-transparent text-gray-900 placeholder:text-gray-600 outline-none transition focus:border-white focus:ring-2 focus:ring-white/20"
                  />

                </div>

                {/* TELEFONE + CIDADE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

                  <div className="flex flex-col">

                    <label
                      htmlFor="telefone"
                      className="text-white text-lg mb-2"
                    >
                      Telefone / WhatsApp
                    </label>

                    <input
                      id="telefone"
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          telefone: formatarTelefone(e.target.value),
                        }))
                      }
                      placeholder="(83) 99999-9999"
                      required
                      className="w-full h-[48px] px-4 rounded-2xl border border-white/70 bg-transparent text-gray-900 placeholder:text-gray-600 outline-none transition focus:border-white focus:ring-2 focus:ring-white/20"
                    />

                  </div>

                  <div className="flex flex-col">

                    <label
                      htmlFor="cidade"
                      className="text-white text-lg mb-2"
                    >
                      Cidade
                    </label>

                    <input
                      id="cidade"
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      placeholder="João Pessoa"
                      required
                      className="w-full h-[48px] px-4 rounded-2xl border border-white/70 bg-transparent text-gray-900 placeholder:text-gray-600 outline-none transition focus:border-white focus:ring-2 focus:ring-white/20"
                    />

                  </div>
                </div>

                {/* TIPO */}

                <div className="flex flex-col">

                  <label
                    htmlFor="tipoConsorcio"
                    className="text-white text-lg mb-2"
                  >
                    Tipo de Consórcio
                  </label>

                  <select
                    id="tipoConsorcio"
                    name="tipoConsorcio"
                    value={formData.tipoConsorcio}
                    onChange={handleInputChange}
                    className="w-full h-[48px] px-4 rounded-2xl border border-white/70 bg-white text-gray-900 outline-none transition focus:border-white focus:ring-2 focus:ring-white/20"
                  >
                    <option value="imovel">
                      Imóvel
                    </option>

                    <option value="veiculo">
                      Veículo
                    </option>

                    <option value="investimentos">
                      Investimentos
                    </option>
                  </select>

                </div>

                {/* VALOR DO CRÉDITO */}

                <div className="flex flex-col">

                  <label
                    htmlFor="valorCredito"
                    className="text-white text-lg mb-2"
                  >
                    Valor do Crédito
                  </label>

                  <input
                    id="valorCredito"
                    type="text"
                    inputMode="numeric"
                    name="valorCredito"
                    value={formatarCredito(formData.valorCredito)}
                    onChange={handleCreditoChange}
                    onKeyDown={handleCreditoKeyDown}
                    placeholder="R$ 300.000,00"
                    required
                    className="w-full h-[48px] px-4 rounded-2xl border border-white/70 bg-transparent text-gray-900 placeholder:text-gray-600 outline-none transition focus:border-white focus:ring-2 focus:ring-white/20"
                  />

                </div>

                {/* FAIXAS */}

                <div className="bg-white/95 rounded-2xl px-4 py-3 text-sm text-gray-600">

                  <p>
                    <strong className="text-gray-800">
                      Veículos:
                    </strong>{" "}
                    de R$ 34.000,00 a R$ 800.000,00
                  </p>

                  <p className="mt-1">
                    <strong className="text-gray-800">
                      Imóveis:
                    </strong>{" "}
                    de R$ 100.000,00 a R$ 2.000.000,00
                  </p>

                </div>

                {/* CONFORMIDADE */}

                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={formData.termosAceitos}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        termosAceitos: e.target.checked,
                      }))
                    }
                    className="mt-1 w-5 h-5 accent-black"
                  />

                  <span className="text-white/90 text-sm leading-relaxed">

                    <strong className="text-white">
                      Conformidade *
                    </strong>

                    <br />

                    Declaro estar de acordo em compartilhar minhas informações
                    para receber um atendimento especializado.

                  </span>

                </label>

                {/* MENSAGEM */}

                {mensagem && (
                  <div
                    className={`rounded-xl px-4 py-3 text-sm ${
                      mensagem.includes("sucesso")
                        ? "bg-white text-gray-900"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {mensagem}
                  </div>
                )}

                {/* BOTÃO */}

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full h-[52px] rounded-2xl bg-black text-white font-semibold text-base transition hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {enviando
                    ? "Enviando..."
                    : "Enviar Solicitação"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}