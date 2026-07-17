import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#A94468",
          light: "#CF718D",
          dark: "#7C2948",
        },
        ivory: "#FFFAF8",
        cream: "#FFF4F1",
        sage: "#F3DFE5",
        beige: "#F0DFD2",
        ink: "#3B2730",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "cursive"],
        sub: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-heading)", "cursive"],
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(-110vh) rotate(360deg)", opacity: "0" },
        },
        sway: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(18px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        bloom: {
          "0%": { transform: "scale(0.6) rotate(-8deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      animation: {
        floatUp: "floatUp linear infinite",
        sway: "sway 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 7s ease-in-out infinite",
        bloom: "bloom 1.4s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
