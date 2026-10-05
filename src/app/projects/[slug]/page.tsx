import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  PROJECTS,
} from "@/data/projects";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import {
  buildMetadata,
  projectJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | GrydIn",
    };
  }

  return buildMetadata({
    documentTitle: `${project.title} - ${project.client} | GrydIn`,
    socialTitle: `${project.title} | GrydIn Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [
      project.client,
      project.industry,
      ...project.services,
      ...project.stack,
      "case study",
      "AI automation",
    ],
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions#client-projects" },
    { label: project.client },
  ];

  const jsonLdData = [
    projectJsonLd(project),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/solutions#client-projects" },
      { name: project.title, url: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-surface text-ink">
      <JsonLd data={jsonLdData} />

      {/* PageHero */}
      <PageHero
        eyebrow={`${project.client} · ${project.industry} · ${project.year}`}
        title={project.title}
        subtitle={project.summary}
        breadcrumbs={breadcrumbs}
        actions={
          <Button
            href="/contact"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Book a free process diagnosis
          </Button>
        }
      />

      {/* Main Content: 2-column layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-8 space-y-12">
            {/* Results Block as a Stat Band */}
            {project.results.length > 0 && (
              <Reveal>
                <div className="rounded-2xl border-y border-surface-line py-8 my-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <div className="text-2xl sm:text-3xl font-mono font-semibold text-accent">
                        {res.metric}
                      </div>
                      <div className="text-xs sm:text-sm text-ink-muted mt-1">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* The Operational Challenge */}
            <Reveal delay={0.1}>
              <GlassCard className="p-8 sm:p-10">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  The Bottleneck
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mt-2 mb-4">
                  Operational challenge
                </h2>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                  {project.challenge}
                </p>
              </GlassCard>
            </Reveal>

            {/* The Solution */}
            <Reveal delay={0.15}>
              <GlassCard className="p-8 sm:p-10 !border-accent/40 bg-accent-light">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Engineered Solution
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mt-2 mb-4">
                  What GrydIn built
                </h2>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                  {project.solution}
                </p>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Sticky Project Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <GlassCard className="p-7">
              {project.logo && (
                <div className="bg-white/5 rounded-xl p-5 mb-6 flex items-center justify-center border border-surface-line">
                  <Image
                    src={project.logo}
                    alt={`${project.client} logo`}
                    width={150}
                    height={70}
                    className="object-contain max-h-16"
                  />
                </div>
              )}

              <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-6 pb-3 border-b border-surface-line">
                Project Summary
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-ink-muted block text-xs uppercase font-mono">Client</span>
                  <span className="font-semibold text-ink">{project.client}</span>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-mono">Industry</span>
                  <span className="font-semibold text-ink">{project.industry}</span>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-mono">Delivery Year</span>
                  <span className="font-semibold text-ink font-mono">{project.year}</span>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-mono mb-2">Services Applied</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((svc) => (
                      <Link
                        key={svc}
                        href="/services"
                        className="surface-card px-2.5 py-1 rounded-md text-xs font-mono text-accent hover:text-ink"
                      >
                        {svc.replace(/-/g, " ")}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-mono mb-2">Technology Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((st) => (
                      <span key={st} className="bg-white/5 border border-surface-line px-2 py-0.5 rounded text-xs font-mono text-ink-muted">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-surface-line">
                <Button href="/contact" variant="primary" size="md" className="w-full">
                  Book a free process diagnosis
                </Button>
              </div>
            </GlassCard>
          </aside>
        </div>
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="relative bg-surface-soft py-20 border-t border-surface-line">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <SectionHeader
              eyebrow="More Case Studies"
              title="Explore other production systems"
              accent="production systems"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group block">
                  <GlassCard className="p-7 h-full flex flex-col justify-between transition-[box-shadow,border-color] duration-300 group-hover:border-accent/50 group-hover:shadow-glow">
                    <div>
                      <div className="font-mono text-xs uppercase text-accent mb-2">{p.client}</div>
                      <h4 className="text-lg font-semibold text-ink group-hover:text-accent transition-colors">{p.title}</h4>
                      <p className="mt-2 text-xs text-ink-muted line-clamp-2">{p.summary}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-surface-line flex items-center justify-between text-xs text-accent font-semibold">
                      <span>Read case study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Ready to engineer your custom system?"
        subtitle="Schedule a diagnosis with an architect and receive your fixed-scope roadmap within 48 hours."
      />
    </div>
  );
}
