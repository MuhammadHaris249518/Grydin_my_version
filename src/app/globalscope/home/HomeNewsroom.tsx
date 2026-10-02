import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "../ui/Button";
import { BlogPost } from "@/lib/content-schema";
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
  const featured = posts[0];
  const sidePosts = posts.slice(1, 3);

  return (
    <section id="newsroom" className="relative w-full bg-slate-50/60 py-20 md:py-28 border-b border-slate-200/80">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            NEWSROOM & INSIGHTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Engineering perspectives & <span className="text-teal-600">company updates</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Deep dives into multi-agent orchestration, resilient event pipelines, and the operational architecture of high-reliability systems.
          </p>
        </div>

        {/* Editorial Layout: 7 cols featured + 5 cols compact rows */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Featured Post (7 cols) */}
          {featured && (
            <Reveal className="lg:col-span-7">
              <Link href={`/blog/${featured.slug}`} className="group block h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="rounded-md border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-teal-700">
                        {CATEGORY_NAMES[featured.category] || featured.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-teal-600" />
                        {formatDate(featured.date)}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {featured.readingTime}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">
                      {featured.title}
                    </h3>

                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                      {featured.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 pt-6 border-t border-slate-100 text-xs sm:text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                    <span>Read featured story</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Side Compact Posts (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {sidePosts.map((post, idx) => (
              <Reveal key={post.slug} delay={0.1 * (idx + 1)} className="flex-1">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="flex h-full flex-col justify-between rounded-3xl p-7 bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-xs font-bold text-teal-700">
                          {CATEGORY_NAMES[post.category] || post.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {formatDate(post.date)}
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                      <span className="text-slate-500 font-medium">{post.readingTime}</span>
                      <span className="flex items-center gap-1 font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                        Read story
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200/80 pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              Browse by topic:
            </span>
            <Link
              href="/blog/category/news"
              className="rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:border-teal-300 transition-colors shadow-2xs"
            >
              Company News
            </Link>
            <Link
              href="/blog/category/announcements"
              className="rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:border-teal-300 transition-colors shadow-2xs"
            >
              Announcements
            </Link>
            <Link
              href="/blog/category/blog"
              className="rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:border-teal-300 transition-colors shadow-2xs"
            >
              Engineering Insights
            </Link>
          </div>

          <Button href="/blog" variant="primary" size="md" iconRight={<ArrowRight className="h-4 w-4 ml-1" />}>
            VIEW ALL NEWS & INSIGHTS
          </Button>
        </div>
      </div>
    </section>
  );
}
