"use client";

import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { SprigDivider } from "@/components/Decor";
import { BotanicalParallax } from "@/components/decorative/BotanicalParallax";
import { WatercolorLayer } from "@/components/decorative/WatercolorLayer";
import {
  fadeIn,
  slideUp,
  riseIn,
  softMask,
  drawLine,
  staggerContainer,
} from "@/animations/variants";
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
    <StaggerGroup
      variants={staggerContainer}
      early
      className="w-full max-w-md"
    >
      {/* keepsake frame: paper card + double gold hairline (MASTER.md §13.3) */}
      <div className="keepsake-frame p-6 text-center sm:p-8">
        <RevealItem variants={riseIn}>
          <h3
            className="font-display font-semibold text-olive-900"
            style={{ fontSize: "var(--text-h3)" }}
          >
            {event.title}
          </h3>
        </RevealItem>

        <RevealItem variants={drawLine}>
          <SprigDivider className="!my-4 text-gold-600" />
        </RevealItem>

        <div className="mt-6 space-y-4 font-body text-base text-olive-900">
          <RevealItem
            as="p"
            variants={slideUp}
            className="flex items-center justify-center gap-2"
          >
            <HiOutlineCalendarDays
              aria-hidden="true"
              className="shrink-0 text-olive-500"
            />
            <time dateTime={event.date}>{event.dateLabel}</time>
          </RevealItem>

          <RevealItem
            as="p"
            variants={slideUp}
            className="flex items-center justify-center gap-2"
          >
            <HiOutlineClock aria-hidden="true" className="shrink-0 text-olive-500" />
            {event.time}
          </RevealItem>

          <RevealItem variants={slideUp}>
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
          </RevealItem>
        </div>

        {/* the live map itself is left alone — only its frame is revealed */}
        <RevealItem
          variants={softMask}
          className="mt-6 overflow-hidden rounded border border-sage-300"
        >
          <iframe
            src={event.mapsEmbed}
            title={`Peta ${event.title}`}
            className="h-44 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealItem>

        <RevealItem
          variants={fadeIn}
          className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"
        >
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
        </RevealItem>
      </div>
    </StaggerGroup>
  );
}

/**
 * Event details — the invitation card proper, presented as a keepsake
 * frame on a sage mat chapter. Map URL, embed, and calendar action are
 * unchanged (IMPLEMENTATION_PLAN §P1.5).
 */
export function EventDetails() {
  return (
    <section
      aria-labelledby="event-title"
      className="section-pad relative overflow-hidden bg-sage-100"
    >
      <BotanicalParallax
        src="floral-right.png"
        side="right"
        className="-right-[18%] top-[10%] h-[48%] w-[44%] sm:-right-[5%] sm:w-[24%]"
        opacity={0.13}
        distance={-48}
      />

      <div className="relative mx-auto flex min-h-[52rem] w-full max-w-[43rem] flex-col items-center justify-center py-20 sm:min-h-[56rem] sm:py-24">
        <WatercolorLayer
          src="event-garden-arch.png"
          className="inset-0"
          opacity={0.82}
          sizes="(max-width: 640px) 100vw, 43rem"
        />
        <div className="relative z-[1] flex w-full flex-col items-center px-[12%] text-center sm:px-[16%]">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold-700 sm:text-sm">
              Save The Moment
            </p>
            <h2
              id="event-title"
              className="mt-3 font-display font-semibold text-olive-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Wedding Event
            </h2>
            <SprigDivider className="!my-4 text-gold-600" />
          </div>
          <div className="mt-3 w-full">
            <EventCard event={config.event.resepsi} />
          </div>
        </div>
      </div>
    </section>
  );
}
