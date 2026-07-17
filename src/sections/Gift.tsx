"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HiOutlineClipboard,
  HiCheck,
  HiOutlineMagnifyingGlassPlus,
  HiArrowDownTray,
} from "react-icons/hi2";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/Decor";
import { QrisModal } from "@/components/QrisModal";
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
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Salin nomor rekening ${holder}`}
      className="btn-ghost w-full shrink-0 sm:w-auto"
    >
      {copied ? (
        <HiCheck aria-hidden="true" className="text-olive-600" />
      ) : (
        <HiOutlineClipboard aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Tersalin" : "Salin"}</span>
    </button>
  );
}

/**
 * Digital gift — bank accounts + QRIS on a sage mat chapter. The QRIS block
 * is the page's second keepsake frame (MASTER.md §13.3). Payment details,
 * copy behavior, modal, and download are unchanged (IMPLEMENTATION_PLAN §P2.3).
 */
export function Gift() {
  const { gift } = config;
  const [qrisOpen, setQrisOpen] = useState(false);
  const coupleNames = `${config.couple.groom.shortName}-${config.couple.bride.shortName}`;

  return (
    <section aria-labelledby="gift-title" className="section-pad bg-sage-100">
      <SectionTitle id="gift-title" eyebrow="With Love" title="Wedding Gift" />

      <Reveal className="mx-auto mt-10 max-w-xl text-center">
        <p className="mx-auto max-w-prose font-body text-base leading-relaxed text-olive-700">
          {gift.note}
        </p>

        <div className="mt-10 space-y-4">
          {gift.banks.map((b) => (
            <div
              key={b.number}
              className="paper-card flex flex-col items-stretch gap-4 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                {b.logo ? (
                  <span className="relative flex h-8 w-28 items-center">
                    <Image
                      src={b.logo}
                      alt={b.bank}
                      fill
                      sizes="6rem"
                      className={`object-contain object-left ${
                        b.bank.toLowerCase().includes("bca")
                          ? "scale-[1.5] origin-left"
                          : b.bank.toLowerCase().includes("jago")
                          ? "scale-90 origin-left"
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
                <p className="mt-3 font-body text-base tracking-wider text-olive-900 tabular-nums">
                  {b.number}
                </p>
                <p className="mt-1 font-body text-sm text-olive-700">
                  a.n. {b.holder}
                </p>
              </div>
              <CopyButton value={b.number} holder={b.holder} />
            </div>
          ))}
        </div>

        {gift.qris && (
          <div className="mx-auto mt-12 w-full max-w-sm">
            <div className="keepsake-frame w-full p-4 sm:p-6">
              <p className="text-center font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-700">
                Scan QRIS
              </p>
              <button
                type="button"
                onClick={() => setQrisOpen(true)}
                aria-label="Perbesar QRIS"
                className="group relative mx-auto mt-4 block aspect-[4/5] w-full max-w-[18rem] overflow-hidden border border-sage-300 bg-ivory-50"
              >
                <Image
                  src={gift.qris}
                  alt="QRIS pembayaran"
                  fill
                  sizes="11rem"
                  className="object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-olive-950/0 transition-colors duration-200 group-hover:bg-olive-950/25 group-focus-visible:bg-olive-950/25">
                  <HiOutlineMagnifyingGlassPlus
                    aria-hidden="true"
                    className="text-3xl text-ivory-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
              </button>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setQrisOpen(true)}
                  className="btn-ghost w-full px-3"
                >
                  <HiOutlineMagnifyingGlassPlus aria-hidden="true" /> Perbesar
                </button>
                <a
                  href={gift.qris}
                  download={`QRIS-${coupleNames}.jpeg`}
                  className="btn-ghost w-full px-3"
                >
                  <HiArrowDownTray aria-hidden="true" /> Unduh
                </a>
              </div>
            </div>
          </div>
        )}
      </Reveal>

      {gift.qris && (
        <QrisModal
          src={gift.qris}
          open={qrisOpen}
          onClose={() => setQrisOpen(false)}
          downloadName={`QRIS-${coupleNames}.jpeg`}
        />
      )}
    </section>
  );
}
