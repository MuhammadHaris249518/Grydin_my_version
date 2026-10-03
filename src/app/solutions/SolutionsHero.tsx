"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Brain,
  Cpu,
  Code2,
  FileText,
  Database,
  Cloud,
  Users,
  Sparkles,
  Workflow,
  TrendingUp,
  CheckCircle2,
  Factory,
  HeartPulse,
  Truck,
  ShoppingBag,
  Building2,
  GraduationCap,
  Coffee,
  LucideIcon,
} from "lucide-react";

interface IndustryItem {
  name: string;
  icon: LucideIcon;
  slug?: string;
}

const TRUSTED_INDUSTRIES: IndustryItem[] = [
  { name: "Manufacturing", icon: Factory },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Logistics", icon: Truck },
  { name: "Retail", icon: ShoppingBag },
  { name: "Finance", icon: TrendingUp },
];

const INDUSTRIES_WE_SERVE: IndustryItem[] = [
  { name: "Manufacturing", icon: Factory, slug: "manufacturing" },
  { name: "Healthcare", icon: HeartPulse, slug: "healthcare-wellness" },
  { name: "Logistics", icon: Truck, slug: "logistics-operations" },
  { name: "Retail", icon: ShoppingBag, slug: "retail-ecommerce" },
  { name: "Finance", icon: TrendingUp, slug: "finance" },
  { name: "Education", icon: GraduationCap, slug: "education" },
  { name: "Real Estate", icon: Building2, slug: "real-estate-rentals" },
  { name: "Hospitality", icon: Coffee, slug: "hospitality" },
];

interface SolutionsHeroProps {
  onSelectIndustry?: (slug: string) => void;
}

export function SolutionsHero({ onSelectIndustry }: SolutionsHeroProps) {
  const handleScrollToVerticals = (slug?: string) => {
    if (slug) {
      if (onSelectIndustry) {
        onSelectIndustry(slug);
      }
      history.replaceState(null, "", `#${slug}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    const elem = document.getElementById("verticals");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white pt-10 pb-16 sm:pb-20 border-b border-slate-200/80">
      {/* Background Ambient Network & Light Glow */}
      <div className="absolute top-1/4 right-1/4 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-br from-teal-100/40 via-cyan-50/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Solutions</span>
          <span className="w-6 h-px bg-slate-300 ml-1 inline-block" />
        </nav>

        {/* 2-Column Split: Left Copy & Value Props | Right Architecture Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Content) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0D8B99] mb-4">
              <span>INDUSTRY SOLUTIONS</span>
              <span className="w-6 h-0.5 bg-[#0D8B99] rounded-full" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
              Solutions engineered <br className="hidden sm:inline" />
              for your industry
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mb-8">
              Domain-specific automation, AI agents, and custom software designed to eliminate operational bottlenecks and improve how your business works.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0D8B99] hover:bg-[#0B7884] text-white text-sm font-bold rounded-xl shadow-md shadow-teal-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Book a Free Process Diagnosis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => handleScrollToVerticals()}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0D8B99] hover:text-[#0B7884] transition-colors group cursor-pointer"
              >
                <span>Explore our solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3 Pillar Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-slate-200/80 mb-10">
              {/* Feature 1: AI Agents */}
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0D8B99] border border-teal-200/80 flex items-center justify-center mb-3 shadow-2xs">
                  <Brain className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">AI Agents</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Intelligent agents that handle real work.
                </p>
              </div>

              {/* Feature 2: Process Automation */}
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0D8B99] border border-teal-200/80 flex items-center justify-center mb-3 shadow-2xs">
                  <Cpu className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">Process Automation</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Remove manual work and save time.
                </p>
              </div>

              {/* Feature 3: Custom Software */}
              <div className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0D8B99] border border-teal-200/80 flex items-center justify-center mb-3 shadow-2xs">
                  <Code2 className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">Custom Software</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Scalable solutions built for your needs.
                </p>
              </div>
            </div>

            {/* Trusted By Strip */}
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                TRUSTED BY FORWARD-THINKING BUSINESSES
              </span>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-600">
                {TRUSTED_INDUSTRIES.map((ind) => {
                  const Icon = ind.icon;
                  return (
                    <span key={ind.name} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{ind.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural AI Flowchart Diagram */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center py-4">
            {/* SVG Background Network Mesh */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none -z-0 opacity-40"
              viewBox="0 0 600 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="80" r="3" fill="#2DD4BF" />
              <circle cx="520" cy="90" r="3" fill="#2DD4BF" />
              <circle cx="560" cy="180" r="3" fill="#2DD4BF" />
              <circle cx="40" cy="240" r="2.5" fill="#2DD4BF" />
              <circle cx="540" cy="380" r="3" fill="#2DD4BF" />
              <circle cx="80" cy="460" r="2.5" fill="#2DD4BF" />
              <line x1="100" y1="80" x2="250" y2="60" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="520" y1="90" x2="380" y2="70" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="560" y1="180" x2="480" y2="210" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="240" x2="110" y2="230" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="540" y1="380" x2="420" y2="390" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Diagram Flow Container */}
            <div className="relative w-full max-w-[560px] mx-auto flex flex-col items-center">
              {/* ── 1. Top Card: Business Input ── */}
              <div className="w-full max-w-[280px] bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 flex items-center gap-3.5 z-10 transition-transform hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D8B99] border border-teal-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Business Input
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                    Data, documents, or real-time events
                  </p>
                </div>
              </div>

              {/* Vertical Connector Arrow 1 */}
              <div className="h-8 flex flex-col items-center justify-center text-[#0D8B99]">
                <div className="w-0.5 h-4 bg-teal-300" />
                <span className="text-xs font-bold -mt-1">↓</span>
              </div>

              {/* ── 2. Middle Row: Left Satellite (Your Data) + Center (AI Agent) + Right Satellite (Checklist) ── */}
              <div className="w-full flex items-center justify-between gap-2 sm:gap-3 z-10">
                {/* Left Satellite Card: Your Data / Systems / Team */}
                <div className="w-28 sm:w-36 bg-white/95 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-sm space-y-2 text-[11px] font-semibold text-slate-700 shrink-0">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#0D8B99] shrink-0" />
                    <span className="truncate">Your Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-[#0D8B99] shrink-0" />
                    <span className="truncate">Your Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0D8B99] shrink-0" />
                    <span className="truncate">Your Team</span>
                  </div>
                </div>

                {/* Curved Connector Dots (Left to Center) */}
                <div className="hidden sm:flex items-center -mx-1 text-teal-400 font-mono text-xs select-none">
                  <span className="tracking-tighter animate-pulse">··→</span>
                </div>

                {/* Central Hero AI Agent Card */}
                <div className="flex-1 bg-gradient-to-br from-[#06383E] via-[#0D8B99] to-[#04262A] text-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-teal-900/20 border border-teal-300/40 relative overflow-hidden group">
                  {/* Subtle inner radial glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-teal-200/30 flex items-center justify-center shrink-0 shadow-inner">
                      <Sparkles className="w-5 h-5 text-teal-200 animate-pulse" />
                    </div>
                    <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                      AI Agent
                    </span>
                  </div>

                  {/* Analyze -> Decide -> Act Pipeline */}
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-teal-100/90 bg-black/20 rounded-xl px-2.5 py-1.5 border border-white/10">
                    <span>Analyze</span>
                    <span className="text-teal-300">→</span>
                    <span>Decide</span>
                    <span className="text-teal-300">→</span>
                    <span>Act</span>
                  </div>
                </div>

                {/* Right Satellite Card: Context Checklist */}
                <div className="w-32 sm:w-40 bg-white/95 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-sm space-y-1.5 text-[11px] font-semibold text-slate-700 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">Understand context</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">Use your tools</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">Make decisions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">Take action</span>
                  </div>
                </div>
              </div>

              {/* Vertical Connector Arrow 2 */}
              <div className="h-8 flex flex-col items-center justify-center text-[#0D8B99]">
                <div className="w-0.5 h-4 bg-teal-300" />
                <span className="text-xs font-bold -mt-1">↓</span>
              </div>

              {/* ── 3. Middle Card: Automation ── */}
              <div className="w-full max-w-[280px] bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 flex items-center gap-3.5 z-10 transition-transform hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D8B99] border border-teal-100 flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Automation
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                    APIs, workflows, existing systems
                  </p>
                </div>
              </div>

              {/* Vertical Connector Arrow 3 */}
              <div className="h-8 flex flex-col items-center justify-center text-[#0D8B99]">
                <div className="w-0.5 h-4 bg-teal-300" />
                <span className="text-xs font-bold -mt-1">↓</span>
              </div>

              {/* ── 4. Bottom Row: Business Results Card + Floating Stat Pill ── */}
              <div className="w-full relative flex items-center justify-center z-10">
                {/* Center Results Card */}
                <div className="w-full max-w-[280px] bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 flex items-center gap-3.5 transition-transform hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D8B99] border border-teal-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      Business Results
                    </h4>
                    <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                      Higher efficiency, lower costs, better outcomes
                    </p>
                  </div>
                </div>

                {/* Floating Metric Badge (Bottom-Right) */}
                <div className="absolute right-0 bottom-0 translate-x-2 sm:translate-x-6 sm:translate-y-2 bg-white/95 border border-slate-200/90 shadow-md rounded-2xl p-3 w-32 sm:w-36 transition-all hover:shadow-lg">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0D8B99]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0D8B99]" />
                    <span>+60%</span>
                  </div>
                  <span className="block text-[10px] text-slate-500 font-semibold leading-tight mt-0.5 mb-1.5">
                    Operational Efficiency
                  </span>
                  {/* Clean SVG Trend Sparkline */}
                  <svg className="w-full h-5 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path
                      d="M2 20 C 25 18, 35 12, 50 14 C 65 16, 75 6, 98 4"
                      stroke="#0D8B99"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="98" cy="4" r="3" fill="#0D8B99" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Bottom Strip: INDUSTRIES WE SERVE ── */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-200/80">
          <div className="flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">
            <span>INDUSTRIES WE SERVE</span>
            <span className="w-8 h-0.5 bg-slate-300 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {INDUSTRIES_WE_SERVE.map((industry) => {
              const Icon = industry.icon;
              return (
                <button
                  key={industry.name}
                  type="button"
                  onClick={() => handleScrollToVerticals(industry.slug)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-teal-50/70 border border-slate-200/90 hover:border-teal-300 text-xs font-semibold text-slate-700 hover:text-teal-800 shadow-2xs transition-all duration-200 cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                  <span>{industry.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
