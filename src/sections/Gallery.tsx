"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Lightbox } from "@/components/Lightbox";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import config from "@/lib/config";

const AUTO_ADVANCE_MS = 5400;
const SLIDE_DURATION = 1.1;
const RAIL_DURATION_MS = 1050;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A portrait-album scene: one large image is the focus, while the thumbnails
 * below invite guests to browse without making the page feel like a dense grid.
 */
export function Gallery() {
  const [selected, setSelected] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const items = config.gallery;
  const current = items[selected];
  const nextIndex = (selected + 1) % items.length;

  const move = (direction: -1 | 1) => {
    setSlideDirection(direction);
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
    const strip = thumbnailStripRef.current;
    if (!strip || !selectedThumbnail) return;

    const destination = Math.max(
      0,
      Math.min(
        strip.scrollWidth - strip.clientWidth,
        selectedThumbnail.offsetLeft - (strip.clientWidth - selectedThumbnail.offsetWidth) / 2,
      ),
    );

    if (reducedMotion) {
      strip.scrollLeft = destination;
      return;
    }

    const from = strip.scrollLeft;
    const startedAt = performance.now();
    let frame = 0;
    const easeOutQuart = (value: number) => 1 - (1 - value) ** 4;

    const scrollRail = (now: number) => {
      const progress = Math.min((now - startedAt) / RAIL_DURATION_MS, 1);
      strip.scrollLeft = from + (destination - from) * easeOutQuart(progress);
      if (progress < 1) frame = window.requestAnimationFrame(scrollRail);
    };

    frame = window.requestAnimationFrame(scrollRail);
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion, selected]);

  // A self-scheduling timer avoids intersection-observer edge cases on mobile
  // browsers. It lets each photo breathe before the next gentle transition,
  // pauses for the lightbox, then resumes after the guest closes it.
  useEffect(() => {
    if (lightboxIndex !== null) return;

    const timeout = window.setTimeout(() => {
      setSlideDirection(1);
      setSelected((index) => (index + 1) % items.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timeout);
  }, [items.length, lightboxIndex, selected]);

  return (
    <section aria-labelledby="gallery-title" className="section-pad overflow-hidden bg-ivory-50">
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
          <AnimatePresence initial={false} mode="sync">
            <motion.button
              key={current.src}
              type="button"
              aria-label={`Perbesar foto: ${current.caption}`}
              className="absolute inset-0 block w-full cursor-zoom-in"
              initial={{ opacity: 0, x: 72 * slideDirection, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -72 * slideDirection, scale: 0.985 }}
              transition={{ duration: reducedMotion ? 0 : SLIDE_DURATION, ease: EASE }}
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
              onClick={() => {
                setSlideDirection(index >= selected ? 1 : -1);
                setSelected(index);
              }}
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
          setSlideDirection(index >= selected ? 1 : -1);
          setSelected(index);
        }}
      />
    </section>
  );
}
