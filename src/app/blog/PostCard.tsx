import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/content-schema";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
import { CATEGORY_NAMES } from "@/lib/blog";
import { ArrowRight, ExternalLink, Clock, Calendar } from "lucide-react";

export interface PostCardProps {
  post: BlogPost;
  aspect?: "16/9" | "auto";
}

export function PostCard({ post, aspect = "16/9" }: PostCardProps) {
  const categoryLabel = CATEGORY_NAMES[post.category];

  return (
    <Card
      href={`/blog/${post.slug}`}
      className="h-full flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg"
    >
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
            <Badge variant="teal" size="sm">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          {/* Source / Meta line */}
          {post.source && (
            <div className="text-xs font-semibold text-teal-dark mb-1.5 flex items-center gap-1">
              <span>{post.source}</span>
              {post.externalUrl && <ExternalLink className="w-3 h-3" />}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-ink tracking-tight line-clamp-2 mb-2 group-hover:text-teal transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2 mb-4">
            {post.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <div className="pt-3 border-t border-surface-line flex items-center justify-between text-xs text-ink-muted">
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Card>
  );
}
