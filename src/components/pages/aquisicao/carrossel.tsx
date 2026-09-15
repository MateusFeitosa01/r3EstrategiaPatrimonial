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
    <section
      className={`${className} w-full max-[640px]:px-5 sm:max-md:px-6`}
    >
      {/* CABEÇALHO */}
      {(subtitle || heading || description) && (
        <div className="mb-10 max-w-4xl max-[640px]:mb-7">
          {subtitle && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-black/45 max-[640px]:text-[11px] max-[640px]:tracking-[0.16em]">
              {subtitle}
            </p>
          )}

          {heading && (
            <h2 className="text-3xl font-black tracking-tight text-black md:text-5xl max-[640px]:text-3xl">
              {heading}
            </h2>
          )}

          {description && (
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg max-[640px]:mt-3 max-[640px]:text-sm max-[640px]:leading-relaxed">
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
          max-[640px]:rounded-lg
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

    max-[640px]:h-[380px]
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

            /* CELULAR */
            max-[767px]:h-auto
            max-[767px]:min-h-[220px]

            /* TABLET */
            md:max-lg:grid-cols-2
            md:max-lg:h-auto
            md:max-lg:min-h-[220px]
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

                /* CELULAR */
                max-[767px]:h-[110px]
                max-[767px]:min-h-[110px]
                max-[767px]:p-2.5

                /* TABLET */
                md:max-lg:h-[110px]
                md:max-lg:min-h-[110px]
                md:max-lg:p-3
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

                /* CELULAR */
                max-[767px]:mb-1.5
                max-[767px]:max-w-full
                max-[767px]:whitespace-normal
                max-[767px]:break-words
                max-[767px]:px-3
                max-[767px]:py-0.5
                max-[767px]:text-sm

                /* TABLET */
                md:max-lg:max-w-full
                md:max-lg:whitespace-normal
                md:max-lg:break-words
                md:max-lg:text-base
              "
            >
              {item.title}
            </h2>

              <div
                className="
                  text-base
                  font-medium
                  leading-relaxed

                  /* CELULAR */
                  max-[767px]:line-clamp-none
                  max-[767px]:text-xs
                  max-[767px]:leading-snug

                  /* TABLET */
                  md:max-lg:line-clamp-none
                  md:max-lg:text-sm
                  md:max-lg:leading-snug
                "
              >
                {item.desc}
              </div>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </section>
  );
}