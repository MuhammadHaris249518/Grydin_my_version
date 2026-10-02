"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Users,
  Bot,
  Workflow,
  Cpu,
  FileCode2,
  BarChart3,
  Layers,
  TrendingUp,
  Plug,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type ServiceCard = {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeBg: string;
  title: string;
  description: string;
  href: string;
};

const SERVICES: ServiceCard[] = [
  {
    id: "ai-agents",
    icon: Bot,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "AI & AUTOMATION",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "AI Agents & Autonomous Workflows",
    description:
      "Build intelligent agents that handle repetitive tasks, make decisions and work 24/7 — so you don't have to.",
    href: "/services#ai-agents",
  },
  {
    id: "workflow",
    icon: Workflow,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "INTEGRATIONS",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Workflow Automation & Pipelines",
    description:
      "Streamline your business processes with automated workflows, integrations and reliable pipelines.",
    href: "/services#system-integration",
  },
  {
    id: "ai-rag",
    icon: Cpu,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "AI & RAG",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    title: "AI Integration & RAG Engines",
    description:
      "Connect your data with powerful LLMs and retrieval systems for accurate, context-aware results.",
    href: "/services#ai-integration",
  },
  {
    id: "custom-software",
    icon: FileCode2,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badge: "CUSTOM DEVELOPMENT",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    title: "Custom Software Engineering",
    description:
      "Modern, scalable and maintainable web applications tailored to your unique needs.",
    href: "/services#custom-software",
  },
  {
    id: "system-integration",
    icon: BarChart3,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    badge: "SYSTEMS",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    title: "System Integration & Middleware",
    description:
      "Unify your tools, data and services with secure, high-performance integrations.",
    href: "/services#system-integration",
  },
  {
    id: "fullstack",
    icon: Layers,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badge: "FULL-STACK",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    title: "Full-Stack Development",
    description:
      "From frontend to backend, we build complete products using modern technologies and best practices.",
    href: "/services#custom-software",
  },
];

export function HomeServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-slate-50/60 py-20 md:py-28 border-y border-slate-200/80">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ── PART 1: Top Feature Hero Area ── */}
        <div className="bg-gradient-to-br from-white via-slate-50/70 to-teal-50/40 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200/80 tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                BUILD • AUTOMATE • SCALE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Six ways we <span className="text-teal-600">eliminate</span> <br />
                operational friction
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
                We build intelligent, high-reliability systems tailored to your specific bottlenecks, with no bloat and no disruption.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-md shadow-teal-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-300 rounded-full shadow-2xs transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Talk to Our Team
                </Link>
              </div>

              {/* 3 Feature Pills */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/80 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-600" />
                  Custom Solutions
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Reliable & Scalable
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  Expert Team
                </span>
              </div>
            </div>

            {/* Right Desktop Dashboard Illustration Graphic */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Floating Badge: Top Right */}
                <div className="absolute -top-4 -right-2 z-20 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Better workflows.</span>
                    <span className="block text-[10px] text-teal-400 font-mono">Higher productivity. 📈</span>
                  </div>
                </div>

                {/* Floating Badge: Top Left */}
                <div className="absolute top-6 -left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200 text-xs font-mono font-bold text-slate-700 flex flex-col gap-1.5 hidden sm:flex">
                  <span className="flex items-center gap-1.5 text-teal-600">
                    <Zap className="w-3.5 h-3.5" /> Automate
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Plug className="w-3.5 h-3.5" /> Integrate
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" /> Scale
                  </span>
                </div>

                {/* Main Dashboard Screen Card */}
                <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl pt-10">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                      <span className="font-mono text-xs text-teal-400 font-bold uppercase">System Operations Dashboard</span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">LIVE METRICS</span>
                  </div>

                  {/* Chart Graphic */}
                  <div className="h-32 w-full mb-4 relative flex items-end">
                    <svg viewBox="0 0 300 100" fill="none" className="w-full h-full">
                      <defs>
                        <linearGradient id="dashboardChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 80 Q 50 60, 100 70 T 200 30 T 300 20 L 300 100 L 0 100 Z" fill="url(#dashboardChartGrad)" />
                      <path d="M 0 80 Q 50 60, 100 70 T 200 30 T 300 20" stroke="#2DD4BF" strokeWidth="3" fill="none" />
                      <circle cx="300" cy="20" r="4" fill="#2DD4BF" className="animate-ping" />
                    </svg>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                      <span className="block text-[10px] text-slate-400 uppercase">Automated Processes</span>
                      <span className="text-white font-extrabold text-sm">12+</span>
                    </div>
                    <div className="p-2.5 bg-teal-950/80 rounded-xl border border-teal-500/40">
                      <span className="block text-teal-300 text-[10px] uppercase">Uptime</span>
                      <span className="text-teal-300 font-extrabold text-sm">99.9%</span>
                    </div>
                    <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                      <span className="block text-slate-400 text-[10px] uppercase">Time Saved</span>
                      <span className="text-emerald-400 font-extrabold text-sm">40+ hrs/wk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PART 2: Section Subheader & 6 Cards Grid (3 cols x 2 rows) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-2 block">
              OUR SERVICES
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Solutions for Every Stage
            </h3>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            From intelligent automation to full-stack development, we provide end-to-end solutions to help your business grow faster and work smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {SERVICES.map((s, i) => {
            const IconComp = s.icon;
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all"
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${s.iconBg} ${s.iconColor} flex items-center justify-center font-bold`}>
                        <IconComp className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${s.badgeBg}`}>
                        {s.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-2.5 leading-snug">
                      {s.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                      {s.description}
                    </p>
                  </div>

                  {/* Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center text-xs sm:text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* ── PART 3: Bottom Callout Banner ── */}
        <div className="bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-teal-50/90 border border-teal-200/80 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
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
          <div className="flex flex-col sm:flex-row items-center gap-8 border-t lg:border-t-0 lg:border-l border-teal-200/80 pt-6 lg:pt-0 lg:pl-8">
            <div className="space-y-3 font-semibold text-xs sm:text-sm text-slate-700">
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
            <div className="w-24 h-24 shrink-0 text-teal-600 pointer-events-none">
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
