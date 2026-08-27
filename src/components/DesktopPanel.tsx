"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import config, { isTasyakur } from "@/lib/config";

/**
 * Decorative floral corner.
 * Uses dedicated directional assets for each corner.
 */
function CornerFloral({
  src,
  className = "",
  objectPosition = "top left",
}: {
  src: string;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute select-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt=""
          fill
          className="object-contain"
          style={{ objectPosition }}
          sizes="(max-width: 1400px) 25vw, 320px"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function DesktopPanel() {
  const { groom, bride } = config.couple;
  const person1 = isTasyakur ? groom : bride;
  const person2 = isTasyakur ? bride : groom;

  // Use hero photo or bride/groom prewed image
  const displayPhoto =
    config.hero.photo || "/assets/gallery/prewed/gambar-3.jpg";

  return (
    <aside
      aria-label="Panel Dekorasi Undangan"
      className="
        fixed inset-y-0 left-0
        hidden h-screen
        w-[calc(100%-480px)]
        xl:w-[calc(100%-520px)]
        2xl:w-[calc(100%-560px)]
        lg:flex flex-col items-center justify-center
        overflow-hidden
        bg-[#f6f2e8]
        border-r border-[#dfd6c5]/80
        shadow-[inset_-10px_0_25px_rgba(0,0,0,0.03)]
        z-10
      "
    >
      {/* ── Background subtle watercolor grove texture ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-multiply">
        <Image
          src="/assets/decorative/vintage-garden-frame/watercolor-tree-grove.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* ── Subtle paper vignette radial gradient ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(228, 219, 202, 0.5) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────
          TOP LEFT FLORAL
          Direct asset, no rotation.
          Negative offset removes space from the corner.
      ───────────────────────────────────────────── */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -left-4
          -top-4
          h-64 w-64
          xl:h-80 xl:w-80
          2xl:h-96 2xl:w-96
        "
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <CornerFloral
          src="/assets/decorative/vintage-garden-frame/floral-top-left.png"
          className="
            h-full w-full
            scale-110
            origin-top-left
          "
          objectPosition="top left"
        />
      </motion.div>

      {/* ─────────────────────────────────────────────
          TOP RIGHT FLORAL
          Direct asset, no rotation.
          Negative offset removes space from the corner.
      ───────────────────────────────────────────── */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -right-4
          -top-4
          h-64 w-64
          xl:h-80 xl:w-80
          2xl:h-96 2xl:w-96
        "
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 8.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <CornerFloral
          src="/assets/decorative/vintage-garden-frame/floral-top-right.png"
          className="
            h-full w-full
            scale-110
            origin-top-right
          "
          objectPosition="top right"
        />
      </motion.div>

      {/* ─────────────────────────────────────────────
          BOTTOM LEFT FLORAL
      ───────────────────────────────────────────── */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-4
          -left-8
          h-56 w-56
          xl:h-72 xl:w-72
          2xl:h-80 2xl:w-80
        "
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <CornerFloral
          src="/assets/decorative/vintage-garden-frame/floral-left.png"
          className="h-full w-full"
          objectPosition="bottom left"
        />
      </motion.div>

      {/* ─────────────────────────────────────────────
          BOTTOM RIGHT FLORAL
      ───────────────────────────────────────────── */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-4
          -right-8
          h-56 w-56
          xl:h-72 xl:w-72
          2xl:h-80 2xl:w-80
        "
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <CornerFloral
          src="/assets/decorative/vintage-garden-frame/floral-right.png"
          className="h-full w-full"
          objectPosition="bottom right"
        />
      </motion.div>

      {/* ─────────────────────────────────────────────
          CENTER CONTENT
      ───────────────────────────────────────────── */}
      <div className="relative z-10 flex max-w-lg flex-col items-center px-8 text-center">
        {/* ── Arch Photo Container ── */}
        <motion.div
          className="relative w-56 sm:w-64 xl:w-72 2xl:w-80"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* ── Outer Gold & Ivory Arch Frame ── */}
          <div
            className="
              relative
              aspect-[3/4]
              w-full
              overflow-hidden
              rounded-t-[999px]
              rounded-b-xl
              border-[5px]
              border-[#FAF7F0]
              bg-[#FAF7F0]
              p-1.5
              shadow-[0_12px_32px_rgba(40,32,20,0.16)]
              ring-1
              ring-gold-600/30
            "
          >
            {/* ── Inner Arch Photo ── */}
            <div
              className="
                relative
                h-full w-full
                overflow-hidden
                rounded-t-[999px]
                rounded-b-lg
              "
            >
              <Image
                src={displayPhoto}
                alt={`${person1.shortName} & ${person2.shortName}`}
                fill
                priority
                sizes="(max-width: 1400px) 320px, 400px"
                className="object-cover"
                style={{ objectPosition: "center 25%" }}
              />

              {/* Photo gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* ── Decorative Arch Overlay ── */}
          <Image
            src="/assets/decorative/vintage-garden-frame/portrait-arch-frame.png"
            alt=""
            fill
            className="
              pointer-events-none
              z-10
              scale-[1.09]
              object-contain
              opacity-70
            "
            aria-hidden="true"
          />
        </motion.div>

        {/* ─────────────────────────────────────────────
            TYPOGRAPHY SECTION
        ───────────────────────────────────────────── */}
        <motion.div
          className="mt-7 flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* ── Tagline ── */}
          <p
            className="
              font-body
              text-xs
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#6b5838]
              sm:text-sm
            "
          >
            {config.hero.tagline || "The Wedding Of"}
          </p>

          {/* ── Couple Names ── */}
          <h2
            className="
              mt-2.5
              font-accent
              text-5xl
              leading-[1.15]
              text-[#6B242E]
              drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]
              xl:text-6xl
              2xl:text-7xl
            "
          >
            {person1.shortName}{" "}
            <span
              className="
                mx-1
                font-serif
                text-3xl
                italic
                text-gold-700
                xl:text-4xl
              "
            >
              &amp;
            </span>{" "}
            {person2.shortName}
          </h2>

          {/* ── Date ── */}
          <p
            className="
              mt-3
              font-body
              text-xs
              font-medium
              uppercase
              tracking-[0.22em]
              text-[#555E46]
              sm:text-sm
            "
          >
            {config.hero.dateLabel || "Minggu, 16 Agustus 2026"}
          </p>
        </motion.div>
      </div>
    </aside>
  );
}