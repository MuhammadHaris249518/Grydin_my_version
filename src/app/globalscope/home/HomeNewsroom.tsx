"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Clock,
  LayoutGrid,
  Sparkles,
  Cloud,
  Box,
  Code2,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BlogPost } from "@/lib/content-schema";

const CATEGORIES = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "ai-llms", label: "AI & LLMs", icon: Sparkles },
  { id: "devops-cloud", label: "DevOps & Cloud", icon: Cloud },
  { id: "product", label: "Product", icon: Box },
  { id: "engineering", label: "Engineering", icon: Code2 },
  { id: "company", label: "Company", icon: Users },
];

export interface HomeNewsroomProps {
  posts?: BlogPost[];
}

export function HomeNewsroom({ posts = [] }: HomeNewsroomProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Default fallback data matching exact user design image
  const featuredPost = {
    title: "Grydin Expands Its AI Automation Practice",
    category: "AI & LLMs",
    date: "May 12, 2025",
    readingTime: "6 min read",
    description:
      "We're excited to announce the expansion of our AI automation practice, helping businesses build intelligent systems, streamline operations, and unlock new possibilities with generative AI.",
    slug: posts[0]?.slug || "grydin-expands-ai-automation-practice",
    image: "/assets/images/blog/ai-automation-practice.jpg",
  };

  const sidePosts = [
    {
      title: "Introducing GridPilot (Beta)",
      category: "Engineering",
      date: "Sep 18, 2026",
      readingTime: "4 min read",
      description:
        "GridPilot announces the private beta of GridPilot, an enterprise console for observing and governing autonomous AI agent workflows.",
      slug: posts[1]?.slug || "introducing-gridpilot-beta",
      image: "/assets/images/blog/gridpilot-beta.jpg",
    },
    {
      title: "Why Businesses Have a Visibility Problem, Not an Execution Problem",
      category: "Company",
      date: "Apr 28, 2025",
      readingTime: "3 min read",
      description:
        "Most operational leaders aren't caused by slow workers. They stem from invisible handoffs, missing alerts, and fragmented SaaS tools.",
      slug: posts[2]?.slug || "visibility-problem-not-execution",
      image: "/assets/images/blog/visibility-problem.jpg",
    },
  ];

  return (
    <section id="newsroom" className="relative w-full overflow-hidden border-b border-teal-100/70 bg-[#EDF8F7] py-12 sm:py-16 md:py-24">
      {/* Top Left Background Accent Grid Dots */}
      <div className="absolute top-6 left-6 opacity-20 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        {/* Header Block with Top-Right Handwritten Annotation */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 md:flex-row md:items-end md:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-teal-500" />
              LATEST INSIGHTS
            </div>
            <h2 className="mb-2 text-[clamp(1.65rem,7vw,2rem)] font-extrabold leading-tight tracking-tight text-slate-900 sm:mb-3 sm:text-4xl lg:text-[2.75rem]">
              Engineering perspectives &{" "}
              <span className="text-teal-600">company updates</span>
            </h2>
            <p className="max-w-3xl text-[13px] font-normal leading-relaxed text-slate-600 sm:text-base">
              Thoughts, tutorials, and updates from our team on AI, cloud, and modern engineering — straight from the trenches.
            </p>
          </div>

          {/* Top-Right Handwritten Annotation */}
          <div className="hidden lg:flex items-center gap-2 text-teal-600 font-serif italic text-xl font-medium tracking-wide border-b border-teal-400/40 pb-1 shrink-0 -rotate-2">
            <span>Ideas</span>
            <span className="text-teal-400 font-sans">→</span>
            <span>Code</span>
            <span className="text-teal-400 font-sans">→</span>
            <span>Impact</span>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="-mx-5 mb-6 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto border-b border-teal-200/60 px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold tracking-tight transition-all duration-200 sm:px-4 ${
                  isActive
                    ? "bg-[#0D8B99] text-white shadow-sm"
                    : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200/80 hover:border-teal-300"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid Section */}
        <div className="mb-8 grid min-w-0 gap-4 sm:gap-6 lg:mb-10 lg:grid-cols-12">
          {/* Left Big Featured Card (7 cols) */}
          <Reveal className="min-w-0 lg:col-span-7">
            <div className="group block h-full">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-teal-200/90 bg-[#E3F5F2] p-4 shadow-sm transition-all hover:shadow-md sm:p-8">
                <div className="grid min-w-0 grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-12">
                  {/* Left Text Info (7 cols) */}
                  <div className="flex h-full min-w-0 flex-col justify-between md:col-span-7">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-4">
                        <span className="rounded-md bg-[#0D8B99] text-white px-3 py-1 font-bold text-xs">
                          {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-teal-600" />
                          {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {featuredPost.readingTime}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-3 group-hover:text-teal-700 transition-colors">
                        {featuredPost.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                        {featuredPost.description}
                      </p>
                    </div>

                    <div>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B5B65] hover:bg-[#084850] text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <span>Read full article</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Image Graphic (5 cols) */}
                  <div className="relative h-44 overflow-hidden rounded-2xl border border-teal-200/60 shadow-inner sm:h-52 md:col-span-5 md:h-64">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: 2 Stacked Compact Post Cards (5 cols) */}
          <div className="-mx-5 flex min-w-0 snap-x snap-mandatory flex-row gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-4 sm:px-0 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0">
            {sidePosts.map((post, idx) => (
              <Reveal key={post.title} delay={0.1 * (idx + 1)} className="w-[84%] max-w-[360px] shrink-0 snap-start sm:w-[70%] lg:w-auto lg:max-w-none lg:shrink">
                <div className="group block h-full">
                  <div className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:gap-4 sm:p-5 lg:flex-row">
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap mb-2">
                          <span className="rounded-md bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-0.5 font-bold text-[11px]">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                            <Calendar className="h-3 w-3 text-teal-600" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                            <Clock className="h-3 w-3 text-slate-400" />
                            {post.readingTime}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug mb-1.5">
                          {post.title}
                        </h4>

                        <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2 mb-3">
                          {post.description}
                        </p>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
                      >
                        <span>Read more</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Compact Right Image Thumbnail */}
                    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200/70 shadow-xs sm:h-28 sm:w-36">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Footer Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pt-4 border-t border-teal-200/60">
          <div className="flex w-full min-w-0 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 sm:mr-2">
              EXPLORE TOPICS ──
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#0D8B99] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0D8B99] hover:bg-[#096B76] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            <span>VIEW ALL NEWS & INSIGHTS</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
