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
                  ? "bg-accent text-ink border border-accent/30 shadow-glow-sm"
                  : "surface-card text-ink-muted hover:border-white/20 hover:text-ink"
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
              <GlassCard className="h-full flex flex-col justify-between overflow-hidden p-8 transition-[box-shadow,border-color] duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
                <div>
                  {/* 3D Product Slot */}
                  <div className="relative mb-6">
                    <ModelSlot
                      label={`product-${prod.slug}`}
                      className="h-48 w-full border border-surface-line"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant={prod.status === "Live" ? "live" : prod.status === "Beta" ? "beta" : "coming-soon"}>
                        {prod.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Category pill */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">
                      {prod.category} Architecture
                    </span>
                  </div>

                  {/* Name & Tagline */}
                  <h3 className="text-2xl font-semibold text-ink tracking-tight mb-2 group-hover:text-accent transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-sm font-mono text-accent/90 mb-4">
                    {prod.tagline}
                  </p>

                  <p className="text-sm text-ink-muted leading-relaxed mb-6">
                    {prod.summary}
                  </p>

                  {/* 3 Key Feature Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-surface-line mb-6">
                    {prod.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-ink-muted">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-ink font-medium">{feat.title}: </strong>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-semibold text-accent">
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
