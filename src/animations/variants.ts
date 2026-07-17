import type { Variants } from "framer-motion";
import { motionTokens } from "./tokens";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: motionTokens.durationBase, ease: "easeOut" },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: motionTokens.distanceMobile },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.durationBase,
      ease: motionTokens.easeOut,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTokens.durationBase,
      ease: motionTokens.easeOut,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: motionTokens.stagger, delayChildren: 0.1 },
  },
};

/** Shared viewport config for whileInView animations. */
export const inViewOnce = { once: true, amount: 0.25 } as const;
