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
  secondaryHref = "/solutions#client-projects",
  className = "",
}: CtaBandProps) {
  return (
    <section className={`relative overflow-hidden border-t border-white/10 bg-ink py-12 text-white sm:py-24 md:py-32 ${className}`}>
      <HeroBackdrop network={false} dark={true} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-10 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-glow mb-4">
            Next Steps
          </p>

          <h2 className="text-[clamp(1.65rem,7vw,2.1rem)] font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
              {subtitle}
            </p>
          )}

          <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
