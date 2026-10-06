"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Target, Users, Share2, Zap } from "lucide-react";
import { StoryIsometricGraphic } from "./StoryIsometricGraphic";

export function OurStorySection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f7fcfb]/60 to-white py-16 sm:py-20 lg:py-24 border-b border-surface-line select-none">
      {/* ── Background Subtle Ambient Glow ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-cyan-100/30 via-teal-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[5%] right-[-5%] w-[450px] h-[450px] bg-gradient-to-tl from-purple-100/20 via-sky-50/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1340px] px-6 sm:px-10 lg:px-12">
        {/* ===================================================================== */}
        {/* UPPER ROW: Left Heading & Subtitle, Center 3D Stack, Right Story Text */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center mb-14 sm:mb-18 lg:mb-20">
          {/* ── LEFT COLUMN: Eyebrow, Heading, Subtitle ── */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-6 h-[2px] bg-[#00C2CB] rounded-full inline-block" />
              <span className="font-mono text-xs font-bold tracking-[0.24em] text-[#00C2CB] uppercase">
                OUR STORY
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] text-[#0a233b] tracking-tight leading-[1.12]">
              The work no one <br />
              sees can hold a <br />
              <span className="text-[#00C2CB]">business back.</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-xs sm:text-sm md:text-[14.5px] text-slate-500 font-normal leading-relaxed max-w-sm">
              We turn hidden work into clear systems so your team can move faster, together.
            </p>
          </div>

          {/* ── CENTER COLUMN: 3D Layered Isometric Data Graphic with Eye Tile ── */}
          <div className="lg:col-span-4 flex items-center justify-center relative my-2 lg:my-0">
            <StoryIsometricGraphic />
          </div>

          {/* ── RIGHT COLUMN: Grydin Description & Feature Pill ── */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Story Text with Left Teal Vertical Bar */}
            <div className="border-l-2 border-[#00C2CB] pl-5 sm:pl-6 space-y-3.5">
              <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-slate-600 leading-relaxed font-normal">
                <strong className="text-[#0D8B99] font-bold">Grydin</strong> grew from a simple observation: businesses lose momentum in the gaps between tools, teams, and decisions. Repeated handoffs and small manual tasks are easy to overlook, but they add friction to the work people are trying to do.
              </p>
              <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-slate-600 leading-relaxed font-normal">
                We start by understanding what is actually slowing a team down. Then we build the specific system that can help: an AI agent, a workflow automation, a custom integration, or software designed around the way that business works.
              </p>
            </div>

            {/* Bottom Pill Badge */}
            <div className="mt-5 pl-5 sm:pl-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0faf9] border border-[#bce8e3] text-[#0D8B99] font-mono text-[9.5px] sm:text-[10.5px] font-bold tracking-wider uppercase shadow-xs">
                <Zap className="w-3.5 h-3.5 text-[#00c2cb] fill-[#00c2cb]" />
                NO TEMPLATES. NO OFF-THE-SHELF FIXES. JUST WHAT YOU NEED.
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* LOWER ROW: 3 Principles Cards with Floating 3D Tiles & Wavy Curve     */}
        {/* ===================================================================== */}
        <div className="relative">
          {/* ── Subtle Background Connecting Spline Wave ── */}
          <div className="pointer-events-none absolute -inset-x-6 top-1/2 -translate-y-1/2 h-32 hidden md:block -z-0 opacity-45 overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00c2cb" stopOpacity="0.1" />
                  <stop offset="25%" stopColor="#00c2cb" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.85" />
                  <stop offset="90%" stopColor="#8b5cf6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M -50 70 C 220 20, 420 110, 700 45 S 1050 90, 1250 50"
                stroke="url(#curveGrad)"
                strokeWidth="1.6"
                strokeDasharray="4 5"
              />
            </svg>
          </div>

          {/* ── 3 Cards Grid ── */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ── CARD 1: Start with the real problem ── */}
            <div className="bg-white rounded-3xl border border-slate-200/90 border-l-[4px] border-l-[#00C2CB] shadow-[0_12px_40px_rgba(13,139,153,0.06)] hover:shadow-[0_20px_55px_rgba(13,139,153,0.12)] hover:border-teal-300 transition-all p-7 sm:p-8 flex flex-col justify-between group">
              <div>
                {/* Top Row: Number 01 & 3D Glass Target Tile */}
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-xs font-bold">
                    01
                  </span>

                  {/* 3D Glass Target Tile */}
                  <div
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#cff7f3] via-[#b2f0e9] to-[#86e7dc] border border-teal-200/90 shadow-[0_10px_24px_rgba(13,139,153,0.2)] flex items-center justify-center group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300"
                    style={{
                      transform: "perspective(400px) rotateX(8deg) rotateY(-8deg)",
                    }}
                  >
                    <div className="absolute inset-1 rounded-xl bg-white/35 backdrop-blur-xs" />
                    <Target className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D8B99] relative z-10" strokeWidth={2.3} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-lg sm:text-xl text-[#0a233b] tracking-tight mt-5 mb-2">
                  Start with the real problem
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-500 leading-relaxed font-normal">
                  We learn where work gets stuck before deciding which technology belongs in the solution.
                </p>
              </div>

              {/* Bottom Link */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0D8B99] hover:text-[#097b87] group-hover:gap-2.5 transition-all mt-6 pt-2"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* ── CARD 2: Fit how your team works ── */}
            <div className="bg-white rounded-3xl border border-slate-200/90 border-l-[4px] border-l-[#0284c7] shadow-[0_12px_40px_rgba(2,132,199,0.06)] hover:shadow-[0_20px_55px_rgba(2,132,199,0.12)] hover:border-sky-300 transition-all p-7 sm:p-8 flex flex-col justify-between group">
              <div>
                {/* Top Row: Number 02 & 3D Glass Users Tile */}
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#e0f2fe] border border-[#bae6fd] text-[#0284c7] font-mono text-xs font-bold">
                    02
                  </span>

                  {/* 3D Glass Users Tile */}
                  <div
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] border border-sky-200/90 shadow-[0_10px_24px_rgba(2,132,199,0.2)] flex items-center justify-center group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300"
                    style={{
                      transform: "perspective(400px) rotateX(8deg) rotateY(-8deg)",
                    }}
                  >
                    <div className="absolute inset-1 rounded-xl bg-white/35 backdrop-blur-xs" />
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#0284c7] relative z-10" strokeWidth={2.3} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-lg sm:text-xl text-[#0a233b] tracking-tight mt-5 mb-2">
                  Fit how your team works
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-500 leading-relaxed font-normal">
                  Each system is shaped around your process and tools, instead of asking your team to fit a template.
                </p>
              </div>

              {/* Bottom Link */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0284c7] hover:text-[#0369a1] group-hover:gap-2.5 transition-all mt-6 pt-2"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* ── CARD 3: Connect the whole workflow ── */}
            <div className="bg-white rounded-3xl border border-slate-200/90 border-l-[4px] border-l-[#8b5cf6] shadow-[0_12px_40px_rgba(139,92,246,0.06)] hover:shadow-[0_20px_55px_rgba(139,92,246,0.12)] hover:border-purple-300 transition-all p-7 sm:p-8 flex flex-col justify-between group">
              <div>
                {/* Top Row: Number 03 & 3D Glass Network Nodes Tile */}
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#ede9fe] border border-[#ddd6fe] text-[#7c3aed] font-mono text-xs font-bold">
                    03
                  </span>

                  {/* 3D Glass Network Tile */}
                  <div
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#ede9fe] via-[#ddd6fe] to-[#c4b5fd] border border-purple-200/90 shadow-[0_10px_24px_rgba(124,58,237,0.2)] flex items-center justify-center group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300"
                    style={{
                      transform: "perspective(400px) rotateX(8deg) rotateY(-8deg)",
                    }}
                  >
                    <div className="absolute inset-1 rounded-xl bg-white/35 backdrop-blur-xs" />
                    <Share2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#7c3aed] relative z-10" strokeWidth={2.3} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-lg sm:text-xl text-[#0a233b] tracking-tight mt-5 mb-2">
                  Connect the whole workflow
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-500 leading-relaxed font-normal">
                  We look across tools, teams, and decisions so the answer addresses the gaps between them.
                </p>
              </div>

              {/* Bottom Link */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7c3aed] hover:text-[#6d28d9] group-hover:gap-2.5 transition-all mt-6 pt-2"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
