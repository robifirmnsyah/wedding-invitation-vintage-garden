"use client";

import { Reveal } from "@/components/Reveal";
import { SectionTitle, SprigDivider } from "@/components/Decor";
import { buildCalendarUrl } from "@/lib/utils";
import config from "@/lib/config";
import type { EventInfo } from "@/lib/types";
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";

function EventCard({ event }: { event: EventInfo }) {
  const coupleNames = `${config.couple.groom.shortName} & ${config.couple.bride.shortName}`;

  return (
    <Reveal className="w-full max-w-md">
      {/* keepsake frame: paper card + double gold hairline (MASTER.md §13.3) */}
      <div className="keepsake-frame p-6 text-center sm:p-8">
        <h3
          className="font-display font-semibold text-olive-900"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {event.title}
        </h3>
        <SprigDivider className="!my-4 text-gold-600" />

        <div className="mt-6 space-y-4 font-body text-base text-olive-900">
          <p className="flex items-center justify-center gap-2">
            <HiOutlineCalendarDays
              aria-hidden="true"
              className="shrink-0 text-olive-500"
            />
            <time dateTime={event.date}>{event.dateLabel}</time>
          </p>
          <p className="flex items-center justify-center gap-2">
            <HiOutlineClock aria-hidden="true" className="shrink-0 text-olive-500" />
            {event.time}
          </p>
          <address className="flex flex-col items-center gap-1 not-italic">
            <span className="flex items-center gap-2 font-medium">
              <HiOutlineMapPin
                aria-hidden="true"
                className="shrink-0 text-olive-500"
              />
              {event.venue}
            </span>
            <span className="max-w-xs text-sm leading-relaxed text-olive-700">
              {event.address}
            </span>
          </address>
        </div>

        <div className="mt-6 overflow-hidden rounded border border-sage-300">
          <iframe
            src={event.mapsEmbed}
            title={`Peta ${event.title}`}
            className="h-44 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Lihat lokasi ${event.venue} di Google Maps (tab baru)`}
            className="btn-ghost"
          >
            <HiOutlineMapPin aria-hidden="true" /> Lihat Lokasi
          </a>
          <a
            href={buildCalendarUrl(event, coupleNames)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Simpan tanggal ke Google Calendar (tab baru)"
            className="btn-olive !px-5 !py-2.5"
          >
            <HiOutlineCalendarDays aria-hidden="true" /> Simpan Tanggal
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Event details — the invitation card proper, presented as a keepsake
 * frame on a sage mat chapter. Map URL, embed, and calendar action are
 * unchanged (IMPLEMENTATION_PLAN §P1.5).
 */
export function EventDetails() {
  return (
    <section aria-labelledby="event-title" className="section-pad bg-sage-100">
      <SectionTitle id="event-title" eyebrow="Save The Moment" title="Wedding Event" />
      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center">
        <EventCard event={config.event.resepsi} />
      </div>
    </section>
  );
}
