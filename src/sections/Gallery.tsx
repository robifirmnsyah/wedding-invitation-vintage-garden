"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Lightbox } from "@/components/Lightbox";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import config from "@/lib/config";

const AUTO_ADVANCE_MS = 3000;

/**
 * A portrait-album scene: one large image is the focus, while the thumbnails
 * below invite guests to browse without making the page feel like a dense grid.
 */
export function Gallery() {
  const [selected, setSelected] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { amount: 0.35 });
  const reducedMotion = usePrefersReducedMotion();
  const items = config.gallery;
  const current = items[selected];
  const nextIndex = (selected + 1) % items.length;

  const move = (direction: -1 | 1) => {
    setSelected((index) => (index + direction + items.length) % items.length);
  };

  // Keep one upcoming image warm so the gentle crossfade never waits for a
  // network request. The rest remain lazy-loaded until a guest reaches them.
  useEffect(() => {
    const preloaded = new window.Image();
    preloaded.src = items[nextIndex].src;
  }, [items, nextIndex]);

  // The thumbnail rail is the visible progress of the album. Keep the chosen
  // image centered as it advances, so guests can see the strip slide as well
  // as the matching photograph changing above it.
  useEffect(() => {
    const selectedThumbnail = thumbnailStripRef.current?.querySelector<HTMLElement>(
      `[data-gallery-index="${selected}"]`,
    );
    selectedThumbnail?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [reducedMotion, selected]);

  // Autoplay gives the gallery a living, editorial rhythm. It only runs while
  // visible, pauses for the lightbox, and honours the system motion setting.
  useEffect(() => {
    if (reducedMotion || !galleryInView || lightboxIndex !== null) return;

    const interval = window.setInterval(() => {
      setSelected((index) => (index + 1) % items.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(interval);
  }, [galleryInView, items.length, lightboxIndex, reducedMotion, selected]);

  return (
    <section
      ref={galleryRef}
      aria-labelledby="gallery-title"
      className="section-pad overflow-hidden bg-ivory-50"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-accent text-[clamp(2.55rem,11vw,4rem)] leading-none text-olive-800">
          Portraits of Us
        </p>
        <p id="gallery-title" className="mt-3 font-body text-sm tracking-[0.12em] text-olive-700">
          A collection of our favorite moments
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-3xl">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-beige-200 shadow-paper sm:rounded-[2.25rem]">
          <AnimatePresence mode="wait">
            <motion.button
              key={current.src}
              type="button"
              aria-label={`Perbesar foto: ${current.caption}`}
              className="absolute inset-0 block w-full cursor-zoom-in"
              initial={{ opacity: 0, x: 42, scale: 1.015 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -42, scale: 0.99 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightboxIndex(selected)}
            >
              <Image
                src={current.src}
                alt={current.caption}
                fill
                loading="lazy"
                sizes="(max-width: 640px) calc(100vw - 2.5rem), 42rem"
                className="object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-olive-950/45 to-transparent" />
              <span className="absolute bottom-4 left-5 font-display text-lg italic text-ivory-50 sm:bottom-5 sm:left-6">
                {current.caption}
              </span>
            </motion.button>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/85 text-olive-800 shadow-paper transition hover:bg-ivory-50 sm:left-4"
          >
            <HiChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/85 text-olive-800 shadow-paper transition hover:bg-ivory-50 sm:right-4"
          >
            <HiChevronRight className="h-6 w-6" />
          </button>
        </div>

        <p className="mt-3 text-center font-body text-xs tracking-[0.08em] text-olive-700/75" aria-live="off">
          Foto {selected + 1} dari {items.length}
        </p>

        <div
          ref={thumbnailStripRef}
          className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[calc(50%-2.5rem)] pb-2 [scrollbar-width:none] sm:mt-5 sm:px-[calc(50%-3rem)]"
        >
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              data-gallery-index={index}
              onClick={() => setSelected(index)}
              aria-label={`Pilih foto ${index + 1}: ${item.caption}`}
              aria-current={selected === index ? "true" : undefined}
              className={`relative h-20 w-20 shrink-0 snap-start overflow-hidden rounded-xl border-2 transition sm:h-24 sm:w-24 ${
                selected === index
                  ? "border-gold-600 shadow-paper"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="6rem"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => {
          setLightboxIndex(index);
          setSelected(index);
        }}
      />
    </section>
  );
}
