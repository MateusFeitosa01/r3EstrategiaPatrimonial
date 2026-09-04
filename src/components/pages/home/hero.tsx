'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RotatingText from '@/components/originkit/ui/text-carousel';

interface ScrollExpandMediaProps {
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const logoOpacity = 0.2 + scrollProgress * 0.8;
  const logoScale = 0.95 + scrollProgress * 0.7;

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden bg-white'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh] bg-white'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh] bg-white'>
          
          {/* Container Hero */}
          <div className='relative w-full h-[100dvh] flex flex-col items-center justify-between z-10'>
            
            {/* 1. LOGO CENTRADA (Com Animação de Entrada) */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-0'>
              <motion.div
                className='w-64 md:w-96 lg:w-[450px] aspect-square flex items-center justify-center'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: logoOpacity,
                  scale: logoScale,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <Image
                  src='/img/logoPreta.png'
                  alt='Logo'
                  width={800}
                  height={800}
                  className='w-full h-full object-contain'
                  priority
                />
              </motion.div>
            </div>

            {/* 2. TÍTULOS COM ROTATING TEXT (Entrada com Slide Up e Opacidade) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className={`flex flex-row flex-wrap items-center justify-center text-center gap-x-3 gap-y-2 w-full my-auto px-4 relative z-10 transition-none max-w-7xl ${
                textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
              }`}
            >
              {/* Metade 1: Vai para a ESQUERDA (-) ao rolar */}
              <motion.h2
                className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-black/80 transition-none text-center uppercase whitespace-nowrap'
                style={{ transform: `translateX(-${textTranslateX}vw)` }}
              >
                Estratégias inteligentes que
              </motion.h2>

              {/* Metade 2: Vai para a DIREITA (+) ao rolar */}
              <motion.div
                className='flex flex-row items-center justify-center gap-x-3 whitespace-nowrap'
                style={{ transform: `translateX(${textTranslateX}vw)` }}
              >
                <div className='inline-flex rounded-2xl bg-white/10 backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_0_rgba(255,255,255,0.3)]'>
                  <RotatingText
                    prefix=''
                    texts={['constroem', 'rentabilizam', 'aceleram']}
                    color='rgba(0, 0, 0, 0.8)'
                    badgeBackground='transparent'
                    badgeRadius={16}
                    badgePaddingX={20}
                    badgePaddingY={8}
                    splitBy='characters'
                    font={{
                      fontSize: 'clamp(1.2rem, 3.5vw, 3rem)',
                      fontWeight: 900,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  />
                </div>

                <h2 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-center text-black/80 uppercase'>
                  seu patrimônio.
                </h2>
              </motion.div>
            </motion.div>

            {/* 3. DATA E SCROLL TO EXPAND (Entrada Suave com Delay) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className='w-full pb-8 md:pb-12 px-6 flex flex-col items-center justify-center text-center relative z-20 pointer-events-none'
            >
              {date && (
                <p
                  className='text-lg md:text-xl text-black/80 font-light tracking-wider transition-none mb-1'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {date}
                </p>
              )}
              {scrollToExpand && (
                <p
                  className='text-sm md:text-base text-black/70 font-light tracking-widest uppercase transition-none'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {scrollToExpand}
                </p>
              )}
            </motion.div>

          </div>

          {/* Segunda Seção de Conteúdo */}
          <motion.section
            className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-white z-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.section>

        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;