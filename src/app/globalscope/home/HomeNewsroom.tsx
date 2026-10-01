import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { Button } from "../ui/Button";
import { BlogPost, BlogCategory } from "@/lib/content-schema";
import { CATEGORY_NAMES } from "@/lib/blog";

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export interface HomeNewsroomProps {
  posts: BlogPost[];
}

export function HomeNewsroom({ posts = [] }: HomeNewsroomProps) {
  const featuredPosts = posts.slice(0, 3);

  return (
    <section id="newsroom" className="relative w-full py-20 md:py-28 bg-white border-b border-surface-line overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d8b99] text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Newsroom & Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4 leading-tight">
            Latest News & Announcements
          </h2>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Engineering perspectives, company milestones, and architectural insights from the GrydIn team — styled like leading big tech newsrooms.
          </p>
        </div>

        {/* 3 Theme-Colored (#0d8b99 Teal) Newsroom Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredPosts.map((post) => {
            const categoryLabel = CATEGORY_NAMES[post.category] || post.category;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative bg-gradient-to-br from-[#0e95a4] via-[#0d8b99] to-[#09707c] rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0d8b99]/30 hover:-translate-y-1.5 overflow-hidden text-white"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white transition-colors duration-300" />

                <div>
                  {/* Category Chip & Date */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-white/20 border border-white/30 text-white backdrop-blur-sm">
                      {categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-white/85 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {/* Post Title in Crisp White */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:translate-x-0.5 transition-transform">
                    {post.title}
                  </h3>

                  {/* Excerpt in light text */}
                  <p className="text-sm text-white/90 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {post.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-white">
                  <span className="flex items-center gap-1 text-white/80 font-normal">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>

                  <div className="flex items-center gap-1.5 font-bold">
                    <span>Read full story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action buttons & Topics */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-surface-line">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
              Browse By Topic:
            </span>
            <Link
              href="/blog/category/news"
              className="text-xs font-semibold bg-surface-soft hover:bg-[#0d8b99] hover:text-white text-ink px-3 py-1.5 rounded-full border border-surface-line transition-all"
            >
              Company News
            </Link>
            <Link
              href="/blog/category/announcements"
              className="text-xs font-semibold bg-surface-soft hover:bg-[#0d8b99] hover:text-white text-ink px-3 py-1.5 rounded-full border border-surface-line transition-all"
            >
              Announcements
            </Link>
            <Link
              href="/blog/category/blog"
              className="text-xs font-semibold bg-surface-soft hover:bg-[#0d8b99] hover:text-white text-ink px-3 py-1.5 rounded-full border border-surface-line transition-all"
            >
              Engineering Insights
            </Link>
          </div>

          <Button
            href="/blog"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            View All News & Insights
          </Button>
        </div>
      </div>
    </section>
  );
}
