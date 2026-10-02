"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";

export type TimelineStep = {
  step: string;
  phase: string;
  tagline: string;
  desc: string;
  points: { title: string; desc: string }[];
};

export function ProcessTimeline({
  steps,
  dark = false,
}: {
  steps: TimelineStep[];
  /** Render in dark-mode palette (e.g. for navy/ink-bg sections). Default: light. */
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative">
      {/* Progress track */}
      <div className={`absolute left-0 right-0 top-6 hidden h-px lg:block ${dark ? "bg-white/10" : "bg-surface-line"}`}>
        <motion.div style={{ scaleX, transformOrigin: "left" }} className="h-full bg-gradient-to-r from-accent to-teal-glow" />
      </div>
      <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
        {steps.map((s, i) => (
          <li key={s.step}>
            <Reveal delay={i * 0.12}>
              <div className="relative">
                <span
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border font-mono text-sm shadow-glow-sm ${
                    dark
                      ? "border-teal-glow/50 bg-navy text-teal-glow"
                      : "border-accent/40 bg-accent-light text-accent"
                  }`}
                >
                  {s.step}
                </span>
                <h3 className={`mt-6 text-2xl font-semibold ${dark ? "text-white" : "text-ink"}`}>
                  {s.phase}
                </h3>
                <p className={`mt-1 font-mono text-xs uppercase tracking-[0.18em] ${dark ? "text-teal-glow/80" : "text-accent/80"}`}>
                  {s.tagline}
                </p>
                <p className={`mt-4 text-base leading-relaxed ${dark ? "text-slate-300" : "text-ink-muted"}`}>
                  {s.desc}
                </p>
                {s.points.length > 0 && (
                  <ul className={`mt-6 space-y-4 border-t pt-6 ${dark ? "border-white/10" : "border-surface-line"}`}>
                    {s.points.map((p) => (
                      <li key={p.title}>
                        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>{p.title}</p>
                        <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-ink-muted"}`}>{p.desc}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
