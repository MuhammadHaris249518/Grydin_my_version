import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/content-schema";
import { Calendar, Clock, ExternalLink } from "lucide-react";

export interface PostCardProps {
  post: BlogPost;
  aspect?: "16/9" | "auto";
}

export function formatBlogDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function getPostCoverImage(post: BlogPost): string {
  if (post.cover) return post.cover;
  
  const slug = post.slug.toLowerCase();
  const title = post.title.toLowerCase();
  
  if (slug.includes("ai-agents") || title.includes("ai agent")) {
    return "/images/blog/card-ai-agents.jpg";
  }
  if (slug.includes("visibility-problem") || title.includes("visibility") || title.includes("architecture")) {
    return "/images/blog/card-system-architecture.jpg";
  }
  if (slug.includes("automation") || slug.includes("workflow")) {
    return "/images/blog/ai-automation-practice.jpg";
  }
  if (slug.includes("gridpilot") || slug.includes("tools") || slug.includes("developer")) {
    return "/images/blog/gridpilot-beta.jpg";
  }
  if (slug.includes("fixed-scope") || slug.includes("delivery")) {
    return "/images/blog/visibility-problem.jpg";
  }
  
  return "/images/blog/card-ai-agents.jpg";
}

export function getPostCategoryBadge(post: BlogPost): string {
  const title = post.title.toLowerCase();
  const slug = post.slug.toLowerCase();
  
  if (slug.includes("ai-agents") || title.includes("ai agent") || post.tags.some(t => t.toLowerCase().includes("ai"))) {
    return "AI & AGENTS";
  }
  if (slug.includes("architecture") || title.includes("visibility") || post.tags.some(t => t.toLowerCase().includes("architecture"))) {
    return "SYSTEM DESIGN";
  }
  if (slug.includes("workflow") || slug.includes("automation") || post.tags.some(t => t.toLowerCase().includes("automation"))) {
    return "WORKFLOW AUTOMATION";
  }
  if (slug.includes("trend") || slug.includes("tool") || slug.includes("pilot")) {
    return "TECH & TOOLS";
  }
  if (post.category === "announcements") {
    return "ANNOUNCEMENTS";
  }
  if (post.category === "news") {
    return "COMPANY NEWS";
  }
  return "INSIGHTS";
}

export function PostCard({ post }: PostCardProps) {
  const coverImage = getPostCoverImage(post);
  const categoryBadge = getPostCategoryBadge(post);
  const formattedDate = formatBlogDate(post.date);

  return (
    <article className="group h-full bg-white rounded-2xl border border-surface-line overflow-hidden shadow-sm hover:shadow-card-hover hover:border-[#0d8b99]/40 transition-all duration-300 flex flex-col justify-between">
      <Link href={`/blog/${post.slug}`} className="block flex-1">
        <div>
          {/* Cover Image Thumbnail */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
            <Image
              src={coverImage}
              alt={post.coverAlt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Article Info */}
          <div className="p-5 sm:p-6">
            {/* Category Pill */}
            <div className="mb-3">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0d8b99] bg-[#e6f7f5] px-2.5 py-1 rounded-md">
                {categoryBadge}
              </span>
            </div>

            {/* Source / Meta line if external */}
            {post.source && (
              <div className="text-xs font-mono text-[#0d8b99] mb-2 flex items-center gap-1">
                <span>{post.source}</span>
                {post.externalUrl && <ExternalLink className="w-3 h-3" />}
              </div>
            )}

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-[#0d8b99] transition-colors line-clamp-2 leading-snug mb-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
              {post.description}
            </p>
          </div>
        </div>
      </Link>

      {/* Meta Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{post.readingTime}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
