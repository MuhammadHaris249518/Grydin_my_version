"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
        {industries.map((ind) => {
          const isSelected = selectedIndustry === ind;
          return (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              aria-pressed={isSelected}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isSelected
                  ? "bg-teal text-white shadow-xs"
                  : "bg-surface-soft text-ink-muted border border-surface-line hover:border-slate-300 hover:text-ink"
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
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
            Featured Case Study
          </div>
          <Card
            href={`/projects/${featuredProject.slug}`}
            className="p-6 sm:p-8 lg:p-10 border border-teal/30 hover:border-teal transition-all shadow-sm hover:shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Logo / Left Panel */}
              <div className="lg:col-span-4 bg-surface-soft rounded-xl p-8 flex flex-col items-center justify-center border border-surface-line min-h-[220px]">
                {featuredProject.logo ? (
                  <div className="relative w-48 h-24 flex items-center justify-center">
                    <Image
                      src={featuredProject.logo}
                      alt={`${featuredProject.client} logo`}
                      width={180}
                      height={90}
                      className="object-contain max-h-20"
                    />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-navy">{featuredProject.client}</div>
                )}
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {featuredProject.client}
                </span>
              </div>

              {/* Text / Details */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="teal">{featuredProject.industry}</Badge>
                    <span className="text-xs text-ink-muted font-medium">Delivered {featuredProject.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink tracking-tight mb-3 group-hover:text-teal transition-colors">
                    {featuredProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-6">
                    {featuredProject.summary}
                  </p>

                  {/* Highlights / Results preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {featuredProject.results.map((res, i) => (
                      <div key={i} className="bg-surface-soft rounded-lg p-3 border border-surface-line/70">
                        <div className="text-xs font-bold text-teal">{res.metric}</div>
                        <div className="text-xs text-ink-muted mt-0.5 line-clamp-1">{res.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-line">
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.services.map((svc) => (
                      <Badge key={svc} variant="default" size="sm">
                        {svc.replace(/-/g, " ")}
                      </Badge>
                    ))}
                  </div>

                  <div className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-teal gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>View full case study</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 3-Column Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => {
          // If this project is the featured one on the "All" view, skip rendering twice
          if (selectedIndustry === "All" && featuredProject && project.slug === featuredProject.slug) {
            return null;
          }

          const matchesFilter = selectedIndustry === "All" || project.industry === selectedIndustry;

          return (
            <div
              key={project.slug}
              className={`transition-all duration-300 ${!matchesFilter ? "hidden" : "block"}`}
            >
              <Card
                href={`/projects/${project.slug}`}
                className="h-full flex flex-col justify-between p-6 sm:p-7 hover:border-slate-300"
              >
                <div>
                  {/* Top: Logo on soft panel */}
                  <div className="bg-surface-soft rounded-lg p-6 mb-5 flex items-center justify-center border border-surface-line/70 h-28">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={`${project.client} logo`}
                        width={130}
                        height={60}
                        className="object-contain max-h-16"
                      />
                    ) : (
                      <div className="text-lg font-bold text-navy">{project.client}</div>
                    )}
                  </div>

                  {/* Industry Badge & Client */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="teal">{project.industry}</Badge>
                    <span className="text-xs text-ink-muted font-medium">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-ink leading-snug tracking-tight mb-2.5 group-hover:text-teal transition-colors">
                    {project.title}
                  </h3>

                  {/* Summary (2-line clamp) */}
                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-5">
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Service Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.services.slice(0, 2).map((svc) => (
                      <Badge key={svc} variant="default" size="sm">
                        {svc.replace(/-/g, " ")}
                      </Badge>
                    ))}
                    {project.services.length > 2 && (
                      <Badge variant="default" size="sm">
                        +{project.services.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Link action */}
                  <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal group-hover:text-teal-dark">
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
