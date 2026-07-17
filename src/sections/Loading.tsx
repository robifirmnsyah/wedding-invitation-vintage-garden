"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sprig } from "@/components/Decor";
import config from "@/lib/config";

/** Quiet editorial loading screen: monogram, hairline, names on ivory paper. */
export function Loading({ show }: { show: boolean }) {
  const { groom, bride } = config.couple;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ivory-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sprig className="text-sage-500" />
            <p className="mt-5 font-display text-3xl font-semibold text-olive-900">
              {groom.shortName} &amp; {bride.shortName}
            </p>
            <p className="mt-3 font-body text-sm uppercase tracking-[0.2em] text-olive-700">
              The Wedding Invitation
            </p>
            <span
              aria-hidden="true"
              className="mt-8 block h-px w-24 bg-gold-600"
            />
          </motion.div>
          <span className="sr-only" role="status">
            Memuat undangan…
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
