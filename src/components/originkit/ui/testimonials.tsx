"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type GoogleReview = {
  rating: number;
  text?: {
    text?: string;
  };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
    uri?: string;
  };
  googleMapsUri?: string;
};

type ReviewsResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews");

        if (!response.ok) {
          throw new Error("Erro ao buscar avaliações");
        }

        const data: ReviewsResponse = await response.json();

        setReviews(data.reviews ?? []);
        setRating(data.rating ?? 0);
        setTotalReviews(data.userRatingCount ?? 0);
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-10 text-center text-black/50">
        Carregando avaliações...
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  const repeatedReviews = [...reviews, ...reviews];

  return (
    <div className="w-full">
      {/* Resumo Google */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-black">
            {rating.toFixed(1).replace(".", ",")}
          </span>

          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-[#fbbc04] text-[#fbbc04]"
              />
            ))}
          </div>
        </div>

        <span className="text-sm text-black/50">
          {totalReviews} avaliações no Google
        </span>
      </div>

      {/* Carrossel */}
      <div className="relative w-full overflow-hidden py-10">
        {/* Fade esquerdo */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent sm:w-32" />

        {/* Fade direito */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <div className="testimonial-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
          {repeatedReviews.map((review, index) => {
            const author = review.authorAttribution;

            return (
              <a
                key={`${review.googleMapsUri}-${index}`}
                href={review.googleMapsUri || author?.uri || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-80 shrink-0 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center gap-3">
                  {author?.photoUri ? (
                    <Image
                      src={author.photoUri}
                      alt={author.displayName || "Cliente"}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                      {(author?.displayName || "C").charAt(0)}
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-black">
                      {author?.displayName || "Cliente Google"}
                    </h4>

                    <p className="text-sm text-black/50">
                      {review.relativePublishTimeDescription ||
                        "Avaliação no Google"}
                    </p>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-black/80">
                  {review.text?.text || "Avaliação publicada no Google."}
                </p>

                <div className="flex gap-1">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]"
                    />
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}