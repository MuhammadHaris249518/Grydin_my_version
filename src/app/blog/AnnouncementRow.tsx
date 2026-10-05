import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/content-schema";
import { ArrowRight } from "lucide-react";

export interface AnnouncementRowProps {
  post: BlogPost;
}

export function AnnouncementRow({ post }: AnnouncementRowProps) {
  const dateObj = new Date(post.date + "T00:00:00");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const monthYear = dateObj.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-5 px-4 sm:px-6 hover:bg-[#f0faf9]/80 border-b border-surface-line transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 justify-between">
        {/* Left: Date Block + Title */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
          {/* Date stamp box */}
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-slate-50 group-hover:border-[#0d8b99]/30 border border-surface-line shrink-0 text-center transition-colors">
            <span className="text-lg font-mono font-bold text-[#0d8b99] leading-none">
              {day}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-ink-muted mt-0.5">
              {monthYear}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs uppercase text-accent bg-accent-light px-2 py-0.5 rounded border border-accent/30">
                Announcement
              </span>
              {post.featured && (
                <span className="font-mono text-xs uppercase text-ink-muted bg-white/10 px-2 py-0.5 rounded">
                  Notice
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-ink group-hover:text-accent transition-colors truncate">
              {post.title}
            </h3>

            <p className="text-xs sm:text-sm text-ink-muted line-clamp-1 mt-0.5">
              {post.description}
            </p>
          </div>
        </div>

        {/* Right Arrow Action */}
        <div className="hidden sm:flex items-center text-xs font-semibold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform shrink-0">
          <span>Read notice</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </Link>
  );
}
