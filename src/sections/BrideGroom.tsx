"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { SectionTitle } from "@/components/Decor";
import { slideUp, staggerContainer, inViewOnce } from "@/animations/variants";
import config from "@/lib/config";
import type { Person } from "@/lib/types";

function PersonCard({ person }: { person: Person }) {
  return (
    <motion.div
      variants={slideUp}
      className="flex flex-col items-center text-center"
    >
      {/* arched portrait on an ivory mat — the signature shape (MASTER.md §8, §10.2) */}
      <div className="arch-frame w-56 border border-sage-300 bg-ivory-100 p-2 sm:w-64">
        <div className="arch-frame relative aspect-[3/4] w-full">
          <Image
            src={person.photo}
            alt={`Potret ${person.fullName}`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 14rem, 16rem"
            className="object-cover"
            style={{ objectPosition: "center top" }}
          />
        </div>
      </div>

      <h3
        className="mt-6 font-display font-semibold text-olive-900"
        style={{ fontSize: "var(--text-h3)" }}
      >
        {person.fullName}
      </h3>
      <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-olive-700">
        {person.parents}
      </p>
      <a
        href={`https://instagram.com/${person.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${person.fullName}: @${person.instagram} (tab baru)`}
        className="btn-ghost mt-5"
      >
        <FaInstagram aria-hidden="true" />
        @{person.instagram}
      </a>
    </motion.div>
  );
}

/**
 * Bride & groom — arched editorial portraits on a beige mat chapter.
 * One chapter reveal: the pair staggers in together (MASTER.md §15.1).
 */
export function BrideGroom() {
  const { groom, bride } = config.couple;

  return (
    <section
      aria-labelledby="bride-groom-title"
      className="section-pad bg-beige-200"
    >
      <SectionTitle
        id="bride-groom-title"
        eyebrow="Bismillah"
        title="The Bride & Groom"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8"
      >
        <PersonCard person={groom} />
        <PersonCard person={bride} />
      </motion.div>
    </section>
  );
}
