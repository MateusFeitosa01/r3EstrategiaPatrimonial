import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Stat {
  icon: React.ReactNode;
  label: string;
}

export interface AnimatedHikeCardProps {
  title: string;
  images: string[];
  stats: Stat[];
  description: string;
  href: string;
  className?: string;
}

export const AnimatedHikeCard = React.forwardRef<
  HTMLAnchorElement,
  AnimatedHikeCardProps
>(({ title, images, stats, description, href, className }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative block w-full max-w-sm cursor-pointer rounded-2xl p-6 text-black transition-all duration-300 ease-in-out lg:max-w-md",
        // Estilização Liquid Glass
        "bg-black/5 backdrop-blur-xl backdrop-saturate-150",
        "border border-white/10 hover:border-white/25",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.2)]",
        "hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.3)]",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className="flex flex-col">
        {/* Card Header: Title and Arrow */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-black/90 group-hover:text-black">
            {title}
          </h2>
          <ArrowRight className="h-6 w-6 text-black/70 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-black" />
        </div>

        {/* Stacked Images */}
        <div className="relative mb-6 h-32">
          {images.map((src, index) => (
            <div
              key={index}
              className={cn(
                "absolute h-full w-[40%] overflow-hidden rounded-xl border border-black/20 shadow-lg transition-all duration-300 ease-in-out",
                "group-hover:translate-x-(--tx) group-hover:rotate-(--r)"
              )}
              style={{
                transform: `translateX(${index * 32}px)`,
                '--tx': `${index * 80}px`,
                '--r': `${index * 5 - 5}deg`,
                zIndex: images.length - index,
              } as React.CSSProperties & Record<"--tx" | "--r", string>}
            >
              <img
                src={src}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-4 flex items-center space-x-4 text-sm text-black/70">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1.5">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-black/60 group-hover:text-black/80 transition-colors duration-300">
          {description}
        </p>
      </div>
    </a>
  );
});

AnimatedHikeCard.displayName = "AnimatedHikeCard";