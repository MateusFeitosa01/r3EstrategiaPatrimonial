import { NextResponse } from "next/server";

export async function GET() {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!PLACE_ID || !API_KEY) {
    return NextResponse.json(
      { error: "Credenciais do Google não configuradas." },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,user_ratings_total,rating&language=pt-BR&key=${API_KEY}`;
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache de 24 horas
    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      return NextResponse.json({ reviews: [] });
    }

    // Filtra para pegar avaliações com texto e de preferência 5 estrelas
    const formattedReviews = data.result.reviews
      .filter((review: any) => review.rating >= 4)
      .map((review: any) => ({
        name: review.author_name,
        role: review.relative_time_description, // ex: "há um mês"
        content: review.text,
        avatar: review.profile_photo_url,
        rating: review.rating,
      }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar avaliações." },
      { status: 500 }
    );
  }
}