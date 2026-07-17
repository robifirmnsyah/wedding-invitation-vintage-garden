"use client";

import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/Decor";
import { useCountdown } from "@/hooks/useCountdown";
import config from "@/lib/config";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center px-1 sm:px-4">
      <span className="font-display text-4xl font-semibold tabular-nums text-olive-900 sm:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 font-body text-sm font-medium uppercase tracking-[0.15em] text-olive-700">
        {label}
      </span>
    </div>
  );
}

/**
 * Save the Date — editorial countdown between hairline rules.
 * The tiles are decorative for AT; the timer announces as one plain
 * sentence (MASTER.md §17.11). One chapter reveal, no ambient petals.
 */
export function SaveDate() {
  const t = useCountdown(config.countdownTarget);

  return (
    <section aria-labelledby="save-date-title" className="section-pad bg-ivory-50">
      <SectionTitle
        id="save-date-title"
        eyebrow="Save The Date"
        title="Counting The Days"
      />

      <Reveal className="mx-auto mt-10 flex max-w-lg flex-col items-center text-center">
        <time
          dateTime={config.countdownTarget}
          className="font-display font-medium italic text-gold-700"
          style={{ fontSize: "var(--text-lead)" }}
        >
          {config.hero.dateLabel}
        </time>

        <div
          role="timer"
          aria-label={`${t.days} hari ${t.hours} jam ${t.minutes} menit ${t.seconds} detik menuju hari pernikahan`}
          className="mt-8 w-full"
        >
          <div
            aria-hidden="true"
            className="grid grid-cols-4 divide-x divide-sage-300 border-y border-sage-300 py-6"
          >
            <Unit value={t.days} label="Hari" />
            <Unit value={t.hours} label="Jam" />
            <Unit value={t.minutes} label="Menit" />
            <Unit value={t.seconds} label="Detik" />
          </div>
        </div>

        {t.done && (
          <p className="mt-8 font-display text-lg font-medium italic text-olive-700">
            Alhamdulillah, hari bahagia telah tiba 🤍
          </p>
        )}
      </Reveal>
    </section>
  );
}
