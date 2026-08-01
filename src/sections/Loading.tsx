"use client";

import { AnimatePresence, motion } from "framer-motion";

/**
 * Minimalist loading screen: a breathing heart mark (its two lobes read as
 * two figures leaning together) over a plain white ground.
 */
function HeartMark() {
  return (
    <svg
      viewBox="0 0 64 56"
      className="h-12 w-12"
      aria-hidden="true"
    >
      <path
        d="M32 50
           C 14 38, 4 27, 4 16.5
           C 4 7.5, 11 2, 18.5 2
           C 24.5 2, 29 5.5, 32 11
           C 35 5.5, 39.5 2, 45.5 2
           C 53 2, 60 7.5, 60 16.5
           C 60 27, 50 38, 32 50 Z"
        fill="#e11d6f"
      />
    </svg>
  );
}

export function Loading({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartMark />
          </motion.div>
          <p className="mt-4 font-body text-sm tracking-[0.05em] text-neutral-500">
            Loading...
          </p>
          <span className="sr-only" role="status">
            Memuat undangan…
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
