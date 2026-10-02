import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/content-schema";
import { GlassCard } from "@/components/ui/GlassCard";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
import { CATEGORY_NAMES } from "@/lib/blog";
import { ExternalLink, Clock, Calendar } from "lucide-react";

export interface PostCardProps {
  post: BlogPost;
  aspect?: "16/9" | "auto";
}

export function PostCard({ post, aspect = "16/9" }: PostCardProps) {
  const categoryLabel = CATEGORY_NAMES[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <GlassCard className="h-full flex flex-col justify-between overflow-hidden transition-[box-shadow,border-color] duration-300 group-hover:border-teal-glow/50 group-hover:shadow-glow">
        <div>
          {/* Cover or Algorithmic Art */}
          <div className="relative">
            {post.cover ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.coverAlt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <CoverArt
                seed={post.slug}
                aspect={aspect}
                title={post.title}
                className="max-h-48 w-full group-hover:scale-105 transition-transform duration-500"
              />
            )}

            <div className="absolute top-3 left-3 z-20">
              <span className="font-mono text-xs uppercase text-teal-glow bg-teal/20 px-2.5 py-0.5 rounded-md border border-teal-glow/30">
                {categoryLabel}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Source / Meta line */}
            {post.source && (
              <div className="text-xs font-mono text-teal-glow mb-2 flex items-center gap-1">
                <span>{post.source}</span>
                {post.externalUrl && <ExternalLink className="w-3 h-3" />}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold text-white tracking-tight line-clamp-2 mb-2 group-hover:text-teal-glow transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
              {post.description}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0">
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-teal-glow" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
