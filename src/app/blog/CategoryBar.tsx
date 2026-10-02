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
    <div className="sticky top-[70px] z-30 bg-navy/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between overflow-x-auto py-3">
        <div className="flex items-center gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/blog"
                ? pathname === "/blog" || pathname.startsWith("/blog/page/")
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-teal text-white shadow-glow-sm border border-teal-glow/50"
                    : "glass text-slate-300 hover:text-white hover:border-white/20"
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
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-teal-glow transition-colors px-2 py-1"
          title="Subscribe to RSS Feed"
        >
          <Rss className="w-3.5 h-3.5 text-teal-glow" />
          <span className="hidden sm:inline">RSS Feed</span>
        </a>
      </div>
    </div>
  );
}
