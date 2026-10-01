import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/content-schema";
import { Badge } from "@/app/globalscope/ui/Badge";
import { ArrowRight } from "lucide-react";

export interface AnnouncementRowProps {
  post: BlogPost;
}

export function AnnouncementRow({ post }: AnnouncementRowProps) {
  // Parse date into DD and MMM YYYY
  const dateObj = new Date(post.date + "T00:00:00");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const monthYear = dateObj.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-5 px-4 sm:px-6 rounded-xl hover:bg-surface-soft border-b border-surface-line/80 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 justify-between">
        {/* Left: Date Block + Title */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
          {/* Date stamp box */}
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-surface-soft group-hover:bg-white border border-surface-line shrink-0 text-center transition-colors">
            <span className="text-lg font-black text-navy leading-none">
              {day}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mt-0.5">
              {monthYear}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="teal" size="sm">Announcement</Badge>
              {post.featured && (
                <Badge variant="navy" size="sm">Notice</Badge>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-teal transition-colors truncate">
              {post.title}
            </h3>

            <p className="text-xs sm:text-sm text-ink-muted line-clamp-1 mt-0.5">
              {post.description}
            </p>
          </div>
        </div>

        {/* Right Arrow Action */}
        <div className="hidden sm:flex items-center text-xs font-bold uppercase tracking-wider text-teal group-hover:translate-x-1 transition-transform shrink-0">
          <span>Read notice</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </Link>
  );
}
