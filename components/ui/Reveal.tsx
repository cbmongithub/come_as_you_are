"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  type ElementType,
  type ReactNode,
} from "react";

const REVEAL_DISABLED_CONTEXT = createContext(false);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  amount?: number;
  once?: boolean;
};

type RevealProviderProps = {
  children: ReactNode;
  disabled?: boolean;
};

export function RevealProvider({
  children,
  disabled = false,
}: RevealProviderProps) {
  return (
    <REVEAL_DISABLED_CONTEXT.Provider value={disabled}>
      {children}
    </REVEAL_DISABLED_CONTEXT.Provider>
  );
}

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  duration = 0.7,
  y = 28,
  scale = 1,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const revealDisabled = useContext(REVEAL_DISABLED_CONTEXT);
  const MotionComponent = motion.create(as);

  if (revealDisabled) {
    return <MotionComponent className={className}>{children}</MotionComponent>;
  }

  return (
    <MotionComponent
      className={className}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y, scale }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once, amount }}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}
