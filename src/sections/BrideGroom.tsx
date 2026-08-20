"use client";

import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import { SectionTitle } from "@/components/Decor";
import { StaggerGroup, RevealItem } from "@/components/Reveal";
import {
  fadeIn,
  slideUp,
  softMask,
  staggerTight,
} from "@/animations/variants";
import config from "@/lib/config";
import type { Person } from "@/lib/types";

function PersonCard({ person, delay = 0 }: { person: Person; delay?: number }) {
  return (
    <StaggerGroup
      variants={staggerTight}
      delay={delay}
      className="flex flex-col items-center text-center"
    >
      {/* arched portrait on an ivory mat — the signature shape (MASTER.md §8, §10.2) */}
      <RevealItem variants={softMask}>
        <div className="relative w-60 sm:w-72">
          <div className="arch-frame relative aspect-[2/3] w-full border border-sage-300 bg-ivory-100 p-2">
            <div className="arch-frame relative h-full w-full">
            <Image
              src={person.photo}
              alt={`Potret ${person.fullName}`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 15rem, 18rem"
              className="object-cover"
              style={{ objectPosition: "center top" }}
            />
            </div>
          </div>
          <Image
            src="/assets/decorative/vintage-garden-frame/portrait-arch-frame.png"
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 640px) 15rem, 18rem"
            className="pointer-events-none z-[1] scale-[1.08] object-contain"
            aria-hidden="true"
          />
        </div>
      </RevealItem>

      <RevealItem variants={slideUp}>
        <h3
          className="mt-6 font-display font-semibold text-olive-900"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {person.fullName}
        </h3>
      </RevealItem>

      <RevealItem
        as="p"
        variants={fadeIn}
        className="mt-2 max-w-xs font-body text-sm leading-relaxed text-olive-700"
      >
        {person.parents}
      </RevealItem>

      <RevealItem variants={slideUp}>
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${person.fullName}: @${person.instagram} (tab baru)`}
          className="btn-ghost mt-5"
        >
          <FaInstagram aria-hidden="true" />@{person.instagram}
        </a>
      </RevealItem>
    </StaggerGroup>
  );
}

/**
 * Bride & groom — arched editorial portraits on a beige mat chapter.
 * The pair enters together; each card's contents then resolve in sequence.
 */
export function BrideGroom() {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-labelledby="bride-groom-title"
      className="section-pad relative overflow-hidden bg-beige-200"
    >
      <SectionTitle
        id="bride-groom-title"
        eyebrow="Bismillah"
        title="The Bride & Groom"
      />

      <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
        <PersonCard person={groom} />
        <PersonCard person={bride} delay={0.16} />
      </div>
    </section>
  );
}
