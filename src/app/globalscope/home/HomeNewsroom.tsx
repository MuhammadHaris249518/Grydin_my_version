import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper, ArrowUpRight } from "lucide-react";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
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
  // Big tech style: show top 3 latest items
  const featuredPosts = posts.slice(0, 3);

  return (
    <Section
      id="newsroom"
      tone="soft"
      eyebrow="Newsroom & Insights"
      title="Latest News & Announcements"
      intro="Engineering perspectives, company milestones, and architectural insights from the GrydIn team — styled like leading big tech newsrooms."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {featuredPosts.map((post) => {
          const categoryStyle = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.blog;
          const categoryLabel = CATEGORY_NAMES[post.category] || post.category;

          return (
            <Card
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-6 sm:p-7 flex flex-col justify-between h-full bg-white"
            >
              <div>
                {/* Meta header: Category chip + Date & Reading Time */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${categoryStyle.bg} ${categoryStyle.border}`}
                  >
                    {categoryLabel}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="text-lg font-bold text-ink mb-3 group-hover:text-teal transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 mb-6">
                  {post.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-surface-line/60 flex items-center justify-between text-xs font-semibold text-teal group-hover:translate-x-0.5 transition-transform">
                <span className="flex items-center gap-1 text-slate-500 font-normal">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {post.readingTime}
                </span>

                <span className="inline-flex items-center gap-1 font-bold text-teal group-hover:text-teal-700">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action buttons & Categories */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-surface-line/70">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
            Browse By Topic:
          </span>
          <Link
            href="/blog/category/news"
            className="text-xs font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-full border border-surface-line transition-colors"
          >
            Company News
          </Link>
          <Link
            href="/blog/category/announcements"
            className="text-xs font-semibold bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 px-3 py-1.5 rounded-full border border-surface-line transition-colors"
          >
            Announcements
          </Link>
          <Link
            href="/blog/category/blog"
            className="text-xs font-semibold bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 px-3 py-1.5 rounded-full border border-surface-line transition-colors"
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
    </Section>
  );
}
