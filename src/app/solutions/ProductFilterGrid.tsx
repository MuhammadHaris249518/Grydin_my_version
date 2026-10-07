"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/app/globalscope/ui/Badge";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { ArrowRight, Check } from "lucide-react";

export interface ProductFilterGridProps {
  products: Product[];
}

export function ProductFilterGrid({ products }: ProductFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...list];
  }, [products]);

  return (
    <div>
      {/* Category Filter Chips */}
      <div className="-mx-5 mb-6 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-10 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={isSelected}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all cursor-pointer sm:px-4 ${
                isSelected
                  ? "bg-[#0D8B99] text-white shadow-md shadow-[#0D8B99]/20 border border-[#0D8B99]"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 2x2 Grid of Product Cards */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
        {products.map((prod) => {
          const matches = selectedCategory === "All" || prod.category === selectedCategory;
          if (!matches) return null;

          return (
            <Link key={prod.slug} href={`/products/${prod.slug}`} className="group block h-full w-[86%] max-w-[380px] shrink-0 snap-start lg:w-auto lg:max-w-none lg:shrink">
              <GlassCard className="flex h-full flex-col justify-between overflow-hidden p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#0D8B99]/40 group-hover:shadow-lg sm:p-6 lg:p-8">
                <div>
                  {/* 3D Product Slot */}
                  <div className="relative mb-6">
                    <ModelSlot
                      label={`product-${prod.slug}`}
                      className="h-36 w-full border border-slate-200 sm:h-48"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant={prod.status === "Live" ? "live" : prod.status === "Beta" ? "beta" : "coming-soon"}>
                        {prod.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Category pill */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0D8B99] font-bold">
                      {prod.category} Architecture
                    </span>
                  </div>

                  {/* Name & Tagline */}
                  <h3 className="mb-2 text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#0D8B99] sm:text-2xl">
                    {prod.name}
                  </h3>
                  <p className="text-sm font-mono text-teal-700 font-semibold mb-4">
                    {prod.tagline}
                  </p>

                  <p className="mb-4 text-[13px] font-normal leading-relaxed text-slate-600 sm:mb-6 sm:text-sm">
                    {prod.summary}
                  </p>

                  {/* 3 Key Feature Bullets */}
                  <div className="mb-4 space-y-2 border-t border-slate-100 pt-3 sm:mb-6 sm:space-y-2.5 sm:pt-4">
                    {prod.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 sm:gap-2.5 sm:text-xs">
                        <Check className="w-4 h-4 text-[#0D8B99] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 font-semibold">{feat.title}: </strong>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0D8B99]">
                  <span>Explore product architecture</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
