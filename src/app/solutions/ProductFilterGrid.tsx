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
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={isSelected}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((prod) => {
          const matches = selectedCategory === "All" || prod.category === selectedCategory;
          if (!matches) return null;

          return (
            <Link key={prod.slug} href={`/products/${prod.slug}`} className="group block h-full">
              <GlassCard className="h-full flex flex-col justify-between overflow-hidden p-8 transition-all duration-300 group-hover:border-[#0D8B99]/40 group-hover:shadow-lg group-hover:-translate-y-0.5">
                <div>
                  {/* 3D Product Slot */}
                  <div className="relative mb-6">
                    <ModelSlot
                      label={`product-${prod.slug}`}
                      className="h-48 w-full border border-slate-200"
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
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-[#0D8B99] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-sm font-mono text-teal-700 font-semibold mb-4">
                    {prod.tagline}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {prod.summary}
                  </p>

                  {/* 3 Key Feature Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    {prod.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
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
