/**
 * Motion tokens (design-system/MASTER.md §15) — the single source both CSS
 * variables in globals.css and JS animation (Framer Motion / GSAP) consume.
 */
export const motionTokens = {
  durationFast: 0.2,
  durationBase: 0.6,
  durationSlow: 0.9,
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  distanceMobile: 24,
  distanceDesktop: 40,
  stagger: 0.08,
} as const;
