"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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

      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-full max-w-xs -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 0.75, scaleX: 1 }}
        viewport={viewportOnce}
        transition={{
          duration: motionTokens.durationSlow,
          ease: motionTokens.easeOut,
        }}
      >
        <Image
          src="/assets/decorative/vintage-garden-frame/botanical-divider.png"
          alt=""
          fill
          sizes="20rem"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
