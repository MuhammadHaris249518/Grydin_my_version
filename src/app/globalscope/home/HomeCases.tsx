"use client";

import Link from "next/link";
import { ArrowRight, FileText, Home, Brain, TrendingUp, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS } from "@/data/projects";

// Card icon map based on industry/slug
const CARD_ICONS = [FileText, Home, Brain];

export function HomeCases() {
  const cases = PROJECTS.slice(0, 3);

  return (
      <section id="cases" className="relative overflow-hidden border-b border-slate-200/80 bg-slate-50/50 py-14 sm:py-20 md:py-28">
      {/* Background Dot Accents */}
      <div className="absolute top-6 left-6 opacity-20 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        {/* Header Block (Clean header without side logos) */}
        <div className="mb-8 max-w-3xl sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-teal-500" />
            CASE STUDIES
          </div>
          <h2 className="mb-3 text-[clamp(1.65rem,7vw,2rem)] font-extrabold leading-tight tracking-tight text-slate-900 sm:mb-4 sm:text-4xl lg:text-[2.75rem]">
            Proven systems engineered for{" "}
            <span className="text-teal-600">real-world impact</span>
          </h2>
          <p className="max-w-2xl text-[13px] font-normal leading-relaxed text-slate-600 sm:text-base">
            Explore how our custom software, agentic pipelines, and system integrations solve specific business bottlenecks.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="-mx-5 mb-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10 md:mx-0 md:mb-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {cases.map((c, i) => {
            const IconComp = CARD_ICONS[i % CARD_ICONS.length];
            const primaryResult = c.results && c.results.length > 0 ? c.results[0] : null;

            return (
              <Reveal key={c.slug} delay={i * 0.1} className="h-full w-[86%] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-xl sm:p-7">

                  {/* Top-Right Mint Diagonal Graphic Badge */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#E5F7F4] rounded-bl-full pointer-events-none flex items-start justify-end p-3 transition-transform group-hover:scale-105">
                    <div className="w-10 h-10 rounded-full bg-white/80 shadow-2xs flex items-center justify-center text-teal-700 mt-1 mr-1">
                      <IconComp className="w-5 h-5 text-teal-700" strokeWidth={2.2} />
                    </div>
                  </div>

                  <div>
                    {/* Card Header Row: Client Name + Sector + Small Arrow Button */}
                    <div className="mb-4 flex items-center justify-between gap-2 pr-14 sm:mb-6 sm:pr-16">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-md">
                          {c.client}
                        </span>
                        <span className="text-slate-300 text-xs">|</span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {c.industry}
                        </span>
                      </div>
                      <Link
                        href={`/projects/${c.slug}`}
                        className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center shrink-0 hover:bg-teal-600 hover:text-white transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-teal-600 sm:mb-4 sm:text-xl">
                      {c.title}
                    </h3>

                    {/* Challenge Section */}
                    <div className="mb-4 sm:mb-6">
                      <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-teal-700 mb-2">
                        <span className="text-teal-500 font-bold mr-1">|</span>
                        THE CHALLENGE
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {c.challenge}
                      </p>
                    </div>

                    {/* Impact Container */}
                    {primaryResult && (
                      <div className="mb-4 rounded-2xl border border-teal-200/80 bg-[#EBF7F5] p-3.5 shadow-2xs sm:mb-6 sm:p-4.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-teal-800 mb-2">
                          <span className="w-5 h-5 rounded-full bg-[#0D8B99] text-white flex items-center justify-center shrink-0">
                            <TrendingUp className="w-3 h-3" />
                          </span>
                          <span>THE IMPACT</span>
                        </div>
                        <p className="text-base sm:text-lg font-extrabold text-[#0D8B99] flex items-center gap-1.5 leading-snug">
                          <span className="text-teal-600">↘</span>
                          <span>{primaryResult.metric}</span>
                        </p>
                        <p className="text-xs text-slate-600 font-medium mt-1">
                          {primaryResult.label}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/projects/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Center Pill Button */}
        <div className="pt-1 text-center sm:pt-2">
          <Link
            href="/solutions#client-projects"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0D8B99] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#0D8B99] shadow-xs transition-all duration-200 hover:bg-[#0D8B99] hover:text-white sm:gap-2.5 sm:px-8 sm:py-3 sm:text-xs"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>VIEW ALL CLIENT PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
