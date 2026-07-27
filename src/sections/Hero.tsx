"use client";

import { motion } from "framer-motion";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
import { VintageGardenFrame } from "@/components/decorative/VintageGardenFrame";
import config from "@/lib/config";

interface Props {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}

export function Hero({ guestName, opened, onOpen }: Props) {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-label="Sampul undangan"
      className="vintage-garden-cover relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-ivory-50"
    >
      <div className="relative mx-auto h-svh min-h-[568px] w-full max-w-[560px] overflow-hidden bg-ivory-50 text-center shadow-paper">
        <VintageGardenFrame />

        <motion.div
          className="absolute inset-x-[13%] top-[20%] z-10 flex flex-col items-center rounded-[46%] px-3 py-7 sm:top-[19%] sm:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="eyebrow">{config.hero.tagline}</p>

          <h1
            className="mt-3 font-display font-semibold leading-[1.02] tracking-[-0.02em] text-olive-900"
            style={{ fontSize: "clamp(2.5rem, 11vw, 4rem)" }}
          >
            {groom.shortName}
            <span className="mx-2 font-accent font-normal text-gold-700 sm:mx-3">
              &amp;
            </span>
            {bride.shortName}
          </h1>

          <p className="mt-2 font-body text-sm tracking-[0.08em] text-olive-700 sm:text-base">
            {config.hero.dateLabel}
          </p>

          <div className="mt-4 w-full max-w-[17rem] border-y border-gold-600/40 bg-ivory-50/35 px-4 py-3 backdrop-blur-[1.5px] sm:mt-6 sm:max-w-xs">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-olive-700 sm:text-sm">
              Kepada Yth.
            </p>
            <p className="mt-1 font-display text-xl font-medium italic text-olive-900 sm:text-2xl">
              {guestName}
            </p>
          </div>

          {!opened && (
            <motion.button
              onClick={onOpen}
              className="btn-olive mt-5 min-w-44 shadow-paper sm:mt-7"
              aria-label={`Buka undangan ${groom.shortName} dan ${bride.shortName}`}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <HiOutlineEnvelopeOpen className="text-lg" aria-hidden="true" />
              Buka Undangan
            </motion.button>
          )}
        </motion.div>

        {opened && (
          <div className="scroll-cue absolute bottom-[11%] left-1/2 z-10 -translate-x-1/2 text-olive-700">
            <span className="font-body text-sm tracking-[0.2em]">SCROLL</span>
          </div>
        )}
      </div>
    </section>
  );
}
