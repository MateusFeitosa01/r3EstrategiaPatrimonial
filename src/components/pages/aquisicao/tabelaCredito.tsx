"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface ItemCredito {
  credito: string;
  parcela: string;
  meiaParcela: string;
  prazo: string;
}

interface TabelaCreditoProps {
  titulo: string;
  dados: ItemCredito[];
  Icone: LucideIcon;
}

export function TabelaCredito({ titulo, dados, Icone }: TabelaCreditoProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 bg-black px-5 py-5 text-white md:px-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
          <Icone className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-extrabold uppercase tracking-tight md:text-xl">
          {titulo}
        </h3>
      </div>

      <div className="divide-y divide-black/10">
        {dados.map((item) => (
          <div
            key={item.credito}
            className="grid gap-4 px-5 py-6 md:grid-cols-[1fr_1.2fr] md:items-center md:px-7"
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                Crédito
              </p>

              <p className="text-2xl font-black tracking-tight text-black">
                {item.credito}
              </p>

              <p className="mt-2 text-sm text-black/50">
                Prazo: {item.prazo}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f4f4f4] p-4 md:text-right">
              <p className="text-sm text-black/45 line-through">
                {item.parcela}
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-black/55">
                Meia parcela
              </p>

              <p className="mt-1 text-2xl font-black text-black md:text-3xl">
                {item.meiaParcela}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}