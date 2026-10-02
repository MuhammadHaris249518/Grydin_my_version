import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#04172e", 950: "#031326", 800: "#082545", 700: "#0c3159", 600: "#123e70" },
        teal: { DEFAULT: "#0d8b99", dark: "#0b7884", light: "#e6f4f6", glow: "#2dd4bf" },
        ink: { DEFAULT: "#0f172a", muted: "#475569" },
        surface: { DEFAULT: "#ffffff", soft: "#f4f7fa", line: "#e2e8f0" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(45,212,191,0.45)",
        "glow-sm": "0 0 20px -6px rgba(45,212,191,0.4)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        dash: { to: { strokeDashoffset: "-24" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        dash: "dash 1.2s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;