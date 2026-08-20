"use client";

import { Reveal, StaggerGroup, RevealItem } from "@/components/Reveal";
import { SprigDivider } from "@/components/Decor";
import { WatercolorLayer } from "@/components/decorative/WatercolorLayer";
import {
  fadeIn,
  slideUp,
  riseIn,
  softMask,
  drawLine,
  staggerContainer,
} from "@/animations/variants";
import config from "@/lib/config";
import type { EventInfo } from "@/lib/types";
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";

function EventCard({ event }: { event: EventInfo }) {
  return (
    <StaggerGroup
      variants={staggerContainer}
      early
      className="flex w-full flex-col items-center"
    >
      <RevealItem variants={riseIn} className="text-center">
        <h3
          className="font-display font-semibold text-olive-900"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {event.title}
        </h3>
      </RevealItem>

      <RevealItem variants={drawLine} className="w-full">
        <SprigDivider className="!my-4 text-gold-600" />
      </RevealItem>

      {/* Info Block (Date, Time, Venue) - Centered container, left-aligned contents */}
      <div className="mt-1 w-full space-y-4 font-body text-base text-left text-olive-900">
        <RevealItem
          as="p"
          variants={slideUp}
          className="flex flex-row items-start gap-3"
        >
          <HiOutlineCalendarDays
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-xl text-olive-500"
          />
          <time dateTime={event.date}>{event.dateLabel}</time>
        </RevealItem>

        <RevealItem
          as="p"
          variants={slideUp}
          className="flex flex-row items-start gap-3"
        >
          <HiOutlineClock aria-hidden="true" className="mt-0.5 shrink-0 text-xl text-olive-500" />
          <span>{event.time}</span>
        </RevealItem>

        <RevealItem variants={slideUp}>
          <address className="flex flex-row items-start gap-3 not-italic">
            <HiOutlineMapPin
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-xl text-olive-500"
            />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-lg text-olive-900">
                {event.venue}
              </span>
              <span className="text-sm leading-snug text-olive-700">
                {event.address}
              </span>
            </div>
          </address>
        </RevealItem>
      </div>
    </StaggerGroup>
  );
}

/**
 * Event details — the invitation card proper, presented seamlessly
 * integrated with the floral gate background.
 */
export function EventDetails() {
  return (
    <section
      aria-labelledby="event-title"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-sage-100 py-4 px-2 sm:py-8 sm:px-4"
    >
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        {/* HEADER: Outside and above the gate */}
        <Reveal variants={fadeIn} className="relative z-10 w-full text-center mb-2 sm:mb-4 px-2">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold-700 sm:text-sm">
            Save The Moment
          </p>
          <h2
            id="event-title"
            className="mt-2 font-display font-semibold text-olive-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Wedding Event
          </h2>
          <SprigDivider className="!mt-4 mx-auto text-gold-600" />
        </Reveal>

        {/* GATE CONTAINER */}
        <div className="relative flex aspect-[2/3] w-full flex-col items-center justify-center">
          <WatercolorLayer
            src="event-garden-arch.png"
            className="inset-0 contrast-105 brightness-[1.02]"
            opacity={1}
            quality={100}
            priority={true}
            sizes="(max-width: 640px) 100vw, 28rem"
          />
          
          {/* INNER SAFE ZONE */}
          <div className="relative z-[1] mx-auto flex w-full max-w-[260px] sm:max-w-[280px] flex-col items-center px-4 text-center">
            <EventCard event={config.event.resepsi} />
          </div>
        </div>

        {/* BUTTON: Outside and below the gate */}
        <Reveal
          variants={fadeIn}
          className="mt-3 sm:mt-4 flex w-full justify-center"
        >
          <a
            href={config.event.resepsi.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Lihat lokasi ${config.event.resepsi.venue} di Google Maps (tab baru)`}
            className="btn-olive inline-flex w-auto items-center justify-center gap-2 !px-5 !py-2.5 !text-xs sm:!text-sm shadow-sm transition-all hover:scale-[1.02]"
          >
            <HiOutlineMapPin aria-hidden="true" className="text-base sm:text-lg" /> Lihat Lokasi
          </a>
        </Reveal>
      </div>
    </section>
  );
}
