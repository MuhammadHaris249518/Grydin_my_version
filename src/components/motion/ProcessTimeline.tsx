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

export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 lg:block">
        <motion.div style={{ scaleX, transformOrigin: "left" }} className="h-full bg-gradient-to-r from-teal to-teal-glow" />
      </div>
      <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
        {steps.map((s, i) => (
          <li key={s.step}>
            <Reveal delay={i * 0.12}>
              <div className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-teal-glow/50 bg-navy font-mono text-sm text-teal-glow shadow-glow-sm">
                  {s.step}
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-white">{s.phase}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-teal-glow/80">{s.tagline}</p>
                <p className="mt-4 text-base leading-relaxed text-slate-300">{s.desc}</p>
                <ul className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  {s.points.map((p) => (
                    <li key={p.title}>
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="text-sm leading-relaxed text-slate-400">{p.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
