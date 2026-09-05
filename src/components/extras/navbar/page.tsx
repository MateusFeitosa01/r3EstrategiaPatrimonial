'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe a navbar após rolar mais de 80px da página
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Investimento', href: '#estrategia' },
    { name: 'Aquisição', href: '#consorcio' },
    { name: 'Cartas comtempladas', href: '#avaliacao' },
    { name: 'Sobre nós', href: '#avaliacao' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 md:px-8 pointer-events-auto"
        >
          {/* Container Liquid Glass */}
          <nav className="w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.6)] transition-all duration-300">
            
            {/* 1. Esquerda: Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105">
                <Image
                  src="/img/logoPreta.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* 2. Meio: Links de Navegação (Desktop) */}
            <ul className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-800 hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 3. Direita: Botão Falar com Especialista + Menu Mobile */}
            <div className="flex items-center space-x-3">
              <Link
                href="#formulario"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-black/90 hover:bg-black text-white text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
               
                <span>Falar com Especialista</span>
              </Link>

              {/* Botão Hambúrguer Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-800 hover:text-black focus:outline-none"
                aria-label="Abrir Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Menu Dropdown Mobile */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-16 inset-x-4 p-4 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl flex flex-col space-y-4 md:hidden"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-800 font-medium py-2 px-3 rounded-lg hover:bg-slate-100/50 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="#formulario"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white text-sm font-medium w-full"
                >
                  
                  <span>Falar com Especialista</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}