"use client";

import React, { useEffect, useState } from "react";
import { TocItem } from "@/lib/content-schema";
import { AlignLeft } from "lucide-react";

export interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="space-y-4" aria-label="Table of contents">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent pb-2 border-b border-surface-line">
        <AlignLeft className="w-4 h-4 text-accent" />
        <span>On This Page</span>
      </div>

      <ul className="space-y-2 text-xs leading-relaxed max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top, behavior: "smooth" });
                    setActiveId(item.id);
                  }
                }}
                className={`block py-1 transition-colors ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
