import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { Button } from "../ui/Button";
import { BlogPost, BlogCategory } from "@/lib/content-schema";
import { CATEGORY_NAMES } from "@/lib/blog";

const CATEGORY_COLORS: Record<BlogCategory, { bg: string; text: string; border: string }> = {
  announcements: {
    bg: "bg-amber-50 text-amber-700",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  news: {
    bg: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  blog: {
    bg: "bg-sky-50 text-sky-700",
    text: "text-sky-700",
    border: "border-sky-200",
  },
};

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
    <section id="newsroom" className="relative w-full py-20 md:py-28 bg-[#031326] border-b border-white/10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d8b99] text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-md">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Newsroom & Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Latest News & Announcements
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Engineering perspectives, company milestones, and architectural insights from the GrydIn team — styled like leading big tech newsrooms.
          </p>
        </div>

        {/* 3 Crisp White Newsroom Boxes on Deep Navy Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredPosts.map((post) => {
            const categoryStyle = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.blog;
            const categoryLabel = CATEGORY_NAMES[post.category] || post.category;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-transparent hover:border-[#0d8b99] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#0d8b99]/20 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#0d8b99] transition-colors duration-300" />

                <div>
                  {/* Category Chip & Date */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${categoryStyle.bg} ${categoryStyle.border}`}
                    >
                      {categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#0d8b99]" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0d8b99] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt in slate-600 */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {post.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-slate-500 font-normal">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {post.readingTime}
                  </span>

                  <div className="flex items-center gap-1.5 font-bold text-[#0d8b99] group-hover:translate-x-1 transition-transform">
                    <span>Read full story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action buttons & Topics */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mr-1">
              Browse By Topic:
            </span>
            <Link
              href="/blog/category/news"
              className="text-xs font-semibold bg-white/10 hover:bg-white text-white hover:text-slate-900 px-3 py-1.5 rounded-full border border-white/15 transition-all"
            >
              Company News
            </Link>
            <Link
              href="/blog/category/announcements"
              className="text-xs font-semibold bg-white/10 hover:bg-white text-white hover:text-slate-900 px-3 py-1.5 rounded-full border border-white/15 transition-all"
            >
              Announcements
            </Link>
            <Link
              href="/blog/category/blog"
              className="text-xs font-semibold bg-white/10 hover:bg-white text-white hover:text-slate-900 px-3 py-1.5 rounded-full border border-white/15 transition-all"
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
