"use client";

import { useState, useRef } from "react";
import { CheckCircle2, Play, Pause, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { Button } from "../ui/Button";

const CHECKLIST = [
  "Sub-second event detection triggers autonomous workflows instantly across your stack.",
  "Deterministic guardrails validate structured payloads before executing downstream tool calls.",
  "Live telemetry streams execution logs and status directly into your audit command center.",
];

export function HomeSeeItWork() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section className="relative bg-navy-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeader
                eyebrow="Live Architecture"
                title="See autonomous systems in live production"
                accent="live production"
                intro="Watch how GrydIn-engineered agents coordinate across databases, APIs, and interfaces without latency or human intervention."
              />

              <ul className="mt-8 space-y-4">
                {CHECKLIST.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal-glow mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-base text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/services" variant="primary" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
                  Explore Engineering Specs
                </Button>
                <Button href="/contact" variant="outline-light" size="md">
                  Request Live Sandbox Demo
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Video / 3D Slot Column */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="glass relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                {/* 3D demo slot in the background or placeholder */}
                <ModelSlot label="demo" className="absolute inset-0" />

                {/* Optional Video Overlay if files exist */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity"
                  playsInline
                  muted
                  loop
                  preload="none"
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/videos/demo.webm" type="video/webm" />
                  <source src="/videos/demo.mp4" type="video/mp4" />
                </video>

                {/* Video Play Control Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause workflow demo" : "Play workflow demo"}
                  className="absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-teal/90 text-white shadow-glow transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
                </button>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-teal-glow">
                    Workflow Stream · Live Event Bus
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
