import { NextResponse } from "next/server"

const API_LANCE = "https://contempladas.lanceconsorcio.com.br/"

export async function GET() {
  try {
    const response = await fetch(API_LANCE, {
      next: {
        revalidate: 300,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Erro ao consultar a API da Lance: ${response.status}`
      )
    }

    const dados = await response.json()

    if (!Array.isArray(dados)) {
      throw new Error("Formato inesperado recebido da API da Lance.")
    }

    const cartas = dados.map((carta) => ({
      id: carta.id,
      categoria: carta.categoria,
      administradora: carta.administradora,

      valorCredito: carta.valor_credito,
      entrada: carta.entrada,

      parcelas: Number(carta.parcelas),
      valorParcela: carta.valor_parcela,

      status: carta.reserva,

      taxa: carta.taxa,
      fundo: carta.fundo,
    }))

    return NextResponse.json({
      success: true,
      total: cartas.length,
      cartas,
    })
  } catch (error) {
    console.error("Erro API Cartas Contempladas:", error)

    return NextResponse.json(
      {
        success: false,
        total: 0,
        cartas: [],
        message: "Não foi possível carregar as cartas contempladas.",
      },
      {
        status: 500,
      }
    )
  }
}