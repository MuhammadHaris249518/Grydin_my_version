import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { CategoryBar } from "../../../../CategoryBar";
import { PostCard } from "../../../../PostCard";
import { AnnouncementRow } from "../../../../AnnouncementRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  buildMetadata,
  collectionPageJsonLd,
  breadcrumbJsonLd,
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
    <div className="min-h-screen bg-surface text-ink">
      <JsonLd data={jsonLdData} />

      {/* PageHero with 3D Robot illustration */}
      <PageHero
        eyebrow="Category Archive"
        title={`${name} (Page ${pageNum})`}
        subtitle={`Viewing page ${pageNum} of ${name.toLowerCase()} publications.`}
        breadcrumbs={breadcrumbs}
        showSlotOnMobile
        slot={
          <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] mx-auto lg:mr-0 flex justify-center lg:justify-end">
            <div className="relative w-full">
              {/* Soft ambient halo glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-70 pointer-events-none transform scale-90"
                style={{
                  background:
                    "radial-gradient(circle, rgba(13, 139, 153, 0.16) 0%, rgba(45, 212, 191, 0.08) 45%, transparent 70%)",
                }}
              />

              {/* 3D Robot Workspace Illustration */}
              <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/assets/images/blog/category-robot.png"
                  alt={`GrydIn ${name} Robot Workspace`}
                  width={587}
                  height={385}
                  priority
                  className="w-full h-auto object-contain drop-shadow-sm select-none mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        }
      />

      {/* Sticky Category Bar */}
      <CategoryBar />

      {/* Content Section */}
      <section className="bg-surface py-20 md:py-28 border-b border-surface-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow={name}
            title={`${name} articles (Page ${pageNum})`}
            accent={`Page ${pageNum}`}
            className="mb-12"
          />

          {items.length > 0 ? (
            cat === "announcements" ? (
              <div className="surface-card rounded-2xl border border-surface-line divide-y divide-white/10 overflow-hidden">
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
            <div className="surface-card p-12 text-center rounded-2xl max-w-xl mx-auto">
              <h3 className="text-lg font-semibold text-ink mb-2">End of {name} Archive</h3>
              <p className="text-sm text-ink-muted mb-6">
                You have browsed through all published {name.toLowerCase()} updates.
              </p>
              <Link
                href={`/blog/category/${category}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-ink font-semibold text-xs uppercase tracking-wider hover:bg-teal-dark transition-colors"
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
                  className="surface-card px-4 py-2 rounded-xl text-xs font-mono text-accent hover:text-ink transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Page</span>
                </Link>
              )}
            </div>

            <span className="text-xs font-mono text-ink-muted">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <div>
              {pagination.hasNextPage && (
                <Link
                  href={`/blog/category/${category}/page/${pageNum + 1}`}
                  className="surface-card px-4 py-2 rounded-xl text-xs font-mono text-accent hover:text-ink transition-colors flex items-center gap-1.5"
                >
                  <span>Next Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
