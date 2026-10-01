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
import { CategoryBar } from "../../CategoryBar";
import { PostCard } from "../../PostCard";
import { AnnouncementRow } from "../../AnnouncementRow";
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
  return CATEGORIES.map((category) => ({
    category,
  }));
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = category as BlogCategory;

  if (!CATEGORIES.includes(cat)) {
    return { title: "Category Not Found | GrydIn" };
  }

  const name = CATEGORY_NAMES[cat];
  const description = CATEGORY_DESCRIPTIONS[cat];

  return buildMetadata({
    documentTitle: `${name} - GrydIn Newsroom`,
    socialTitle: `${name} | GrydIn Newsroom & Publications`,
    description,
    path: `/blog/category/${category}`,
    keywords: [
      name,
      "GrydIn newsroom",
      "AI automation",
      "engineering blog",
    ],
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = category as BlogCategory;

  if (!CATEGORIES.includes(cat)) {
    notFound();
  }

  const name = CATEGORY_NAMES[cat];
  const description = CATEGORY_DESCRIPTIONS[cat];
  const posts = getPostsByCategory(cat);
  const { items, pagination } = paginatePosts(posts, 1, POSTS_PER_PAGE);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Newsroom", href: "/blog" },
    { label: name },
  ];

  const jsonLdData = [
    collectionPageJsonLd({
      path: `/blog/category/${category}`,
      name: `${name} - GrydIn Newsroom`,
      description,
      items: posts.map((p) => ({
        name: p.title,
        url: `/blog/${p.slug}`,
        description: p.description,
      })),
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Newsroom", url: "/blog" },
      { name: name, url: `/blog/category/${category}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLdData} />

      {/* PageHero */}
      <PageHero
        eyebrow="Category Archive"
        title={name.toUpperCase()}
        subtitle={description}
        breadcrumbs={breadcrumbs}
      />

      {/* Sticky Category Bar */}
      <CategoryBar />

      {/* Content Section */}
      <Section tone="white" eyebrow={name} title={`All ${name} Articles`}>
        {cat === "announcements" ? (
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
        )}

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-surface-line flex items-center justify-between">
            <span className="text-xs text-ink-muted">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <div className="flex items-center gap-2">
              {pagination.hasNextPage && (
                <Link
                  href={`/blog/category/${category}/page/2`}
                  className="px-4 py-2 rounded-lg bg-surface-soft border border-surface-line text-xs font-bold text-ink hover:text-teal transition-colors flex items-center gap-1.5"
                >
                  <span>Next Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </Section>

      <CtaBand
        title="Ready to talk to our engineers?"
        subtitle="We build production-ready systems tailored to your exact workflows."
        buttonText="Get in touch"
        buttonHref="/contact"
      />
    </div>
  );
}
