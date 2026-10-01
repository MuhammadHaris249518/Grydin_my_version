import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPostsByCategory,
  paginatePosts,
  CATEGORY_NAMES,
  CATEGORY_DESCRIPTIONS,
  POSTS_PER_PAGE,
} from "@/lib/blog";
import { BlogCategory } from "@/lib/content-schema";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { CategoryBar } from "../../../../CategoryBar";
import { PostCard } from "../../../../PostCard";
import { AnnouncementRow } from "../../../../AnnouncementRow";
import {
  buildMetadata,
  collectionPageJsonLd,
  breadcrumbJsonLd,
  SITE_URL,
} from "@/lib/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const dynamicParams = false;

const CATEGORIES: BlogCategory[] = ["blog", "news", "announcements"];

export function generateStaticParams() {
  const params: { category: string; n: string }[] = [];

  for (const cat of CATEGORIES) {
    const posts = getPostsByCategory(cat);
    const totalPages = Math.max(2, Math.ceil(posts.length / POSTS_PER_PAGE));
    for (let i = 2; i <= totalPages; i++) {
      params.push({ category: cat, n: i.toString() });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ category: string; n: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, n } = await params;
  const cat = category as BlogCategory;
  const pageNum = parseInt(n, 10);

  if (!CATEGORIES.includes(cat)) {
    return { title: "Category Not Found | GrydIn" };
  }

  const name = CATEGORY_NAMES[cat];

  return buildMetadata({
    documentTitle: `${name} (Page ${pageNum}) - GrydIn Newsroom`,
    socialTitle: `${name} - Page ${pageNum} | GrydIn`,
    description: `Browse ${name.toLowerCase()} articles and updates from GrydIn (Page ${pageNum}).`,
    path: `/blog/category/${category}/page/${pageNum}`,
    keywords: [name, "GrydIn newsroom", "AI automation archive"],
  });
}

export default async function PaginatedCategoryPage({ params }: PageProps) {
  const { category, n } = await params;
  const cat = category as BlogCategory;
  const pageNum = parseInt(n, 10);

  if (!CATEGORIES.includes(cat) || isNaN(pageNum) || pageNum < 2) {
    notFound();
  }

  const name = CATEGORY_NAMES[cat];
  const posts = getPostsByCategory(cat);
  const { items, pagination } = paginatePosts(posts, pageNum, POSTS_PER_PAGE);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Newsroom", href: "/blog" },
    { label: name, href: `/blog/category/${category}` },
    { label: `Page ${pageNum}` },
  ];

  const jsonLdData = [
    collectionPageJsonLd({
      path: `/blog/category/${category}/page/${pageNum}`,
      name: `${name} (Page ${pageNum}) - GrydIn Newsroom`,
      description: `Archive of ${name} articles from GrydIn.`,
      items: items.map((p) => ({
        name: p.title,
        url: `/blog/${p.slug}`,
        description: p.description,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Newsroom", url: "/blog" },
      { name: name, url: `/blog/category/${category}` },
      { name: `Page ${pageNum}`, url: `/blog/category/${category}/page/${pageNum}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLdData} />

      <PageHero
        eyebrow="Category Archive"
        title={`${name.toUpperCase()} (PAGE ${pageNum})`}
        subtitle={`Viewing page ${pageNum} of ${name.toLowerCase()} publications.`}
        breadcrumbs={breadcrumbs}
      />

      <CategoryBar />

      <Section tone="white" eyebrow={name} title={`${name} Articles (Page ${pageNum})`}>
        {items.length > 0 ? (
          cat === "announcements" ? (
            <div className="bg-white rounded-2xl border border-surface-line divide-y divide-surface-line/70 overflow-hidden shadow-xs">
              {items.map((post) => (
                <AnnouncementRow key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {items.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )
        ) : (
          <div className="p-12 text-center bg-surface-soft rounded-2xl border border-surface-line max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-ink mb-2">End of {name} Archive</h3>
            <p className="text-sm text-ink-muted mb-6">
              You have browsed through all published {name.toLowerCase()} updates.
            </p>
            <Link
              href={`/blog/category/${category}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-teal text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-dark transition-colors"
            >
              Return to {name}
            </Link>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-surface-line flex items-center justify-between">
          <div>
            {pagination.hasPrevPage && (
              <Link
                href={pageNum === 2 ? `/blog/category/${category}` : `/blog/category/${category}/page/${pageNum - 1}`}
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
                href={`/blog/category/${category}/page/${pageNum + 1}`}
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
