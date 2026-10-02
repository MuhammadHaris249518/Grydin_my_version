import React from "react";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";

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
  title = "Ready to eliminate manual friction from your business?",
  subtitle = "Tell us what's slowing your team down. You'll receive a scoped roadmap and fixed quote within 48 hours.",
  buttonText = "Book a free process diagnosis",
  buttonHref = "/contact",
  secondaryText = "See our work",
  secondaryHref = "/projects",
  className = "",
}: CtaBandProps) {
  return (
    <section className={`relative overflow-hidden bg-ink py-24 md:py-32 text-white border-t border-white/10 ${className}`}>
      <HeroBackdrop network={false} dark={true} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-glow mb-4">
            Next Steps
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </Reveal>
      </div>
    </section>
  );
}
