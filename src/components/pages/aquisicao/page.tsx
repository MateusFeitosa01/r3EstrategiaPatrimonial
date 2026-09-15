"use client";

import React from "react";

import {
  Bike,
  Car,
  Sailboat,
  Truck,
  LandPlot,
  Building2,
  Home,
  Hammer,
} from "lucide-react";

import { Hero } from "./hero";
import { OQueAdquirir } from "./oQueAdiquirir";
import { SecaoSimulacoes } from "./secaoSimulcoes";
import Cta from "./ctaFinal";
import { ItemOportunidade } from "./cardOportunidade";
import Carrossel, {
  CarrosselItemProps,
} from "./carrossel";

const veiculos: ItemOportunidade[] = [
  {
    titulo: "Moto",
    credito: "R$ 50.000,00",
    meiaParcela: "R$ 290,00",
    imagem: "/img/aquisicao/fotomoto.webp",
    Icone: Bike,
  },
  {
    titulo: "Carro",
    credito: "R$ 120.000,00",
    meiaParcela: "R$ 680,00",
    imagem: "/img/aquisicao/fotocarro1.webp",
    Icone: Car,
  },
  {
    titulo: "Lancha",
    credito: "R$ 90.000,00",
    meiaParcela: "R$ 580,00",
    imagem: "/img/aquisicao/fotolancha.webp",
    Icone: Sailboat,
  },
  {
    titulo: "Caminhão",
    credito: "R$ 600.000,00",
    meiaParcela: "R$ 2.290,00",
    imagem: "/img/aquisicao/fotocaminhao.webp",
    Icone: Truck,
  },
];

const imoveis: ItemOportunidade[] = [
  {
    titulo: "Terreno",
    credito: "R$ 100.000,00",
    meiaParcela: "R$ 343,00",
    imagem: "/img/aquisicao/terreno.webp",
    Icone: LandPlot,
  },
  {
    titulo: "Apartamento",
    credito: "R$ 300.000,00",
    meiaParcela: "R$ 922,00",
    imagem: "/img/aquisicao/apartamento.webp",
    Icone: Building2,
  },
  {
    titulo: "Casa",
    credito: "R$ 500.000,00",
    meiaParcela: "R$ 1.397,00",
    imagem: "/img/aquisicao/casa.webp",
    Icone: Home,
  },
  {
    titulo: "Construção",
    credito: "R$ 800.000,00",
    meiaParcela: "R$ 2.245,00",
    imagem: "/img/aquisicao/construcao.webp",
    Icone: Hammer,
  },
];

const dadosVeiculos: CarrosselItemProps[] = veiculos.map(
  (item) => ({
    title: item.titulo,
    desc: (
      <>
        <span>Crédito: {item.credito}</span>
        <br />
        <span>Meia parcela: {item.meiaParcela}</span>
      </>
    ),
    sliderName: item.titulo.toLowerCase(),
    img: item.imagem,
  })
);

const dadosImoveis: CarrosselItemProps[] = imoveis.map(
  (item) => ({
    title: item.titulo,
    desc: (
      <>
        <span>Crédito: {item.credito}</span>
        <br />
        <span>Meia parcela: {item.meiaParcela}</span>
      </>
    ),
    sliderName: item.titulo.toLowerCase(),
    img: item.imagem,
  })
);

export default function AquisicaoPage() {
  return (
    <main className="bg-white text-black space-y-12">
      <Hero />

      <OQueAdquirir />

      <SecaoSimulacoes />

      {/* CARROSSEL DE VEÍCULOS */}
      <section className="px-4">
        <Carrossel
          items={dadosVeiculos}
          subtitle="Possibilidades de aquisição"
          heading="Escolha o seu próximo veículo."
          description="Planeje a aquisição do seu próximo bem com uma estratégia que cabe nos seus objetivos."
        />
      </section>

      <div className="h-px bg-black/10 max-w-5xl mx-auto" />

      {/* CARROSSEL DE IMÓVEIS */}
      <section className="px-4">
        <Carrossel
          items={dadosImoveis}
          subtitle="Possibilidades de aquisição"
          heading="Encontre o imóvel para o seu próximo passo."
          description="Do primeiro terreno ao imóvel dos seus planos, transforme seus objetivos em uma estratégia de aquisição."
        />
      </section>

      <Cta />
    </main>
  );
}