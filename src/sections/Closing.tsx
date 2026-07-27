"use client";

import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { Sprig, SprigDivider } from "@/components/Decor";
import { BotanicalParallax } from "@/components/decorative/BotanicalParallax";
import { fadeIn, riseIn, drawLine, staggerLoose } from "@/animations/variants";
import config from "@/lib/config";

/**
 * Closing — the quiet final chapter on a warm beige mat. Everything fades
 * rather than travels, so the page ends on a settling rather than another
 * entrance.
 */
export function Closing() {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-labelledby="closing-title"
      className="section-pad relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-beige-200"
    >
      <BotanicalParallax
        src="floral-bottom.png"
        side="left"
        className="-bottom-[6%] -left-[10%] -right-[10%] h-[30%]"
        opacity={0.2}
        distance={30}
        sizes="120vw"
      />

      <StaggerGroup
        variants={staggerLoose}
        className="relative mx-auto w-full max-w-2xl text-center"
      >
        <RevealItem variants={fadeIn}>
          <Sprig className="mx-auto text-sage-500" />
        </RevealItem>

        <RevealItem
          as="p"
          variants={fadeIn}
          className="mx-auto mt-8 max-w-prose font-display italic leading-relaxed text-olive-900"
          style={{ fontSize: "var(--text-lead)" }}
        >
          {config.closing.message}
        </RevealItem>

        <RevealItem
          as="p"
          variants={fadeIn}
          className="mt-10 font-body text-base leading-relaxed text-olive-700"
        >
          {config.closing.gratitude}
        </RevealItem>

        <RevealItem variants={riseIn}>
          <h2
            id="closing-title"
            className="mt-6 font-display font-semibold text-olive-900"
            style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
          >
            {groom.shortName}
            <span className="mx-3 font-accent font-normal text-gold-700">&amp;</span>
            {bride.shortName}
          </h2>
        </RevealItem>

        <RevealItem variants={drawLine}>
          <SprigDivider className="mt-10 text-gold-600" />
        </RevealItem>

        <RevealItem
          as="p"
          variants={fadeIn}
          className="mt-2 font-body text-sm tracking-[0.15em] text-olive-700"
        >
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </RevealItem>
      </StaggerGroup>
    </section>
  );
}
