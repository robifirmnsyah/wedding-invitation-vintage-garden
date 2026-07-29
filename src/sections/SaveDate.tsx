"use client";

import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { SprigDivider } from "@/components/Decor";
import { WatercolorLayer } from "@/components/decorative/WatercolorLayer";
import { useCountdown } from "@/hooks/useCountdown";
import {
  fadeIn,
  riseIn,
  scaleIn,
  staggerContainer,
  staggerTight,
} from "@/animations/variants";
import config from "@/lib/config";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <RevealItem
      variants={scaleIn}
      className="flex flex-col items-center px-1 sm:px-4"
    >
      <span className="font-display text-4xl font-semibold tabular-nums text-olive-900 sm:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-700">
        {label}
      </span>
    </RevealItem>
  );
}

/**
 * Save the Date — editorial countdown between hairline rules.
 * The tiles are decorative for AT; the timer announces as one plain
 * sentence (MASTER.md §17.11). Digits settle once on entry — the ticking
 * value itself is never animated, so it stays legible.
 */
export function SaveDate() {
  const t = useCountdown(config.countdownTarget);

  return (
    <section
      aria-labelledby="save-date-title"
      className="section-pad relative isolate overflow-hidden bg-ivory-50"
    >
      <div className="relative mx-auto w-full max-w-[31rem] aspect-[2/3]">
        <WatercolorLayer
          src="ornamental-calendar-frame.png"
          className="inset-0"
          opacity={0.9}
          sizes="(max-width: 640px) 100vw, 31rem"
        />
        <StaggerGroup
          variants={staggerContainer}
          className="relative z-[1] flex h-full flex-col items-center justify-center px-[14%] pt-[8%] text-center"
        >
          <RevealItem variants={riseIn}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold-700 sm:text-sm">
              Save The Date
            </p>
            <h2
              id="save-date-title"
              className="mt-3 font-display font-semibold text-olive-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Counting The Days
            </h2>
          </RevealItem>
          <RevealItem variants={fadeIn}>
            <SprigDivider className="!my-4 text-gold-600" />
          </RevealItem>
          <RevealItem variants={riseIn}>
            <time
              dateTime={config.countdownTarget}
              className="font-display font-medium italic text-gold-700"
              style={{ fontSize: "var(--text-lead)" }}
            >
              {config.hero.dateLabel}
            </time>
          </RevealItem>

          <div
            role="timer"
            aria-label={`${t.days} hari ${t.hours} jam ${t.minutes} menit ${t.seconds} detik menuju hari pernikahan`}
            className="mt-7 w-full"
          >
            <StaggerGroup
              as="div"
              variants={staggerTight}
              aria-hidden="true"
              className="grid grid-cols-4 divide-x divide-sage-300 border-y border-sage-300 py-6"
            >
              <Unit value={t.days} label="Hari" />
              <Unit value={t.hours} label="Jam" />
              <Unit value={t.minutes} label="Menit" />
              <Unit value={t.seconds} label="Detik" />
            </StaggerGroup>
          </div>

          {t.done && (
            <RevealItem
              as="p"
              variants={fadeIn}
              className="mt-8 font-display text-lg font-medium italic text-olive-700"
            >
              Alhamdulillah, hari bahagia telah tiba 🤍
            </RevealItem>
          )}
        </StaggerGroup>
      </div>
    </section>
  );
}
