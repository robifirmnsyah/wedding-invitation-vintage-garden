"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/animations/tokens";
import { viewportOnce } from "@/animations/variants";

interface Props {
  /** the colour the section above ends on */
  from: string;
  /** the colour the section below begins on */
  to: string;
  className?: string;
}

/**
 * The seam between two chapters: the upper mat bleeds into the lower one and a
 * single etched gold sprig is drawn across the join, so sections read as one
 * continuous garden rather than stacked rectangles.
 *
 * Purely decorative — no pointer events, no layout contribution beyond its own
 * height, and it never overlaps text.
 */
export function SoftDivider({ from, to, className = "" }: Props) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-20 w-full overflow-hidden sm:h-28 ${className}`}
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    >
      {/* garden haze — a wash of light where the two mats meet */}
      <div
        className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgb(251 249 243 / 0.55), transparent 70%)",
        }}
      />

      <motion.svg
        viewBox="0 0 320 40"
        preserveAspectRatio="xMidYMid meet"
        className="absolute left-1/2 top-1/2 h-10 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 text-gold-600"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 0.75, scaleX: 1 }}
        viewport={viewportOnce}
        transition={{
          duration: motionTokens.durationSlow,
          ease: motionTokens.easeOut,
        }}
      >
        <path
          d="M20 20 H128"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M192 20 H300"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M136 20 C 146 20, 154 20, 184 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M150 20 C 149 15, 146 12.5, 142 12 C 143 16.5, 146.5 19.5, 150 20 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M170 20 C 171 25, 174 27.5, 178 28 C 177 23.5, 173.5 20.5, 170 20 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="160" cy="20" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
      </motion.svg>
    </div>
  );
}
