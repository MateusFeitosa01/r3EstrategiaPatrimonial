import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_PLACES_API_KEY não configurada." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress",
        },
        body: JSON.stringify({
          textQuery:
            "Hs Consórcios Rua Mar do Caribe 842 Sala 02 Portal do Poço Cabedelo PB",
          languageCode: "pt-BR",
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Google Places:", data);

      return NextResponse.json(
        {
          error: "Erro ao buscar empresa no Google Places.",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro Google Places:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar empresa." },
      { status: 500 }
    );
  }
}