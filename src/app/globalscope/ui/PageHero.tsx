import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  image?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  image = "/images/hero/hero-banner.jpg",
}: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-navy min-h-[320px] md:min-h-[380px] flex items-center border-b border-white/10">
      {/* Background Image on Right */}
      {image && (
        <div
          className="absolute inset-0 z-0 bg-cover pointer-events-none"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundPosition: "right 25% center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Desktop Horizontal Gradient Blend: Navy on left to transparent on right */}
      <div
        className="absolute inset-0 z-10 hidden md:block pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #04172e 0%, #04172e 38%, rgba(4, 23, 46, 0.95) 48%, rgba(4, 23, 46, 0.72) 58%, rgba(4, 23, 46, 0.15) 72%, rgba(4, 23, 46, 0) 84%)",
        }}
      />

      {/* Mobile/Tablet Vertical Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 md:hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 23, 46, 0.96) 0%, rgba(4, 23, 46, 0.90) 65%, rgba(4, 23, 46, 0.75) 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-2xl text-left">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-4">
              <Breadcrumbs items={breadcrumbs} light />
            </div>
          )}

          {/* Eyebrow Label */}
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
              {eyebrow}
            </p>
          )}

          {/* Main H1 Title (Hero Style) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase text-white tracking-tight leading-[1.12]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
            {subtitle}
          </p>

          {/* Optional Action Buttons */}
          {actions && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
