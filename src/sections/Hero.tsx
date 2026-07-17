"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
import config from "@/lib/config";

interface Props {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}

/**
 * Editorial cover: arch-framed couple portrait on ivory paper, serif display
 * names, guest addressing, and the opening CTA. Photography leads; ornament
 * recedes (MASTER.md §1, P0.2/P0.3).
 *
 * The retired watercolor video/petals cover is replaced by a still photograph
 * — the arch reveal is the single mask reveal allowed on this chapter.
 */
export function Hero({ guestName, opened, onOpen }: Props) {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-label="Sampul undangan"
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-ivory-50 px-5 py-12"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <motion.div
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{config.hero.tagline}</p>

          {/* Arch portrait — LCP image, on a beige mat with a hairline border */}
          <div className="arch-frame mt-6 w-[min(68vw,260px)] border border-sage-300 bg-beige-200 p-2 sm:w-72">
            <div className="arch-frame relative aspect-[3/4] w-full">
              <Image
                src="/assets/gallery/gallery-1.jpg"
                alt={`Foto ${groom.shortName} dan ${bride.shortName}`}
                fill
                priority
                sizes="(max-width: 640px) 68vw, 18rem"
                className="object-cover"
              />
            </div>
          </div>

          <h1
            className="mt-8 font-display font-semibold leading-[1.1] tracking-[-0.01em] text-olive-900"
            style={{ fontSize: "var(--text-display)" }}
          >
            {groom.shortName}
            <span className="mx-3 font-accent font-normal text-gold-700">
              &amp;
            </span>
            {bride.shortName}
          </h1>

          <p className="mt-4 font-body text-base tracking-[0.05em] text-olive-700">
            {config.hero.dateLabel}
          </p>

          <div className="mt-8 w-full max-w-xs border-y border-sage-300 px-6 py-4">
            <p className="font-body text-sm uppercase tracking-[0.2em] text-olive-700">
              Kepada Yth.
            </p>
            <p className="mt-2 font-display text-2xl font-medium italic text-olive-900">
              {guestName}
            </p>
          </div>

          {!opened && (
            <motion.button
              onClick={onOpen}
              className="btn-olive mt-8 min-w-44"
              aria-label={`Buka undangan ${groom.shortName} dan ${bride.shortName}`}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <HiOutlineEnvelopeOpen className="text-lg" aria-hidden="true" />
              Buka Undangan
            </motion.button>
          )}
        </motion.div>

        {/* gentle scroll hint once opened */}
        {opened && (
          <div className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 text-olive-700">
            <span className="font-body text-sm tracking-[0.2em]">SCROLL</span>
          </div>
        )}
      </div>
    </section>
  );
}
