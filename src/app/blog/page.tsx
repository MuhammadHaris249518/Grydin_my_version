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
import { Section } from "@/app/globalscope/ui/Section";
import { Badge } from "@/app/globalscope/ui/Badge";
import { Card } from "@/app/globalscope/ui/Card";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { CategoryBar } from "./CategoryBar";
import { PostCard } from "./PostCard";
import { AnnouncementRow } from "./AnnouncementRow";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Newsroom"
        title="INSIGHTS & NEWSROOM"
        subtitle="Practical perspectives on AI agents, workflow automation, and modern systems architecture from GrydIn."
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Sticky Category Bar */}
      <CategoryBar />

      {/* 3. Featured Block: Microsoft Source style */}
      {featured && (
        <section className="bg-white py-12 md:py-16 border-b border-surface-line">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-6">
              Featured Story
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Large Featured Card (60% width on lg) */}
              <div className="lg:col-span-7">
                <Card
                  href={`/blog/${featured.slug}`}
                  className="h-full flex flex-col justify-between overflow-hidden p-0 shadow-sm hover:shadow-xl"
                >
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
                      <Badge variant="teal" size="sm">
                        {CATEGORY_NAMES[featured.category]}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink tracking-tight mb-3 group-hover:text-teal transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-sm sm:text-base text-ink-muted leading-relaxed line-clamp-3 mb-6">
                        {featured.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-surface-line text-xs text-ink-muted">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.date}
                      </span>
                      <span className="font-bold text-teal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read full story <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: 3 Compact Latest Items */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-muted pb-2 border-b border-surface-line">
                  Latest Updates
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4">
                  {latestPosts.map((post) => (
                    <Card
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="p-4 sm:p-5 flex-1 flex items-center gap-4 hover:border-slate-300"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-navy relative border border-surface-line">
                        <CoverArt
                          seed={post.slug}
                          aspect="square"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Badge variant="teal" size="sm" className="mb-1">
                          {CATEGORY_NAMES[post.category]}
                        </Badge>
                        <h4 className="text-xs sm:text-sm font-bold text-ink group-hover:text-teal transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-ink-muted">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Three Category Rails */}
      {/* Rail 1: Insights (White) */}
      <Section
        tone="white"
        eyebrow="Technical Perspectives"
        title="Engineering Insights"
        intro="Architectural deep dives, workflow teardowns, and engineering best practices."
      >
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-surface-line">
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            Featured In-Depth Articles
          </span>
          <Link
            href="/blog/category/blog"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal hover:text-teal-dark group"
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
      </Section>

      {/* Rail 2: News (Soft Band) */}
      <Section
        tone="soft"
        eyebrow="Media & Releases"
        title="Company & Industry News"
        intro="Recent company milestones, industry research, and digital automation developments."
      >
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-surface-line">
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            Recent Press &amp; Research
          </span>
          <Link
            href="/blog/category/news"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal hover:text-teal-dark group"
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
      </Section>

      {/* Rail 3: Announcements (Dated List Rows - NetSol Style) */}
      <Section
        tone="white"
        eyebrow="Notices & Releases"
        title="Official Announcements"
        intro="Product launches, facility updates, and organizational notifications from GrydIn."
      >
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-surface-line">
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            Announcement Archive
          </span>
          <Link
            href="/blog/category/announcements"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal hover:text-teal-dark group"
          >
            <span>View all announcements</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-surface-line divide-y divide-surface-line/70 overflow-hidden shadow-xs">
          {announcementPosts.map((post) => (
            <AnnouncementRow key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* 5. CtaBand (No fake email backend - Talk to us -> /contact) */}
      <CtaBand
        title="Have an engineering problem worth writing about?"
        subtitle="Let's diagnose your workflows and architect an automated solution."
        buttonText="Talk to us"
        buttonHref="/contact"
      />
    </div>
  );
}
