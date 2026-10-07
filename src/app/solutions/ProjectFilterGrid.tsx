"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight } from "lucide-react";

export interface ProjectFilterGridProps {
  projects: Project[];
  featuredProject?: Project;
}

export function ProjectFilterGrid({ projects, featuredProject }: ProjectFilterGridProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  const industries = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.industry)));
    return ["All", ...list];
  }, [projects]);

  return (
    <div>
      {/* Industry Filter Chips */}
      <div className="-mx-5 mb-6 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-10 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {industries.map((ind) => {
          const isSelected = selectedIndustry === ind;
          return (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              aria-pressed={isSelected}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all cursor-pointer sm:px-4 ${
                isSelected
                  ? "bg-[#0D8B99] text-white shadow-md shadow-[#0D8B99]/20 border border-[#0D8B99]"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {ind}
            </button>
          );
        })}
      </div>

      {/* Featured Project Banner (if matches filter or All) */}
      {featuredProject && (selectedIndustry === "All" || featuredProject.industry === selectedIndustry) && (
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#0D8B99] font-bold mb-3">
            Featured Case Study
          </div>
          <Link href={`/projects/${featuredProject.slug}`} className="group block">
            <GlassCard className="p-4 transition-[box-shadow,border-color] duration-300 group-hover:border-[#0D8B99]/40 group-hover:shadow-lg sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Logo / Left Panel */}
                <div className="flex min-h-[132px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:col-span-4 sm:min-h-[200px] sm:p-8">
                  {featuredProject.logo ? (
                    <div className="relative w-48 h-20 flex items-center justify-center">
                      <Image
                        src={featuredProject.logo}
                        alt={`${featuredProject.client} logo`}
                        width={180}
                        height={90}
                        className="object-contain max-h-16"
                      />
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-slate-900">{featuredProject.client}</div>
                  )}
                  <span className="mt-3 font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
                    {featuredProject.client}
                  </span>
                </div>

                {/* Text / Details */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-xs uppercase font-bold text-[#0D8B99] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                        {featuredProject.industry}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Delivered {featuredProject.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3 group-hover:text-[#0D8B99] transition-colors">
                      {featuredProject.title}
                    </h3>

                    <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
                      {featuredProject.summary}
                    </p>

                    {/* Results / Metric Line */}
                    {featuredProject.results.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        {featuredProject.results.map((res, i) => (
                          <div key={i} className="rounded-xl border border-teal-200/80 bg-teal-50/70 p-3.5 shadow-2xs">
                            <div className="text-lg font-mono font-bold text-[#0D8B99]">{res.metric}</div>
                            <div className="text-xs text-slate-600 mt-0.5 line-clamp-1 font-medium">{res.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-[#0D8B99]">
                    <span>View full architectural case study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>
      )}

      {/* Main Grid of Project Cards */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
        {projects.map((proj) => {
          const matches = selectedIndustry === "All" || proj.industry === selectedIndustry;
          if (!matches) return null;

          const primaryResult = proj.results[0];

          return (
            <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group block h-full w-[86%] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
              <GlassCard className="flex h-full flex-col justify-between p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#0D8B99]/40 group-hover:shadow-lg sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0D8B99] font-bold">
                      {proj.client}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {proj.industry}
                    </span>
                  </div>

                  <h4 className="mb-2 text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#0D8B99] sm:text-xl">
                    {proj.title}
                  </h4>

                  <p className="mb-4 text-[13px] font-normal leading-relaxed text-slate-600 sm:mb-6 sm:text-sm">
                    {proj.summary}
                  </p>

                  {/* Prominent Large Result Line */}
                  {primaryResult && (
                    <div className="mb-4 rounded-xl border border-teal-200/80 bg-teal-50/70 p-3 shadow-2xs sm:mb-6 sm:p-4">
                      <div className="text-xl font-mono font-bold text-[#0D8B99]">
                        {primaryResult.metric}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">
                        {primaryResult.label}
                      </div>
                    </div>
                  )}

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.slice(0, 3).map((st) => (
                      <span key={st} className="text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0D8B99]">
                  <span>Read case study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
