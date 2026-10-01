import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPosts,
  paginatePosts,
  POSTS_PER_PAGE,
} from "@/lib/blog";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { CategoryBar } from "../../CategoryBar";
import { PostCard } from "../../PostCard";
import {
  buildMetadata,
  collectionPageJsonLd,
  breadcrumbJsonLd,
  SITE_URL,
} from "@/lib/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.max(2, Math.ceil(posts.length / POSTS_PER_PAGE));
  const params: { n: string }[] = [];

  for (let i = 2; i <= totalPages; i++) {
    params.push({ n: i.toString() });
  }

  return params;
}

interface PageProps {
  params: Promise<{ n: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { n } = await params;
  const pageNum = parseInt(n, 10);

  return buildMetadata({
    documentTitle: `Insights & Newsroom - Page ${pageNum} | GrydIn`,
    socialTitle: `GrydIn Newsroom - Page ${pageNum}`,
    description: `Read technical articles, company updates, and engineering perspectives from GrydIn (Page ${pageNum}).`,
    path: `/blog/page/${pageNum}`,
    keywords: ["GrydIn blog", "AI automation", "engineering articles"],
  });
}

export default async function PaginatedBlogPage({ params }: PageProps) {
  const { n } = await params;
  const pageNum = parseInt(n, 10);

  if (isNaN(pageNum) || pageNum < 2) {
    notFound();
  }

  const allPosts = getAllPosts();
  const { items, pagination } = paginatePosts(allPosts, pageNum, POSTS_PER_PAGE);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Newsroom", href: "/blog" },
    { label: `Page ${pageNum}` },
  ];

  const jsonLdData = [
    collectionPageJsonLd({
      path: `/blog/page/${pageNum}`,
      name: `GrydIn Newsroom - Page ${pageNum}`,
      description: "Archive of GrydIn engineering articles and news.",
      items: items.map((p) => ({
        name: p.title,
        url: `/blog/${p.slug}`,
        description: p.description,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Newsroom", url: "/blog" },
      { name: `Page ${pageNum}`, url: `/blog/page/${pageNum}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLdData} />

      <PageHero
        eyebrow="Archive"
        title="NEWSROOM ARCHIVE"
        subtitle={`Viewing page ${pageNum} of all published articles and announcements.`}
        breadcrumbs={breadcrumbs}
      />

      <CategoryBar />

      <Section tone="white" eyebrow="Articles" title={`Published Stories (Page ${pageNum})`}>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-surface-soft rounded-2xl border border-surface-line max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-ink mb-2">End of Current Archive</h3>
            <p className="text-sm text-ink-muted mb-6">
              You have browsed through all published stories. Additional analyses and product notices will be published here.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-teal text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-dark transition-colors"
            >
              Return to Newsroom Hub
            </Link>
          </div>
        )}

        {/* Pagination Navigation */}
        <div className="mt-12 pt-6 border-t border-surface-line flex items-center justify-between">
          <div>
            {pagination.hasPrevPage && (
              <Link
                href={pageNum === 2 ? "/blog" : `/blog/page/${pageNum - 1}`}
                className="px-4 py-2 rounded-lg bg-surface-soft border border-surface-line text-xs font-bold text-ink hover:text-teal transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Page</span>
              </Link>
            )}
          </div>

          <span className="text-xs text-ink-muted">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <div>
            {pagination.hasNextPage && (
              <Link
                href={`/blog/page/${pageNum + 1}`}
                className="px-4 py-2 rounded-lg bg-surface-soft border border-surface-line text-xs font-bold text-ink hover:text-teal transition-colors flex items-center gap-1.5"
              >
                <span>Next Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
