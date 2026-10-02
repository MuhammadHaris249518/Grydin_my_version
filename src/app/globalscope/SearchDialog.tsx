"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Badge } from "./ui/Badge";

export interface SearchItem {
  type: string;
  title: string;
  url: string;
  summary: string;
}

export interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close when pathname changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Fetch search index on first open
  useEffect(() => {
    if (isOpen && items.length === 0) {
      setIsLoading(true);
      fetch("/search-index.json")
        .then((res) => res.json())
        .then((data: SearchItem[]) => {
          setItems(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, items.length]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Filter and score results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const tokens = query.toLowerCase().trim().split(/\s+/);

    return items
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const summaryLower = item.summary.toLowerCase();
        const typeLower = item.type.toLowerCase();

        let score = 0;
        let matched = true;

        for (const token of tokens) {
          if (titleLower.includes(token)) {
            score += 10;
            if (titleLower.startsWith(token)) score += 5;
          } else if (summaryLower.includes(token)) {
            score += 3;
          } else if (typeLower.includes(token)) {
            score += 2;
          } else {
            matched = false;
            break;
          }
        }

        return { item, score, matched };
      })
      .filter((entry) => entry.matched)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((entry) => entry.item);
  }, [query, items]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const target = results[selectedIndex];
        if (target) {
          router.push(target.url);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-ink/30 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-surface-line overflow-hidden animate-in fade-in zoom-in-95 duration-150 focus-within:ring-2 focus-within:ring-accent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-accent shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, solutions, projects, products, insights..."
            className="w-full bg-transparent text-sm sm:text-base text-ink placeholder:text-ink-muted focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-ink-muted hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-ink-muted bg-surface-soft border border-surface-line px-2 py-0.5 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-2 sm:p-3">
          {isLoading && (
            <div className="py-8 text-center text-xs text-ink-muted font-mono">
              Loading searchable index...
            </div>
          )}

          {!isLoading && query.trim() && results.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm font-semibold text-ink">No matching results found</p>
              <p className="text-xs text-ink-muted mt-1">
                Try searching for &quot;agents&quot;, &quot;workflow&quot;, &quot;legal&quot;, or &quot;GridPilot&quot;.
              </p>
            </div>
          )}

          {!isLoading && !query.trim() && (
            <div className="p-4 sm:p-6 text-xs text-ink-muted space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                Popular topics
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI Agents", "Workflow Automation", "GridPilot", "DocuGrid", "Legal Solutions", "Retail"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 rounded-md bg-surface-soft border border-surface-line hover:border-accent/50 text-ink-muted text-xs transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul className="space-y-1">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={`${item.type}-${item.url}`}>
                    <a
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.url);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`block p-3 sm:p-4 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-accent/10 text-ink border border-accent/30"
                          : "hover:bg-surface-soft text-ink-muted border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-ink">
                          {item.title}
                        </span>
                        <Badge
                          variant={
                            item.type === "Project"
                              ? "teal"
                              : item.type === "Product"
                              ? "navy"
                              : item.type === "Service"
                              ? "surface"
                              : "default"
                          }
                          size="sm"
                        >
                          {item.type}
                        </Badge>
                      </div>

                      <p className="text-xs text-ink-muted line-clamp-1">
                        {item.summary}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-surface-soft border-t border-surface-line flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-surface-soft border border-surface-line px-1.5 py-0.5 rounded text-xs">↑</kbd>{" "}
              <kbd className="font-mono bg-surface-soft border border-surface-line px-1.5 py-0.5 rounded text-xs">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono bg-surface-soft border border-surface-line px-1.5 py-0.5 rounded text-xs">↵</kbd> to select
            </span>
          </div>
          <span className="font-mono text-accent">GrydIn Search</span>
        </div>
      </div>
    </div>
  );
}
