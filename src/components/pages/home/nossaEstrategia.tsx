import { AnimatedHikeCard, Stat } from "@/components/originkit/ui/card"
import { 
  TrendingUp, 
  ShieldCheck, 
  Landmark, 
  PieChart, 
  Building2, 
  Rocket, 
  Briefcase, 
  DollarSign 
} from "lucide-react";

interface StrategyItem {
  title: string;
  description: string;
  href: string;
  images: string[];
  stats: Stat[];
}

const strategies: StrategyItem[] = [
  {
    title: "Construção",
    description: "Estratégias focadas na acumulação eficiente de capital com alocação inteligente de ativos.",
    href: "#construcao",
    images: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400",
    ],
    stats: [
      { icon: <TrendingUp className="h-4 w-4 text-emerald-400" />, label: "Consistente" },
      { icon: <DollarSign className="h-4 w-4 text-amber-400" />, label: "Longo Prazo" },
    ],
  },
  {
    title: "Rentabilização",
    description: "Maximização dos retornos da sua carteira através de oportunidades selecionadas no mercado.",
    href: "#rentabilizacao",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
    ],
    stats: [
      { icon: <PieChart className="h-4 w-4 text-purple-400" />, label: "Performance" },
      { icon: <Briefcase className="h-4 w-4 text-blue-400" />, label: "Gestão Ativa" },
    ],
  },
  {
    title: "Aceleração",
    description: "Acesso a investimentos estratégicos e estrutura de capital para alavancar negócios.",
    href: "#aceleracao",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    ],
    stats: [
      { icon: <Rocket className="h-4 w-4 text-rose-400" />, label: "Escala" },
      { icon: <Building2 className="h-4 w-4 text-indigo-400" />, label: "Corporate" },
    ],
  },
  {
    title: "Proteção",
    description: "Blindagem patrimonial, planejamento sucessório e diversificação internacional em moeda forte.",
    href: "#protecao",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
    ],
    stats: [
      { icon: <ShieldCheck className="h-4 w-4 text-cyan-400" />, label: "Blindagem" },
      { icon: <Landmark className="h-4 w-4 text-amber-400" />, label: "Offshore" },
    ],
  },
];

export default function NossaEstrategia() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-start">
            {/* Cabeçalho alinhado à esquerda */}
            <div className="text-left mb-12 w-full max-w-3xl">
            <h3 className="text-sm md:text-base font-semibold text-black/60 tracking-widest uppercase mb-3">
                O que você está buscando?
            </h3>
            <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase">
                Encontre o caminho para o seu objetivo
            </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {strategies.map((card, index) => (
                    <AnimatedHikeCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    href={card.href}
                    images={card.images}
                    stats={card.stats}
                    className="!max-w-full w-full"
                    />
                ))}
            </div>
        </div>
    </section>
  );
}