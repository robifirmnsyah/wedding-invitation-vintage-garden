"use client";

import { Reveal } from "@/components/Reveal";
import { SprigDivider } from "@/components/Decor";
import { fadeIn } from "@/animations/variants";
import config from "@/lib/config";

/** Islamic verse — QS Ar-Rum 21 as a quiet typographic pause. */
export function Quote() {
  const { quote } = config;

  return (
    <section aria-labelledby="quote-ref" className="section-pad bg-sage-100">
      <Reveal
        variants={fadeIn}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <p id="quote-ref" className="eyebrow !text-olive-700">
          {quote.ref}
        </p>
        <SprigDivider className="mt-4" />
        <blockquote className="mt-2">
          <p dir="rtl" lang="ar" className="arabic-verse text-olive-900">
            {quote.arabic}
          </p>
          <p
            lang="id"
            className="mx-auto mt-8 max-w-prose font-display text-lg font-medium italic leading-relaxed text-olive-700"
          >
            &ldquo;{quote.translation}&rdquo;
          </p>
        </blockquote>
      </Reveal>
    </section>
  );
}
