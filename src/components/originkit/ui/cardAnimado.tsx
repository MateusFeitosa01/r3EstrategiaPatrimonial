"use client";

import * as React from "react";
import { HTMLMotionProps, Variants, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const curtainVriants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: {
      duration: 0.4,
      ease: ["easeOut", [0.25, 1.5, 0.5, 1]],
    },
  },

  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: {
      duration: 0.3,
      ease: ["easeOut", [0.25, 1.5, 0.5, 1]],
    },
  },
};

interface CardCurtainRevealContextValue {
  isMouseIn: boolean;
}

const CardCurtainRevealContext =
  React.createContext<CardCurtainRevealContextValue | undefined>(undefined);

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext);

  if (!context) {
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal Component"
    );
  }

  return context;
}

const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isMouseIn, setIsMouseIn] = React.useState(false);

  /*
   * Controla se estamos em celular/tablet.
   *
   * Até 1024px:
   * - não dependemos de hover
   * - usamos IntersectionObserver
   *
   * Acima de 1024px:
   * - mantém exatamente o comportamento original de hover
   */
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);

  /*
   * Detecta quando o componente entra na viewport.
   */
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  /*
   * Mantém o ref recebido pelo componente funcionando normalmente.
   */
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      cardRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  /*
   * Detecta celular/tablet.
   */
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const updateDeviceType = () => {
      setIsMobileOrTablet(mediaQuery.matches);
    };

    updateDeviceType();

    mediaQuery.addEventListener("change", updateDeviceType);

    return () => {
      mediaQuery.removeEventListener("change", updateDeviceType);
    };
  }, []);

  /*
   * No celular/tablet:
   *
   * Quando o card entrar na viewport, ativamos a animação.
   *
   * "once" na prática:
   * depois que o card abre, o observer é desconectado.
   * Assim ele não fica abrindo/fechando enquanto o usuário rola.
   */
  React.useEffect(() => {
    if (!isMobileOrTablet) {
      return;
    }

    const element = cardRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMouseIn(true);

          /*
           * O card já abriu.
           * Não precisamos mais observar.
           */
          observer.disconnect();
        }
      },
      {
        /*
         * O card precisa estar parcialmente visível
         * antes de abrir.
         */
        threshold: 0.45,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isMobileOrTablet]);

  /*
   * No desktop, mantém o comportamento original.
   *
   * No celular/tablet esses eventos não controlam a animação.
   */
  const handleMouseEnter = React.useCallback(() => {
    if (!isMobileOrTablet) {
      setIsMouseIn(true);
    }
  }, [isMobileOrTablet]);

  const handleMouseLeave = React.useCallback(() => {
    if (!isMobileOrTablet) {
      setIsMouseIn(false);
    }
  }, [isMobileOrTablet]);

  return (
    <CardCurtainRevealContext.Provider value={{ isMouseIn }}>
      <div
        ref={setRefs}
        className={cn(
          "relative flex flex-col gap-2 overflow-hidden",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
});

CardCurtainReveal.displayName = "CardCurtainReveal";

const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVriants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});

CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HtmlHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 p-6", className)}
      {...props}
    />
  );
});

CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLMotionProps<"h2">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.h2
      ref={ref}
      className={className}
      animate={isMouseIn ? { y: 0 } : { y: 170 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      {...props}
    />
  );
});

CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtain = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 size-full mix-blend-difference",
        className
      )}
      variants={curtainVriants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});

CardCurtain.displayName = "CardCurtain";

const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVriants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});

CardCurtainRevealDescription.displayName =
  "CardCurtainRevealDescription";

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtainRevealTitle,
  CardCurtain,
};