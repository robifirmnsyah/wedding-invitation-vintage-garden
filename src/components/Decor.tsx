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
 * Chapter opener: eyebrow → title → rule (MASTER.md §14.3).
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
