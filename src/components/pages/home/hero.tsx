'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
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
  const [mediaFullyExpanded, setMediaFullyExpanded] =
    useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const destinoFormulario =
      window.location.hash === '#formulario';

    if (destinoFormulario) {
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);

      const irParaFormulario = () => {
        const formulario =
          document.getElementById('formulario');

        if (formulario) {
          formulario.scrollIntoView({
            behavior: 'auto',
            block: 'start',
          });

          window.history.replaceState(
            null,
            '',
            window.location.pathname
          );
        }
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(irParaFormulario, 300);
        });
      });

      return;
    }

    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (
        mediaFullyExpanded &&
        e.deltaY < 0 &&
        window.scrollY <= 5
      ) {
        setMediaFullyExpanded(false);
        setScrollProgress(0.99);
        e.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
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

    const handleTouchStart = (
      e: globalThis.TouchEvent
    ) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (
      e: globalThis.TouchEvent
    ) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (
        mediaFullyExpanded &&
        deltaY < -20 &&
        window.scrollY <= 5
      ) {
        setMediaFullyExpanded(false);
        setScrollProgress(0.99);
        e.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
        e.preventDefault();

        const scrollFactor =
          deltaY < 0 ? 0.008 : 0.005;

        const scrollDelta =
          deltaY * scrollFactor;

        const newProgress = Math.min(
          Math.max(
            scrollProgress + scrollDelta,
            0
          ),
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

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener(
      'wheel',
      handleWheel,
      {
        passive: false,
      }
    );

    window.addEventListener(
      'scroll',
      handleScroll
    );

    window.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: false,
      }
    );

    window.addEventListener(
      'touchmove',
      handleTouchMove,
      {
        passive: false,
      }
    );

    window.addEventListener(
      'touchend',
      handleTouchEnd
    );

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel
      );

      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'touchstart',
        handleTouchStart
      );

      window.removeEventListener(
        'touchmove',
        handleTouchMove
      );

      window.removeEventListener(
        'touchend',
        handleTouchEnd
      );
    };
  }, [
    scrollProgress,
    mediaFullyExpanded,
    touchStartY,
  ]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(
        window.innerWidth < 768
      );
    };

    checkIfMobile();

    window.addEventListener(
      'resize',
      checkIfMobile
    );

    return () =>
      window.removeEventListener(
        'resize',
        checkIfMobile
      );
  }, []);

  const textTranslateX =
    scrollProgress *
    (isMobileState ? 180 : 150);

  const logoOpacity =
    0.2 + scrollProgress * 0.8;

  const logoScale =
    0.95 + scrollProgress * 0.7;

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden bg-white transition-colors duration-700 ease-in-out"
    >
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start bg-white">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center bg-white">

          <div className="relative z-10 flex h-[100dvh] w-full flex-col items-center justify-between">

            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <motion.div
                className="flex aspect-square w-64 items-center justify-center md:w-96 lg:w-[450px]"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: logoOpacity,
                  scale: logoScale,
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                }}
              >
                <Image
                  src="/img/logo/logoPreta.png"
                  alt="Logo"
                  width={800}
                  height={800}
                  className="h-full w-full object-contain"
                  priority
                />
              </motion.div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: 'easeOut',
              }}
              className={`relative z-10 my-auto flex w-full max-w-7xl flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 text-center transition-none ${
                textBlend
                  ? 'mix-blend-difference'
                  : 'mix-blend-normal'
              }`}
            >
              <motion.h2
                className="whitespace-nowrap text-center text-xl font-black uppercase tracking-wide text-black/80 transition-none sm:text-3xl md:text-4xl lg:text-5xl"
                style={{
                  transform: `translateX(-${textTranslateX}vw)`,
                }}
              >
                Estratégias inteligentes que
              </motion.h2>

              <motion.div
                className="flex flex-row items-center justify-center gap-x-3 whitespace-nowrap"
                style={{
                  transform: `translateX(${textTranslateX}vw)`,
                }}
              >
                <div className="inline-flex rounded-2xl bg-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md backdrop-saturate-150">
                  <RotatingText
                    prefix=""
                    texts={[
                      'constroem',
                      'rentabilizam',
                      'aceleram',
                    ]}
                    color="rgba(0, 0, 0, 0.8)"
                    badgeBackground="transparent"
                    badgeRadius={16}
                    badgePaddingX={20}
                    badgePaddingY={8}
                    splitBy="characters"
                    font={{
                      fontSize:
                        'clamp(1.2rem, 3.5vw, 3rem)',
                      fontWeight: 900,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  />
                </div>

                <h2 className="text-center text-xl font-black uppercase tracking-wide text-black/80 sm:text-3xl md:text-4xl lg:text-5xl">
                  seu patrimônio.
                </h2>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: 'easeOut',
              }}
              className="pointer-events-none relative z-20 flex w-full flex-col items-center justify-center px-6 pb-8 text-center md:pb-12"
            >
              {date && (
                <p
                  className="mb-1 text-lg font-light tracking-wider text-black/80 transition-none md:text-xl"
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                  }}
                >
                  {date}
                </p>
              )}

              {scrollToExpand && (
                <p
                  className="text-sm font-light uppercase tracking-widest text-black/70 transition-none md:text-base"
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                  }}
                >
                  {scrollToExpand}
                </p>
              )}
            </motion.div>
          </div>

          {showContent && (
            <motion.section
              className="z-20 flex w-full flex-col bg-white px-8 py-10 md:px-16 lg:py-0"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              {children}
            </motion.section>
          )}

        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;