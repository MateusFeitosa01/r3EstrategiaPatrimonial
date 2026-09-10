"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Vencedores = () => {
  return (
    <section className="w-full bg-white px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto grid min-h-[500px] w-full max-w-[1300px] grid-cols-1 items-center justify-between gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

        {/* CONTEÚDO */}
        <div className="flex-1">
          <span className="mb-5 block text-sm font-medium uppercase tracking-[0.25em] text-black/50">
            Histórias que inspiram
          </span>

          <h3 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl">
            Faça parte de quem transforma{" "}
            <span className="text-black/40">
              planos em conquistas.
            </span>
          </h3>

          <p className="mt-7 max-w-xl text-base leading-7 text-black/60 md:mt-8 md:text-lg md:leading-8">
            Cada contemplação representa um passo importante na realização de
            um objetivo. Na R3, acompanhamos nossos clientes durante essa
            jornada, oferecendo orientação, transparência e soluções
            alinhadas aos seus planos.
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-black/60 md:text-lg md:leading-8">
            Seu próximo imóvel, veículo ou projeto pode começar com uma
            decisão bem planejada.
          </p>

          <button
            className={cn(
              "mt-7 rounded-md bg-black px-6 py-3.5",
              "font-medium text-white transition-all",
              "hover:bg-black/80 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-black focus-visible:ring-offset-2"
            )}
          >
            Quero conhecer as opções
          </button>
        </div>

        {/* GRID */}
        <ShuffleGrid />

      </div>
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  const newArray = [...array];

  let currentIndex = newArray.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
};

const squareData = [
  {
    id: 1,
    src: "https://cdn.21st.dev/assets/mirror/f7/f7cc7f12fe6695a2811820cfde557ce3f1ff6ab520c4ef8281f7e44bb8534d1a.jpg",
  },
  {
    id: 2,
    src: "https://cdn.21st.dev/assets/mirror/20/20e32f1718a79139ee66e391958abe7dd237182cc83dcecad303c03f001997de.jpg",
  },
  {
    id: 3,
    src: "https://cdn.21st.dev/assets/mirror/d5/d5d28b686d22dea019f8ddc9b45793a15783fb3f5cea7dd59644a29bdc8dd753.jpg",
  },
  {
    id: 4,
    src: "https://cdn.21st.dev/assets/mirror/10/10b91ee0fe7b7bd73552a0d9fd6448f3582b744902104d54bc71f13fc0f30875.jpg",
  },
  {
    id: 5,
    src: "https://cdn.21st.dev/assets/mirror/5c/5c5a789444d6c4b6a753911453489b6d6b2511bb8879813706708b9e4d871f91.jpg",
  },
  {
    id: 6,
    src: "https://cdn.21st.dev/assets/mirror/ed/edf8b3217ec8f6cba1d61472eadbfebe561269a88d654ee0789dd59c7bd9e839.jpg",
  },
  {
    id: 7,
    src: "https://cdn.21st.dev/assets/mirror/c5/c5bafc6cab0c15f9f47de7d201559bf49837930f11977732650ce83b35234bd8.jpg",
  },
  {
    id: 8,
    src: "https://cdn.21st.dev/assets/mirror/0b/0bafc73e254b4e39433c895085b77a863ac7c46b03eec51c8267a6ee2b6d3e60.jpg",
  },
  {
    id: 9,
    src: "https://cdn.21st.dev/assets/mirror/e2/e2d17e27a1f74391945f89105f3658f9c678e8b99038c24780ff637cb0926c14.jpg",
  },
  {
    id: 10,
    src: "https://cdn.21st.dev/assets/mirror/e7/e78a4a050ff53e83348f146b668faab3329b0987f74c13e30601e9eba07beeff.jpg",
  },
  {
    id: 11,
    src: "https://cdn.21st.dev/assets/mirror/94/94d11fd791fdf4522b639069444efd378ae985ef4385e02b14d65931737d36d5.jpg",
  },
  {
    id: 12,
    src: "https://cdn.21st.dev/assets/mirror/a1/a18b230d0e57bcd55b1dcbd786426485fdafbbed2c3122246be99110d8a8695e.jpg",
  },
  {
    id: 13,
    src: "https://cdn.21st.dev/assets/mirror/ae/ae31491e9f1290514a9d99db18b4e1194a4493c2216bf149e6d9f0bfec70f470.jpg",
  },
  {
    id: 14,
    src: "https://cdn.21st.dev/assets/mirror/07/0700bd8b8f757951e74ff66077f046bda1a97e33d08f2053f573e487d9a43c97.jpg",
  },
  {
    id: 15,
    src: "https://cdn.21st.dev/assets/mirror/8f/8fe9e110776ad7034a70f175e61871b143c5fada8e7c87c070d17c8db3b47259.jpg",
  },
  {
    id: 16,
    src: "https://cdn.21st.dev/assets/mirror/74/7484da0108fa00377e5658a3285fd4d513f79dee5becd22a24be68016dd3e23a.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{
        duration: 1.5,
        type: "spring",
      }}
      className="h-full w-full overflow-hidden rounded-md bg-black/5"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid h-[420px] w-full grid-cols-4 grid-rows-4 gap-1 md:h-[420px] lg:h-[500px]">
      {squares.map((sq) => sq)}
    </div>
  );
};

