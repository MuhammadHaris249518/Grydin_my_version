"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Sparkles } from "lucide-react";

export interface SolutionsTabsProps {
  projectCount: number;
  productCount: number;
}

export function SolutionsTabs({ projectCount, productCount }: SolutionsTabsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "products">("projects");

  useEffect(() => {
    const handleScroll = () => {
      const productsEl = document.getElementById("proprietary-products");
      if (productsEl) {
        const rect = productsEl.getBoundingClientRect();
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
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between overflow-x-auto py-3 gap-4">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#client-projects"
            onClick={(e) => scrollTo("client-projects", e)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#0D8B99] text-white shadow-md shadow-[#0D8B99]/20 border border-[#0D8B99]"
                : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Client Case Studies</span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-black/10 text-current">
              {projectCount}
            </span>
          </a>

          <a
            href="#proprietary-products"
            onClick={(e) => scrollTo("proprietary-products", e)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-[#0D8B99] text-white shadow-md shadow-[#0D8B99]/20 border border-[#0D8B99]"
                : "bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary Tools</span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-black/10 text-current">
              {productCount}
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center text-xs text-slate-500 gap-2 font-mono shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real Deployments · Autonomous Systems · Internal Tooling</span>
        </div>
      </div>
    </div>
  );
}
