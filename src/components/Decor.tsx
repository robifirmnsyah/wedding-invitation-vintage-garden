"use client";

/**
 * Editorial ornament primitives — Vintage Garden Editorial
 * (design-system/MASTER.md §9, §14.3).
 *
 * Ornaments are etched single-ink line art, always aria-hidden, and never
 * carry content. `SprigDivider` is the one standard chapter divider.
 */

/** Etched botanical sprig — single-weight engraving stroke, one ink color. */
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 20"
      fill="none"
      className={`h-5 w-12 ${className}`}
    >
      <path
        d="M8 10 C16 10 22 10 40 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M16 10 C15 6.5 12.5 4.5 9.5 4 C10.5 7.5 13 9.5 16 10 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M22 10 C21 13.5 18.5 15.5 15.5 16 C16.5 12.5 19 10.5 22 10 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M28 10 C27 6.5 24.5 4.5 21.5 4 C22.5 7.5 25 9.5 28 10 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="10" r="1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * The standard chapter divider: a centered hairline interrupted by an etched
 * sprig (MASTER.md §9.6). Replaces the old LeafDivider/SceneDivider.
 */
export function SprigDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`sprig-divider ${className}`}>
      <Sprig />
    </div>
  );
}

/** Back-compat alias — old sections imported LeafDivider. */
export const LeafDivider = SprigDivider;

/**
 * A restrained botanical canopy for the cover: two hand-etched vines frame the
 * photograph without competing with the couple. The motion is transform/path
 * only and is disabled by the global reduced-motion rule.
 */
export function GardenVines() {
  return (
    <div className="garden-vines" aria-hidden="true">
      <svg className="garden-vine garden-vine-left" viewBox="0 0 150 520" fill="none">
        <path className="garden-stroke" d="M128 506C106 437 120 382 79 327C41 277 55 227 82 188C109 149 111 99 72 26" />
        <path className="garden-stroke garden-leaf garden-leaf-1" d="M79 327C52 326 34 306 30 278C57 280 76 295 79 327Z" />
        <path className="garden-stroke garden-leaf garden-leaf-2" d="M66 291C91 276 108 251 106 224C82 232 67 253 66 291Z" />
        <path className="garden-stroke garden-leaf garden-leaf-3" d="M82 188C54 183 36 162 36 137C62 144 78 158 82 188Z" />
        <path className="garden-stroke garden-leaf garden-leaf-4" d="M89 155C111 139 121 114 115 91C94 104 84 126 89 155Z" />
        <path className="garden-stroke garden-leaf garden-leaf-5" d="M72 26C48 32 35 18 31 2C52 3 66 10 72 26Z" />
      </svg>
      <svg className="garden-vine garden-vine-right" viewBox="0 0 150 520" fill="none">
        <path className="garden-stroke" d="M22 506C44 437 30 382 71 327C109 277 95 227 68 188C41 149 39 99 78 26" />
        <path className="garden-stroke garden-leaf garden-leaf-1" d="M71 327C98 326 116 306 120 278C93 280 74 295 71 327Z" />
        <path className="garden-stroke garden-leaf garden-leaf-2" d="M84 291C59 276 42 251 44 224C68 232 83 253 84 291Z" />
        <path className="garden-stroke garden-leaf garden-leaf-3" d="M68 188C96 183 114 162 114 137C88 144 72 158 68 188Z" />
        <path className="garden-stroke garden-leaf garden-leaf-4" d="M61 155C39 139 29 114 35 91C56 104 66 126 61 155Z" />
        <path className="garden-stroke garden-leaf garden-leaf-5" d="M78 26C102 32 115 18 119 2C98 3 84 10 78 26Z" />
      </svg>
    </div>
  );
}

/**
 * Chapter opener: eyebrow → title → rule (MASTER §14.3).
 * Poppins uppercase eyebrow, Cormorant serif title, sprig hairline.
 */
export function SectionTitle({
  eyebrow,
  title,
  id,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className={light ? "eyebrow !text-ivory-100" : "eyebrow"}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`chapter-title mt-3 ${light ? "!text-ivory-50" : ""}`}>
        {title}
      </h2>
      <SprigDivider
        className={light ? "mt-5 !text-ivory-100/80" : "mt-5 text-gold-600"}
      />
    </div>
  );
}
