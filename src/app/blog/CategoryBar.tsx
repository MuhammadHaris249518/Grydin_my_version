"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss } from "lucide-react";

export function CategoryBar() {
  const pathname = usePathname();

  const links = [
    { label: "All", href: "/blog" },
    { label: "Insights", href: "/blog/category/blog" },
    { label: "News", href: "/blog/category/news" },
    { label: "Announcements", href: "/blog/category/announcements" },
  ];

  return (
    <div className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-md border-b border-surface-line shadow-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between overflow-x-auto py-2.5">
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/blog"
                ? pathname === "/blog" || pathname.startsWith("/blog/page/")
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  isActive
                    ? "bg-navy text-white shadow-xs"
                    : "text-ink-muted hover:text-ink hover:bg-surface-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <a
          href="/blog/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-ink-muted hover:text-teal transition-colors px-2 py-1"
          title="Subscribe to RSS Feed"
        >
          <Rss className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">RSS Feed</span>
        </a>
      </div>
    </div>
  );
}
