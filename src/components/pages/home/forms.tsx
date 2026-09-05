'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Formulario() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    tipoConsorcio: 'imovel',
    valorCredito: '',
    termosAceitos: false
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dados do formulário enviados:', formData)
  }

  return (
    <div className="py-20 min-h-screen w-full bg-white flex">

      {/* PAINEL ESQUERDO */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden flex-col justify-between p-12 min-h-screen">

        {/* Imagem */}
        <div className="absolute inset-0 z-0">
          <img
                src="/img/fundoPorquinho.jpg"
                alt="Fundo"
                className="w-full h-full object-cover opacity-40"
                />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Texto */}
        <div className="relative z-10 max-w-lg mt-auto">
          
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">
                 Qual seu próximo grande objetivo?
            </h1>
            <p className="text-sm md:text-base font-semibold text-white/60 tracking-widest  mb-3">
                Estamos prontos para te ajudar a planejar e conquistar suas metas
                com a melhor solução em consórcios.
            </p>
          
        </div>
      </div>

      {/* PAINEL DIREITO */}
      <div className="flex-1 bg-white min-h-screen overflow-y-auto">

        <div className="w-full max-w-md mx-auto px-8 py-10">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Solicite uma cotação
            </h2>

            <p className="text-sm text-gray-600">
              Preencha os campos abaixo para receber nosso atendimento.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>

              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Seu nome"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                required
              />
            </div>

            {/* Telefone / Cidade */}
            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone / WhatsApp
                </label>

                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>

                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Sua cidade"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  required
                />
              </div>

            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Consórcio
              </label>

              <select
                name="tipoConsorcio"
                value={formData.tipoConsorcio}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                required
              >
                <option value="imovel">Imóvel</option>
                <option value="veiculo">Veículo</option>
                <option value="investimentos">Investimentos</option>
              </select>
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor do Crédito
              </label>

              <input
                type="text"
                name="valorCredito"
                value={formData.valorCredito}
                onChange={handleInputChange}
                placeholder="Ex: R$ 150.000,00"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                required
              />
            </div>

            {/* Aviso */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
              <p>
                <strong className="text-gray-800">Veículos:</strong>{' '}
                de R$34.000,00 a R$800.000,00
              </p>

              <p>
                <strong className="text-gray-800">Imóveis:</strong>{' '}
                de R$100.000,00 a R$2.000.000,00
              </p>
            </div>

            {/* Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="termosAceitos"
                  checked={formData.termosAceitos}
                  onChange={handleInputChange}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />

                <span className="text-xs text-gray-600 leading-tight">
                  <strong className="text-gray-800">
                    Conformidade *
                  </strong>

                  <br />

                  Declaro estar de acordo em compartilhar minhas informações
                  para receber um atendimento especializado.
                </span>

              </label>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm mt-4"
            >
              Enviar Solicitação
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

