"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isSelected
                  ? "bg-navy text-white shadow-xs"
                  : "bg-white text-ink-muted border border-surface-line hover:border-slate-300 hover:text-ink"
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

          return (
            <div
              key={prod.slug}
              className={`transition-all duration-300 ${!matches ? "hidden" : "block"}`}
            >
              <Card
                href={`/products/${prod.slug}`}
                className="h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* CoverArt Header with Status Badge */}
                  <div className="relative">
                    <CoverArt
                      seed={prod.slug}
                      icon={prod.icon}
                      aspect="16/9"
                      title={prod.name}
                      className="max-h-52 w-full"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant={prod.status === "Live" ? "live" : prod.status === "Beta" ? "beta" : "coming-soon"}>
                        {prod.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Category pill */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal">
                        {prod.category} Architecture
                      </span>
                    </div>

                    {/* Name & Tagline */}
                    <h3 className="text-2xl font-extrabold text-ink tracking-tight mb-2 group-hover:text-teal transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 mb-4">
                      {prod.tagline}
                    </p>

                    <p className="text-sm text-ink-muted leading-relaxed mb-6">
                      {prod.summary}
                    </p>

                    {/* 3 Key Feature Bullets */}
                    <div className="space-y-2.5 pt-4 border-t border-surface-line/70 mb-6">
                      {prod.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-ink-muted">
                          <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-ink font-semibold">{feat.title}:</strong> {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                  <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal group-hover:text-teal-dark">
                    <span>Learn more about {prod.name}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
