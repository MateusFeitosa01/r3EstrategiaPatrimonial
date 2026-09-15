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
  subtitle?: React.ReactNode;
  heading?: React.ReactNode;
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
      {/* CABEÇALHO */}
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

      {/* CARROSSEL */}
      <ProgressSlider
        vertical={false}
        activeSlider={items[0].sliderName}
        duration={duration}
        className="
          relative
          isolate
          overflow-hidden
          rounded-xl
        "
      >
        {/* IMAGEM */}
        <SliderContent
          className="
            relative
            z-0
            h-[280px]
            w-full
            sm:h-[360px]
            lg:h-[420px]
            2xl:h-[500px]
          "
        >
          {items.map((item, index) => (
            <SliderWrapper
              key={index}
              value={item.sliderName}
              className="h-full w-full"
            >
              <Image
                className="
                  block
                  h-full
                  w-full
                  object-cover
                "
                src={item.img}
                width={1900}
                height={1080}
                alt={item.title}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        {/* ABAS */}
        <SliderBtnGroup
          className="
            absolute
            bottom-0
            left-0
            z-30
            grid
            h-[105px]
            w-full
            grid-cols-2
            items-stretch
            overflow-hidden
            bg-white/80
            text-black
            md:grid-cols-4
            dark:bg-black/75
            dark:text-white
          "
        >
          {items.map((item, index) => (
            <SliderBtn
              key={index}
              value={item.sliderName}
              className="
                relative
                h-[105px]
                min-h-0
                cursor-pointer
                overflow-hidden
                border-r
                border-black/10
                p-3
                text-left
                last:border-r-0
                dark:border-white/10
              "
              progressBarClass="
                bg-black
                dark:bg-white
              "
            >
              <h2
                className="
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