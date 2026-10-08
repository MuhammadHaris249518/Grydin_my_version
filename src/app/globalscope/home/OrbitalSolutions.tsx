"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Code2,
  GitBranch,
  Bot,
  BarChart3,
  Layers,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type ServiceCard = {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeBg: string;
  depthColor: string;
  title: string;
  description: string;
  href: string;
  cornerGradient: string;
};

export const SERVICES_LIST: ServiceCard[] = [
  {
    id: "custom-software",
    icon: Code2,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/80",
    iconColor: "text-emerald-600",
    badge: "CUSTOM DEVELOPMENT",
    badgeBg: "bg-emerald-50/90 text-emerald-700 border-emerald-200/90",
    depthColor: "#0D8B99",
    title: "Custom Software Engineering",
    description:
      "Modern, scalable and secure applications tailored to your business needs.",
    href: "/services#custom-software",
    cornerGradient: "from-teal-100/70 to-emerald-50/20",
  },
  {
    id: "workflow",
    icon: GitBranch,
    iconBg: "bg-blue-50 text-blue-600 border border-blue-200/80",
    iconColor: "text-blue-600",
    badge: "INTEGRATIONS",
    badgeBg: "bg-blue-50/90 text-blue-700 border-blue-200/90",
    depthColor: "#2563EB",
    title: "Workflow Automation & Pipelines",
    description:
      "Streamline your business processes with automated workflows, integrations and reliable pipelines.",
    href: "/services#system-integration",
    cornerGradient: "from-blue-100/70 to-indigo-50/20",
  },
  {
    id: "ai-rag",
    icon: Bot,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/80",
    iconColor: "text-emerald-600",
    badge: "AI & RAG",
    badgeBg: "bg-emerald-50/90 text-emerald-700 border-emerald-200/90",
    depthColor: "#059669",
    title: "AI Integration & RAG Engines",
    description:
      "Connect your data with powerful LLMs and retrieval systems for smarter, more aware results.",
    href: "/services#ai-integration",
    cornerGradient: "from-emerald-100/70 to-teal-50/20",
  },
  {
    id: "system-integration",
    icon: BarChart3,
    iconBg: "bg-blue-50 text-blue-600 border border-blue-200/80",
    iconColor: "text-blue-600",
    badge: "SYSTEMS",
    badgeBg: "bg-blue-50/90 text-blue-700 border-blue-200/90",
    depthColor: "#1D4ED8",
    title: "System Integration & Middleware",
    description:
      "Unify your tools, data and services with secure, high-performance integrations.",
    href: "/services#system-integration",
    cornerGradient: "from-cyan-100/70 to-blue-50/20",
  },
  {
    id: "fullstack",
    icon: Layers,
    iconBg: "bg-teal-50 text-teal-600 border border-teal-200/80",
    iconColor: "text-teal-600",
    badge: "FULL-STACK",
    badgeBg: "bg-teal-50/90 text-teal-700 border-teal-200/90",
    depthColor: "#0D8B99",
    title: "Full-Stack Development",
    description:
      "From frontend to backend, we build complete products using modern technologies and best practices.",
    href: "/services#custom-software",
    cornerGradient: "from-teal-100/70 to-cyan-50/20",
  },
  {
    id: "ai-agents",
    icon: Cpu,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/80",
    iconColor: "text-emerald-600",
    badge: "AI & AUTOMATION",
    badgeBg: "bg-emerald-50/90 text-emerald-700 border-emerald-200/90",
    depthColor: "#0D8B99",
    title: "AI Agents & Autonomous Workflows",
    description:
      "Build intelligent agents that handle repetitive tasks, make decisions and work 24/7 — so you don't have to.",
    href: "/services#ai-agents",
    cornerGradient: "from-teal-100/70 to-emerald-50/20",
  },
];

function MobileServiceCard({ service, duplicate = false }: { service: ServiceCard; duplicate?: boolean }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      tabIndex={duplicate ? -1 : undefined}
      className="flex h-[238px] w-[82vw] max-w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${service.iconBg}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-wide ${service.badgeBg}`}>
          {service.badge}
        </span>
      </div>
      <h3 className="text-[17px] font-bold leading-snug tracking-tight text-slate-900">
        {service.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-600">
        {service.description}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs font-bold text-teal-700">
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function OrbitalSolutions() {
  const [mobileCarouselPaused, setMobileCarouselPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ rx: 420, ry: 130 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const numCards = SERVICES_LIST.length;
  const angleStep = (2 * Math.PI) / numCards;

  // Responsive orbital radius adjustments - tuned for generous horizontal separation between cards
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;

      if (width >= 1350) {
        // Generous horizontal radius: cards sit ~425px apart from center, giving >120px clear space between card edges
        setDimensions({ rx: 490, ry: 135 });
      } else if (width >= 1100) {
        setDimensions({ rx: 430, ry: 120 });
      } else if (width >= 860) {
        setDimensions({ rx: 340, ry: 105 });
      } else if (width >= 640) {
        setDimensions({ rx: 260, ry: 85 });
      } else {
        setDimensions({ rx: 175, ry: 65 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Smooth interpolation toward target angle and automatic orbital drift (Preserving previous rotation)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      setAngle((prev) => {
        // If not hovered, apply slow automatic orbital drift
        let newTarget = targetAngle;
        if (!isHovered) {
          // Slow continuous rotation (~36 seconds per cycle)
          newTarget += 0.16 * dt;
          setTargetAngle(newTarget);
        }

        // Smooth spring/lerp toward target
        const diff = newTarget - prev;
        return prev + diff * Math.min(dt * 6, 1);
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, targetAngle]);

  const handlePrev = useCallback(() => {
    setTargetAngle((prev) => prev - angleStep);
  }, [angleStep]);

  const handleNext = useCallback(() => {
    setTargetAngle((prev) => prev + angleStep);
  }, [angleStep]);

  const handleCardClick = (index: number) => {
    // Calculate nearest angle to bring clicked card to front (where theta = 0)
    const cardBaseAngle = index * angleStep;
    const currentRot = targetAngle % (2 * Math.PI);
    let diff = -cardBaseAngle - currentRot;

    // Normalize diff to [-PI, PI] for shortest rotation
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;

    setTargetAngle((prev) => prev + diff);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Find active card index closest to front (angle theta closest to 0 mod 2PI)
  const normalizedAngle = ((-angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const activeIndex = Math.round(normalizedAngle / angleStep) % numCards;

  return (
    <div className="w-full relative overflow-visible py-14 md:py-20 select-none">
      {/* ── Background Curved Organic Light Accents ── */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-teal-100/50 via-teal-50/20 to-transparent rounded-br-[10rem] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-100/40 via-teal-50/20 to-transparent rounded-tl-[12rem] pointer-events-none -z-10" />

      {/* ── Subheader ── */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-12 sm:mb-16 relative z-10">
        {/* Eyebrow Badge: → OUR SERVICES */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-white text-[#0D8B99] border border-[#0D8B99]/40 uppercase tracking-widest mb-4 shadow-2xs">
          <ArrowRight className="w-3.5 h-3.5 text-[#0D8B99]" />
          <span>OUR SERVICES</span>
        </div>

        {/* Main Heading: Solutions for Every Stage */}
        <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-4">
          Solutions for <span className="text-[#0D8B99]">Every Stage</span>
        </h2>

        {/* Subtitle with bold full-stack */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          From intelligent automation to{" "}
          <span className="font-bold text-slate-900">full-stack</span> development,
          we provide end-to-end solutions to help your business grow faster and
          work smarter.
        </p>
      </div>

      <div className="md:hidden">
        <div className="mb-3 flex items-center justify-between px-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">Explore our services</span>
          <button
            type="button"
            onClick={() => setMobileCarouselPaused((paused) => !paused)}
            aria-label={mobileCarouselPaused ? "Resume services carousel" : "Pause services carousel"}
            aria-pressed={mobileCarouselPaused}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3 text-[10px] font-semibold text-teal-800 shadow-sm transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            {mobileCarouselPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {mobileCarouselPaused ? "Play" : "Pause"}
          </button>
        </div>
        <div
          role="region"
          aria-label="Our services"
          aria-roledescription="carousel"
          tabIndex={0}
          className="home-services-carousel overflow-hidden"
        >
          <div className="home-services-carousel-track flex w-max" data-paused={mobileCarouselPaused}>
            {[false, true].map((duplicate) => (
              <div
                key={duplicate ? "duplicate" : "original"}
                className="flex shrink-0 gap-3 px-5 pb-5"
                aria-hidden={duplicate || undefined}
              >
                {SERVICES_LIST.map((service) => (
                  <MobileServiceCard key={service.id} service={service} duplicate={duplicate} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3D Orbital Arena (Expanded Horizontal Spacing) ── */}
      <div
        ref={containerRef}
        className="relative hidden w-full max-w-7xl mx-auto h-[550px] sm:h-[610px] lg:h-[650px] items-center justify-center overflow-visible md:flex"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle at center, rgba(45, 212, 191, 0.25) 0%, rgba(13, 139, 153, 0.08) 50%, transparent 70%)",
          }}
        />

        {/* ── Center Orbital Ellipse Track with Glowing Orbit Rings ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center">
          <svg
            suppressHydrationWarning
            className="w-[1150px] h-[380px] max-w-[96vw] overflow-visible"
            viewBox="0 0 1150 380"
            fill="none"
          >
            {/* Tilted Ellipse Track */}
            <ellipse
              suppressHydrationWarning
              cx="575"
              cy="190"
              rx={Math.round(dimensions.rx * 1.02)}
              ry={Math.round(dimensions.ry * 1.02)}
              stroke="rgba(45, 212, 191, 0.35)"
              strokeWidth="1.5"
            />
            {/* Node Dots along the ring */}
            {[0, 60, 120, 180, 240, 300].map((deg, idx) => {
              const rad = (deg * Math.PI) / 180;
              const cx = Math.round(575 + dimensions.rx * 1.02 * Math.sin(rad));
              const cy = Math.round(190 + dimensions.ry * 1.02 * Math.cos(rad));
              return (
                <circle
                  key={idx}
                  suppressHydrationWarning
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="#0D8B99"
                  opacity="0.75"
                />
              );
            })}
          </svg>

          {/* Center Glowing Core Badge */}
          <div className="absolute flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-teal-300/20 blur-xl absolute" />
            <div className="w-24 h-24 rounded-full border border-teal-300/40 animate-pulse flex items-center justify-center bg-teal-50/30 backdrop-blur-xs">
              <div className="w-16 h-16 rounded-full border border-teal-200/80 flex items-center justify-center bg-white shadow-[0_0_24px_rgba(45,212,191,0.35)]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E6F7F5] via-white to-[#CBF3ED] flex items-center justify-center text-[#0D8B99] shadow-inner">
                  <Image
                    src="/brand/logo-black.png"
                    alt="GrydIn"
                    width={44}
                    height={44}
                    className="h-7 w-7 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Orbiting 3D Neo-Cards (Bold, Attractive with 3D Extrusion) ── */}
        {SERVICES_LIST.map((service, index) => {
          const theta = angle + index * angleStep;
          const x = Number((dimensions.rx * Math.sin(theta)).toFixed(1));
          const y = Number((dimensions.ry * Math.cos(theta)).toFixed(1));

          // Depth metric: cos(theta) ranges from -1 (farthest) to 1 (closest front)
          const depth = Math.cos(theta);
          const normalizedDepth = (depth + 1) / 2; // 0 to 1

          // Scale ranges from 0.82 (back) to 1.04 (front)
          const scale = Number((0.82 + 0.22 * normalizedDepth).toFixed(3));
          // Opacity ranges from 0.75 to 1.0
          const opacity = Number((0.75 + 0.25 * normalizedDepth).toFixed(3));
          // zIndex ranges from 5 to 30
          const zIndex = Math.round(5 + 25 * normalizedDepth);
          // 3D subtle tilt toward viewer
          const rotateY = Number((-Math.sin(theta) * 10).toFixed(2));
          const rotateX = Number((Math.cos(theta) * 4).toFixed(2));

          const IconComp = service.icon;
          const isFront = normalizedDepth > 0.85;

          return (
            <div
              key={service.id}
              onClick={() => handleCardClick(index)}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                zIndex,
                opacity,
                transition: "opacity 0.2s ease, filter 0.2s ease",
              }}
              className="absolute cursor-pointer will-change-transform group"
            >
              {/* Card Container with Solid 3D Base Extrusion (Matching Mockup) */}
              <div
                className={`w-[265px] sm:w-[285px] lg:w-[305px] rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isFront
                    ? "ring-1 ring-slate-900/5 hover:-translate-y-1.5"
                    : "hover:border-slate-300"
                }`}
                style={{
                  boxShadow: isFront
                    ? `-8px 10px 0px 0px ${service.depthColor}, 0 25px 45px -12px rgba(15, 23, 42, 0.2)`
                    : `-6px 8px 0px 0px ${service.depthColor}, 0 16px 30px -10px rgba(15, 23, 42, 0.12)`,
                }}
              >
                {/* Corner Soft Curved Pastel Wave Decoration (Matching Mockup) */}
                <div
                  className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-tl-[4rem] bg-gradient-to-tl ${service.cornerGradient} pointer-events-none`}
                />

                <div>
                  {/* Top Row: Icon + Rounded Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Icon Box */}
                    <div
                      className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center font-bold shadow-2xs transition-transform group-hover:scale-105`}
                    >
                      <IconComp className="w-5 h-5" strokeWidth={2.4} />
                    </div>

                    {/* Badge Pill */}
                    <span
                      className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full border ${service.badgeBg} shadow-2xs`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  {/* Bold Card Heading */}
                  <h3 className="text-lg sm:text-[1.22rem] font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors mb-2.5 leading-snug tracking-tight">
                    {service.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal mb-6 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Footer: Learn more link with hover slide */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <Link
                    href={service.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors group/link"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>

                  {isFront && (
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shadow-xs" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Carousel Controls: Prev (<), Indicator Dots, Next (>) ── */}
      <div className="hidden items-center justify-center gap-4 mt-6 sm:mt-8 relative z-30 md:flex">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous service"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-600 hover:border-teal-500 shadow-xs flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicators Dots */}
        <div className="flex items-center gap-2 px-2">
          {SERVICES_LIST.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCardClick(i)}
              aria-label={`Jump to service ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-2.5 h-2.5 bg-teal-600 shadow-xs scale-110"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next service"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-600 hover:border-teal-500 shadow-xs flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
