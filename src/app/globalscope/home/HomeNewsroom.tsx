import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { BlogPost, BlogCategory } from "@/lib/content-schema";
import { CATEGORY_NAMES } from "@/lib/blog";

const CATEGORY_STYLES: Record<BlogCategory, { bg: string; text: string; border: string }> = {
  announcements: {
    bg: "bg-amber-500/20 text-amber-300",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  news: {
    bg: "bg-emerald-500/20 text-emerald-300",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  blog: {
    bg: "bg-sky-500/20 text-sky-300",
    text: "text-sky-300",
    border: "border-sky-500/30",
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
    <section id="newsroom" className="relative w-full py-20 md:py-28 bg-white border-b border-surface-line overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-navy-700">
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

        {/* 3 Theme-Colored Newsroom Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredPosts.map((post) => {
            const categoryStyle = CATEGORY_STYLES[post.category] || CATEGORY_STYLES.blog;
            const categoryLabel = CATEGORY_NAMES[post.category] || post.category;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative bg-gradient-to-br from-[#061f3d] via-[#04172e] to-[#020e1d] rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-teal/60 transition-all duration-300 hover:shadow-2xl hover:shadow-teal/15 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-teal transition-colors duration-300" />

                <div>
                  {/* Category Chip & Date */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${categoryStyle.bg} ${categoryStyle.border}`}
                    >
                      {categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-teal" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {/* Post Title in White */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt in light text */}
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {post.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-teal group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1 text-slate-400 font-normal">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
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
              className="text-xs font-semibold bg-surface-soft hover:bg-navy hover:text-white text-ink px-3 py-1.5 rounded-full border border-surface-line transition-all"
            >
              Company News
            </Link>
            <Link
              href="/blog/category/announcements"
              className="text-xs font-semibold bg-surface-soft hover:bg-navy hover:text-white text-ink px-3 py-1.5 rounded-full border border-surface-line transition-all"
            >
              Announcements
            </Link>
            <Link
              href="/blog/category/blog"
              className="text-xs font-semibold bg-surface-soft hover:bg-navy hover:text-white text-ink px-3 py-1.5 rounded-full border border-surface-line transition-all"
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
