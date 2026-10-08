import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Cloud, Sparkles, Cpu, Database } from "lucide-react";
import { buildMetadata, organizationJsonLd, websiteJsonLd, professionalServiceJsonLd } from "@/lib/seo";
import { JsonLd } from "./globalscope/ui/JsonLd";
import { CollabsMarquee } from "./globalscope/CollabsMarquee";
import { HomeServices } from "./globalscope/home/HomeServices";
import { HomeSeeItWork } from "./globalscope/home/HomeSeeItWork";
import { HomeCases } from "./globalscope/home/HomeCases";
import { HomeStack } from "./globalscope/home/HomeStack";
import { HomeNewsroom } from "./globalscope/home/HomeNewsroom";
import { HomeFaq } from "./globalscope/home/HomeFaq";
import { CtaBand } from "./globalscope/ui/CtaBand";
import { getAllPosts } from "@/lib/blog";
import { HomeHeroTitle } from "./globalscope/home/HomeHeroTitle";

export const metadata: Metadata = buildMetadata({
  documentTitle: "GrydIn | Autonomous AI Agents, Workflow Automation & Custom Software",
  socialTitle: "GrydIn — Autonomous AI Agents, Workflow Automation & Custom Software",
  description:
    "GrydIn engineers custom software, AI agents, and workflow automations that eliminate operational friction. Shipped in under two weeks with fixed scopes.",
  path: "/",
  keywords: [
    "AI agents",
    "workflow automation",
    "custom software",
    "system integration",
    "full-stack development",
    "GrydIn Islamabad",
  ],
});
// ── Hero Section (Updated to match design reference) ─────────────────────────
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-68px)] flex items-center overflow-hidden bg-[#030e1f]"
    >
      {/* Background Image of the Corporate Meeting Room with Holographic Grydin Globe */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/images/hero/hero-hologram.jpg')`,
          backgroundPosition: "right 4% center",
        }}
      />

      {/* Desktop horizontal smooth blend gradient: Deep Navy on left to transparent on right */}
      <div
        className="absolute inset-0 z-10 hidden md:block pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #030e1f 0%, #030e1f 36%, rgba(3, 14, 31, 0.98) 46%, rgba(3, 14, 31, 0.75) 58%, rgba(3, 14, 31, 0.25) 75%, transparent 100%)",
        }}
      />

      {/* Mobile/Tablet vertical gradient for maximum text contrast */}
      <div
        className="absolute inset-0 z-10 md:hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(3, 14, 31, 0.98) 0%, rgba(3, 14, 31, 0.90) 58%, rgba(3, 14, 31, 0.8) 100%)",
        }}
      />

      {/* Rotating G mark stays centered on the holographic globe. */}
      <div aria-hidden="true" className="home-hero-orbit-logo hidden md:flex">
        <span className="home-hero-orbit-halo" />
        <svg viewBox="0 0 132.5 145" className="home-hero-orbit-glyph">
          <path d="M66.354,25.354l26.286,26.286c0.197,0.197,0.518,0.19,0.706-.015l11.757-12.784c0.176-.191.172-.486-.009-.672L68.144.148C68.052.053,67.925,0,67.793,0h-2.848c-.13,0-.255.052-.347.144L.143,64.857C.051,64.949,0,65.073,0,65.202v13.456c0,.128.05.251.14.343l64.716,65.853c.092.094.218.146.349.146h2.897c.133,0,.26-.054.352-.15l33.409-34.708c.088-.091.137-.213.137-.34l-.023-20.266c-.001-1.224-1.461-1.857-2.356-1.023l-31.48,29.355c-.091.084-.21.131-.334.131h-2.601c-.132,0-.258-.053-.35-.147l-42.717-43.71C22.05,74.051,22,73.928,22,73.801v-2.604c0-.126.049-.247.136-.338l43.519-45.497c.189-.199.505-.202.699-.008z" />
          <path d="M66.5,63.5v20h43v17.775c0,1.146,1.407,1.695,2.183.852l20.407-22.181c.264-.287.41-.662.41-1.052V63.95c0-.249-.202-.45-.45-.45H66.5z" />
        </svg>
      </div>

      {/* Sleek Glowing Cyber Wave & Tech Grid Pattern at bottom-left */}
      <div className="absolute bottom-0 left-0 w-full sm:w-[580px] lg:w-[750px] h-28 sm:h-36 lg:h-44 pointer-events-none z-15 overflow-hidden">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 850 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveCyanGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0" />
              <stop offset="25%" stopColor="#00e5ff" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wavePurpleGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="35%" stopColor="#818cf8" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#00c2cb" stopOpacity="0" />
            </linearGradient>
            <pattern id="heroDotMesh" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#00c2cb" fillOpacity="0.22" />
            </pattern>
          </defs>

          {/* Dotted mesh area */}
          <path
            d="M 0 170 Q 220 130 450 180 T 850 160 L 850 240 L 0 240 Z"
            fill="url(#heroDotMesh)"
          />

          {/* Purple secondary curve glow */}
          <path
            d="M -40 200 C 180 180 340 220 580 180 S 780 210 880 190"
            stroke="url(#wavePurpleGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="blur(6px)"
          />

          {/* Cyan primary curve glow */}
          <path
            d="M -40 160 C 160 130 300 200 520 170 S 740 180 860 160"
            stroke="#00e5ff"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.28"
            filter="blur(10px)"
          />
          <path
            d="M -40 160 C 160 130 300 200 520 170 S 740 180 860 160"
            stroke="url(#waveCyanGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Card 1: AI Engineering */}
      <div className="hidden lg:flex absolute top-[11%] xl:top-[13%] left-[45%] xl:left-[46%] z-30 animate-float-card-a items-center gap-3 bg-[#031326]/95 hover:bg-[#031326] border border-[#00c2cb]/50 backdrop-blur-xl shadow-[0_0_24px_rgba(0,194,203,0.3)] rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[195px] xl:min-w-[210px] transition-all hover:shadow-[0_0_36px_rgba(0,194,203,0.38)] select-none">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#00c2cb]/20 border border-[#00c2cb]/40 flex items-center justify-center text-[#00f5d4] shadow-[0_0_12px_rgba(0,245,212,0.3)]">
          <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] xl:text-[10px] font-bold tracking-[0.14em] text-[#00c2cb] uppercase">
            AI ENGINEERING
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs sm:text-sm xl:text-base font-extrabold text-white">
              Agents &amp; copilots
            </span>
          </div>
        </div>
      </div>

      {/* Floating Card 2: Cloud Platform */}
      <div className="hidden lg:flex absolute top-[47%] xl:top-[49%] left-[50%] xl:left-[51%] z-30 animate-float-card-b items-center gap-3 bg-[#031326]/95 hover:bg-[#031326] border border-[#0284c7]/50 backdrop-blur-xl shadow-[0_0_24px_rgba(2,132,199,0.3)] rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[195px] xl:min-w-[210px] transition-all hover:shadow-[0_0_36px_rgba(2,132,199,0.38)] select-none">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0284c7]/20 border border-[#0284c7]/40 flex items-center justify-center text-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.3)]">
          <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] xl:text-[10px] font-bold tracking-[0.14em] text-slate-300 uppercase">
            CLOUD PLATFORM
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs sm:text-sm xl:text-base font-extrabold text-white">
              Secure cloud infrastructure
            </span>
          </div>
        </div>
      </div>

      {/* Floating Card 3: Product Engineering */}
      <div className="hidden lg:flex absolute top-[15%] xl:top-[17%] right-[2%] xl:right-[4%] z-30 animate-float-card-c items-center gap-3 bg-[#031326]/95 hover:bg-[#031326] border border-[#818cf8]/50 backdrop-blur-xl shadow-[0_0_24px_rgba(129,140,248,0.3)] rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 min-w-[185px] xl:min-w-[200px] transition-all hover:shadow-[0_0_36px_rgba(129,140,248,0.38)] select-none">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#6366f1]/20 border border-[#818cf8]/40 flex items-center justify-center text-[#a5b4fc] shadow-[0_0_12px_rgba(165,180,252,0.3)]">
          <Database className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] xl:text-[10px] font-bold tracking-[0.14em] text-slate-300 uppercase">
            PRODUCT ENGINEERING
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs sm:text-sm xl:text-base font-extrabold text-white">
              Full-stack products
            </span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 my-auto">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Eyebrow Kicker */}
          <div className="inline-flex items-center gap-2.5 mb-2.5 sm:mb-3.5">
            <span className="w-6 sm:w-7 h-[2px] bg-[#00c2cb] shadow-[0_0_10px_#00c2cb] inline-block rounded-full" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#00c2cb] uppercase">
              INNOVATION / TECHNOLOGY / GROWTH
            </span>
          </div>

          <HomeHeroTitle />

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            Custom software, cloud &amp; AI solutions built <br className="hidden sm:inline" />
            for ambitious businesses.
          </p>

          {/* Action Buttons: Start a Project & Explore Solutions */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-[#00d2df] via-[#00c2cb] to-[#0284c7] hover:from-[#00e5ff] hover:to-[#0369a1] text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_0_24px_rgba(0,194,203,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 bg-slate-900/50 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold border border-white/20 hover:border-white/40 rounded-full transition-all transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
            >
              Explore Solutions
            </Link>
          </div>

          {/* Bottom Features Row: Software • Cloud • AI */}
          <div className="mt-5 sm:mt-7 flex items-center gap-3.5 sm:gap-5 text-xs sm:text-[13px] text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00c2cb]" />
              <span>Software</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00c2cb]" />
              <span>Cloud</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00c2cb]" />
              <span>AI</span>
            </div>
          </div>

          {/* Mobile Metric Cards Display (Visible only on < lg screens) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 lg:hidden">
            <div className="flex items-center gap-3 bg-[#031326]/95 border border-[#00c2cb]/40 backdrop-blur-md rounded-xl p-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#00c2cb]/20 flex items-center justify-center text-[#00f5d4]">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#00c2cb] font-bold">AI ENGINEERING</p>
                <p className="text-xs font-bold text-white">Agents &amp; copilots</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#031326]/95 border border-[#0284c7]/40 backdrop-blur-md rounded-xl p-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0284c7]/20 flex items-center justify-center text-[#38bdf8]">
                <Cloud className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-300 font-bold">CLOUD PLATFORM</p>
                <p className="text-xs font-bold text-white">Secure cloud infrastructure</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#031326]/95 border border-[#818cf8]/40 backdrop-blur-md rounded-xl p-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6366f1]/20 flex items-center justify-center text-[#a5b4fc]">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-300 font-bold">PRODUCT ENGINEERING</p>
                <p className="text-xs font-bold text-white">Full-stack products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={professionalServiceJsonLd()} />

      <main className="w-full overflow-x-hidden bg-surface">
        {/* 1. Hero Section - Full Viewport View */}
        <HeroSection />

        {/* 2. Client & Partner Brands Marquee - Revealed upon scrolling down */}
        <CollabsMarquee background="#020b18" />

        {/* 2. Core Capabilities & Solutions for Every Stage */}
        <HomeServices />

        {/* 5. Live Architecture Demo (Video/3D Slot) */}
        <HomeSeeItWork />

        {/* 6. Case Studies */}
        <HomeCases />

        {/* 9. Technology Marquee */}
        <HomeStack />

        {/* 10. Newsroom & Insights */}
        <HomeNewsroom posts={posts} />

        {/* 11. Frequently Asked Questions */}
        <HomeFaq />

        {/* 12. Closing CTA Band */}
        <CtaBand />
      </main>
    </>
  );
}
