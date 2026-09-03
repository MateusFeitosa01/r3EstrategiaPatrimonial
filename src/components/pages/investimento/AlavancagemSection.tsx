import React from "react";
import "./AlavancagemSection.css";

// ======================================================
// TIPOS
// ======================================================

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

// ======================================================
// ÍCONES
// ======================================================

const IconClock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="9" />
    <path
      d="M12 7v5l3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBars = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="4" y="12" width="3" height="8" />
    <rect x="10.5" y="7" width="3" height="13" />
    <rect x="17" y="3" width="3" height="17" />
  </svg>
);

// ======================================================
// INTRODUÇÃO
// ======================================================

export const SectionIntro: React.FC<SectionIntroProps> = ({
  eyebrow,
  heading,
  subtitle,
}) => (
  <div className="alav-intro">
    <span className="alav-intro__eyebrow">{eyebrow}</span>

    <h2 className="alav-intro__heading">{heading}</h2>

    <p className="alav-intro__subtitle">{subtitle}</p>
  </div>
);

// ======================================================
// CARD
// ======================================================

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
    className={
      "alav-detail" +
      (children ? " alav-detail--with-aside" : "")
    }
  >
    <div className="alav-detail__card">
      <div className="alav-detail__top">
        <span className="alav-detail__number">{number}</span>

        <span className="alav-detail__icon">{icon}</span>
      </div>

      <h3 className="alav-detail__title">{title}</h3>

      <p className="alav-detail__desc">{description}</p>

      <ul className="alav-detail__bullets">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <div className="alav-detail__divider" />

      <div className="alav-detail__tags">
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <span>{tag}</span>

            {index < tags.length - 1 && (
              <span aria-hidden="true">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

    {children && (
      <aside className="alav-detail__aside">
        {children}
      </aside>
    )}
  </div>
);

// ======================================================
// TABELA — ALAVANCAGEM PATRIMONIAL
// ======================================================

export const PatrimonialExampleTable:
  React.FC<PatrimonialExampleTableProps> = ({
    title = "Exemplo de Alavancagem Patrimonial",
    rows,
  }) => (
    <div className="credit-table">
      <span className="credit-table__title">
        {title}
      </span>

      <table className="credit-table__table">
        <thead>
          <tr>
            <th scope="col">Crédito</th>
            <th scope="col">1/2 Parcela mensal</th>
            <th scope="col">Prazo</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.credito}>
              <td>{row.credito}</td>
              <td>{row.parcela}</td>
              <td>{row.prazo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="credit-table__note">
        Condições definidas conforme análise individual e planejamento estratégico.
      </p>
    </div>
  );

// ======================================================
// TABELA — ALAVANCAGEM FINANCEIRA
// ======================================================

export const CreditExampleTable:
  React.FC<CreditExampleTableProps> = ({
    title = "Exemplo de Alavancagem Financeira",
    rows,
  }) => (
    <div className="credit-table">
      <span className="credit-table__title">
        {title}
      </span>

      <table className="credit-table__table">
        <thead>
          <tr>
            <th scope="col">Crédito</th>
            <th scope="col">1/2 Parcela mensal</th>
            <th scope="col">Retorno estimado</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.credito}>
              <td>{row.credito}</td>
              <td>{row.parcela}</td>
              <td>{row.retorno}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="credit-table__note">
        Condições definidas conforme análise individual e planejamento estratégico.
      </p>
    </div>
  );

// ======================================================
// DADOS — ALAVANCAGEM PATRIMONIAL
// ======================================================

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

// ======================================================
// DADOS — ALAVANCAGEM FINANCEIRA
// ======================================================

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

// ======================================================
// SEÇÃO PRINCIPAL
// ======================================================

export const AlavancagemSection: React.FC = () => (
  <section
    className="alav-section"
    aria-label="Alavancagem em detalhe"
  >
    <SectionIntro
      eyebrow="Alavancagem"
      heading="Transforme estratégia em crescimento patrimonial."
      subtitle="Duas abordagens complementares para quem deseja acelerar a construção de patrimônio com inteligência e planejamento."
    />

    {/* ==================================================
        ALAVANCAGEM PATRIMONIAL
    ================================================== */}

    <DetailCard
      number="01"
      icon={<IconBars />}
      title="Alavancagem Patrimonial"
      description="Estratégias voltadas para acelerar a construção de patrimônio utilizando oportunidades de mercado, planejamento estratégico e alocação inteligente de recursos. Ajudamos você a enxergar possibilidades que transformam ativos em crescimento real e sustentável."
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

    {/* ==================================================
        ALAVANCAGEM FINANCEIRA
    ================================================== */}

    <DetailCard
      number="02"
      icon={<IconClock />}
      title="Alavancagem Financeira"
      description="Soluções para utilizar recursos e crédito de maneira estratégica, buscando potencializar resultados financeiros sem comprometer a estabilidade. Transformamos crédito em ferramenta de construção patrimonial com responsabilidade e visão de longo prazo."
      bullets={[
        "Uso estratégico de crédito e capital",
        "Estruturação de operações financeiras",
        "Otimização de fluxo e resultado",
        "Inteligência na gestão de recursos",
      ]}
      tags={[
        "CRÉDITO",
        "ESTRATÉGIA",
        "RENTABILIADADE",
        
      ]}
    >
      <CreditExampleTable
        rows={CREDIT_EXAMPLES}
      />
    </DetailCard>
  </section>
);

export default AlavancagemSection;