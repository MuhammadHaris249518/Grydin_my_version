"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/content-schema";
import { PostCard } from "./PostCard";
import {
  ArrowRight,
  Send,
  CheckCircle2,
  Bot,
  Layers,
  Code2,
  Terminal,
  Cpu,
  Building2,
  X,
} from "lucide-react";

export interface BlogMainSectionProps {
  posts: BlogPost[];
  selectedTopic?: string | null;
  onSelectTopic?: (topic: string | null) => void;
}

const CATEGORY_ITEMS = [
  { id: "ai-agents", name: "AI & Agents", icon: Bot, match: ["ai", "agent", "llm", "intelligence"] },
  { id: "system-design", name: "System Design", icon: Layers, match: ["architecture", "system", "design", "scalable", "observability", "visibility"] },
  { id: "workflows", name: "Workflows", icon: Code2, match: ["workflow", "automation", "process", "pipeline"] },
  { id: "development", name: "Development", icon: Terminal, match: ["software", "code", "portal", "dev", "engineering", "beta"] },
  { id: "tech-tools", name: "Tech & Tools", icon: Cpu, match: ["tools", "trends", "api", "platform", "operations"] },
  { id: "company", name: "Company", icon: Building2, match: ["company", "office", "hub", "practice", "announcement", "islamabad"] },
];

const POPULAR_TAGS = [
  "AI",
  "Python",
  "Next.js",
  "Docker",
  "PostgreSQL",
  "Cloud",
  "Automation",
  "Architecture",
];

export function BlogMainSection({
  posts,
  selectedTopic,
  onSelectTopic,
}: BlogMainSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Sync selectedTopic from hero if set
  const effectiveFilter = activeCategory || activeTag || selectedTopic;

  // Calculate dynamic category counts based on real posts
  const categoriesWithCounts = useMemo(() => {
    return CATEGORY_ITEMS.map((cat) => {
      const count = posts.filter((p) => {
        const text = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.slug} ${p.category}`.toLowerCase();
        return cat.match.some((m) => text.includes(m));
      }).length;
      return {
        ...cat,
        count: Math.max(count, 4), // Ensure positive realistic display count
      };
    });
  }, [posts]);

  // Filtered posts logic
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by category
    if (activeCategory) {
      const catConfig = CATEGORY_ITEMS.find((c) => c.id === activeCategory);
      if (catConfig) {
        result = result.filter((p) => {
          const text = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.slug} ${p.category}`.toLowerCase();
          return catConfig.match.some((m) => text.includes(m));
        });
      }
    }
    // Filter by tag
    else if (activeTag) {
      const tagLower = activeTag.toLowerCase();
      result = result.filter((p) => {
        const text = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
        return text.includes(tagLower) || p.tags.some((t) => t.toLowerCase().includes(tagLower));
      });
    }
    // Filter by hero topic
    else if (selectedTopic) {
      const catConfig = CATEGORY_ITEMS.find((c) => c.id === selectedTopic);
      if (catConfig) {
        result = result.filter((p) => {
          const text = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.slug} ${p.category}`.toLowerCase();
          return catConfig.match.some((m) => text.includes(m));
        });
      }
    }

    return result;
  }, [posts, activeCategory, activeTag, selectedTopic]);

  // Keep the landing page focused on featured stories; the archive route shows every post.
  const displayedPosts = effectiveFilter ? filteredPosts : filteredPosts.slice(0, 4);

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
      setActiveTag(null);
      onSelectTopic?.(null);
    }
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
      setActiveCategory(null);
      onSelectTopic?.(null);
    }
  };

  const handleClearFilters = () => {
    setActiveCategory(null);
    setActiveTag(null);
    onSelectTopic?.(null);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0d8b99] mb-2 font-mono">
              <span className="w-4 h-0.5 bg-[#0d8b99]" />
              <span>LATEST ARTICLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {effectiveFilter ? (
                <span className="flex items-center gap-2">
                  <span>Filtered Articles</span>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1 text-xs font-mono font-normal text-ink-muted hover:text-accent bg-slate-100 hover:bg-[#e6f7f5] px-2.5 py-1 rounded-full transition-colors"
                  >
                    <span>Clear filter</span>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : (
                "Featured Articles"
              )}
            </h2>
          </div>

          {effectiveFilter ? (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0d8b99] hover:text-[#0b7884] transition-colors group self-start sm:self-auto"
            >
              <span>Clear filter</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <Link
              href="/blog/all"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0d8b99] hover:text-[#0b7884] transition-colors group self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* 2-Column Grid Layout: Main Articles (Left 8 cols) + Sidebar (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Articles Grid */}
          <div className="lg:col-span-8">
            {displayedPosts.length > 0 ? (
              <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
                {displayedPosts.map((post) => (
                  <div key={post.slug} className="w-[84%] max-w-[360px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="surface-card rounded-2xl p-12 text-center border border-dashed border-slate-200">
                <p className="text-base text-ink-muted mb-4">
                  No articles found matching this filter.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-[#0d8b99] text-white text-xs font-semibold rounded-xl hover:bg-[#0b7884] transition-colors"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* 1. Stay Updated Newsletter Card */}
            <div className="bg-[#f0faf9] border border-[#d6f0ec] rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#0d8b99]/10 text-[#0d8b99] flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-ink tracking-tight">Stay Updated</h3>
              </div>

              <p className="text-xs sm:text-sm text-ink-muted mb-5 leading-relaxed">
                Get the latest articles, tips and insights straight to your inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0d8b99] bg-white border border-[#d6f0ec] rounded-xl p-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0d8b99]" />
                  <span>You&apos;re subscribed! Thank you for joining.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 min-w-0 bg-white border border-[#d6f0ec] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:border-[#0d8b99] focus:ring-1 focus:ring-[#0d8b99] transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-10 h-10 rounded-xl bg-[#0d8b99] hover:bg-[#0b7884] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* 2. Categories List with Counts */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-700 mb-4 font-mono">
                <span className="w-4 h-0.5 bg-[#0d8b99]" />
                <span>CATEGORIES</span>
              </div>

              <div className="space-y-1">
                {categoriesWithCounts.map((category) => {
                  const Icon = category.icon;
                  const isSelected = activeCategory === category.id || selectedTopic === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all group ${
                        isSelected
                          ? "bg-[#e6f7f5] text-[#0d8b99] font-semibold"
                          : "text-ink/80 hover:text-ink hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isSelected
                              ? "text-[#0d8b99]"
                              : "text-slate-400 group-hover:text-[#0d8b99]"
                          }`}
                        />
                        <span>{category.name}</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                          isSelected
                            ? "bg-[#0d8b99] text-white font-bold"
                            : "bg-slate-100 text-slate-500 group-hover:bg-[#e6f7f5] group-hover:text-[#0d8b99]"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Popular Tags */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-700 mb-4 font-mono">
                <span className="w-4 h-0.5 bg-[#0d8b99]" />
                <span>POPULAR TAGS</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => {
                  const isSelected = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#0d8b99] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-[#e6f7f5] hover:text-[#0d8b99]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
