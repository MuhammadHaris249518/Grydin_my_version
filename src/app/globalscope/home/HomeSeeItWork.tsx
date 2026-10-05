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
      className="relative bg-white py-20 md:py-28 lg:py-32 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:gap-14 xl:gap-16 lg:grid-cols-12 lg:items-center">
          {/* ── Left Column: Typography, Tightened Features & CTA Hierarchy ── */}
          <div className="lg:col-span-5">
            <Reveal>
              {/* Eyebrow badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-[#0D8B99]">
                  <span className="w-6 h-0.5 bg-[#0D8B99] rounded-full" />
                  LIVE ARCHITECTURE
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  LIVE PRODUCT DEMO <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-5">
                See autonomous <br />
                systems in <span className="text-[#0D8B99]">live <br className="hidden sm:inline" />production</span>
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-lg">
                Watch how GrydIn-engineered agents coordinate across databases, APIs, and interfaces without latency or human intervention.
              </p>

              {/* 3 Tightened Feature Points */}
              <div className="space-y-4 mb-9">
                {LIVE_FEATURES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5 group">
                      <div className="w-10 h-10 rounded-full bg-teal-50/90 border border-teal-200/90 text-[#0D8B99] flex items-center justify-center shrink-0 mt-0.5 transition-colors group-hover:bg-teal-100 shadow-2xs">
                        <Icon className="w-4.5 h-4.5 text-[#0D8B99]" />
                      </div>
                      <div>
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
              <div className="flex flex-col items-start gap-3.5">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-between gap-3 px-8 py-3.5 bg-[#0D8B99] hover:bg-[#0b7480] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#0D8B99]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Engineering Specs</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <button
                  type="button"
                  onClick={handleWatchLiveDemo}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-300 rounded-xl shadow-2xs transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
            className="lg:col-span-7 relative pt-4 sm:pt-6 lg:pt-0 w-full"
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
