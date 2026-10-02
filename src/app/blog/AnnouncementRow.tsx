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
      className="group block py-5 px-4 sm:px-6 rounded-xl hover:bg-white/5 border-b border-white/10 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 justify-between">
        {/* Left: Date Block + Title */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
          {/* Date stamp box */}
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/5 group-hover:border-teal-glow/40 border border-white/10 shrink-0 text-center transition-colors">
            <span className="text-lg font-mono font-bold text-teal-glow leading-none">
              {day}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-0.5">
              {monthYear}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs uppercase text-teal-glow bg-teal/20 px-2 py-0.5 rounded border border-teal-glow/30">
                Announcement
              </span>
              {post.featured && (
                <span className="font-mono text-xs uppercase text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  Notice
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-teal-glow transition-colors truncate">
              {post.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 line-clamp-1 mt-0.5">
              {post.description}
            </p>
          </div>
        </div>

        {/* Right Arrow Action */}
        <div className="hidden sm:flex items-center text-xs font-semibold uppercase tracking-wider text-teal-glow group-hover:translate-x-1 transition-transform shrink-0">
          <span>Read notice</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </Link>
  );
}
