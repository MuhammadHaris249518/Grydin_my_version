"use client";

import React from "react";
import Image from "next/image";
import { Bot, Code2, Layers, Zap } from "lucide-react";

export interface BlogHeroProps {
  activeTopic?: string | null;
  onSelectTopic?: (topic: string | null) => void;
}

export const HERO_TOPICS = [
  { id: "ai-agents", label: "AI & Agents", icon: Bot },
  { id: "workflows", label: "Workflows", icon: Code2 },
  { id: "system-design", label: "System Design", icon: Layers },
  { id: "tech-insights", label: "Tech Insights", icon: Zap },
];

export function BlogHero({ activeTopic, onSelectTopic }: BlogHeroProps) {
  return (
    <section className="relative w-full bg-white overflow-hidden border-b border-surface-line pt-8 pb-12 sm:pt-12 sm:pb-16 lg:py-16">
      {/* Background ambient lighting and subtle aura matching design */}
      <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full pointer-events-none overflow-hidden">
        {/* Soft radial glow centered behind robot */}
        <div 
          className="absolute -top-1/4 -right-1/4 w-[750px] h-[750px] rounded-full opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(13, 139, 153, 0.12) 0%, rgba(45, 212, 191, 0.06) 40%, transparent 70%)"
          }}
        />
        {/* Subtle decorative curved background lines */}
        <svg 
          className="absolute right-0 top-0 h-full w-full opacity-20 text-[#0d8b99]/30" 
          viewBox="0 0 800 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M200,600 C350,450 500,500 800,300" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray="6 6"
          />
          <path 
            d="M300,600 C450,400 550,350 800,200" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Topics */}
          <div className="lg:col-span-7 text-left">
            {/* 1. Blog Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f7f5] text-[#0d8b99] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d8b99]" />
              <span>BLOG</span>
            </div>

            {/* 2. Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-ink tracking-tight leading-[1.12] mb-6">
              Perspectives on{" "}
              <span className="text-[#0d8b99] block mt-1">Systems &amp; Engineering</span>
            </h1>

            {/* 3. Subtitle */}
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl mb-8">
              Thoughts, lessons and practical insights on AI agents, workflow automation, and modern systems architecture from Grydin.
            </p>

            {/* 4. Topic Quick Links / Filters */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 border-t border-slate-100 sm:border-0 sm:pt-0">
              {HERO_TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isActive = activeTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic?.(isActive ? null : topic.id)}
                    className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all group py-1.5 px-2 -ml-2 rounded-lg ${
                      isActive
                        ? "text-[#0d8b99] bg-[#e6f7f5] px-3"
                        : "text-ink/80 hover:text-[#0d8b99] hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#0d8b99]" : "text-slate-400 group-hover:text-[#0d8b99]"
                    }`} />
                    <span>{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Robot Illustration with Desk, Laptop & Floating Tiles */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] sm:max-w-[520px]">
              {/* Soft background ambient halo glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d8b99]/10 via-[#2dd4bf]/10 to-transparent rounded-full blur-2xl transform scale-95 pointer-events-none" />

              {/* Main 3D Robot Image */}
              <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/blog/blog-hero-robot.png"
                  alt="GrydIn AI Robot Workspace"
                  width={520}
                  height={380}
                  priority
                  className="w-full h-auto object-contain drop-shadow-sm select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
