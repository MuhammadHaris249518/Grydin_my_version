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
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { CategoryBar } from "../../CategoryBar";
import { PostCard } from "../../PostCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  buildMetadata,
  collectionPageJsonLd,
  breadcrumbJsonLd,
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
    <div className="min-h-screen bg-navy text-white">
      <JsonLd data={jsonLdData} />

      <PageHero
        eyebrow="Archive"
        title={`Newsroom archive (Page ${pageNum})`}
        subtitle={`Viewing page ${pageNum} of all published articles and announcements.`}
        breadcrumbs={breadcrumbs}
      />

      <CategoryBar />

      <section className="bg-navy py-20 md:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Articles"
            title={`Published stories (Page ${pageNum})`}
            accent={`Page ${pageNum}`}
            className="mb-12"
          />

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {items.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="glass p-12 text-center rounded-2xl max-w-xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-2">End of Current Archive</h3>
              <p className="text-sm text-slate-300 mb-6">
                You have browsed through all published stories. Additional analyses will be published here.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-teal text-white font-semibold text-xs uppercase tracking-wider hover:bg-teal-dark transition-colors"
              >
                Return to Newsroom Hub
              </Link>
            </div>
          )}

          {/* Pagination Navigation */}
          <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              {pagination.hasPrevPage && (
                <Link
                  href={pageNum === 2 ? "/blog" : `/blog/page/${pageNum - 1}`}
                  className="glass px-4 py-2 rounded-xl text-xs font-mono text-teal-glow hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Page</span>
                </Link>
              )}
            </div>

            <span className="text-xs font-mono text-slate-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <div>
              {pagination.hasNextPage && (
                <Link
                  href={`/blog/page/${pageNum + 1}`}
                  className="glass px-4 py-2 rounded-xl text-xs font-mono text-teal-glow hover:text-white transition-colors flex items-center gap-1.5"
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
