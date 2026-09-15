"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LiquidGlassButton from "@/components/originkit/ui/light-glass-button";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);

      if (window.scrollY <= 80) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // SCROLL PARA O FORMULÁRIO
  // =========================
  const scrollToFormulario = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const formulario = document.getElementById("formulario");

    if (!formulario) return;

    formulario.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Mantém #formulario na URL
    window.history.replaceState(
      null,
      "",
      "#formulario"
    );
  };

  const navLinks = [
    {
      name: "Investimento",
      href: "/investimento",
    },
    {
      name: "Aquisição",
      href: "/aquisicao",
    },
    {
      name: "Cartas contempladas",
      href: "/cartascomtempladas",
    },
    {
      name: "Sobre nós",
      href: "/sobrenos",
    },
  ];

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}
      <motion.header
        initial={false}
        animate={{
          y: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          fixed
          top-4
          inset-x-0
          z-50
          flex
          justify-center
          px-4
          md:px-8
          pointer-events-none
        "
      >
        {/* =========================
            NAV PRINCIPAL
        ========================= */}
        <nav
          className="
            pointer-events-auto
            w-full
            max-w-6xl
            flex
            items-center
            justify-between
            px-5
            py-3
            rounded-2xl

            bg-white/65
            backdrop-blur-sm

            border
            border-white/40

            shadow-[0_8px_32px_rgba(0,0,0,0.10)]

            transition-shadow
            duration-300
          "
        >
          {/* =========================
              LOGO
          ========================= */}
          <Link
            href="/"
            className="flex items-center group"
          >
            <div
              className="
                relative
                w-32
                h-10
                md:w-50
                md:h-15
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Image
                src="/img/logo/logoHorizontalPreta.png"
                alt="Logo"
                fill
                priority
                sizes="(max-width: 768px) 128px, 200px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* =========================
              LINKS DESKTOP
          ========================= */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="
                    text-sm
                    font-medium
                    text-slate-800
                    hover:text-black
                    transition-colors
                    relative
                    py-1

                    after:content-['']
                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:w-0
                    after:h-[2px]
                    after:bg-black
                    hover:after:w-full
                    after:transition-all
                    after:duration-300
                  "
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* =========================
              DIREITA
          ========================= */}
          <div className="flex items-center space-x-3">

            {/* =========================
                BOTÃO DESKTOP
            ========================= */}
            <div className="hidden md:block">
              <LiquidGlassButton
                label="FAZER ORÇAMENTO"
                link="https://wa.me/558387355437?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento%20de%20um%20cons%C3%B3rcio"
                colors={{
                  fill: "#000000",
                  textColor: "#ffffff",
                }}
                font={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: 12,
                }}
                padding="10px 20px"
                rounded={90}
              />
            </div>

            {/* =========================
                BOTÃO MENU MOBILE
            ========================= */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="
                md:hidden
                p-2
                text-slate-800
                hover:text-black
                focus:outline-none
                relative
                z-10
              "
              aria-label={
                mobileMenuOpen
                  ? "Fechar menu"
                  : "Abrir menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* =========================
            MENU MOBILE / CASCATA
        ========================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                top-16
                inset-x-4
                p-4
                rounded-2xl

                bg-white/95
                backdrop-blur-xl

                border
                border-white/50

                shadow-2xl

                flex
                flex-col
                space-y-4

                pointer-events-auto

                md:hidden
              "
            >
              {/* =========================
                  LINKS MOBILE
              ========================= */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    text-slate-800
                    font-medium
                    py-2
                    px-3
                    rounded-lg

                    hover:bg-slate-100
                    hover:text-black

                    transition-colors
                  "
                >
                  {link.name}
                </Link>
              ))}

              {/* =========================
                  FAZER ORÇAMENTO MOBILE
              ========================= */}
              <Link
                href="#formulario"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToFormulario(e);
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  px-4
                  py-3

                  rounded-xl

                  bg-black
                  text-white

                  text-sm
                  font-semibold
                  uppercase
                  tracking-wide

                  w-full

                  transition-all
                  duration-300

                  hover:bg-black/80
                  active:scale-[0.98]
                "
              >
                FAZER ORÇAMENTO
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}