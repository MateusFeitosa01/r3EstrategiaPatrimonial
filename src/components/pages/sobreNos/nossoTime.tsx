"use client";

import { motion, type Variants } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

interface TestimonialSectionProps {
  title: string;
}

export const NossoTime = ({
  title,
}: TestimonialSectionProps) => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Responsável pela liderança estratégica da empresa, direcionamento dos negócios e desenvolvimento das principais decisões da R3.",
      name: "Rony Medeiros",
      role: "CEO",
      imageSrc: "/img/time/ronyPai.jpg",
    },
    {
      id: 2,
      quote:
        "Atua no desenvolvimento comercial da empresa, relacionamento com clientes e expansão das oportunidades de negócio.",
      name: "Renato Barbosa",
      role: "Sócio",
      imageSrc: "/img/time/renato.jpg",
    },
    {
      id: 3,
      quote:
        "Atua na estratégia, tecnologia e desenvolvimento de soluções que fortalecem o posicionamento e o crescimento da R3.",
      name: "Rony Arthur",
      role: "Sócio",
      imageSrc: "",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-white px-4 py-20 md:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* HEADER */}
        <div className="mb-12 w-full max-w-3xl text-left">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-black/60 md:text-base">
            NOSSO TIME
          </span>

          <h2 className="text-3xl font-black uppercase tracking-tight text-black md:text-5xl">
            {title}
          </h2>
        </div>

        {/* CARDS */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={itemVariants}
              className="group relative h-[480px] overflow-hidden rounded-3xl bg-black"
            >
              {/* IMAGEM - só aparece quando existir */}
              {testimonial.imageSrc && (
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* CONTEÚDO */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">

                {/* DESCRIÇÃO */}
                <p className="max-w-sm text-sm leading-relaxed text-white/70 md:text-base">
                  {testimonial.quote}
                </p>

                {/* NOME E CARGO */}
                <div className="mt-6 border-t border-white/20 pt-4">
                  <p className="text-base font-black uppercase tracking-tight text-white md:text-lg">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50 md:text-sm">
                    {testimonial.role}
                  </p>
                </div>

              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};