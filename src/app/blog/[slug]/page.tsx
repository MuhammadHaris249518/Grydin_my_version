import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  CATEGORY_NAMES,
} from "@/lib/blog";
import { getAuthor } from "@/data/authors";
import { Breadcrumbs } from "@/app/globalscope/ui/Breadcrumbs";
import { Badge } from "@/app/globalscope/ui/Badge";
import { Button } from "@/app/globalscope/ui/Button";
import { Card } from "@/app/globalscope/ui/Card";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import {
  SITE_URL,
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { mdxComponents } from "../MdxComponents";
import { TableOfContents } from "../TableOfContents";
import { ShareButtons } from "../ShareButtons";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | GrydIn",
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const canonicalUrl = post.canonical || url;
  const ogImageUrl = post.cover || "/brand/og-image.png";

  return {
    title: { absolute: `${post.title} | GrydIn` },
    description: post.description,
    keywords: post.keywords || post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.coverAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthor(post.author);
  const relatedPosts = getRelatedPosts(post, 3);
  const { prev, next } = getAdjacentPosts(post);
  const categoryLabel = CATEGORY_NAMES[post.category];
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: categoryLabel, href: `/blog/category/${post.category}` },
    { label: post.title },
  ];

  const jsonLdData = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: categoryLabel, url: `/blog/category/${post.category}` },
      { name: post.title, url: articleUrl },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLdData} />

      {/* Header section on clean white for reading comfort */}
      <header className="border-b border-surface-line pt-10 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />

          <div className="max-w-4xl">
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-4">
              <Link href={`/blog/category/${post.category}`}>
                <Badge variant="teal" size="sm">
                  {categoryLabel}
                </Badge>
              </Link>
              {post.source && (
                <span className="text-xs font-medium text-ink-muted">
                  Source: {post.source}
                </span>
              )}
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            {/* Excerpt / Description */}
            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed mb-6 font-normal">
              {post.description}
            </p>

            {/* Meta Row: Author, Date, Reading time, Share buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-surface-line">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs uppercase overflow-hidden border border-surface-line shrink-0">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    author.name.slice(0, 2)
                  )}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-ink">
                    {author.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    {post.updated && (
                      <span>· Updated {post.updated}</span>
                    )}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <ShareButtons title={post.title} url={articleUrl} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Article Column */}
          <article className="lg:col-span-8 max-w-3xl" data-allow-copy>
            {/* Cover image or deterministic CoverArt */}
            <div className="mb-10 rounded-2xl overflow-hidden border border-surface-line shadow-sm">
              {post.cover ? (
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt || post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <CoverArt
                  seed={post.slug}
                  aspect="16/9"
                  title={post.title}
                  className="w-full"
                />
              )}
            </div>

            {/* MDX Body with prose styles */}
            <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-teal hover:prose-a:text-teal-dark prose-blockquote:border-teal prose-blockquote:text-ink-muted prose-code:text-teal-dark prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                        },
                      ],
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark",
                          keepBackground: true,
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>

            {/* Tags strip */}
            <div className="mt-12 pt-6 border-t border-surface-line flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted mr-1">
                Topics:
              </span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author Card */}
            <div className="mt-8 p-6 rounded-2xl bg-surface-soft border border-surface-line flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm uppercase overflow-hidden border border-surface-line shrink-0">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  author.name.slice(0, 2)
                )}
              </div>
              <div>
                <h4 className="font-bold text-ink text-sm sm:text-base">
                  Written by {author.name}
                </h4>
                <p className="text-xs text-teal font-semibold mb-1">
                  {author.role}
                </p>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {author.bio || "Building fixed-scope AI agents and automation architectures at GrydIn."}
                </p>
              </div>
            </div>

            {/* Prev / Next Pagination within same category */}
            {(prev || next) && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="p-5 rounded-xl border border-surface-line hover:border-slate-300 hover:shadow-xs transition-all group flex flex-col justify-between"
                  >
                    <span className="flex items-center gap-1 text-xs font-bold uppercase text-ink-muted group-hover:text-teal mb-1">
                      <ChevronLeft className="w-4 h-4" /> Newer post
                    </span>
                    <span className="text-sm font-bold text-ink group-hover:text-teal line-clamp-1">
                      {next.title}
                    </span>
                  </Link>
                ) : <div />}

                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="p-5 rounded-xl border border-surface-line hover:border-slate-300 hover:shadow-xs transition-all group flex flex-col justify-between text-right"
                  >
                    <span className="flex items-center justify-end gap-1 text-xs font-bold uppercase text-ink-muted group-hover:text-teal mb-1">
                      Older post <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-bold text-ink group-hover:text-teal line-clamp-1">
                      {prev.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            )}
          </article>

          {/* Sticky TOC Sidebar (hidden on mobile, sticky on desktop lg) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-8">
            <div className="p-6 rounded-2xl bg-surface-soft border border-surface-line shadow-xs">
              <TableOfContents items={post.toc} />
            </div>

            {/* Quick newsletter/contact prompt */}
            <div className="p-6 rounded-2xl bg-navy text-white shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-teal mb-2">
                Need similar engineering?
              </p>
              <h4 className="text-base font-bold text-white mb-2">
                Talk directly with our technical team.
              </h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                We diagnose before we build. Fixed quote and scoped delivery roadmap in 24 hours.
              </p>
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                className="w-full justify-center"
              >
                Start a diagnosis
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Related Posts Strip */}
      {relatedPosts.length > 0 && (
        <section className="bg-surface-soft py-16 border-t border-surface-line">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
              Keep Reading
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-8">
              Related Articles &amp; Updates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Card
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-6 flex flex-col justify-between bg-white"
                >
                  <div>
                    <CoverArt
                      seed={rel.slug}
                      aspect="16/9"
                      title={rel.title}
                      className="rounded-lg mb-4 max-h-36"
                    />
                    <Badge variant="teal" size="sm" className="mb-2">
                      {CATEGORY_NAMES[rel.category]}
                    </Badge>
                    <h3 className="font-bold text-ink group-hover:text-teal transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-ink-muted line-clamp-2 mb-4">
                      {rel.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-surface-line flex items-center justify-between text-xs text-ink-muted">
                    <span>{rel.readingTime}</span>
                    <span className="font-bold text-teal flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CtaBand */}
      <CtaBand
        title="Ready to automate the friction out of your business?"
        subtitle="Schedule a diagnosis call with our engineers at The Box Software Technology Park, Islamabad."
        buttonText="Book a diagnosis"
        buttonHref="/contact"
      />
    </div>
  );
}
