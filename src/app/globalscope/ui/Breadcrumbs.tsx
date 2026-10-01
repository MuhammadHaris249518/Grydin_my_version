import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, light = false, className = "" }: BreadcrumbsProps) {
  // Construct Schema.org BreadcrumbList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? (item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`) : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center flex-wrap gap-1.5 text-xs font-medium ${
          light ? "text-slate-300" : "text-ink-muted"
        } ${className}`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <ChevronRight
                  size={12}
                  className={`shrink-0 opacity-60 ${light ? "text-slate-400" : "text-slate-400"}`}
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`transition-colors hover:underline ${
                    light ? "text-slate-300 hover:text-white" : "text-ink-muted hover:text-teal"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={light ? "text-white font-semibold" : "text-ink font-semibold"}>
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}

export default Breadcrumbs;
