"use client";

import React from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

export interface ItemOportunidade {
  titulo: string;
  credito: string;
  meiaParcela: string;
  imagem: string;
  Icone: LucideIcon;
}

const telefoneWhatsApp = "5583987355437";

function linkWhatsApp(titulo: string, credito: string, meiaParcela: string) {
  const mensagem = `Olá! Tenho interesse no crédito para ${titulo} de ${credito}, com meia parcela de ${meiaParcela}. Gostaria de receber mais informações.`;

  return `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(
    mensagem
  )}`;
}

export function CardOportunidade({ item }: { item: ItemOportunidade }) {
  const { Icone } = item;

  return (
    <article className="group w-[300px] shrink-0 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_14px_45px_rgba(0,0,0,0.10)] sm:w-[340px]">
      <div className="relative h-44 overflow-hidden bg-black">
        <Image
          src={item.imagem}
          alt={item.titulo}
          fill
          sizes="340px"
          className="object-cover opacity-70 transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <Icone className="h-6 w-6" />
          </div>

          <h3 className="text-2xl font-black">{item.titulo}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
            Crédito
          </p>

          <p className="mt-1 text-2xl font-black text-black">{item.credito}</p>
        </div>

        <div className="mb-6 rounded-2xl bg-black p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Meia parcela
          </p>

          <p className="mt-1 text-3xl font-black">{item.meiaParcela}</p>
        </div>

        <a
          href={linkWhatsApp(item.titulo, item.credito, item.meiaParcela)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
        >
          Tenho interesse
        </a>
      </div>
    </article>
  );
}