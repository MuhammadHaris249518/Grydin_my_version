import React from "react";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";

export interface CtaBandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  className?: string;
}

export function CtaBand({
  title = "Have something in mind? Let's grid it.",
  subtitle = "Talk to our engineering team about your systems, workflows, or product roadmap.",
  buttonText = "Start a conversation",
  buttonHref = "/contact",
  secondaryText,
  secondaryHref,
  className = "",
}: CtaBandProps) {
  return (
    <section className={`relative bg-navy py-16 md:py-20 overflow-hidden text-white ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-navy-600/40 rounded-full blur-2xl pointer-events-none translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
            Ready to build
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <Button
            href={buttonHref}
            variant="primary"
            size="lg"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            {buttonText}
          </Button>

          {secondaryText && secondaryHref && (
            <Button
              href={secondaryHref}
              variant="outline-light"
              size="lg"
            >
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
