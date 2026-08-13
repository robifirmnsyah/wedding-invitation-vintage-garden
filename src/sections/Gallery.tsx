"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Lightbox } from "@/components/Lightbox";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import config from "@/lib/config";

const AUTO_ADVANCE_MS = 5200;
const SLIDE_DURATION = 0.9;
const RAIL_DURATION = 1.35;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A portrait-album scene: one large image is the focus, while the thumbnails
 * below invite guests to browse without making the page feel like a dense grid.
 */
export function Gallery() {
  const items = config.gallery;
  const [railPosition, setRailPosition] = useState(items.length);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const railViewportRef = useRef<HTMLDivElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const [railMetrics, setRailMetrics] = useState({ offset: 0, step: 92 });
  const reducedMotion = usePrefersReducedMotion();
  const activeIndex = railPosition % items.length;
  const current = items[displayedIndex];
  const nextIndex = (activeIndex + 1) % items.length;
  const railItems = [...items, ...items, ...items];

  const move = (direction: -1 | 1) => {
    setSlideDirection(direction);
    setRailPosition((position) => position + direction);
  };

  // Keep one upcoming image warm so the gentle crossfade never waits for a
  // network request. The rest remain lazy-loaded until a guest reaches them.
  useEffect(() => {
    const preloaded = new window.Image();
    preloaded.src = items[nextIndex].src;
  }, [items, nextIndex]);

  // Center the middle copy of the infinite rail. Measuring its real thumbnail
  // width keeps the movement exact on both phone and desktop layouts.
  useLayoutEffect(() => {
    const updateMetrics = () => {
      const viewport = railViewportRef.current;
      const firstThumbnail = railTrackRef.current?.firstElementChild as HTMLElement | null;
      if (!viewport || !firstThumbnail) return;
      const gap = Number.parseFloat(getComputedStyle(railTrackRef.current!).gap) || 0;
      setRailMetrics({
        offset: viewport.clientWidth / 2 - firstThumbnail.offsetWidth / 2,
        step: firstThumbnail.offsetWidth + gap,
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  // A self-scheduling timer avoids intersection-observer edge cases on mobile
  // browsers. It lets each photo breathe before the next gentle transition,
  // pauses for the lightbox, then resumes after the guest closes it.
  useEffect(() => {
    if (lightboxIndex !== null) return;

    const timeout = window.setTimeout(() => {
      setSlideDirection(1);
      setRailPosition((position) => position + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timeout);
  }, [lightboxIndex, railPosition]);

  const settleRail = () => {
    setDisplayedIndex(activeIndex);

    // Jump only between identical copies, so the loop remains visually
    // continuous after it has travelled through a complete album.
    if (railPosition >= items.length * 2) setRailPosition(items.length);
    if (railPosition <= 0) setRailPosition(items.length);
  };

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
              initial={{ opacity: 0, x: 60 * slideDirection, scale: 1.015 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60 * slideDirection, scale: 0.99 }}
              transition={{ duration: reducedMotion ? 0 : SLIDE_DURATION, ease: EASE }}
              onClick={() => setLightboxIndex(displayedIndex)}
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
          Foto {displayedIndex + 1} dari {items.length}
        </p>

        <div
          ref={railViewportRef}
          className="mt-4 overflow-hidden pb-2 sm:mt-5"
        >
          <motion.div
            ref={railTrackRef}
            className="flex gap-3"
            initial={false}
            animate={{ x: railMetrics.offset - railPosition * railMetrics.step }}
            transition={{ duration: reducedMotion ? 0 : RAIL_DURATION, ease: EASE }}
            onAnimationComplete={settleRail}
          >
            {railItems.map((item, railIndex) => {
              const index = railIndex % items.length;
              const isMiddleCopy = railIndex >= items.length && railIndex < items.length * 2;
              return (
                <button
                  key={`${item.src}-${railIndex}`}
                  type="button"
                  onClick={() => {
                    setSlideDirection(index >= activeIndex ? 1 : -1);
                    setRailPosition(items.length + index);
                  }}
                  aria-label={`Pilih foto ${index + 1}: ${item.caption}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  tabIndex={isMiddleCopy ? 0 : -1}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-24 sm:w-24 ${
                    activeIndex === index
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
              );
            })}
          </motion.div>
        </div>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => {
          setLightboxIndex(index);
          setSlideDirection(index >= displayedIndex ? 1 : -1);
          setRailPosition(items.length + index);
          setDisplayedIndex(index);
        }}
      />
    </section>
  );
}
