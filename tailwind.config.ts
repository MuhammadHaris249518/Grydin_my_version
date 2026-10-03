import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        // ── Hero-protection tokens (do NOT remove) ──────────────────────────
        navy: { DEFAULT: "#04172e", 950: "#031326", 800: "#082545", 700: "#0c3159", 600: "#123e70" },
        teal: { DEFAULT: "#0d8b99", dark: "#0b7884", light: "#e6f4f6", glow: "#2dd4bf" },
        // ── Light-theme semantic tokens ─────────────────────────────────────
        ink: { DEFAULT: "#0f172a", muted: "#475569" },
        surface: { DEFAULT: "#ffffff", soft: "#f4f7fa", line: "#e2e8f0" },
        // accent = brand saturated colour used in light sections
        accent: { DEFAULT: "#0d8b99", hover: "#0b7884", light: "#e6f4f6", fg: "#ffffff" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        // Hero-protection glow tokens
        glow: "0 0 40px -8px rgba(45,212,191,0.45)",
        "glow-sm": "0 0 20px -6px rgba(45,212,191,0.4)",
        // Light-theme card shadows
        card: "0 1px 3px 0 rgba(15,23,42,0.06), 0 4px 12px -2px rgba(15,23,42,0.05)",
        "card-hover": "0 4px 20px -4px rgba(15,23,42,0.12), 0 2px 8px -2px rgba(15,23,42,0.08)",
        "accent-glow": "0 0 32px -6px rgba(13,139,153,0.35)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        dash: { to: { strokeDashoffset: "-24" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        dash: "dash 1.2s linear infinite",
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [typography],
};

export default config;