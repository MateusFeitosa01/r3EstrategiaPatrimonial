"use client";

import React from "react";
import Image from "next/image";
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from "@/components/originkit/ui/progressive-carousel";

export interface CarrosselItemProps {
  img: string;
  title: string;
  desc: React.ReactNode;
  sliderName: string;
}

interface CarrosselProps {
  items: CarrosselItemProps[];

  /** Texto pequeno acima do título */
  subtitle?: React.ReactNode;

  /** Título principal da seção */
  heading?: React.ReactNode;

  /** Descrição abaixo do título */
  description?: React.ReactNode;

  className?: string;
  duration?: number;
}

export default function Carrossel({
  items,
  subtitle,
  heading,
  description,
  className = "max-w-7xl px-10 mx-auto",
  duration = 5000,
}: CarrosselProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={className}>

      {/* =====================================================
          CABEÇALHO
          FICA FORA DO SLIDER PROGRESSIVO
      ====================================================== */}
      {(subtitle || heading || description) && (
        <div className="mb-10 max-w-4xl">
          
          {subtitle && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
              {subtitle}
            </p>
          )}

          {heading && (
            <h2 className="text-3xl font-black tracking-tight text-black md:text-5xl">
              {heading}
            </h2>
          )}

          {description && (
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg">
              {description}
            </div>
          )}

        </div>
      )}

      {/* =====================================================
          SLIDER PROGRESSIVO
      ====================================================== */}
      <ProgressSlider
        vertical={false}
        activeSlider={items[0].sliderName}
        duration={duration}
      >
        <SliderContent>
          {items.map((item, index) => (
            <SliderWrapper
              key={index}
              value={item.sliderName}
            >
              <Image
                className="
                  h-[450px]
                  w-full
                  rounded-xl
                  object-cover
                  2xl:h-[500px]
                "
                src={item.img}
                width={1900}
                height={1080}
                alt={item.title}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        {/* =================================================
            ABAS
        ================================================= */}
        <SliderBtnGroup
          className="
            absolute
            bottom-0
            h-fit
            w-full
            overflow-hidden
            rounded-md
            bg-white/40
            text-black
            backdrop-blur-md
            dark:bg-black/40
            dark:text-white
            grid
            grid-cols-2
            md:grid-cols-4
          "
        >
          {items.map((item, index) => (
            <SliderBtn
              key={index}
              value={item.sliderName}
              className="
                cursor-pointer
                border-r
                p-3
                text-left
                last:border-r-0
              "
              progressBarClass="
                h-full
                bg-white
                dark:bg-black
              "
            >
              <h2
                className="
                  relative
                  mb-2
                  w-fit
                  rounded-full
                  bg-gray-900
                  px-4
                  text-lg
                  font-semibold
                  text-white
                  dark:bg-white
                  dark:text-black
                "
              >
                {item.title}
              </h2>

              <div className="line-clamp-2 text-base font-medium">
                {item.desc}
              </div>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </section>
  );
}