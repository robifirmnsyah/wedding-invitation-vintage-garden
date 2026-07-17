"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/Decor";
import { Lightbox } from "@/components/Lightbox";
import { inViewOnce } from "@/animations/variants";
import { motionTokens } from "@/animations/tokens";
import config from "@/lib/config";

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

/**
 * Gallery — editorial photo grid with squared crops on hairline mats,
 * opening the existing Lightbox. Config order, spans, and lightbox
 * behavior are unchanged (IMPLEMENTATION_PLAN §P1.6). Captions render
 * in Cormorant italic — script stays reserved for signatures (§4.2).
 */
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const items = config.gallery;

  return (
    <section aria-labelledby="gallery-title" className="section-pad bg-beige-200">
      <SectionTitle
        id="gallery-title"
        eyebrow="Captured Moments"
        title="Our Gallery"
      />

      <div className="mx-auto mt-12 grid max-w-4xl auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4">
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Perbesar foto: ${item.caption || `Foto ${i + 1}`}`}
            className={`group relative cursor-pointer overflow-hidden border border-sage-300 bg-ivory-100 ${
              spanClass[item.span] ?? ""
            }`}
            initial={{ opacity: 0, y: motionTokens.distanceMobile }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{
              duration: motionTokens.durationBase,
              ease: motionTokens.easeOut,
              delay: (i % 4) * motionTokens.stagger,
            }}
          >
            <Image
              src={item.src}
              alt={item.caption || `Foto ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {item.caption && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-olive-950/60 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-3 font-display text-base font-medium italic text-ivory-50"
                >
                  {item.caption}
                </span>
              </>
            )}
          </motion.button>
        ))}
      </div>

      <Lightbox
        items={items}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}
