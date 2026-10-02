import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#04172e", 800: "#082545", 700: "#0c3159", 600: "#123e70" },
        teal: { DEFAULT: "#0d8b99", dark: "#0b7884", light: "#e6f4f6" },
        ink: { DEFAULT: "#0f172a", muted: "#475569" },
        surface: { DEFAULT: "#ffffff", soft: "#f4f7fa", line: "#e2e8f0" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;