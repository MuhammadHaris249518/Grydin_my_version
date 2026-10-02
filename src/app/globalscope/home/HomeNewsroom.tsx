import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
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
    <section id="newsroom" className="relative w-full bg-surface py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Newsroom & Insights"
          title="Engineering perspectives & company updates"
          accent="Engineering perspectives"
          intro="Deep dives into multi-agent orchestration, resilient event pipelines, and the operational architecture of high-reliability systems."
        />

        {/* Editorial Layout: 7 cols featured + 5 cols compact rows */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Main Featured Post (7 cols) */}
          {featured && (
            <Reveal className="lg:col-span-7">
              <Link href={`/blog/${featured.slug}`} className="group block h-full">
                <GlassCard className="flex h-full flex-col justify-between p-8 sm:p-10 transition-[box-shadow,border-color] duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-md border border-accent/30 bg-accent-light px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        {CATEGORY_NAMES[featured.category] || featured.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        {formatDate(featured.date)}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <Clock className="h-3.5 w-3.5 text-ink-muted" />
                        {featured.readingTime}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl sm:text-3xl font-semibold text-ink group-hover:text-accent transition-colors leading-tight">
                      {featured.title}
                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      {featured.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 pt-6 border-t border-surface-line text-sm font-semibold text-accent">
                    <span>Read featured story</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          )}

          {/* Side Compact Posts (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {sidePosts.map((post, idx) => (
              <Reveal key={post.slug} delay={0.1 * (idx + 1)} className="flex-1">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <GlassCard className="flex h-full flex-col justify-between p-7 transition-[box-shadow,border-color] duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-accent">
                          {CATEGORY_NAMES[post.category] || post.category}
                        </span>
                        <span className="text-xs text-ink-muted">
                          {formatDate(post.date)}
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-semibold text-ink group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-surface-line text-xs">
                      <span className="text-ink-muted">{post.readingTime}</span>
                      <span className="flex items-center gap-1 font-semibold text-accent">
                        Read story
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-surface-line pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted mr-2">
              Browse by topic:
            </span>
            <Link
              href="/blog/category/news"
              className="surface-card rounded-full px-3.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-accent/30 transition-colors"
            >
              Company News
            </Link>
            <Link
              href="/blog/category/announcements"
              className="surface-card rounded-full px-3.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-accent/30 transition-colors"
            >
              Announcements
            </Link>
            <Link
              href="/blog/category/blog"
              className="surface-card rounded-full px-3.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-accent/30 transition-colors"
            >
              Engineering Insights
            </Link>
          </div>

          <Button href="/blog" variant="primary" size="md" iconRight={<ArrowRight className="h-4 w-4 ml-1" />}>
            View All News & Insights
          </Button>
        </div>
      </div>
    </section>
  );
}
