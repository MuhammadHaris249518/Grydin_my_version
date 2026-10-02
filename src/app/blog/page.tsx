import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllPosts,
  getPostsByCategory,
  getFeaturedPost,
  CATEGORY_NAMES,
} from "@/lib/blog";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { CategoryBar } from "./CategoryBar";
import { PostCard } from "./PostCard";
import { AnnouncementRow } from "./AnnouncementRow";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  documentTitle: "Insights & Newsroom | GrydIn",
  socialTitle: "GrydIn Newsroom — Perspectives on AI Agents & Custom Software",
  description: "Practical engineering perspectives on autonomous AI agents, workflow automation, and modern distributed systems architecture.",
  path: "/blog",
  keywords: ["AI agents", "workflow automation", "systems architecture", "engineering perspectives", "GrydIn newsroom"],
});

export default function BlogHubPage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPost() || allPosts[0];
  const latestPosts = allPosts.filter((p) => p.slug !== featured?.slug).slice(0, 3);

  const insightsPosts = getPostsByCategory("blog").slice(0, 3);
  const newsPosts = getPostsByCategory("news").slice(0, 3);
  const announcementPosts = getPostsByCategory("announcements").slice(0, 5);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Newsroom" },
  ];

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Newsroom"
        title="Perspectives on systems & engineering"
        subtitle="Practical perspectives on AI agents, workflow automation, and modern systems architecture from GrydIn."
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Sticky Category Bar */}
      <CategoryBar />

      {/* 3. Featured Editorial Block */}
      {featured && (
        <section className="bg-navy py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-teal-glow mb-6">
              Featured Editorial
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Large Featured Card (7 cols on lg) */}
              <div className="lg:col-span-7">
                <Link href={`/blog/${featured.slug}`} className="group block h-full">
                  <GlassCard className="h-full flex flex-col justify-between overflow-hidden p-0 transition-[box-shadow,border-color] duration-300 group-hover:border-teal-glow/50 group-hover:shadow-glow">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      {featured.cover ? (
                        <Image
                          src={featured.cover}
                          alt={featured.coverAlt || featured.title}
                          fill
                          priority
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <CoverArt
                          seed={featured.slug}
                          aspect="16/9"
                          title={featured.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="font-mono text-xs uppercase text-teal-glow bg-navy/80 backdrop-blur-md px-3 py-1 rounded-md border border-teal-glow/40">
                          {CATEGORY_NAMES[featured.category]}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3 group-hover:text-teal-glow transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-base text-slate-300 leading-relaxed line-clamp-3 mb-6">
                          {featured.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-teal-glow" />
                          {featured.date}
                        </span>
                        <span className="font-semibold text-teal-glow flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read full story <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </div>

              {/* Right Column: 3 Compact Latest Items (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-teal-glow pb-2 border-b border-white/10">
                  Latest Updates
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block flex-1"
                    >
                      <GlassCard className="p-5 h-full flex items-center gap-4 transition-[box-shadow,border-color] duration-300 group-hover:border-teal-glow/50 group-hover:shadow-glow">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5 relative border border-white/10">
                          <CoverArt
                            seed={post.slug}
                            aspect="square"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-mono text-[10px] uppercase text-teal-glow mb-1 inline-block">
                            {CATEGORY_NAMES[post.category]}
                          </span>
                          <h4 className="text-sm font-semibold text-white group-hover:text-teal-glow transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-slate-400">
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Three Category Rails */}
      {/* Rail 1: Insights */}
      <section className="bg-navy-950 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
            <SectionHeader
              eyebrow="Technical Perspectives"
              title="Engineering insights"
              accent="Engineering insights"
              intro="Architectural deep dives, workflow teardowns, and engineering best practices."
            />
            <Link
              href="/blog/category/blog"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-teal-glow hover:text-white group shrink-0"
            >
              <span>View all insights</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {insightsPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Rail 2: News */}
      <section className="bg-navy py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
            <SectionHeader
              eyebrow="Media & Releases"
              title="Company & industry news"
              accent="industry news"
              intro="Recent company milestones, industry research, and digital automation developments."
            />
            <Link
              href="/blog/category/news"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-teal-glow hover:text-white group shrink-0"
            >
              <span>View all news</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Rail 3: Announcements */}
      <section className="bg-navy-950 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <SectionHeader
              eyebrow="Notices & Releases"
              title="Official announcements"
              accent="announcements"
              intro="Product launches, facility updates, and organizational notifications from GrydIn."
            />
            <Link
              href="/blog/category/announcements"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-teal-glow hover:text-white group shrink-0"
            >
              <span>View all notices</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="glass rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden">
            {announcementPosts.map((post) => (
              <AnnouncementRow key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CtaBand */}
      <CtaBand
        title="Have an engineering problem worth writing about?"
        subtitle="Let's diagnose your workflows and architect an automated solution."
      />
    </div>
  );
}
