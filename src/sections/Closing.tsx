"use client";

import { Reveal } from "@/components/Reveal";
import { Sprig, SprigDivider } from "@/components/Decor";
import config from "@/lib/config";

/**
 * Closing — the quiet final chapter on a warm beige mat. One reveal,
 * etched ornament, and the couple's editorial sign-off; all closing copy
 * comes from config unchanged (IMPLEMENTATION_PLAN §P2.5).
 */
export function Closing() {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-labelledby="closing-title"
      className="section-pad flex min-h-svh w-full items-center justify-center bg-beige-200"
    >
      <Reveal className="mx-auto w-full max-w-2xl text-center">
        <Sprig className="mx-auto text-sage-500" />

        <p
          className="mx-auto mt-8 max-w-prose font-display italic leading-relaxed text-olive-900"
          style={{ fontSize: "var(--text-lead)" }}
        >
          {config.closing.message}
        </p>

        <p className="mt-10 font-body text-base leading-relaxed text-olive-700">
          {config.closing.gratitude}
        </p>

        <h2
          id="closing-title"
          className="mt-6 font-display font-semibold text-olive-900"
          style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
        >
          {groom.shortName}
          <span className="mx-3 font-accent font-normal text-gold-700">&amp;</span>
          {bride.shortName}
        </h2>

        <SprigDivider className="mt-10 text-gold-600" />

        <p className="mt-2 font-body text-sm tracking-[0.15em] text-olive-700">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>
      </Reveal>
    </section>
  );
}
