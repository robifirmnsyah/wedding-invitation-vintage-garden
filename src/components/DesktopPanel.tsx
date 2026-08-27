"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import config, { isTasyakur } from "@/lib/config";

/**
 * Intricate Javanese Gunungan (Kayon) SVG Icon with gold gradient finish
 */
function GununganOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGununganGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC37C" />
          <stop offset="35%" stopColor="#C29B48" />
          <stop offset="70%" stopColor="#8F6C26" />
          <stop offset="100%" stopColor="#B8933F" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#423010" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#goldGlow)">
        {/* Outer Kayon Silhouette */}
        <path
          d="M100 8 C115 45, 168 115, 178 185 C186 240, 165 268, 142 278 L142 294 L58 294 L58 278 C35 268, 14 240, 22 185 C32 115, 85 45, 100 8 Z"
          fill="url(#goldGununganGrad)"
          stroke="#5E4515"
          strokeWidth="1.5"
          opacity="0.92"
        />
        {/* Inner Tree of Life & Sacred Geometry Lines */}
        <path
          d="M100 24 L100 280 M100 70 C75 95, 45 140, 48 180 C80 180, 100 150, 100 150 C100 150, 120 180, 152 180 C155 140, 125 95, 100 70 Z"
          stroke="#423010"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M100 110 C80 130, 60 170, 62 210 M100 110 C120 130, 140 170, 138 210 M100 160 C70 190, 50 230, 52 265 M100 160 C130 190, 150 230, 148 265"
          stroke="#FBF9F3"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Central Gate / Rumah Joglo outline */}
        <path
          d="M82 245 L100 225 L118 245 L118 278 L82 278 Z"
          fill="#3B2607"
          stroke="#DFC37C"
          strokeWidth="1"
          opacity="0.75"
        />
      </g>
    </svg>
  );
}

/**
 * Deep burgundy/maroon vintage floral corner arrangement
 */
function CornerRoseCluster({
  className = "",
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const transform = `${flipX ? "scaleX(-1) " : ""}${flipY ? "scaleY(-1)" : ""}`.trim();

  return (
    <div
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ transform: transform || undefined }}
      aria-hidden="true"
    >
      <div className="relative h-full w-full">
        {/* Botanical leaf and branch underlay */}
        <div className="absolute inset-0 opacity-85">
          <Image
            src="/assets/decorative/vintage-garden-frame/floral-top-left.png"
            alt=""
            fill
            className="object-contain object-top-left"
            sizes="(max-width: 1400px) 25vw, 320px"
          />
        </div>
      </div>
    </div>
  );
}

export function DesktopPanel() {
  const { groom, bride } = config.couple;
  const person1 = isTasyakur ? groom : bride;
  const person2 = isTasyakur ? bride : groom;

  // Use hero photo or bride/groom prewed image
  const displayPhoto = config.hero.photo || "/assets/gallery/prewed/gambar-3.jpg";

  return (
    <aside
      aria-label="Panel Dekorasi Undangan"
      className="fixed inset-y-0 left-0 hidden h-screen w-[calc(100%-480px)] xl:w-[calc(100%-520px)] 2xl:w-[calc(100%-560px)] lg:flex flex-col items-center justify-center overflow-hidden bg-[#f6f2e8] border-r border-[#dfd6c5]/80 shadow-[inset_-10px_0_25px_rgba(0,0,0,0.03)] z-10"
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

      {/* Subtle paper vignette radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(228, 219, 202, 0.5) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Top Left Decorative Corner ── */}
      <motion.div
        className="pointer-events-none absolute -left-8 -top-6 h-56 w-56 xl:h-72 xl:w-72 2xl:h-80 2xl:w-80"
        animate={{ y: [0, -3, 0], rotate: [0, 0.4, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CornerRoseCluster className="h-full w-full" />
      </motion.div>

      {/* ── Top Right Decorative Corner ── */}
      <motion.div
        className="pointer-events-none absolute -right-8 -top-6 h-56 w-56 xl:h-72 xl:w-72 2xl:h-80 2xl:w-80"
        animate={{ y: [0, -3, 0], rotate: [0, -0.4, 0] }}
        transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <CornerRoseCluster className="h-full w-full" flipX />
      </motion.div>

      {/* ── Bottom Left Decorative Corner (Floral + Gunungan) ── */}
      <motion.div
        className="pointer-events-none absolute -bottom-8 -left-6 h-64 w-64 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96"
        animate={{ y: [0, 3, 0], rotate: [0, -0.5, 0] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        {/* Gunungan gold motif */}
        <div className="absolute bottom-6 left-6 h-40 w-28 xl:h-52 xl:w-36 opacity-90">
          <GununganOrnament className="h-full w-full drop-shadow-md" />
        </div>
        {/* Roses bouquet over gunungan */}
        <div className="absolute inset-0 opacity-90">
          <CornerRoseCluster className="h-full w-full" flipY />
        </div>
      </motion.div>

      {/* ── Bottom Right Decorative Corner (Floral + Gunungan) ── */}
      <motion.div
        className="pointer-events-none absolute -bottom-8 -right-6 h-64 w-64 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96"
        animate={{ y: [0, 3, 0], rotate: [0, 0.5, 0] }}
        transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        {/* Gunungan gold motif */}
        <div className="absolute bottom-6 right-6 h-40 w-28 xl:h-52 xl:w-36 opacity-90 -scale-x-100">
          <GununganOrnament className="h-full w-full drop-shadow-md" />
        </div>
        {/* Roses bouquet over gunungan */}
        <div className="absolute inset-0 opacity-90">
          <CornerRoseCluster className="h-full w-full" flipX flipY />
        </div>
      </motion.div>

      {/* ── Center Content: Arch Photo + Typography ── */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center max-w-lg">
        {/* Arch Photo Container */}
        <motion.div
          className="relative w-56 sm:w-64 xl:w-72 2xl:w-80"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer Gold & Ivory Arch Frame */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[999px] rounded-b-xl border-[5px] border-[#FAF7F0] bg-[#FAF7F0] p-1.5 shadow-[0_12px_32px_rgba(40,32,20,0.16)] ring-1 ring-gold-600/30">
            {/* Inner Arch Photo Container */}
            <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-lg">
              <Image
                src={displayPhoto}
                alt={`${person1.shortName} & ${person2.shortName}`}
                fill
                priority
                sizes="(max-width: 1400px) 320px, 400px"
                className="object-cover"
                style={{ objectPosition: "center 25%" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Arch decorative overlay frame if available */}
          <Image
            src="/assets/decorative/vintage-garden-frame/portrait-arch-frame.png"
            alt=""
            fill
            className="pointer-events-none z-10 scale-[1.09] object-contain opacity-70"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Typography Section ── */}
        <motion.div
          className="mt-7 flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tagline */}
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#6b5838] sm:text-sm">
            {config.hero.tagline || "The Wedding Of"}
          </p>

          {/* Couple Names */}
          <h2 className="mt-2.5 font-accent text-5xl xl:text-6xl 2xl:text-7xl text-[#6B242E] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] leading-[1.15]">
            {person1.shortName}{" "}
            <span className="font-serif italic text-3xl xl:text-4xl text-gold-700 mx-1">
              &amp;
            </span>{" "}
            {person2.shortName}
          </h2>

          {/* Date */}
          <p className="mt-3 font-body text-xs font-medium uppercase tracking-[0.22em] text-[#555E46] sm:text-sm">
            {config.hero.dateLabel || "Minggu, 16 Agustus 2026"}
          </p>
        </motion.div>
      </div>
    </aside>
  );
}
