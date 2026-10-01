"use client";

import Link from "next/link";

type GrydInLogoProps = {
  /** Slightly larger wordmark for footer */
  variant?: "navbar" | "footer";
  theme?: "light" | "dark";
};

export const GrydInLogo = ({ variant = "navbar", theme }: GrydInLogoProps) => {
  const isDark = theme ? theme === "dark" : variant === "footer";
  const iconSize = variant === "footer" ? 22 : 25;

  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 132.5 145"
        width={iconSize}
        height={iconSize}
        style={{ flexShrink: 0 }}
      >
        <path
          d="M66.354,25.354l26.286,26.286c0.197,0.197,0.518,0.19,0.706-0.015l11.757-12.784c0.176-0.191,0.172-0.486-0.009-0.672 L68.144,0.148C68.052,0.053,67.925,0,67.793,0h-2.848c-0.13,0-0.255,0.052-0.347,0.144L0.143,64.857 C0.051,64.949,0,65.073,0,65.202v13.456c0,0.128,0.05,0.251,0.14,0.343l64.716,65.853c0.092,0.094,0.218,0.146,0.349,0.146h2.897 c0.133,0,0.26-0.054,0.352-0.15l33.409-34.708c0.088-0.091,0.137-0.213,0.137-0.34l-0.023-20.266 c-0.001-1.224-1.461-1.857-2.356-1.023l-31.48,29.355c-0.091,0.084-0.21,0.131-0.334,0.131h-2.601c-0.132,0-0.258-0.053-0.35-0.147 l-42.717-43.71C22.05,74.051,22,73.928,22,73.801v-2.604c0-0.126,0.049-0.247,0.136-0.338l43.519-45.497 C65.844,25.163,66.16,25.16,66.354,25.354z"
          fill="#0d8b99"
        />
        <path
          d="M66.5,63.5v20h43v17.775c0,1.146,1.407,1.695,2.183,0.852l20.407-22.181c0.264-0.287,0.41-0.662,0.41-1.052V63.95 c0-0.249-0.202-0.45-0.45-0.45H66.5z"
          fill="#0d8b99"
        />
      </svg>
      <span
        style={{
          fontSize: variant === "footer" ? "1.2rem" : "1.35rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: isDark ? "#ffffff" : "#111827",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          lineHeight: 1,
        }}
      >
        Grydin
      </span>
    </Link>
  );
};
