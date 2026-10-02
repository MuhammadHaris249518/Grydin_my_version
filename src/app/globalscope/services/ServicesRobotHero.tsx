"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Repeat, Code2, Layers, ArrowRight, Sparkles, Compass, LucideIcon } from "lucide-react";

export type ServiceKey = "ai-agents" | "workflow" | "fullstack" | "custom-software";

interface ServiceCardData {
  key: ServiceKey;
  targetCategory: "ai" | "software" | "cloud" | "integration" | "data";
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  badges: string[];
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    key: "ai-agents",
    targetCategory: "ai",
    title: "AI AGENTS",
    tagline: "Autonomous systems",
    description: "Intelligent agents that reason, plan, and take autonomous multi-step action across your toolchain.",
    icon: Brain,
    position: "top-left",
    badges: ["LangGraph", "Multi-Agent", "Tool Calling"],
  },
  {
    key: "workflow",
    targetCategory: "integration",
    title: "WORKFLOW AUTOMATION",
    tagline: "Resilient pipelines",
    description: "Zero-downtime event streaming and self-healing pipelines that eliminate manual operational handoffs.",
    icon: Repeat,
    position: "top-right",
    badges: ["n8n & Make", "Event Streams", "Auto-Healing"],
  },
  {
    key: "fullstack",
    targetCategory: "software",
    title: "FULL-STACK DEVELOPMENT",
    tagline: "Modern architectures",
    description: "Scalable modern web applications, high-throughput microservices, and reactive cloud architectures.",
    icon: Code2,
    position: "bottom-left",
    badges: ["Next.js 15", "TypeScript", "Cloud Native"],
  },
  {
    key: "custom-software",
    targetCategory: "software",
    title: "CUSTOM SOFTWARE",
    tagline: "Tailored platforms",
    description: "Bespoke enterprise software platforms designed around your proprietary business workflows.",
    icon: Layers,
    position: "bottom-right",
    badges: ["Clean Architecture", "Custom ERP", "PostgreSQL"],
  },
];

interface ServicesRobotHeroProps {
  /**
   * Optional custom 3D Robot model node (e.g. Three.js Canvas, Spline, GLTF model).
   * If not provided, a stylized holographic visual placeholder is rendered.
   */
  modelSlot?: React.ReactNode;
  /**
   * Optional callback when user clicks a service.
   */
  onSelectService?: (key: ServiceKey, category: string) => void;
}

export function ServicesRobotHero({ modelSlot, onSelectService }: ServicesRobotHeroProps) {
  const [selectedService, setSelectedService] = useState<ServiceKey | null>("ai-agents");
  const [isHovered, setIsHovered] = useState<ServiceKey | null>(null);

  // Active item is hovered item, or selected item, or default
  const activeKey = isHovered || selectedService || "ai-agents";

  const handleCardClick = (service: ServiceCardData) => {
    setSelectedService(service.key);
    if (onSelectService) {
      onSelectService(service.key, service.targetCategory);
    }
  };

  // Robot navigation transforms based on active target
  const getRobotTransform = () => {
    switch (activeKey) {
      case "ai-agents":
        // Move towards top-left
        return "translate3d(-75px, -35px, 0) rotate(-8deg) scale(1.03)";
      case "workflow":
        // Move towards top-right
        return "translate3d(75px, -35px, 0) rotate(8deg) scale(1.03)";
      case "fullstack":
        // Move towards bottom-left
        return "translate3d(-65px, 35px, 0) rotate(-6deg) scale(1.03)";
      case "custom-software":
        // Move towards bottom-right
        return "translate3d(65px, 35px, 0) rotate(6deg) scale(1.03)";
      default:
        return "translate3d(0, 0, 0) rotate(0deg) scale(1)";
    }
  };

  return (
    <section className="relative w-full min-h-[780px] lg:min-h-[880px] bg-navy overflow-hidden flex flex-col justify-between pt-8 pb-12 select-none border-b border-white/10">
      {/* ── Background Cyber Grid & Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep navy vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy to-[#020e1e]" />

        {/* Ambient teal central radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] bg-teal/18 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-teal-glow/12 rounded-full blur-[90px]" />

        {/* Cyber Circuit Grid Traces */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cyber-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(13, 139, 153, 0.25)"
                strokeWidth="0.8"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(45, 212, 191, 0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>

        {/* Futuristic circuit board traces behind everything */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Circuit Tracks */}
          <path
            d="M 50 250 L 220 250 L 320 350 L 520 350"
            stroke="#0d8b99"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-40"
          />
          <path
            d="M 20 480 L 180 480 L 290 590 L 480 590"
            stroke="#0d8b99"
            strokeWidth="1"
            className="opacity-30"
          />
          <circle cx="520" cy="350" r="3" fill="#2dd4bf" className="animate-ping" />
          <circle cx="480" cy="590" r="2.5" fill="#2dd4bf" />

          {/* Right Circuit Tracks */}
          <path
            d="M 1390 250 L 1220 250 L 1120 350 L 920 350"
            stroke="#0d8b99"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-40"
          />
          <path
            d="M 1420 480 L 1260 480 L 1150 590 L 960 590"
            stroke="#0d8b99"
            strokeWidth="1"
            className="opacity-30"
          />
          <circle cx="920" cy="350" r="3" fill="#2dd4bf" className="animate-ping" />
          <circle cx="960" cy="590" r="2.5" fill="#2dd4bf" />
        </svg>
      </div>

      {/* ── Top Header Section ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-2 sm:pt-4">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/15 border border-teal/40 text-teal-glow font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-sm shadow-teal/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-glow animate-pulse" />
          <span>SMART SOLUTIONS. REAL IMPACT.</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight uppercase leading-[1.12] mb-4">
          WE BUILD{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-glow via-[#38bdf8] to-teal">
            INTELLIGENT DIGITAL SYSTEMS
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
          AI, automation and software solutions designed to help ambitious businesses operate and grow.
        </p>
      </div>

      {/* ── Main Interactive Cockpit Area (Robot + 4 Floating Cards) ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8 lg:py-12">
        {/* Dynamic Circuit Beams Connecting Center Platform to Cards (Desktop / Tablet) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beam-active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0d8b99" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="1" />
            </linearGradient>
            <filter id="glow-neon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Line: Center to Top-Left (AI Agents) */}
          <path
            d="M 520 280 C 440 240, 380 200, 310 180"
            stroke={activeKey === "ai-agents" ? "url(#beam-active-grad)" : "rgba(13, 139, 153, 0.28)"}
            strokeWidth={activeKey === "ai-agents" ? "3" : "1.5"}
            strokeDasharray={activeKey === "ai-agents" ? "8 4" : "4 4"}
            filter={activeKey === "ai-agents" ? "url(#glow-neon)" : undefined}
            className={activeKey === "ai-agents" ? "animate-[dashPulse_1.5s_linear_infinite]" : "transition-all duration-300"}
          />
          {activeKey === "ai-agents" && (
            <circle cx="310" cy="180" r="4.5" fill="#2dd4bf" className="animate-ping" />
          )}

          {/* 2. Line: Center to Top-Right (Workflow Automation) */}
          <path
            d="M 680 280 C 760 240, 820 200, 890 180"
            stroke={activeKey === "workflow" ? "url(#beam-active-grad)" : "rgba(13, 139, 153, 0.28)"}
            strokeWidth={activeKey === "workflow" ? "3" : "1.5"}
            strokeDasharray={activeKey === "workflow" ? "8 4" : "4 4"}
            filter={activeKey === "workflow" ? "url(#glow-neon)" : undefined}
            className={activeKey === "workflow" ? "animate-[dashPulse_1.5s_linear_infinite]" : "transition-all duration-300"}
          />
          {activeKey === "workflow" && (
            <circle cx="890" cy="180" r="4.5" fill="#2dd4bf" className="animate-ping" />
          )}

          {/* 3. Line: Center to Bottom-Left (Full-Stack Dev) */}
          <path
            d="M 520 350 C 440 390, 380 430, 310 440"
            stroke={activeKey === "fullstack" ? "url(#beam-active-grad)" : "rgba(13, 139, 153, 0.28)"}
            strokeWidth={activeKey === "fullstack" ? "3" : "1.5"}
            strokeDasharray={activeKey === "fullstack" ? "8 4" : "4 4"}
            filter={activeKey === "fullstack" ? "url(#glow-neon)" : undefined}
            className={activeKey === "fullstack" ? "animate-[dashPulse_1.5s_linear_infinite]" : "transition-all duration-300"}
          />
          {activeKey === "fullstack" && (
            <circle cx="310" cy="440" r="4.5" fill="#2dd4bf" className="animate-ping" />
          )}

          {/* 4. Line: Center to Bottom-Right (Custom Software) */}
          <path
            d="M 680 350 C 760 390, 820 430, 890 440"
            stroke={activeKey === "custom-software" ? "url(#beam-active-grad)" : "rgba(13, 139, 153, 0.28)"}
            strokeWidth={activeKey === "custom-software" ? "3" : "1.5"}
            strokeDasharray={activeKey === "custom-software" ? "8 4" : "4 4"}
            filter={activeKey === "custom-software" ? "url(#glow-neon)" : undefined}
            className={activeKey === "custom-software" ? "animate-[dashPulse_1.5s_linear_infinite]" : "transition-all duration-300"}
          />
          {activeKey === "custom-software" && (
            <circle cx="890" cy="440" r="4.5" fill="#2dd4bf" className="animate-ping" />
          )}
        </svg>

        {/* Desktop Grid Layout: 3 Columns (Left 2 Cards | Center Robot 3D Stage | Right 2 Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* ── LEFT COLUMN: 2 Cards (Top-Left AI Agents & Bottom-Left Full-Stack) ── */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            {/* CARD 1: AI AGENTS */}
            <ServiceGlassCard
              service={SERVICES_DATA[0]}
              isActive={activeKey === "ai-agents"}
              onClick={() => handleCardClick(SERVICES_DATA[0])}
              onMouseEnter={() => setIsHovered("ai-agents")}
              onMouseLeave={() => setIsHovered(null)}
            />

            {/* CARD 3: FULL-STACK DEVELOPMENT */}
            <ServiceGlassCard
              service={SERVICES_DATA[2]}
              isActive={activeKey === "fullstack"}
              onClick={() => handleCardClick(SERVICES_DATA[2])}
              onMouseEnter={() => setIsHovered("fullstack")}
              onMouseLeave={() => setIsHovered(null)}
            />
          </div>

          {/* ── CENTER COLUMN: 3D Robot Navigator Stage ── */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[440px] order-1 lg:order-2">
            {/* Hologram Light Cone radiating upward from platform */}
            <div
              className="pointer-events-none absolute bottom-12 w-64 sm:w-80 h-72 sm:h-80 -translate-x-1/2 left-1/2 opacity-75"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 100%, rgba(45, 212, 191, 0.22) 0deg, rgba(13, 139, 153, 0.08) 35deg, transparent 75deg, transparent 285deg, rgba(13, 139, 153, 0.08) 325deg, rgba(45, 212, 191, 0.22) 360deg)",
                filter: "blur(14px)",
              }}
            />

            {/* Glowing Holographic Pedestal / Base Rings */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-72 md:w-80 flex flex-col items-center pointer-events-none z-10">
              {/* Outer pulsing neon ring */}
              <div className="w-56 sm:w-64 md:w-72 h-14 sm:h-16 rounded-[100%] border-2 border-teal-glow/70 shadow-[0_0_30px_rgba(45,212,191,0.6)] flex items-center justify-center bg-[#072445]/40 backdrop-blur-sm animate-pulse">
                {/* Middle concentric ring */}
                <div className="w-44 sm:w-52 h-10 sm:h-12 rounded-[100%] border border-teal/90 shadow-[inset_0_0_15px_rgba(45,212,191,0.4)] flex items-center justify-center">
                  {/* Inner glowing platform disc */}
                  <div className="w-32 sm:w-36 h-6 sm:h-8 rounded-[100%] bg-gradient-to-b from-teal-glow/60 to-teal/20 shadow-[0_0_20px_#2dd4bf]" />
                </div>
              </div>
              {/* Radial ground reflection */}
              <div className="w-72 h-10 bg-teal/30 rounded-[100%] blur-xl -mt-6" />
            </div>

            {/* ── THE 3D ROBOT CONTAINER WITH DYNAMIC NAVIGATION MOVEMENT ── */}
            <div
              id="robot-navigator-stage"
              className="relative z-20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)] will-change-transform cursor-pointer"
              style={{
                transform: getRobotTransform(),
              }}
              title="Click a service or click the robot to navigate"
              onClick={() => {
                // Cycle to next service or reset to center
                const keys: ServiceKey[] = ["ai-agents", "workflow", "custom-software", "fullstack"];
                const nextIdx = (keys.indexOf(activeKey) + 1) % keys.length;
                handleCardClick(SERVICES_DATA.find((s) => s.key === keys[nextIdx])!);
              }}
            >
              {/*
                ── 3D MODEL SLOT ──
                Here is the dedicated space for the 3D Robot model downloaded by the user.
                Pass your custom model component into <ServicesRobotHero modelSlot={<Your3DModel />} />
                or replace the default visual below.
              */}
              <div
                id="robot-3d-model-mount"
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center"
              >
                {modelSlot ? (
                  // Custom 3D Model passed as a slot
                  <div className="w-full h-full flex items-center justify-center">
                    {modelSlot}
                  </div>
                ) : (
                  // Default visual representation matching the reference image
                  <HolographicRobotVisual activeKey={activeKey} />
                )}
              </div>

              {/* High-tech target reticle / directional beacon indicator */}
              <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-navy-950/90 border border-teal-glow/40 backdrop-blur-md flex items-center gap-1.5 text-[10px] font-mono font-bold text-teal-glow shadow-md shadow-teal-glow/20 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-glow animate-ping" />
                <span className="uppercase tracking-wider">
                  NAVIGATING: {SERVICES_DATA.find((s) => s.key === activeKey)?.title}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 2 Cards (Top-Right Workflow & Bottom-Right Custom Software) ── */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-3">
            {/* CARD 2: WORKFLOW AUTOMATION */}
            <ServiceGlassCard
              service={SERVICES_DATA[1]}
              isActive={activeKey === "workflow"}
              onClick={() => handleCardClick(SERVICES_DATA[1])}
              onMouseEnter={() => setIsHovered("workflow")}
              onMouseLeave={() => setIsHovered(null)}
            />

            {/* CARD 4: CUSTOM SOFTWARE */}
            <ServiceGlassCard
              service={SERVICES_DATA[3]}
              isActive={activeKey === "custom-software"}
              onClick={() => handleCardClick(SERVICES_DATA[3])}
              onMouseEnter={() => setIsHovered("custom-software")}
              onMouseLeave={() => setIsHovered(null)}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Section Bar & Interactive Navigation Pills ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
        {/* Left: Interactive Quick Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
            Focus:
          </span>
          {SERVICES_DATA.map((s) => (
            <button
              key={s.key}
              onClick={() => handleCardClick(s)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                activeKey === s.key
                  ? "bg-teal text-white border border-teal-glow/60 shadow-sm shadow-teal-glow/30"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Center/Right: Scroll to detailed capabilities */}
        <a
          href="#capabilities"
          className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#051c36]/80 hover:bg-[#082a4d] border border-white/15 hover:border-teal-glow/50 text-slate-300 hover:text-white transition-all text-xs font-mono"
        >
          {/* Animated scroll pill icon */}
          <span className="w-3.5 h-5 rounded-full border border-slate-400 group-hover:border-teal-glow flex items-start justify-center p-0.5">
            <span className="w-1 h-1.5 bg-teal-glow rounded-full animate-bounce" />
          </span>
          <span className="tracking-wider uppercase">SMART SOLUTIONS</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-glow transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

// ── Glassmorphism Service Card Component ─────────────────────────────────────
interface ServiceGlassCardProps {
  service: ServiceCardData;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ServiceGlassCard({
  service,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ServiceGlassCardProps) {
  const IconComp = service.icon;

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${
        isActive
          ? "bg-[#072445]/85 border-2 border-teal-glow shadow-[0_0_35px_rgba(45,212,191,0.32)] -translate-y-1.5 scale-[1.02]"
          : "bg-[#061833]/65 border border-white/12 hover:border-teal/80 hover:bg-[#07223f]/75 hover:shadow-[0_12px_28px_rgba(13,139,153,0.22)] hover:-translate-y-1"
      }`}
    >
      {/* Blueprint Corner Crosshair Accents */}
      <div className={`pointer-events-none absolute top-2 left-2 w-2 h-2 border-t border-l ${isActive ? "border-teal-glow" : "border-white/20"}`} />
      <div className={`pointer-events-none absolute top-2 right-2 w-2 h-2 border-t border-r ${isActive ? "border-teal-glow" : "border-white/20"}`} />
      <div className={`pointer-events-none absolute bottom-2 left-2 w-2 h-2 border-b border-l ${isActive ? "border-teal-glow" : "border-white/20"}`} />
      <div className={`pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b border-r ${isActive ? "border-teal-glow" : "border-white/20"}`} />

      {/* Radial highlight sheen on active/hover */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
        style={{
          background:
            "radial-gradient(400px circle at 50% 0%, rgba(45, 212, 191, 0.18), transparent 70%)",
        }}
      />

      {/* Top Row: Icon + Status */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isActive
              ? "bg-teal text-white shadow-md shadow-teal-glow/40 scale-105"
              : "bg-teal/15 border border-teal/30 text-teal-glow group-hover:bg-teal/30"
          }`}
        >
          <IconComp className="w-6 h-6" strokeWidth={2} />
        </div>

        {/* Status Pill */}
        {isActive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-glow/20 border border-teal-glow/50 text-teal-glow font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-glow" />
            ACTIVE
          </span>
        ) : (
          <span className="text-slate-400 group-hover:text-slate-200 text-xs font-mono font-medium">
            {service.tagline}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`text-xl sm:text-2xl font-black tracking-tight mb-2 uppercase transition-colors ${
          isActive ? "text-white" : "text-slate-100 group-hover:text-white"
        }`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-5 font-normal">
        {service.description}
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.badges.map((badge) => (
          <span
            key={badge}
            className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border transition-colors ${
              isActive
                ? "bg-teal-glow/15 border-teal-glow/40 text-teal-200"
                : "bg-white/5 border-white/10 text-slate-400 group-hover:text-slate-300"
            }`}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Footer Navigation Link */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span
          className={`text-xs font-bold transition-colors ${
            isActive ? "text-teal-glow" : "text-slate-400 group-hover:text-slate-200"
          }`}
        >
          Explore capability
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isActive
              ? "bg-teal-glow text-navy translate-x-1"
              : "bg-white/5 text-slate-300 group-hover:bg-teal group-hover:text-white group-hover:translate-x-1"
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

// ── Default Holographic Robot Visualizer ──────────────────────────────────────
// High-tech fallback when 3D model file is not mounted, matching the reference image.
function HolographicRobotVisual({ activeKey }: { activeKey: ServiceKey }) {
  // Eye pupil offset based on target direction
  const getEyeTransform = () => {
    switch (activeKey) {
      case "ai-agents":
        return "translate(-6px, -4px)";
      case "workflow":
        return "translate(6px, -4px)";
      case "fullstack":
        return "translate(-5px, 5px)";
      case "custom-software":
        return "translate(5px, 5px)";
      default:
        return "translate(0px, 0px)";
    }
  };

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
      {/* Subtle floating bobbing animation */}
      <div className="relative w-full h-full flex items-center justify-center animate-[floatBob_4s_easeInOut_infinite]">
        {/* Antenna on the left */}
        <div className="absolute top-12 left-10 w-2.5 h-8 bg-gradient-to-t from-teal to-teal-glow rounded-full -rotate-12 shadow-[0_0_12px_#2dd4bf]">
          <div className="w-3.5 h-3.5 rounded-full bg-teal-glow -top-1 -left-0.5 absolute animate-pulse shadow-[0_0_10px_#2dd4bf]" />
        </div>

        {/* Spherical Teal Body */}
        <div
          className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_-10px_25px_rgba(4,23,46,0.8),inset_0_10px_25px_rgba(45,212,191,0.6)] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #38bdf8 0%, #2dd4bf 28%, #0d8b99 58%, #063945 85%, #041d26 100%)",
          }}
        >
          {/* Top-left specular gloss highlight */}
          <div className="absolute top-4 left-7 w-16 h-8 rounded-full bg-white/40 blur-[5px] rotate-[-25deg] pointer-events-none" />

          {/* Black Glass Visor Face Screen */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#030914] border-2 border-teal/50 shadow-[inset_0_4px_16px_rgba(0,0,0,0.9),0_0_20px_rgba(13,139,153,0.3)] flex items-center justify-center overflow-hidden">
            {/* Visor internal reflections */}
            <div className="absolute top-2 left-4 w-12 h-5 rounded-full bg-white/10 blur-[2px] rotate-[-20deg]" />

            {/* Glowing Warm Yellow Eyes Container (reactive direction) */}
            <div
              className="flex items-center gap-3 transition-transform duration-500 ease-out"
              style={{ transform: getEyeTransform() }}
            >
              {/* Left Eye */}
              <div className="w-4 h-9 sm:w-4.5 sm:h-10 rounded-full bg-[#ffd166] shadow-[0_0_18px_#ffd166,0_0_30px_#f59e0b] animate-[eyeBlink_4.5s_infinite]" />
              {/* Right Eye */}
              <div className="w-4 h-9 sm:w-4.5 sm:h-10 rounded-full bg-[#ffd166] shadow-[0_0_18px_#ffd166,0_0_30px_#f59e0b] animate-[eyeBlink_4.5s_infinite]" />
            </div>
          </div>
        </div>

        {/* Small Metallic Hover Feet */}
        <div className="absolute -bottom-1 flex items-center gap-7">
          <div className="w-8 h-4 rounded-full bg-gradient-to-b from-teal-glow to-teal shadow-[0_0_12px_rgba(45,212,191,0.5)]" />
          <div className="w-8 h-4 rounded-full bg-gradient-to-b from-teal-glow to-teal shadow-[0_0_12px_rgba(45,212,191,0.5)]" />
        </div>
      </div>
    </div>
  );
}
