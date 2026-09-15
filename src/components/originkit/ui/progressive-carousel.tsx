"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  FC,
} from "react";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* =========================================================
   TIPOS
========================================================= */

interface ProgressSliderContextType {
  active: string;
  progress: number;
  duration: number;
  vertical: boolean;
  handleButtonClick: (value: string) => void;
  registerSlider: (value: string) => void;
}

interface ProgressSliderProps {
  children: ReactNode;
  activeSlider: string;
  duration?: number;
  vertical?: boolean;
  className?: string;
}

interface SliderContentProps {
  children: ReactNode;
  className?: string;
}

interface SliderWrapperProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface SliderBtnGroupProps {
  children: ReactNode;
  className?: string;
}

interface SliderBtnProps {
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

/* =========================================================
   CONTEXTO
========================================================= */

const ProgressSliderContext =
  createContext<ProgressSliderContextType | null>(null);

const useProgressSliderContext = () => {
  const context = useContext(ProgressSliderContext);

  if (!context) {
    throw new Error(
      "Os componentes do slider devem ser usados dentro de ProgressSlider."
    );
  }

  return context;
};

/* =========================================================
   PROGRESS SLIDER
========================================================= */

export const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  activeSlider,
  duration = 5000,
  vertical = false,
  className,
}) => {
  const [active, setActive] = useState(activeSlider);
  const [progress, setProgress] = useState(0);

  const slidersRef = useRef<string[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const registerSlider = (value: string) => {
    if (!slidersRef.current.includes(value)) {
      slidersRef.current.push(value);
    }
  };

  const goToNextSlider = () => {
    const sliders = slidersRef.current;

    if (sliders.length === 0) return;

    const currentIndex = sliders.indexOf(active);

    const nextIndex =
      currentIndex === -1 || currentIndex === sliders.length - 1
        ? 0
        : currentIndex + 1;

    setActive(sliders[nextIndex]);
    setProgress(0);
    startTimeRef.current = null;
  };

  const handleButtonClick = (value: string) => {
    setActive(value);
    setProgress(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    setActive(activeSlider);
    setProgress(0);
    startTimeRef.current = null;
  }, [activeSlider]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        goToNextSlider();
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [active, duration]);

  return (
    <ProgressSliderContext.Provider
      value={{
        active,
        progress,
        duration,
        vertical,
        handleButtonClick,
        registerSlider,
      }}
    >
      <div
        className={cn(
          "relative isolate w-full overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </ProgressSliderContext.Provider>
  );
};

/* =========================================================
   CONTEÚDO
========================================================= */

export const SliderContent: FC<SliderContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative z-0 w-full overflow-hidden", className)}>
      {children}
    </div>
  );
};

/* =========================================================
   SLIDE
========================================================= */

export const SliderWrapper: FC<SliderWrapperProps> = ({
  children,
  value,
  className,
}) => {
  const { active, registerSlider } = useProgressSliderContext();

  useEffect(() => {
    registerSlider(value);
  }, [value]);

  return (
    <AnimatePresence mode="wait">
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className={cn(
            "relative z-0 block w-full overflow-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* =========================================================
   GRUPO DOS BOTÕES
========================================================= */

export const SliderBtnGroup: FC<SliderBtnGroupProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative z-20", className)}>
      {children}
    </div>
  );
};

/* =========================================================
   BOTÃO

   Não existe mais fundo branco animado ocupando h-full.
   O progresso agora é somente uma barra inferior.
========================================================= */

export const SliderBtn: FC<SliderBtnProps> = ({
  children,
  value,
  className,
  progressBarClass,
}) => {
  const {
    active,
    progress,
    handleButtonClick,
    registerSlider,
  } = useProgressSliderContext();

  useEffect(() => {
    registerSlider(value);
  }, [value]);

  const isActive = active === value;

  return (
    <button
      type="button"
      className={cn(
        "relative isolate overflow-hidden",
        isActive ? "opacity-100" : "opacity-60",
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      <div className="relative z-10">
        {children}
      </div>

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-20
          h-[3px]
          w-full
          overflow-hidden
        "
      >
        <span
          className={cn(
            "absolute bottom-0 left-0 block h-full",
            progressBarClass
          )}
          style={{
            width: isActive ? `${progress}%` : "0%",
          }}
        />
      </div>
    </button>
  );
};