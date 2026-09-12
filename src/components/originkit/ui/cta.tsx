"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LiquidGlassButton from "./light-glass-button";


const IMG_BASE =
  "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread";

const IMG = {
  plane: `${IMG_BASE}/img1.png`,
  painting: `${IMG_BASE}/img2.png`,
  breaker: `${IMG_BASE}/img3.png`,
  dog: `${IMG_BASE}/img4.png`,
  footballer: `${IMG_BASE}/img5.png`,
  jacket: `${IMG_BASE}/img6.png`,
  meadow: `${IMG_BASE}/img7.png`,
  stripes: `${IMG_BASE}/img8.png`,
} as const;

const SCALE: Partial<Record<number, number>> = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};

const s = (i: number) => SCALE[i] ?? 1;

const CARDS: StackSpreadCard[] = [
  {
    item: { src: IMG.stripes, alt: "Colour stripes" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    item: { src: IMG.meadow, alt: "Wildflower meadow" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    item: { src: IMG.jacket, alt: "Figure in a leather jacket" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    item: { src: IMG.footballer, alt: "Footballer mid-kick" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(5), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    item: { src: IMG.dog, alt: "Terrier in profile" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    item: { src: IMG.breaker, alt: "Breakdancer holding a pose" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    item: { src: IMG.painting, alt: "Renaissance fresco detail" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    item: { src: IMG.plane, alt: "Vintage fighter plane" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: s(1), w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

const SCATTER_START = 0.12;
const SCATTER_END = 0.9;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;

const PARALLAX_SPRING = {
  stiffness: 90,
  damping: 22,
  mass: 0.6,
};

const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB =
  "Planeje sua conquista com segurança, encontre o consórcio ideal para você e dê o primeiro passo para transformar seus planos em realidade.";

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },

  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: {
      w: 40,
      h: 20,
    },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");

    const read = () => {
      setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    };

    read();

    mq.addEventListener("change", read);

    return () => mq.removeEventListener("change", read);
  }, []);

  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, {
      passive: true,
    });

    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  src: string;
  alt?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  targetSm?: {
    x: number;
    y: number;
  };
  stackRotate?: number;
  stackOffset?: {
    x: number;
    y: number;
  };
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: {
    w: number;
    h: number;
  } | null;
  stackScale: number;
  cardRadius: number;
  pointer: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  depth: number;
}) {
  const { item, target } = card;

  const flat = reduce === true;

  const stackRotate = flat
    ? 0
    : clusterRotation
      ? card.stackRotate ?? 0
      : 0;

  const stackOffset = card.stackOffset ?? {
    x: 0,
    y: 0,
  };

  const restScale = scaleMul ?? target.scale ?? 1;

  const sm =
    isSmall && card.targetSm
      ? card.targetSm
      : null;

  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;

  const endY = sm ? sm.y : target.y;

  const endRotate =
    flat || isSmall
      ? 0
      : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx =
        stackOffset.x +
        (endX - stackOffset.x) * p;

      const ty =
        stackOffset.y +
        (endY - stackOffset.y) * p;

      const drift = depth * p;

      const dx =
        tx -
        px * PARALLAX_X * drift;

      const dy =
        ty -
        py * PARALLAX_Y * drift;

      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );

  const rotate = useTransform(
    progress,
    [0, 1],
    [stackRotate, endRotate]
  );

  const scale = useTransform(
    progress,
    [0, 1],
    [stackScale, restScale]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace
        item={item}
        cardRadius={cardRadius}
      />
    </motion.div>
  );
}

function CardFace({
  item,
  cardRadius,
}: {
  item: StackSpreadItem;
  cardRadius: number;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden max-md:rounded-[4vw]"
      style={{
        borderRadius: `${cardRadius}px`,
      }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

interface StackSpreadStageProps {
  cards: StackSpreadCard[];
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
}

function StackSpreadStage({
  cards,
  scrollLength = 350,
  bgColor = "#ffffff",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#141414",
  textFadeStart = 0.3,
  showScrollHint = true,
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();

  const {
    scale: scaleMul,
    small: isSmall,
    colX,
    card: fixedCard,
  } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const [spread, setSpread] = useState(false);

  useMotionValueEvent(
    progress,
    "change",
    (p) => {
      setSpread((was) =>
        was
          ? p > 0.985
          : p >= 0.999
      );
    }
  );

  const parallaxEnabled =
    reduce !== true && !isSmall;

  const pointer = usePointerParallax(
    spread,
    parallaxEnabled
  );

  const noScale = reduce === true;

  const copyOpacity = useTransform(
    progress,
    [textFadeStart, textFadeStart + 0.35],
    [0, 1]
  );

  const copyScale = useTransform(
    progress,
    [textFadeStart, 0.9],
    [0.85, 1]
  );

  const hintOpacity = useTransform(
    progress,
    [0, SCATTER_START],
    [1, 0]
  );

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{
        height: `${scrollLength}vh`,
        backgroundColor: bgColor,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* TEXTO CENTRAL */}
        <motion.div
  className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center md:px-8"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          <h2
            className="
              w-full
              max-w-3xl
              text-3xl
              uppercase
              font-black    
              leading-tight
              tracking-tight
              text-black
              md:text-5xl
            "
            style={{
              color: textColor,
            }}
          >
            Seu Próximo{" "}
            <span className="text-black/40">
              Grande Objetivo
            </span>{" "}
            Começa Agora.
          </h2>

          <p
            className="
              mt-5
              w-full
              max-w-2xl
              text-sm
              font-normal
              leading-relaxed
              tracking-normal
              text-black/70
              md:mt-6
              md:text-base
            "
            style={{
              color: textColor,
              opacity: 0.6,
            }}
          >
            {SUB}
          </p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pointer-events-auto relative z-50 mt-8"
                >
                <LiquidGlassButton
                                label="COMEÇAR AGORA"
                                colors={{
                                  fill: "#000000",
                                  textColor: "#ffffff",
                                }}
                                font={{
                                  fontFamily: "Montserrat",
                                  fontWeight: 600,
                                  fontSize: 15,
                                }}
                                padding="10px 20px"
                                rounded={90}
                              />
              </motion.div>
            </motion.div>

        {/* CARDS */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={
                parallaxEnabled
                  ? parallaxDepth(
                      i,
                      cards.length
                    )
                  : 0
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export interface StackSpreadProps {
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
}

export default function StackSpread({
  scrollLength = 350,
  bgColor = "#ffffff",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#141414",
  textFadeStart = 0.3,
  showScrollHint = true,
}: StackSpreadProps) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
    />
  );
}

