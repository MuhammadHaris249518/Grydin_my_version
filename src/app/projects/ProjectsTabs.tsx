"use client";

import React, { useEffect, useState } from "react";

export interface ProjectsTabsProps {
  projectCount: number;
  productCount: number;
}

export function ProjectsTabs({ projectCount, productCount }: ProjectsTabsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "products">("projects");

  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.getElementById("our-products");
      if (productsSection) {
        const rect = productsSection.getBoundingClientRect();
        // If products section top is near or past top of viewport
        if (rect.top <= 140) {
          setActiveTab("products");
          return;
        }
      }
      setActiveTab("projects");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-md border-b border-surface-line shadow-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between overflow-x-auto py-2.5">
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#our-projects"
            onClick={(e) => scrollTo("our-projects", e)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === "projects"
                ? "bg-navy text-white shadow-xs"
                : "text-ink-muted hover:text-ink hover:bg-surface-soft"
            }`}
          >
            Our Projects <span className="opacity-70 text-xs ml-1 font-normal">({projectCount})</span>
          </a>

          <a
            href="#our-products"
            onClick={(e) => scrollTo("our-products", e)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all ${
              activeTab === "products"
                ? "bg-navy text-white shadow-xs"
                : "text-ink-muted hover:text-ink hover:bg-surface-soft"
            }`}
          >
            Our Products <span className="opacity-70 text-xs ml-1 font-normal">({productCount})</span>
          </a>
        </div>

        <div className="hidden sm:flex items-center text-xs text-ink-muted gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span>Fixed-Scope Systems &amp; Proprietary Tools</span>
        </div>
      </div>
    </div>
  );
}
