// author: Khoa Phan <https://www.pldkhoa.dev>

"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface StackingCardsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions;
  scaleMultiplier?: number;
  totalCards: number;
}

interface StackingCardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  index: number;
  topPosition?: string;
}

interface StackingCardsContextValue {
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards?: number;
}

const StackingCardsContext =
  createContext<StackingCardsContextValue | null>(null);

export default function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  });

  return (
    <StackingCardsContext.Provider
      value={{
        progress: scrollYProgress,
        scaleMultiplier,
        totalCards,
      }}
    >
      <div
        ref={targetRef}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    </StackingCardsContext.Provider>
  );
}

const StackingCardItem = ({
  index,
  topPosition,
  className,
  children,
  ...props
}: StackingCardItemProps) => {
  const {
    progress,
    scaleMultiplier,
    totalCards = 0,
  } = useStackingCardsContext();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 861px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const scaleTo =
    1 - (totalCards - index) * (scaleMultiplier ?? 0.03);

  const rangeScale =
    totalCards > 0
      ? [index * (1 / totalCards), 1]
      : [0, 1];

  const scale = useTransform(
    progress,
    rangeScale,
    [1, scaleTo]
  );

  const top = topPosition ?? `${5 + index * 3}%`;

  /*
   * CELULAR + TABLET
   * -----------------------------------------
   * Não usa sticky.
   * Não usa scale.
   * Não usa topPosition.
   * Não participa do stacking.
   */
  if (!isDesktop) {
    return (
      <div
        className={cn(
          "relative h-auto w-full",
          className
        )}
        {...props}
      >
        <div className="relative h-auto w-full">
          {children}
        </div>
      </div>
    );
  }

  /*
   * NOTEBOOK + DESKTOP
   * -----------------------------------------
   * Mantém o comportamento original:
   * sticky + scale + topPosition.
   */
  return (
    <div
      className={cn(
        "h-full sticky top-0",
        className
      )}
      {...props}
    >
      <motion.div
        className="origin-top relative h-full"
        style={{
          top,
          scale,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext);

  if (!context) {
    throw new Error(
      "StackingCardItem must be used within StackingCards"
    );
  }

  return context;
};

export { StackingCardItem };