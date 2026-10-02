import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, organizationJsonLd, websiteJsonLd, professionalServiceJsonLd } from "@/lib/seo";
import { JsonLd } from "./globalscope/ui/JsonLd";
import { CollabsMarquee } from "./globalscope/CollabsMarquee";
import { HomeProblem } from "./globalscope/home/HomeProblem";
import { HomeServices } from "./globalscope/home/HomeServices";
import { HomeSeeItWork } from "./globalscope/home/HomeSeeItWork";
import { HomeCases } from "./globalscope/home/HomeCases";
import { HomeProcess } from "./globalscope/home/HomeProcess";
import { HomeWhyUs } from "./globalscope/home/HomeWhyUs";
import { HomeStack } from "./globalscope/home/HomeStack";
import { HomeNewsroom } from "./globalscope/home/HomeNewsroom";
import { HomeFaq } from "./globalscope/home/HomeFaq";
import { CtaBand } from "./globalscope/ui/CtaBand";
import { getAllPosts } from "@/lib/blog";

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

// ── Hero Section (Retained 100% untouched) ──────────────────────────────────
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-navy min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex items-center"
    >
      {/* Background Image of the Corporate Meeting Room */}
      <div
        className="absolute inset-0 z-0 bg-cover"
        style={{
          backgroundImage: `url('/images/hero/hero-banner.jpg')`,
          backgroundPosition: "right 30% center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Desktop horizontal smooth blend gradient: Navy #04172e on left to transparent on right */}
      <div
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, #04172e 0%, #04172e 38%, rgba(4, 23, 46, 0.95) 45%, rgba(4, 23, 46, 0.7) 56%, rgba(4, 23, 46, 0.2) 70%, rgba(4, 23, 46, 0) 82%)",
        }}
      />

      {/* Mobile/Tablet vertical gradient for maximum text contrast */}
      <div
        className="absolute inset-0 z-10 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 23, 46, 0.96) 0%, rgba(4, 23, 46, 0.9) 65%, rgba(4, 23, 46, 0.75) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-xl lg:max-w-2xl text-left">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black uppercase text-white tracking-tight leading-[1.12]"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            EMPOWERING YOUR <br className="hidden sm:inline" />
            BUSINESS WITH TECH
          </h1>

          <p className="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed">
            Innovating Today for Tomorrow&apos;s Solutions. <br className="hidden sm:inline" />
            Custom Software, Cloud, and AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal hover:bg-teal-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              GET STARTED
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-white/10 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-white rounded-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              LEARN MORE
            </Link>
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
        {/* 1. Approved Hero Section (100% Untouched) */}
        <HeroSection />

        {/* 2. Client Collabs Marquee */}
        <CollabsMarquee background="#04172e" />

        {/* 3. Operational Bottlenecks (Problem) */}
        <HomeProblem />

        {/* 4. Core Capabilities (Bento Grid) */}
        <HomeServices />

        {/* 5. Live Architecture Demo (Video/3D Slot) */}
        <HomeSeeItWork />

        {/* 6. Case Studies */}
        <HomeCases />

        {/* 7. Methodology (Timeline) */}
        <HomeProcess />

        {/* 8. Why GrydIn (Stat Band & Pillars) */}
        <HomeWhyUs />

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