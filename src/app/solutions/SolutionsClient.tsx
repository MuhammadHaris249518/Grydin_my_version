"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, FileText, Building2, ShoppingBag, HeartPulse, Zap, Truck } from "lucide-react";
import { SOLUTIONS, type Solution } from "@/data/solutions";
import { ProcessTimeline, type TimelineStep } from "@/components/motion/ProcessTimeline";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/app/globalscope/ui/Button";
import { cn } from "@/lib/cn";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Building2,
  ShoppingBag,
  HeartPulse,
  Zap,
  Truck,
};

export function SolutionsClient() {
  const [activeSlug, setActiveSlug] = useState<string>(SOLUTIONS[0].slug);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (SOLUTIONS.some((s) => s.slug === hash)) {
        setActiveSlug(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selected = SOLUTIONS.find((s) => s.slug === activeSlug) || SOLUTIONS[0];
  const IconComponent = ICON_MAP[selected.icon] || FileText;

  const timelineSteps: TimelineStep[] = selected.approach.map((step, idx) => ({
    step: `0${idx + 1}`,
    phase: idx === 0 ? "Diagnose" : idx === 1 ? "Design" : "Deploy",
    tagline: step.title,
    desc: step.text,
    points: [],
  }));

  return (
    <section id="verticals" className="relative bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Target Sectors"
          title="Engineered solutions tailored by industry"
          accent="by industry"
          intro="Select your vertical to explore our domain-specific automations, AI workflows, and fixed-scope delivery timelines."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Vertical Tab Selector (Left 4 cols) */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            {SOLUTIONS.map((sol) => {
              const Icon = ICON_MAP[sol.icon] || FileText;
              const isActive = sol.slug === activeSlug;

              return (
                <button
                  key={sol.slug}
                  type="button"
                  onClick={() => setActiveSlug(sol.slug)}
                  className={cn(
                    "surface-card group flex items-start gap-4 rounded-2xl p-5 text-left transition-all duration-200 cursor-pointer",
                    isActive
                      ? "!border-accent/70 bg-accent-light shadow-accent-glow"
                      : "hover:border-accent/30 hover:bg-surface-soft"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "bg-surface-soft text-ink-muted group-hover:text-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        "text-base font-semibold transition-colors",
                        isActive ? "text-ink" : "text-ink-muted group-hover:text-ink"
                      )}
                    >
                      {sol.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-xs text-ink-muted">
                      {sol.headline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution Detail Panel (Right 8 cols) */}
          <div className="lg:col-span-8">
            <GlassCard className="p-8 sm:p-10">
              <Reveal key={selected.slug}>
                {/* 3D Model Slot for Industry */}
                <div className="mb-8">
                  <ModelSlot
                    label={`solution-${selected.slug}`}
                    className="h-52 w-full border border-surface-line"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-ink">
                      {selected.name}
                    </h3>
                    <p className="text-sm font-mono text-accent">
                      {selected.headline}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                  {selected.summary}
                </p>

                {/* Operational Challenges */}
                <div className="mt-8 border-t border-surface-line pt-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
                    Key Friction Points Eliminated
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selected.challenges.slice(0, 4).map((c, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-ink-muted">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3-Step Delivery Methodology */}
                <div className="mt-10 border-t border-surface-line pt-8">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-6">
                    Three-Stage Deployment Roadmap
                  </h4>
                  <ProcessTimeline steps={timelineSteps} />
                </div>

                {/* Measurable Outcomes */}
                <div className="mt-10 rounded-xl border border-accent/20 bg-accent-light p-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
                    Guaranteed Architectural Outcomes
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {selected.outcomes.map((out, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-ink">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-surface-line">
                  <Link
                    href={`/solutions/${selected.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    View detailed {selected.name} architecture
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Button href="/contact" variant="primary" size="md">
                    Book a free process diagnosis
                  </Button>
                </div>
              </Reveal>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
