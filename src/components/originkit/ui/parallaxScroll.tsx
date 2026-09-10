"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ComponentProps {
  imagePosition?: "left" | "right";
  label?: string;
  title?: React.ReactNode;
  description?: string;
  secondaryDescription?: string;
  image?: string;
  imageAlt?: string;
}

export const Component = ({
  imagePosition = "right",
  label = "Sobre a empresa",
  title = (
    <>
      Planejamento para transformar{" "}
      <span className="text-black/40">
        objetivos em conquistas.
      </span>
    </>
  ),
  description = `Na R3 Consórcios & Investimentos, acreditamos que conquistar
  grandes objetivos exige planejamento, confiança e escolhas
  inteligentes. Por isso, trabalhamos para oferecer soluções
  financeiras alinhadas aos objetivos de cada cliente.`,
  secondaryDescription = `Nosso compromisso é tornar cada etapa mais clara, segura e
  estratégica, construindo relacionamentos baseados em
  transparência e confiança.`,
  image = "https://cdn.cosmos.so/6c4a7829-d16a-4a58-9ab9-93fbb3bacb9e.?format=jpeg",
  imageAlt = "Sobre a R3 Consórcios & Investimentos",
}: ComponentProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Entrada do conteúdo
  const translateContent = useTransform(
    scrollYProgress,
    [0, 1],
    [60, 0]
  );

  const opacityContent = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0, 1]
  );

  // Entrada da imagem
  const opacityImage = useTransform(
    scrollYProgress,
    [0, 0.7],
    [0, 1]
  );

  const clipImage = useTransform(
    scrollYProgress,
    [0, 0.7],
    imagePosition === "right"
      ? ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
      : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const content = (
    <motion.div
      style={{
        y: translateContent,
        opacity: opacityContent,
      }}
      className="flex-1"
    >
      {/* LABEL */}
      <span className="mb-5 block text-sm font-semibold uppercase tracking-widest text-black/60 md:text-base">
        {label}
      </span>

      {/* TÍTULO */}
      <h2 className="max-w-2xl text-3xl font-black uppercase tracking-tight text-black md:text-5xl">
        {title}
      </h2>

      {/* DESCRIÇÃO */}
      <p className="mt-7 max-w-xl text-sm leading-relaxed text-black/70 md:mt-8 md:text-base">
        {description}
      </p>

      {/* DESCRIÇÃO SECUNDÁRIA */}
      {secondaryDescription && (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/70 md:text-base">
          {secondaryDescription}
        </p>
      )}
    </motion.div>
  );

  const imageElement = (
    <motion.div
      style={{
        opacity: opacityImage,
        clipPath: clipImage,
      }}
      className="relative hidden shrink-0 md:block"
    >
      <img
        src={image}
        alt={imageAlt}
        className="h-[420px] w-[420px] object-cover lg:h-[500px] lg:w-[500px]"
      />
    </motion.div>
  );

  return (
    <section className="w-full bg-white px-4 py-20 md:px-8">
      <div
        ref={sectionRef}
        className="mx-auto flex min-h-[500px] w-full max-w-7xl items-center justify-between gap-12 md:gap-16 lg:gap-24"
      >
        {imagePosition === "left" ? (
          <>
            {imageElement}
            {content}
          </>
        ) : (
          <>
            {content}
            {imageElement}
          </>
        )}
      </div>
    </section>
  );
};

