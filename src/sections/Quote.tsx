"use client";

import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { SprigDivider } from "@/components/Decor";
import { BotanicalParallax } from "@/components/decorative/BotanicalParallax";
import { fadeIn, riseIn, drawLine, staggerLoose } from "@/animations/variants";
import config from "@/lib/config";

/** Islamic verse — QS Ar-Rum 21 as a quiet typographic pause. */
export function Quote() {
  const { quote } = config;

  return (
    <section
      aria-labelledby="quote-ref"
      className="section-pad relative overflow-hidden bg-ivory-50 pt-28"
    >
      <BotanicalParallax
        src="floral-left.png"
        side="left"
        className="-left-[18%] top-[6%] h-[52%] w-[46%] sm:-left-[6%] sm:w-[26%]"
        opacity={0.07}
        distance={44}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[9%] inset-y-[12%] rounded-[48%] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.96)_0%,_rgba(255,250,240,0.76)_48%,_transparent_76%)]"
      />

      <StaggerGroup
        variants={staggerLoose}
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <RevealItem as="p" variants={fadeIn} className="eyebrow !text-olive-700">
          <span id="quote-ref">{quote.ref}</span>
        </RevealItem>

        <RevealItem variants={drawLine} className="w-full">
          <SprigDivider className="mt-4" />
        </RevealItem>

        <RevealItem variants={riseIn} className="mt-2">
          <blockquote>
            <p dir="rtl" lang="ar" className="arabic-verse text-olive-900">
              {quote.arabic}
            </p>
          </blockquote>
        </RevealItem>

        <RevealItem
          as="p"
          variants={fadeIn}
          className="mx-auto mt-8 max-w-prose font-display text-lg font-medium italic leading-relaxed text-olive-700"
        >
          <span lang="id">&ldquo;{quote.translation}&rdquo;</span>
        </RevealItem>

        <RevealItem variants={drawLine} className="mt-8 w-full">
          <SprigDivider />
        </RevealItem>
      </StaggerGroup>
    </section>
  );
}
