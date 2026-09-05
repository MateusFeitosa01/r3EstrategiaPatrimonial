"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content:
      "This component library has transformed our development workflow. Highly recommended!",
    avatar: "/logoPreta.png",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Frontend Developer",
    content:
      "Clean, modern, and incredibly easy to use. Perfect for our React projects.",
    avatar: "/logoPreta.png",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "UI Designer",
    content:
      "The design system is consistent and beautiful. Love the attention to detail.",
    avatar: "/logoPreta.png",
    rating: 5,
  },
  {
    name: "Alex Rodriguez",
    role: "Tech Lead",
    content:
      "Excellent documentation and great community support. A must-have toolkit.",
    avatar: "/logoPreta.png",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Overlay de Desfoque/Fade Esquerda */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-r from-white via-white-900/50 to-transparent" />

      {/* Overlay de Desfoque/Fade Direita */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-l from-white via-white-900/50 to-transparent" />

      {/* Marquee Container */}
      <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="w-80 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/15"
          >
            <div className="mb-4 flex items-center space-x-3">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={40}
                height={40}
                className="h-10 w-10 object-cover rounded-full"
              />
              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {testimonial.role}
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-black/80 dark:text-white/80">
              {testimonial.content}
            </p>

            <div className="flex space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#fff200] text-[#fff200]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;