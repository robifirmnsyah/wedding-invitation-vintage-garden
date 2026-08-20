"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineClipboard,
  HiCheck,
  HiGift,
} from "react-icons/hi2";
import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { SectionTitle } from "@/components/Decor";
import { WatercolorLayer } from "@/components/decorative/WatercolorLayer";
import { motionTokens } from "@/animations/tokens";
import { fadeIn, slideUp, staggerContainer } from "@/animations/variants";
import { copyToClipboard } from "@/lib/utils";
import config from "@/lib/config";

function CopyButton({ value, holder }: { value: string; holder: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };
  return (
    <motion.button
      type="button"
      onClick={onCopy}
      aria-label={`Salin nomor rekening ${holder}`}
      className={`min-h-11 w-full cursor-pointer rounded-lg border px-4 py-2.5 font-body text-sm font-semibold transition-colors duration-200 ${
        copied
          ? "border-olive-600 bg-olive-600 text-ivory-50 shadow-sm"
          : "border-sage-300 bg-sage-100/80 text-olive-900 hover:border-olive-600/40 hover:bg-sage-200/70"
      }`}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: motionTokens.durationFast }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          className="inline-flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: motionTokens.durationFast }}
        >
          {copied ? (
            <HiCheck aria-hidden="true" className="text-lg text-ivory-50" />
          ) : (
            <HiOutlineClipboard aria-hidden="true" className="text-lg text-olive-700" />
          )}
          <span>{copied ? "Tersalin ke Clipboard" : "Copy Nomor Rekening"}</span>
        </motion.span>
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {copied ? "Nomor rekening tersalin" : ""}
      </span>
    </motion.button>
  );
}

/**
 * Digital gift — cashless bank accounts revealed on user action via "Klik Disini" button.
 */
export function Gift() {
  const { gift } = config;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      aria-labelledby="gift-title"
      className="section-pad relative isolate overflow-hidden bg-ivory-50"
    >
      <WatercolorLayer
        src="gift-garden-path.png"
        className="bottom-[-18rem] left-1/2 h-[min(42rem,118vw)] w-[min(32rem,102vw)] -translate-x-1/2 sm:bottom-[-15rem]"
        opacity={0.18}
        sizes="(max-width: 640px) 110vw, 36rem"
      />
      <div className="relative z-[1]">
        <SectionTitle id="gift-title" eyebrow="With Love" title="Wedding Gift" />

        <StaggerGroup
          variants={staggerContainer}
          early
          className="mx-auto mt-10 max-w-xl text-center"
        >
          <RevealItem
            as="p"
            variants={fadeIn}
            className="mx-auto max-w-prose font-body text-base leading-relaxed text-olive-700"
          >
            {gift.note}
          </RevealItem>

          {/* Toggle Button */}
          <RevealItem variants={slideUp} className="mt-8 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              whileTap={{ scale: 0.96 }}
              aria-expanded={showDetails}
              className="btn-olive inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold shadow-md transition-all duration-200"
            >
              <HiGift className="text-lg" aria-hidden="true" />
              <span>{showDetails ? "Sembunyikan Rekening" : "Klik Disini"}</span>
            </motion.button>
          </RevealItem>

          {/* Bank Accounts details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                key="bank-list"
                initial={{ opacity: 0, height: 0, y: 16 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 16 }}
                transition={{
                  duration: motionTokens.durationBase,
                  ease: motionTokens.easeOut,
                }}
                className="mt-8 space-y-4 overflow-hidden text-left"
              >
                {gift.banks.map((b) => (
                  <motion.div
                    key={b.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="paper-card flex flex-col gap-4 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Sim card chip aesthetic */}
                      <div
                        className="flex h-8 w-11 items-center justify-center rounded border border-amber-300/80 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 shadow-sm"
                        aria-hidden="true"
                      >
                        <div className="h-5 w-7 rounded-[2px] border border-amber-400/60 bg-amber-200/50" />
                      </div>

                      {b.logo ? (
                        <span className="relative flex h-8 w-28 items-center justify-end">
                          <Image
                            src={b.logo}
                            alt={b.bank}
                            fill
                            sizes="6rem"
                            className={`object-contain object-right ${
                              b.bank.toLowerCase().includes("bca")
                                ? "scale-[1.35] origin-right"
                                : b.bank.toLowerCase().includes("jago")
                                ? "scale-90 origin-right"
                                : ""
                            }`}
                          />
                        </span>
                      ) : (
                        <p
                          className="font-display font-semibold text-olive-900"
                          style={{ fontSize: "var(--text-h3)" }}
                        >
                          {b.bank}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="font-body text-lg font-semibold tracking-wider text-olive-900 tabular-nums">
                        {b.number}
                      </p>
                      <p className="mt-0.5 font-body text-sm font-medium text-olive-700">
                        a.n. {b.holder}
                      </p>
                    </div>

                    <CopyButton value={b.number} holder={b.holder} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </StaggerGroup>
      </div>
    </section>
  );
}
