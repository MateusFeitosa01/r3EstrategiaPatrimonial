
"use client";

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
  const cardRef = React.useRef<HTMLAnchorElement | null>(null);

  const [isMobile, setIsMobile] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  /*
   * Detecta se está em dispositivo mobile.
   */
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /*
   * Detecta quando o card entra na tela.
   *
   * No mobile, isso dispara automaticamente a abertura
   * das imagens.
   */
  React.useEffect(() => {
    if (!isMobile) {
      setIsVisible(false);
      return;
    }

    const element = cardRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  /*
   * Combina a ref externa com a ref interna.
   */
  const setRefs = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      cardRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <a
      ref={setRefs}
      href={href}
      className={cn(
        /*
         * Estrutura principal
         */
        "group relative block w-full min-w-0 max-w-sm cursor-pointer overflow-hidden rounded-2xl p-6 text-black transition-all duration-300 ease-in-out lg:max-w-md",

        /*
         * Liquid Glass
         */
        "bg-[rgb(157,159,162)] backdrop-blur-xl backdrop-saturate-150",

        /*
         * Borda
         */
        "border border-white/10 hover:border-white/25",

        /*
         * Sombra
         */
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.2)]",

        /*
         * Hover somente no desktop.
         */
        "md:hover:-translate-y-1 md:hover:bg-white/[0.08] md:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.3)]",

        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className="flex min-w-0 flex-col">
        {/* ================================
            CARD HEADER
        ================================= */}

        <div className="mb-6 flex min-w-0 items-center justify-between gap-4">
          <h2 className="min-w-0 text-3xl font-bold tracking-tight text-white transition-colors duration-300 md:group-hover:text-black">
            {title}
          </h2>

          <ArrowRight
            className={cn(
              "h-6 w-6 shrink-0 text-white transition-all duration-300 ease-in-out",

              /*
               * Desktop: seta se move no hover.
               */
              "md:group-hover:translate-x-1 md:group-hover:text-black",

              /*
               * Mobile: seta se move quando o card aparece.
               */
              isMobile &&
                isVisible &&
                "translate-x-1"
            )}
          />
        </div>

        {/* ================================
            STACKED IMAGES
        ================================= */}

        <div
          className={cn(
            /*
             * O container agora nunca permite que as imagens
             * ultrapassem os limites do card.
             */
            "relative mb-6 h-32 w-full min-w-0 overflow-hidden rounded-xl"
          )}
        >
          <div className="relative h-full w-full">
            {images.map((src, index) => {
              /*
               * Desktop:
               * imagens ficam empilhadas e abrem no hover.
               *
               * Mobile:
               * quando isVisible = true, elas abrem
               * automaticamente.
               */
              const shouldOpen = isMobile
                ? isVisible
                : false;

              const closedX = index * 24;

              /*
               * Espaçamento entre as imagens quando abertas.
               *
               * O cálculo usa porcentagem para evitar que
               * ultrapassem a largura disponível no celular.
               */
              const openX =
                images.length > 1
                  ? (index / (images.length - 1)) * 58
                  : 0;

              const rotation =
                index * 5 - 5;

              return (
                <div
                  key={index}
                  className={cn(
                    /*
                     * Tamanho das imagens.
                     */
                    "absolute left-0 top-0 h-full w-[42%] max-w-[42%]",

                    /*
                     * Impede qualquer vazamento.
                     */
                    "overflow-hidden rounded-xl",

                    /*
                     * Visual.
                     */
                    "border border-black/20 shadow-lg",

                    /*
                     * Animação.
                     */
                    "transition-all duration-500 ease-out",

                    /*
                     * Desktop:
                     * abre usando hover.
                     */
                    "md:group-hover:translate-x-(--hover-x) md:group-hover:rotate-(--hover-r)"
                  )}
                  style={
                    {
                      /*
                       * Estado fechado.
                       */
                      transform: shouldOpen
                        ? `translateX(${openX}%) rotate(${rotation}deg)`
                        : `translateX(${closedX}px) rotate(0deg)`,

                      /*
                       * Variáveis usadas pelo hover desktop.
                       */
                      "--hover-x": `${openX}%`,
                      "--hover-r": `${rotation}deg`,

                      /*
                       * Imagens da frente ficam acima.
                       */
                      zIndex: images.length - index,
                    } as React.CSSProperties &
                      Record<
                        "--hover-x" | "--hover-r",
                        string
                      >
                  }
                >
                  <img
                    src={src}
                    alt={`${title} view ${index + 1}`}
                    className="block h-full w-full max-w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================
            STATS
        ================================= */}

        <div className="mb-4 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white transition-colors duration-300 md:group-hover:text-black/80">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center space-x-1.5"
            >
              {stat.icon}

              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ================================
            DESCRIPTION
        ================================= */}

        <p className="min-w-0 text-sm leading-relaxed text-white transition-colors duration-300 md:group-hover:text-black/80">
          {description}
        </p>
      </div>
    </a>
  );
});

AnimatedHikeCard.displayName =
  "AnimatedHikeCard";

