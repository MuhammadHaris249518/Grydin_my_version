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
import { Button } from "@/app/globalscope/ui/Button";
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
import { ReadingProgressBar } from "../ReadingProgressBar";
import { PostCard } from "../PostCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

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
  const related = getRelatedPosts(post, 3);
  const { prev, next } = getAdjacentPosts(post);
  const categoryLabel = CATEGORY_NAMES[post.category] || post.category;
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Newsroom", href: "/blog" },
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
    <div className="min-h-screen bg-navy text-white">
      <ReadingProgressBar />
      <JsonLd data={jsonLdData} />

      {/* Header section with dark glass styling */}
      <header className="border-b border-white/10 pt-10 pb-12 bg-navy">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Breadcrumbs items={breadcrumbs} className="mb-8" light />

          <div className="max-w-4xl">
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-4">
              <Link href={`/blog/category/${post.category}`}>
                <span className="font-mono text-xs uppercase text-teal-glow bg-teal/20 px-3 py-1 rounded-md border border-teal-glow/30">
                  {categoryLabel}
                </span>
              </Link>
              {post.source && (
                <span className="text-xs font-mono text-slate-400">
                  Source: {post.source}
                </span>
              )}
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-5">
              {post.title}
            </h1>

            {/* Excerpt / Description */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-6 font-normal">
              {post.description}
            </p>

            {/* Meta Row: Author, Date, Reading time, Share buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs uppercase overflow-hidden border border-white/20 shrink-0">
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
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {author.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-glow" />
                      {post.date}
                    </span>
                    {post.updated && <span>· Updated {post.updated}</span>}
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
          <article className="lg:col-span-8 max-w-3xl">
            {/* Cover image or deterministic CoverArt */}
            <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
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

            {/* MDX Body with prose-invert styles */}
            <div className="prose prose-invert prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-teal-glow hover:prose-a:underline prose-code:text-teal-glow prose-pre:bg-navy-950 prose-pre:border prose-pre:border-white/10">
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
            <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-1">
                Topics:
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="glass px-2.5 py-1 rounded-md text-xs font-mono text-slate-300">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Card */}
            <GlassCard className="mt-10 p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm uppercase overflow-hidden border border-white/20 shrink-0">
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
                <h4 className="font-semibold text-white text-base">
                  Written by {author.name}
                </h4>
                <p className="text-xs font-mono text-teal-glow mb-1">
                  {author.role}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {author.bio || "Building fixed-scope AI agents and automation architectures at GrydIn."}
                </p>
              </div>
            </GlassCard>

            {/* Prev / Next Pagination within same category */}
            {(prev || next) && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="glass p-5 rounded-xl hover:border-teal-glow/50 transition-all group flex flex-col justify-between"
                  >
                    <span className="flex items-center gap-1 font-mono text-xs uppercase text-teal-glow mb-1">
                      <ChevronLeft className="w-4 h-4" /> Newer post
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-teal-glow line-clamp-1">
                      {next.title}
                    </span>
                  </Link>
                ) : <div />}

                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="glass p-5 rounded-xl hover:border-teal-glow/50 transition-all group flex flex-col justify-between text-right"
                  >
                    <span className="flex items-center justify-end gap-1 font-mono text-xs uppercase text-teal-glow mb-1">
                      Older post <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-teal-glow line-clamp-1">
                      {prev.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            )}
          </article>

          {/* Sticky Sidebar: Table of Contents & CTAs */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-8">
            <GlassCard className="p-6">
              <TableOfContents items={post.toc} />
            </GlassCard>

            <GlassCard className="p-6">
              <span className="font-mono text-xs uppercase text-teal-glow mb-2 block">
                Engineering Diagnosis
              </span>
              <h4 className="text-base font-semibold text-white mb-2">
                Have a workflow bottleneck like this?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Book a call with a Lead Architect. Scoped specification delivered in 48 hours.
              </p>
              <Button href="/contact" variant="primary" size="sm" className="w-full">
                Book a diagnosis call
              </Button>
            </GlassCard>
          </aside>
        </div>
      </main>

      {/* Related Posts Section */}
      {related.length > 0 && (
        <section className="relative bg-navy-950 py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <SectionHeader
              eyebrow="Related Articles"
              title="More perspectives on systems & architecture"
              accent="systems & architecture"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <CtaBand
        title="Ready to eliminate manual friction from your workflows?"
        subtitle="Talk directly with an engineer about your architecture."
      />
    </div>
  );
}
