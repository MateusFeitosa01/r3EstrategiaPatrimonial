"use client";

import React from "react";
import StackingCards, {
  StackingCardItem,
} from "@/components/originkit/ui/stacking-cards";

/* =========================================================
   TIPOS
========================================================= */

interface SectionIntroProps {
  eyebrow: string;
  heading: string;
  subtitle: string;
}

interface DetailCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  children?: React.ReactNode;
}

export interface CreditExampleRow {
  credito: string;
  parcela: string;
  retorno: string;
}

export interface PatrimonialExampleRow {
  credito: string;
  parcela: string;
  prazo: string;
}

interface CreditExampleTableProps {
  title?: string;
  rows: CreditExampleRow[];
}

interface PatrimonialExampleTableProps {
  title?: string;
  rows: PatrimonialExampleRow[];
}

/* =========================================================
   ÍCONES
========================================================= */

const IconBars = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
    aria-hidden="true"
  >
    <rect x="4" y="12" width="3" height="8" />
    <rect x="10.5" y="7" width="3" height="13" />
    <rect x="17" y="3" width="3" height="17" />
  </svg>
);

const IconTrendUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
    aria-hidden="true"
  >
    <path
      d="M2.25 18L9 11.25l4.5 4.5L21.75 8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M16.5 8h5.25v5.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   INTRODUÇÃO
========================================================= */

export const SectionIntro: React.FC<SectionIntroProps> = ({
  eyebrow,
  heading,
  subtitle,
}) => (
  <div className="max-w-[760px]">
    <span
      className="
        mb-2
        block
        text-[12px]
        font-semibold
        uppercase
        tracking-[0.22em]
        text-[#111111]
      "
    >
      {eyebrow}
    </span>

    <h2
      className="
        mb-6
        text-[clamp(32px,4.2vw,56px)]
        font-bold
        leading-[1.12]
        tracking-[-0.01em]
        text-[#111111]
      "
    >
      {heading}
    </h2>

    <p
      className="
        m-0
        max-w-[60ch]
        text-[16px]
        leading-[1.6]
        text-[#8a8a8a]
      "
    >
      {subtitle}
    </p>
  </div>
);

/* =========================================================
   CARD
========================================================= */

export const DetailCard: React.FC<DetailCardProps> = ({
  number,
  icon,
  title,
  description,
  bullets,
  tags,
  children,
}) => (
  <div
    className="
      w-full
      rounded-2xl
      border
      border-[#262626]
      bg-[#121212]
      p-6
      shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]
      sm:p-8
      min-[861px]:p-12
    "
  >
    <div
      className={`
        grid
        gap-10
        ${
          children
            ? "grid-cols-1 min-[861px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[861px]:items-center"
            : "grid-cols-1"
        }
      `}
    >
      {/* CONTEÚDO PRINCIPAL */}
      <div className="w-full">

        {/* TOPO */}
        <div className="mb-7 flex items-start justify-between">
          <span className="text-[13px] font-semibold tracking-[0.16em] text-[#a9834f]">
            {number}
          </span>

          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#333333] bg-[#1a1a1a] text-white">
            {icon}
          </span>
        </div>

        {/* TÍTULO */}
        <h3 className="mb-[22px] text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-white sm:text-[32px]">
          {title}
        </h3>

        {/* DESCRIÇÃO */}
        <p className="mb-8 text-[15px] leading-[1.75] text-[#a3a3a3]">
          {description}
        </p>

        {/* BULLETS */}
        <ul className="m-0 mb-9 flex list-none flex-col gap-4 border-t border-[#262626] p-0 pt-6">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative pl-[22px] text-[14.5px] text-[#e5e5e5] before:absolute before:left-0 before:top-[9px] before:h-px before:w-[10px] before:bg-[#a9834f] before:content-['']"
            >
              {bullet}
            </li>
          ))}
        </ul>

        {/* DIVISOR */}
        <div className="mb-[22px] border-t border-[#262626]" />

        {/* TAGS */}
        <div className="flex flex-wrap items-center gap-[10px] text-[11px] font-semibold tracking-[0.1em] text-[#8a8a8a]">
          {tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <span>{tag}</span>

              {index < tags.length - 1 && (
                <span
                  aria-hidden="true"
                  className="text-[#525252]"
                >
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* TABELA À DIREITA */}
      {children && (
        <aside className="w-full min-w-0">
          {children}
        </aside>
      )}
    </div>
  </div>
);

/* =========================================================
   BASE DAS TABELAS
========================================================= */

const CreditTableWrapper: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div
    className="
      w-full
      overflow-x-auto
      rounded-xl
      border
      border-[#262626]
      bg-[#1a1a1a]
      px-6
      py-7
      shadow-inner
      min-[861px]:px-8
      min-[861px]:pb-8
      min-[861px]:pt-9
    "
  >
    <span
      className="
        mb-[22px]
        block
        border-b
        border-[#8a8880]
        pb-[18px]
        text-[12px]
        font-semibold
        uppercase
        tracking-[0.16em]
        text-[#f2f0ea]
      "
    >
      {title}
    </span>

    {children}

    <p className="m-0 mt-[22px] text-[11.5px] text-[#6f6d66]">
      Condições definidas conforme análise individual e planejamento
      estratégico.
    </p>
  </div>
);

/* =========================================================
   TABELA — ALAVANCAGEM PATRIMONIAL
========================================================= */

export const PatrimonialExampleTable: React.FC<
  PatrimonialExampleTableProps
> = ({
  title = "Exemplo de Alavancagem Patrimonial",
  rows,
}) => (
  <CreditTableWrapper title={title}>
    <table className="w-full min-w-[420px] border-collapse">
      <thead>
        <tr>
          <th
            scope="col"
            className="border-b border-white/10 pb-[14px] pr-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8a8880]"
          >
            Crédito
          </th>

          <th
            scope="col"
            className="border-b border-white/10 pb-[14px] pr-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8a8880]"
          >
            1/2 Parcela mensal
          </th>

          <th
            scope="col"
            className="border-b border-white/10 pb-[14px] pr-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8a8880]"
          >
            Prazo
          </th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.credito}>
            <td className="border-b border-white/[0.08] py-[18px] pr-3 text-[15px] font-bold text-white">
              {row.credito}
            </td>

            <td className="border-b border-white/[0.08] py-[18px] pr-3 text-[15px] text-[#e9e7e0]">
              {row.parcela}
            </td>

            <td className="border-b border-white/[0.08] py-[18px] pr-3 text-[15px] text-[#e9e7e0]">
              {row.prazo}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CreditTableWrapper>
);

/* =========================================================
   TABELA — ALAVANCAGEM FINANCEIRA
========================================================= */

export const CreditExampleTable: React.FC<
  CreditExampleTableProps
> = ({
  title = "Exemplo de Alavancagem Financeira",
  rows,
}) => (
  <CreditTableWrapper title={title}>
    <table className="w-full min-w-[420px] border-collapse">
      <thead>
        <tr>
          <th
            scope="col"
            className="border-b border-white/10 pb-[14px] pr-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8a8880]"
          >
            Crédito
          </th>

          <th
            scope="col"
            className="border-b border-white/10 pb-[14px] pr-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8a8880]"
          >
            1/2 Parcela mensal
          </th>

          <th
            scope="col"
            className="border-b border-white/10 pb-[14px] pr-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8a8880]"
          >
            Retorno estimado
          </th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.credito}>
            <td className="border-b border-white/[0.08] py-[18px] pr-3 text-[15px] font-bold text-white">
              {row.credito}
            </td>

            <td className="border-b border-white/[0.08] py-[18px] pr-3 text-[15px] text-[#e9e7e0]">
              {row.parcela}
            </td>

            <td className="border-b border-white/[0.08] py-[18px] pr-3 text-[15px] text-[#e9e7e0]">
              {row.retorno}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CreditTableWrapper>
);

/* =========================================================
   DADOS — ALAVANCAGEM PATRIMONIAL
========================================================= */

const PATRIMONIAL_EXAMPLES: PatrimonialExampleRow[] = [
  {
    credito: "300 mil",
    parcela: "R$ 922,00",
    prazo: "200 meses",
  },
  {
    credito: "500 mil",
    parcela: "R$ 1.397,00",
    prazo: "220 meses",
  },
  {
    credito: "800 mil",
    parcela: "R$ 2.236,00",
    prazo: "220 meses",
  },
  {
    credito: "1 milhão",
    parcela: "R$ 2.795,46",
    prazo: "220 meses",
  },
];

/* =========================================================
   DADOS — ALAVANCAGEM FINANCEIRA
========================================================= */

const CREDIT_EXAMPLES: CreditExampleRow[] = [
  {
    credito: "100 mil",
    parcela: "R$ 341,00",
    retorno: "R$ 20 mil",
  },
  {
    credito: "200 mil",
    parcela: "R$ 615,00",
    retorno: "R$ 40 mil",
  },
  {
    credito: "400 mil",
    parcela: "R$ 1.230,00",
    retorno: "R$ 80 mil",
  },
];

/* =========================================================
   SEÇÃO PRINCIPAL
========================================================= */

export const AlavancagemSection: React.FC = () => (
  <section
    aria-label="Alavancagem em detalhe"
    className="
      flex
      flex-col
      gap-12
      bg-white
      px-5
      py-12
      font-sans
      text-[#111111]
      min-[861px]:gap-16
      min-[861px]:px-12
      min-[861px]:pb-[180px]
    "
  >
    <SectionIntro
      eyebrow="Alavancagem"
      heading="Transforme estratégia em crescimento patrimonial."
      subtitle="Duas abordagens complementares para quem deseja acelerar a construção de patrimônio com inteligência e planejamento."
    />

    {/* ======================================================
        APENAS 2 CARDS
    ====================================================== */}

    <StackingCards
      totalCards={2}
      className="flex flex-col gap-24 pb-20"
    >

      {/* ====================================================
          CARD 01 — ALAVANCAGEM PATRIMONIAL
      ==================================================== */}

      <StackingCardItem
        index={0}
        topPosition="40px"
      >
        <DetailCard
          number="01"
          icon={<IconBars />}
          title="Alavancagem Patrimonial"
          description="Estratégias voltadas para acelerar a construção de patrimônio utilizando o consórcio, planejamento estratégico e alocação inteligente de recursos. Ajudamos você a enxergar possibilidades que transformam ativos em crescimento real e sustentável."
          bullets={[
            "Identificação de oportunidades de mercado",
            "Planejamento estratégico de longo prazo",
            "Alocação inteligente de recursos",
            "Acompanhamento contínuo da estratégia",
          ]}
          tags={[
            "CRÉDITO",
            "ESTRATÉGIA",
            "ALOCAÇÃO",
            "PATRIMÔNIO",
          ]}
        >
          <PatrimonialExampleTable
            rows={PATRIMONIAL_EXAMPLES}
          />
        </DetailCard>
      </StackingCardItem>

      {/* ====================================================
          CARD 02 — ALAVANCAGEM FINANCEIRA
      ==================================================== */}

      <StackingCardItem
        index={1}
        topPosition="90px"
      >
        <DetailCard
          number="02"
          icon={<IconTrendUp />}
          title="Alavancagem Financeira"
          description="Estratégia voltada à rentabilidade por meio da venda da carta contemplada. O consórcio é utilizado de forma planejada para buscar a contemplação e, 
          posteriormente, negociar o crédito, transformando a carta em uma oportunidade de ganho financeiro."
          bullets={[
            "Uso estratégico de crédito e capital",
            "Estratégia focada em rentabilidade",
            "Potencial de valorização da carta contemplada",
            "Planejamento para potencializar o retorno financeiro",
          ]}
          tags={[
            "CRÉDITO",
            "ESTRATÉGIA",
            "RENTABILIDADE",
          ]}
        >
          <CreditExampleTable
            rows={CREDIT_EXAMPLES}
          />
        </DetailCard>
      </StackingCardItem>

    </StackingCards>
  </section>
);

export default AlavancagemSection;