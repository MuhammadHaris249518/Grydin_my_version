"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { InteractiveRobotFeature } from "@/components/3d/InteractiveRobotFeature";
import { OrbitalSolutions } from "./OrbitalSolutions";

export function HomeServices() {
  return (
    <section id="services" className="relative overflow-hidden border-y border-slate-200/80 bg-slate-50/60 py-14 sm:py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        {/* ── PART 1: Top Feature Hero Area with Interactive 3D Robot ── */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xl shadow-slate-200/50 sm:mb-16 sm:rounded-3xl sm:p-10 lg:rounded-[2.5rem] lg:p-12">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-6 z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200/80 tracking-wider uppercase mb-5">
                <span className="w-2 h-2 rounded-full bg-[#0D8B99] animate-pulse" />
                AI &amp; SOFTWARE ENGINEERING
              </span>

              <h2 className="mb-3 text-[clamp(1.65rem,7vw,2.15rem)] font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:mb-4 sm:text-4xl lg:text-[44px] xl:text-5xl">
                Six ways we <span className="text-[#0D8B99]">eliminate</span> <br className="hidden sm:inline" />
                operational friction
              </h2>

              <p className="mb-5 max-w-xl text-[13px] font-normal leading-relaxed text-slate-600 sm:mb-8 sm:text-lg">
                We build intelligent, high-reliability systems tailored to your specific bottlenecks, with no black-boxes, false promises.
              </p>

              <div className="mb-5 flex flex-wrap items-center gap-2.5 sm:mb-8 sm:gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0D8B99] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-[#0D8B99]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0b7480] active:translate-y-0 sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0 sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  Talk to Our Team
                </Link>
              </div>

              {/* 3 Feature Pills */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-4 text-[11px] font-semibold text-slate-700 sm:gap-6 sm:pt-6 sm:text-sm">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0D8B99]" />
                  Custom AI Solutions
                </span>
                <span className="hidden sm:inline-block w-px h-4 bg-slate-300" />
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0D8B99]" />
                  Modern Architecture
                </span>
                <span className="hidden sm:inline-block w-px h-4 bg-slate-300" />
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0D8B99]" />
                  Expert Team
                </span>
              </div>
            </div>

            {/* Right Column: Interactive 3D Robot Figure */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <InteractiveRobotFeature />
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2: Transformed Solutions for Every Stage 3D Orbital Carousel (Expanded width for comfortable spacing) ── */}
      <div className="relative w-full max-w-[1520px] mx-auto px-4 sm:px-6 mb-12">
        <OrbitalSolutions />
      </div>

      {/* ── PART 3: Bottom Callout Banner ── */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-teal-50/90 p-5 shadow-xs sm:gap-8 sm:rounded-3xl sm:p-10 lg:flex-row">
          <div className="max-w-xl">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-100/90 border border-teal-200 px-3 py-1 rounded-full mb-3">
              LET'S BUILD TOGETHER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Your ideas. Our expertise.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
              Whether you need a single feature or a complete system, we're here to help you turn your vision into a reliable solution.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full shadow-md shadow-teal-600/20 transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-teal-200/80 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-full transition-all"
              >
                View All Services
              </Link>
            </div>
          </div>

          {/* Right Side Checklist + Isometric Graphic */}
          <div className="flex w-full flex-col items-start gap-5 border-t border-teal-200/80 pt-5 sm:w-auto sm:flex-row sm:items-center sm:gap-8 sm:pt-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8">
            <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3 font-semibold text-xs text-slate-700 sm:w-auto sm:grid-cols-1 sm:gap-y-3 sm:text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 shrink-0" strokeWidth={2.2} />
                <span>Clear communication</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 shrink-0" strokeWidth={2.2} />
                <span>On-time delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 shrink-0" strokeWidth={2.2} />
                <span>Scalable architecture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 shrink-0" strokeWidth={2.2} />
                <span>Long-term support</span>
              </div>
            </div>

            {/* Isometric Graphic */}
            <div className="hidden h-24 w-24 shrink-0 text-teal-600 pointer-events-none sm:block">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M50 15 L85 35 L50 55 L15 35 Z" fill="#2DD4BF" fillOpacity="0.4" stroke="#0D8B99" strokeWidth="2" />
                <path d="M15 35 L50 55 L50 85 L15 65 Z" fill="#0D8B99" fillOpacity="0.6" stroke="#0D8B99" strokeWidth="2" />
                <path d="M85 35 L50 55 L50 85 L85 65 Z" fill="#063945" stroke="#0D8B99" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
