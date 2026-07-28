"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
import { VintageGardenFrame } from "@/components/decorative/VintageGardenFrame";
import { motionTokens } from "@/animations/tokens";
import config from "@/lib/config";

interface Props {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}

const EASE = motionTokens.easeOut;

/** The central column enters after the veil lifts, one line at a time. */
const CENTRE_DELAY = 2.65;

const centre = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: CENTRE_DELAY },
  },
};

const line = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: EASE },
  },
};

export function Hero({ guestName, opened, onOpen }: Props) {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-label="Sampul undangan"
      className="vintage-garden-cover relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-ivory-50"
    >
      <motion.div
        className="relative mx-auto h-svh min-h-[568px] w-full max-w-[560px] overflow-hidden bg-ivory-50 text-center shadow-paper"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: opened ? [1, 1.075, 0.985] : 1,
        }}
        transition={{
          duration: opened ? 1.05 : 0.9,
          times: opened ? [0, 0.34, 1] : undefined,
          ease: EASE,
        }}
      >
        <VintageGardenFrame opened={opened} />

        <motion.div
          className="absolute inset-x-[13%] top-[20%] z-10 flex flex-col items-center rounded-[46%] px-3 py-7 sm:top-[19%] sm:px-8"
          variants={centre}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={line} className="eyebrow">
            {config.hero.tagline}
          </motion.p>

          <motion.h1
            variants={line}
            className="mt-3 font-display font-semibold leading-[1.02] tracking-[-0.02em] text-olive-900"
            style={{ fontSize: "clamp(2.5rem, 11vw, 4rem)" }}
          >
            {groom.shortName}
            <span className="mx-2 font-accent font-normal text-gold-700 sm:mx-3">
              &amp;
            </span>
            {bride.shortName}
          </motion.h1>

          <motion.p
            variants={line}
            className="mt-2 font-body text-sm tracking-[0.08em] text-olive-700 sm:text-base"
          >
            {config.hero.dateLabel}
          </motion.p>

          <motion.div
            variants={line}
            className="mt-4 w-full max-w-[17rem] border-y border-gold-600/40 bg-ivory-50/35 px-4 py-3 sm:mt-6 sm:max-w-xs"
          >
            <p className="font-body text-xs uppercase tracking-[0.2em] text-olive-700 sm:text-sm">
              Kepada Yth.
            </p>
            <p className="mt-1 font-display text-xl font-medium italic text-olive-900 sm:text-2xl">
              {guestName}
            </p>
          </motion.div>

          <AnimatePresence>
            {!opened && (
              <motion.button
                onClick={onOpen}
                className="btn-olive mt-5 min-w-44 shadow-paper sm:mt-7"
                aria-label={`Buka undangan ${groom.shortName} dan ${bride.shortName}`}
                variants={line}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <HiOutlineEnvelopeOpen className="text-lg" aria-hidden="true" />
                Buka Undangan
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute bottom-[11%] left-1/2 z-10 -translate-x-1/2 text-olive-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            >
              <span className="scroll-cue block font-body text-sm tracking-[0.2em]">
                SCROLL
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
