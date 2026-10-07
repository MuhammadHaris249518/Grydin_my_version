"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Radio,
  ArrowRight,
  Play,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AutonomousProductShowcase } from "@/components/video/AutonomousProductShowcase";

interface FeaturePoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const LIVE_FEATURES: FeaturePoint[] = [
  {
    icon: Zap,
    title: "Sub-second event detection",
    description: "Triggers autonomous workflows instantly across your stack.",
  },
  {
    icon: ShieldCheck,
    title: "Deterministic guardrails",
    description: "Validates structured payloads before executing downstream tool calls.",
  },
  {
    icon: Radio,
    title: "Live telemetry streams",
    description: "Execution logs and status flow directly into your audit command center.",
  },
];

export function HomeSeeItWork() {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleWatchLiveDemo = () => {
    setIsPlaying(true);
    const video = document.querySelector("#product-showcase-container video") as HTMLVideoElement | null;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    const el = document.getElementById("product-showcase-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="live-demo"
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white py-14 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-10 lg:px-16">
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-16">
          {/* ── Left Column: Typography, Tightened Features & CTA Hierarchy ── */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              {/* Eyebrow badge */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-[#0D8B99]">
                  <span className="w-6 h-0.5 bg-[#0D8B99] rounded-full" />
                  LIVE ARCHITECTURE
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  LIVE PRODUCT DEMO <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="mb-4 max-w-full text-[clamp(1.75rem,7vw,2.25rem)] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:mb-5 sm:text-5xl lg:text-[46px] xl:text-[52px]">
                See autonomous <br className="hidden sm:block" />
                systems in <span className="text-[#0D8B99]">live <br className="hidden sm:inline" />production</span>
              </h2>

              {/* Subtitle */}
              <p className="mb-6 max-w-lg text-[15px] font-normal leading-relaxed text-slate-600 sm:mb-8 sm:text-lg">
                Watch how GrydIn-engineered agents coordinate across databases, APIs, and interfaces without latency or human intervention.
              </p>

              {/* 3 Tightened Feature Points */}
              <div className="mb-7 space-y-4 sm:mb-9">
                {LIVE_FEATURES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="group flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-200/90 bg-teal-50/90 text-[#0D8B99] shadow-2xs transition-colors group-hover:bg-teal-100 sm:h-10 sm:w-10">
                        <Icon className="h-4.5 w-4.5 text-[#0D8B99]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Hierarchy (Stacked vertically matching design) */}
              <div className="flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:items-start">
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-between gap-3 rounded-xl bg-[#0D8B99] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#0D8B99]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0b7480] active:translate-y-0 sm:w-auto sm:px-8 sm:text-sm"
                >
                  <span>Explore Engineering Specs</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <button
                  type="button"
                  onClick={handleWatchLiveDemo}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0 sm:w-auto sm:px-7 sm:text-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                  <span>Watch Live Demo</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Dominant Product Interface Showcase ── */}
          <div
            id="product-showcase-container"
            className="relative w-full min-w-0 pt-2 sm:pt-6 lg:col-span-7 lg:pt-0"
          >
            <Reveal delay={0.15}>
              <AutonomousProductShowcase
                videoSrc="/videos/Video.mp4"
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
