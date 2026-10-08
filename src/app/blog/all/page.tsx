import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPosts,
  paginatePosts,
  POSTS_PER_PAGE,
} from "@/lib/blog";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { CategoryBar } from "../CategoryBar";
import { PostCard } from "../PostCard";
import { AnnouncementRow } from "../AnnouncementRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnnouncementHeroArtwork } from "../AnnouncementHeroArtwork";
import {
  buildMetadata,
  collectionPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  documentTitle: "All Articles | GrydIn Newsroom",
  socialTitle: "All Articles | GrydIn Newsroom",
  description:
    "Browse all engineering articles, company updates, and announcements from GrydIn.",
  path: "/blog/all",
  keywords: ["GrydIn articles", "engineering insights", "AI automation news"],
});

export default function AllArticlesPage() {
  const posts = getAllPosts();
  const { items, pagination } = paginatePosts(posts, 1, POSTS_PER_PAGE);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Newsroom", href: "/blog" },
    { label: "All Articles" },
  ];
  const jsonLdData = [
    collectionPageJsonLd({
      path: "/blog/all",
      name: "All GrydIn Newsroom Articles",
      description:
        "All published engineering articles, company updates, and announcements from GrydIn.",
      items: posts.map((post) => ({
        name: post.title,
        url: `/blog/${post.slug}`,
        description: post.description,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Newsroom", url: "/blog" },
      { name: "All Articles", url: "/blog/all" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-surface text-ink">
      <JsonLd data={jsonLdData} />
      <PageHero
        eyebrow="All Articles"
        title="All Articles"
        subtitle="Explore every engineering insight, company update, and announcement from Grydin."
        breadcrumbs={breadcrumbs}
        slot={<AnnouncementHeroArtwork />}
        showSlotOnMobile
        compact
      />
      <CategoryBar />

      <section className="bg-surface py-8 md:py-12 border-b border-surface-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Newsroom"
            title="All published articles"
            accent="articles"
            className="mb-6 md:mb-8"
          />

          {items.length > 0 ? (
            <div className="space-y-8">
              {items.some((post) => post.category === "announcements") && (
                <section aria-labelledby="all-announcements-heading">
                  <SectionHeader
                    eyebrow="Official updates"
                    title="Announcements"
                    accent="announcements"
                    className="mb-5"
                  />
                  <div className="surface-card overflow-hidden rounded-2xl border border-surface-line divide-y divide-surface-line">
                    {items
                      .filter((post) => post.category === "announcements")
                      .map((post) => (
                        <AnnouncementRow key={post.slug} post={post} />
                      ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="all-articles-heading">
                <SectionHeader
                  eyebrow="Newsroom"
                  title="Insights and news"
                  accent="articles"
                  className="mb-6 md:mb-8"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {items.filter((post) => post.category !== "announcements").map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <p className="rounded-2xl border border-surface-line bg-white px-6 py-10 text-center text-ink-muted">
              No articles have been published yet.
            </p>
          )}

          {pagination.hasNextPage && (
            <div className="mt-12 flex justify-end border-t border-surface-line pt-6">
              <Link
                href="/blog/page/2"
                className="surface-card px-4 py-2 rounded-xl text-xs font-mono text-accent hover:text-ink transition-colors flex items-center gap-1.5"
              >
                <span>Next Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
