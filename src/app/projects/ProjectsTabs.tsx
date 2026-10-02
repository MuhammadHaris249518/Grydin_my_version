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
    <div className="sticky top-[70px] z-30 bg-white/90 backdrop-blur-md border-b border-surface-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between overflow-x-auto py-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#our-projects"
            onClick={(e) => scrollTo("our-projects", e)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-accent text-white shadow-accent-glow border border-accent/50"
                : "bg-surface-soft border border-surface-line text-ink-muted hover:text-ink hover:border-accent/30"
            }`}
          >
            Client Projects <span className="opacity-70 text-xs ml-1 font-mono">({projectCount})</span>
          </a>

          <a
            href="#our-products"
            onClick={(e) => scrollTo("our-products", e)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-accent text-white shadow-accent-glow border border-accent/50"
                : "bg-surface-soft border border-surface-line text-ink-muted hover:text-ink hover:border-accent/30"
            }`}
          >
            Proprietary Tools <span className="opacity-70 text-xs ml-1 font-mono">({productCount})</span>
          </a>
        </div>

        <div className="hidden sm:flex items-center text-xs text-ink-muted gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Fixed-Scope Deployments &amp; Internal Tooling</span>
        </div>
      </div>
    </div>
  );
}
