"use client";

import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { SectionTitle } from "@/components/Decor";
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
      <WatercolorLayer
        src="ornamental-calendar-frame.png"
        className="left-1/2 top-6 h-[min(43rem,112vw)] w-[min(31rem,96vw)] -translate-x-1/2 sm:top-8"
        opacity={0.84}
        sizes="(max-width: 640px) 96vw, 31rem"
      />
      <div className="relative z-[1]">
        <SectionTitle
          id="save-date-title"
          eyebrow="Save The Date"
          title="Counting The Days"
        />

        <StaggerGroup
          variants={staggerContainer}
          className="mx-auto mt-10 flex min-h-[23rem] max-w-lg flex-col items-center justify-center text-center sm:min-h-[29rem]"
        >
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
          className="mt-8 w-full"
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
