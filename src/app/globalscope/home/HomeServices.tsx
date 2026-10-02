"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Repeat,
  Brain,
  Layers,
  Plug,
  Code,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";

interface ServiceCardData {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  tags: string[];
  href: string;
}

const LEFT_SERVICES: ServiceCardData[] = [
  {
    id: "ai-agents",
    number: "01",
    icon: Zap,
    title: "AI Agents",
    desc: "Intelligent autonomous agents that plan, decide, and execute multi-step workflows across your tools.",
    tags: ["Autonomous Workflows", "Tool APIs", "Multi-Agent"],
    href: "/services",
  },
  {
    id: "ai-integration",
    number: "02",
    icon: Brain,
    title: "AI Integration",
    desc: "Embed fine-tuned models, RAG pipelines, and automated intelligence directly into your operational stack.",
    tags: ["Document RAG", "Vector Search", "Fine-Tuning"],
    href: "/services",
  },
  {
    id: "fullstack-dev",
    number: "03",
    icon: Code,
    title: "Full-Stack Development",
    desc: "End-to-end scalable product engineering from modern React & Next.js frontends to cloud microservices.",
    tags: ["Next.js 15", "TypeScript", "Cloud Native"],
    href: "/services",
  },
];

const RIGHT_SERVICES: ServiceCardData[] = [
  {
    id: "workflow-automation",
    number: "04",
    icon: Repeat,
    title: "Workflow Automation",
    desc: "Eliminate manual handoffs across platforms, CRM, and databases with zero-downtime event pipelines.",
    tags: ["n8n & Make", "Event Streams", "Auto-Healing"],
    href: "/services",
  },
  {
    id: "custom-software",
    number: "05",
    icon: Layers,
    title: "Custom Software",
    desc: "Purpose-built platforms tailored to your business operations — clean architecture, speed, and zero bloat.",
    tags: ["Clean Architecture", "Custom ERP", "PostgreSQL"],
    href: "/services",
  },
  {
    id: "system-integration",
    number: "06",
    icon: Plug,
    title: "System Integration",
    desc: "Connect legacy databases, cloud APIs, and fragmented tools into one synchronized real-time data mesh.",
    tags: ["REST & GraphQL", "Two-Way Sync", "Webhook Mesh"],
    href: "/services",
  },
];

function OrbitCard({
  service,
  side,
}: {
  service: ServiceCardData;
  side: "left" | "right";
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => setCoords(null);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-[#0B1D38]/70 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_-8px_rgba(13,139,153,0.35)] flex flex-col justify-between overflow-hidden"
    >
      {/* Dynamic spotlight cursor reflection */}
      {coords && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(34, 211, 238, 0.18), transparent 70%)`,
          }}
        />
      )}

      {/* Top glass highlight rim */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div>
        {/* Header: Icon + Mono Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal/15 border border-teal/30 text-cyan-300 flex items-center justify-center group-hover:bg-teal/30 group-hover:border-cyan-400 transition-colors">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="font-mono text-xs font-semibold text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#C5D3E3] leading-relaxed mb-4 font-normal">
          {service.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Arrow Link */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <Link
          href={service.href}
          className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
        >
          <span>Explore capability</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export function HomeServices() {
  return (
    <section
      id="services"
      className="relative w-full py-20 md:py-28 bg-navy border-b border-white/10 overflow-hidden"
    >
      {/* Circuit Board Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(13, 139, 153, 0.15) 0%, transparent 70%),
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      />

      {/* Ambient Radial Teal & Cyan Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-teal/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/20 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SMART SOLUTIONS. REAL IMPACT.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4">
            WE BUILD{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-teal">
              INTELLIGENT DIGITAL SYSTEMS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            AI, automation and software solutions designed to help ambitious businesses eliminate operational friction and scale.
          </p>
        </div>

        {/* ── Main Command Center: Left Flank | 3D Robot Stage | Right Flank ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: 3 Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5 order-2 lg:order-1">
            {LEFT_SERVICES.map((s) => (
              <OrbitCard key={s.id} service={s} side="left" />
            ))}
          </div>

          {/* Center Column: 3D Robot Stage / Designated 3D Model Slot */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-6 lg:py-0">
            {/* The 3D Model Container & Holographic Pedestal */}
            <div
              id="robot-3d-model"
              data-slot="robot-3d-model"
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Vertical holographic light beam from pedestal */}
              <div
                className="absolute inset-x-12 bottom-12 top-4 pointer-events-none opacity-40"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(34, 211, 238, 0.25) 0%, rgba(13, 139, 153, 0.05) 70%, transparent 100%)",
                  clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                }}
              />

              {/* Glowing Holographic Concentric Rings under the Robot */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 h-24 pointer-events-none flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-[100%] border border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.4)] animate-pulse" />
                {/* Mid Ring with dashed rotation effect */}
                <div
                  className="absolute inset-3 rounded-[100%] border border-dashed border-teal-400/60"
                  style={{ animation: "spin 25s linear infinite" }}
                />
                {/* Inner Glowing Core Disc */}
                <div className="absolute inset-6 rounded-[100%] bg-gradient-to-t from-cyan-400/40 via-teal-400/20 to-transparent blur-[2px] shadow-[0_0_30px_rgba(34,211,238,0.6)]" />
                {/* Base platform disc */}
                <div className="absolute -bottom-2 w-48 h-10 rounded-[100%] bg-[#0B1D38] border border-cyan-400/50 shadow-2xl" />
              </div>

              {/* High-Resolution 3D Robot Graphic (Floating on pedestal) */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <img
                  src="/images/capabilities/01-ai-agents-robot.png"
                  alt="Autonomous 3D AI Robot"
                  className="w-full max-h-[360px] object-contain drop-shadow-[0_15px_35px_rgba(34,211,238,0.45)] transition-transform duration-700 hover:scale-105"
                  style={{
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Floating Blueprint Coordinates / Slot Marker (for 3D model integration) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06142B]/90 backdrop-blur-md border border-cyan-400/40 shadow-md">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest font-bold">
                  3D ROBOT STAGE • LIVE
                </span>
              </div>

              {/* Ambient Floating Dust / Particle Rings */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-6 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] animate-pulse" />
                <div className="absolute top-1/3 right-8 w-2 h-2 rounded-full bg-teal-300 blur-[0.5px] animate-pulse" />
                <div className="absolute bottom-1/3 left-10 w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                <div className="absolute bottom-1/4 right-10 w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              </div>
            </div>

            {/* Stage Sub-label */}
            <div className="mt-3 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-medium">
                CENTRAL ORCHESTRATION ENGINE
              </span>
            </div>
          </div>

          {/* Right Column: 3 Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5 order-3">
            {RIGHT_SERVICES.map((s) => (
              <OrbitCard key={s.id} service={s} side="right" />
            ))}
          </div>
        </div>

        {/* Bottom Navigation Buttons (Centered) */}
        <div className="mt-14 sm:mt-18 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/services"
            variant="primary"
            size="lg"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Explore all engineering services
          </Button>
          <Button href="/solutions" variant="outline-light" size="lg">
            See industry-specific solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
