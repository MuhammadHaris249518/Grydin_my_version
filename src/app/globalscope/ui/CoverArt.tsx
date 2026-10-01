import React from "react";
import * as LucideIcons from "lucide-react";
import { Sparkles } from "lucide-react";

export interface CoverArtProps {
  seed: string;
  icon?: string;
  className?: string;
  aspect?: "16/9" | "square" | "4/3" | "auto";
  title?: string;
}

// Simple deterministic hash for consistent styling based on seed
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function CoverArt({
  seed,
  icon,
  className = "",
  aspect = "16/9",
  title,
}: CoverArtProps) {
  const hash = hashCode(seed || "grydin-seed");

  // Deterministic variations
  const angles = [135, 150, 165, 120, 140, 155];
  const angle = angles[hash % angles.length];

  const tealOpacities = [0.15, 0.22, 0.18, 0.25];
  const tealOpacity = tealOpacities[(hash >> 2) % tealOpacities.length];

  const spotX = 60 + ((hash >> 3) % 35);
  const spotY = 20 + ((hash >> 4) % 40);

  // Icon lookup
  let IconComponent: React.ComponentType<{ className?: string }> = Sparkles;
  if (icon) {
    const PascalIcon =
      icon.charAt(0).toUpperCase() +
      icon.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const found = (LucideIcons as Record<string, unknown>)[PascalIcon] ||
      (LucideIcons as Record<string, unknown>)[icon];
    if (found && typeof found === "function") {
      IconComponent = found as React.ComponentType<{ className?: string }>;
    }
  }

  const aspectStyles = {
    "16/9": "aspect-[16/9]",
    square: "aspect-square",
    "4/3": "aspect-[4/3]",
    auto: "h-full w-full",
  };

  return (
    <div
      className={`relative overflow-hidden bg-navy select-none flex items-center justify-center ${
        aspectStyles[aspect]
      } ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, #04172e 0%, #082545 55%, #0c3159 100%)`,
      }}
    >
      {/* Deterministic radial glow in teal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(13, 139, 153, ${tealOpacity}), transparent 65%)`,
        }}
      />

      {/* Subtle modern tech grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${hash}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#0d8b99"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${hash})`} />
      </svg>

      {/* Subtle ambient circuit accent line */}
      <div
        className="absolute h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent pointer-events-none"
        style={{
          top: `${30 + (hash % 40)}%`,
          left: "10%",
          right: "10%",
        }}
      />

      {/* Center Icon and optional title */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal/10 border border-teal/30 flex items-center justify-center text-teal shadow-inner group-hover:scale-105 transition-transform duration-300">
          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        {title && (
          <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-300 tracking-wide max-w-[200px] line-clamp-1">
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
