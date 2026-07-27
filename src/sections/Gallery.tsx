"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/Decor";
import { Lightbox } from "@/components/Lightbox";
import { StaggerGroup } from "@/components/Reveal";
import { softMask, staggerTight } from "@/animations/variants";
import config from "@/lib/config";

const spanClass: Record<string, string> = {
  tall: "col-span-2 row-span-2 sm:col-span-1",
  wide: "col-span-2",
  square: "col-span-2 sm:col-span-1",
};

/**
 * Gallery — editorial photo grid with squared crops on hairline mats,
 * opening the existing Lightbox. Config order, spans, and lightbox
 * behavior are unchanged (IMPLEMENTATION_PLAN §P1.6).
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

      <StaggerGroup
        variants={staggerTight}
        early
        className="mx-auto mt-12 grid max-w-4xl auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-4"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Perbesar foto: ${item.caption || `Foto ${i + 1}`}`}
            className={`group relative cursor-pointer overflow-hidden border border-sage-300 bg-ivory-100 ${
              spanClass[item.span] ?? ""
            }`}
            variants={softMask}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <Image
              src={item.src}
              alt={item.caption || `Foto ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
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
      </StaggerGroup>

      <Lightbox
        items={items}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}
