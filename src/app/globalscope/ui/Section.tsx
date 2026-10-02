import React from "react";

export interface SectionProps {
  tone?: "white" | "soft" | "ink";
  eyebrow?: string;
  title?: string;
  intro?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  tone = "white",
  eyebrow,
  title,
  intro,
  id,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const toneBg = {
    white: "bg-surface text-ink border-surface-line",
    soft: "bg-surface-soft text-ink border-surface-line",
    // Dark ink tone for CTA/contrast sections
    ink: "bg-ink text-white border-white/10",
  }[tone];

  const isInk = tone === "ink";

  return (
    <section
      id={id}
      className={`relative w-full py-16 md:py-24 border-b ${toneBg} ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 ${containerClassName}`}
      >
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl mb-12 sm:mb-16 text-left">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3 block">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${
                  isInk ? "text-white" : "text-ink"
                }`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isInk ? "text-white/70" : "text-ink-muted"
                }`}
              >
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
