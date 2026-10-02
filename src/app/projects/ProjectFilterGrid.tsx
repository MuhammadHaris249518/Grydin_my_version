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
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {industries.map((ind) => {
          const isSelected = selectedIndustry === ind;
          return (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              aria-pressed={isSelected}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isSelected
                  ? "bg-accent text-ink border border-accent/30 shadow-glow-sm"
                  : "surface-card text-ink-muted hover:border-white/20 hover:text-ink"
              }`}
            >
              {ind}
            </button>
          );
        })}
      </div>

      {/* Featured Project Banner (if matches filter or All) */}
      {featuredProject && (selectedIndustry === "All" || featuredProject.industry === selectedIndustry) && (
        <div className="mb-14">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            Featured Case Study
          </div>
          <Link href={`/projects/${featuredProject.slug}`} className="group block">
            <GlassCard className="p-8 sm:p-10 transition-[box-shadow,border-color] duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Logo / Left Panel */}
                <div className="lg:col-span-4 bg-white/5 rounded-2xl p-8 flex flex-col items-center justify-center border border-surface-line min-h-[200px]">
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
                    <div className="text-2xl font-bold text-ink">{featuredProject.client}</div>
                  )}
                  <span className="mt-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {featuredProject.client}
                  </span>
                </div>

                {/* Text / Details */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-xs uppercase text-accent bg-accent-light px-2.5 py-0.5 rounded-md border border-accent/30">
                        {featuredProject.industry}
                      </span>
                      <span className="text-xs text-ink-muted font-mono">Delivered {featuredProject.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-3 group-hover:text-accent transition-colors">
                      {featuredProject.title}
                    </h3>

                    <p className="text-base text-ink-muted leading-relaxed mb-6">
                      {featuredProject.summary}
                    </p>

                    {/* Results / Metric Line */}
                    {featuredProject.results.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        {featuredProject.results.map((res, i) => (
                          <div key={i} className="rounded-xl border border-accent/30 bg-accent-light p-3.5">
                            <div className="text-lg font-mono font-semibold text-accent">{res.metric}</div>
                            <div className="text-xs text-ink-muted mt-0.5 line-clamp-1">{res.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const matches = selectedIndustry === "All" || proj.industry === selectedIndustry;
          if (!matches) return null;

          const primaryResult = proj.results[0];

          return (
            <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group block h-full">
              <GlassCard className="h-full flex flex-col justify-between p-7 transition-[box-shadow,border-color] duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 border-b border-surface-line pb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                      {proj.client}
                    </span>
                    <span className="text-xs text-ink-muted font-mono">
                      {proj.industry}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold text-ink tracking-tight mb-2 group-hover:text-accent transition-colors">
                    {proj.title}
                  </h4>

                  <p className="text-sm text-ink-muted leading-relaxed mb-6">
                    {proj.summary}
                  </p>

                  {/* Prominent Large Result Line */}
                  {primaryResult && (
                    <div className="rounded-xl border border-accent/30 bg-accent-light p-4 mb-6">
                      <div className="text-xl font-mono font-semibold text-accent">
                        {primaryResult.metric}
                      </div>
                      <div className="text-xs text-ink-muted mt-1">
                        {primaryResult.label}
                      </div>
                    </div>
                  )}

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.slice(0, 3).map((st) => (
                      <span key={st} className="text-xs font-mono text-ink-muted bg-white/5 border border-surface-line px-2 py-0.5 rounded">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-semibold text-accent">
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
