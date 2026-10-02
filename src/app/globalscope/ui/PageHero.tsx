import React, { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { Reveal } from "@/components/motion/Reveal";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  image?: string;
  slot?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  slot,
}: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-navy min-h-[320px] md:min-h-[380px] flex items-center border-b border-white/10">
      <HeroBackdrop network={true} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className={slot ? "lg:col-span-7 text-left" : "max-w-3xl text-left"}>
            <Reveal>
              {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4">
                  <Breadcrumbs items={breadcrumbs} light />
                </div>
              )}

              {eyebrow && (
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-glow mb-3 flex items-center gap-3">
                  <span className="h-px w-6 bg-teal-glow/60" />
                  {eyebrow}
                </p>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-white tracking-tight leading-[1.15]">
                {title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {subtitle}
              </p>

              {actions && (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {actions}
                </div>
              )}
            </Reveal>
          </div>

          {slot && (
            <div className="hidden lg:block lg:col-span-5">
              <Reveal delay={0.15}>
                {slot}
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
