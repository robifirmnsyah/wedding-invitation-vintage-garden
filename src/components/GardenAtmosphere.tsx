"use client";

/**
 * Lightweight editorial garden assets. SVG keeps the invitation crisp and
 * avoids shipping another image or animation dependency.
 */
export function GardenAtmosphere() {
  return (
    <div className="garden-atmosphere" aria-hidden="true">
      <svg className="garden-cloud garden-cloud-one" viewBox="0 0 220 90" fill="none">
        <path d="M22 66h172c10 0 18-8 18-18s-8-18-18-18h-9C181 15 167 4 151 4c-14 0-27 8-32 20-6-6-14-10-24-10-17 0-31 12-34 28h-7C40 42 31 49 22 66Z" fill="currentColor" opacity=".18" />
        <path d="M28 67h160" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".42" />
      </svg>
      <svg className="garden-cloud garden-cloud-two" viewBox="0 0 180 74" fill="none">
        <path d="M18 55h144c9 0 16-7 16-16s-7-16-16-16h-8C148 11 137 3 124 3c-12 0-23 7-28 17-5-5-12-8-20-8-14 0-26 10-29 23h-6C31 35 23 42 18 55Z" fill="currentColor" opacity=".14" />
      </svg>
      <svg className="garden-bird garden-bird-one" viewBox="0 0 70 34" fill="none">
        <path d="M5 18c9-12 18-12 29 0 10-12 19-12 31 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 17c1 4 1 8-2 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <svg className="garden-bird garden-bird-two" viewBox="0 0 70 34" fill="none">
        <path d="M5 18c9-12 18-12 29 0 10-12 19-12 31 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <svg className="garden-flower garden-flower-left" viewBox="0 0 90 140" fill="none">
        <path d="M45 138C45 94 41 62 31 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M44 98C24 91 14 78 13 63c18 4 29 16 31 35ZM36 67c15-12 27-14 39-10-6 16-19 22-39 10Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="30" cy="16" r="7" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="30" cy="16" r="2" fill="currentColor" />
        <path d="M30 9v-7M23 12l-5-5M37 12l5-5M23 20l-6 4M37 20l6 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <svg className="garden-flower garden-flower-right" viewBox="0 0 90 140" fill="none">
        <path d="M45 138C45 94 49 62 59 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M46 98c20-7 30-20 31-35-18 4-29 16-31 35ZM54 67C39 55 27 53 15 57c6 16 19 22 39 10Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="60" cy="16" r="7" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="60" cy="16" r="2" fill="currentColor" />
        <path d="M60 9V2M53 12l-5-5M67 12l5-5M53 20l-6 4M67 20l6 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}
