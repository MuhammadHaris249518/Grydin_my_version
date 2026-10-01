import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllProjects,
  getProjectBySlug,
  PROJECTS,
} from "@/data/projects";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import {
  buildMetadata,
  projectJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { ArrowRight, CheckCircle2, Calendar, Building, Layers, Cpu, ExternalLink } from "lucide-react";

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
    { label: "Projects", href: "/projects" },
    { label: project.client },
  ];

  const jsonLdData = [
    projectJsonLd(project),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: project.title, url: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
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
            Start a similar project
          </Button>
        }
      />

      {/* Main Content: 2-column layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Case Study Narrative (wrapped in data-allow-copy) */}
          <div className="lg:col-span-8 space-y-12" data-allow-copy>
            {/* The Challenge */}
            <section>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
                The Bottleneck
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                Operational Challenge
              </h2>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {project.challenge}
              </p>
            </section>

            {/* The Solution */}
            <section className="bg-surface-soft rounded-2xl p-8 border border-surface-line">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
                Engineered Solution
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                What GrydIn Built
              </h2>
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {project.solution}
              </p>
            </section>

            {/* Measurable Results */}
            <section>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
                Impact &amp; Outcomes
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-6">
                Measurable Value Delivered
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-surface-line bg-white shadow-xs"
                  >
                    <div className="text-lg font-black text-teal mb-1">
                      {res.metric}
                    </div>
                    <div className="text-xs sm:text-sm text-ink-muted">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Project Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-surface-soft rounded-2xl p-6 sm:p-8 border border-surface-line shadow-xs">
              {/* Logo / Header */}
              {project.logo && (
                <div className="bg-white rounded-xl p-6 mb-6 flex items-center justify-center border border-surface-line">
                  <Image
                    src={project.logo}
                    alt={`${project.client} logo`}
                    width={150}
                    height={70}
                    className="object-contain max-h-16"
                  />
                </div>
              )}

              <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-6 pb-3 border-b border-surface-line">
                Project Metadata
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-ink-muted block text-xs uppercase font-medium">Client</span>
                  <span className="font-bold text-ink">{project.client}</span>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-medium">Industry</span>
                  <span className="font-bold text-ink">{project.industry}</span>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-medium">Delivery Year</span>
                  <span className="font-bold text-ink">{project.year}</span>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-medium mb-1.5">Services Applied</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((svc) => (
                      <Link
                        key={svc}
                        href="/services"
                        className="inline-block"
                      >
                        <Badge variant="teal" size="sm">
                          {svc.replace(/-/g, " ")}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-ink-muted block text-xs uppercase font-medium mb-1.5">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <Badge key={item} variant="surface" size="sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-surface-line">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  Start a similar project
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* More Projects Strip */}
      <Section tone="soft" eyebrow="Portfolio" title="Explore More Projects">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map((p) => (
            <Card
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <div className="bg-white rounded-lg p-5 mb-4 flex items-center justify-center border border-surface-line h-24">
                  {p.logo ? (
                    <Image
                      src={p.logo}
                      alt={`${p.client} logo`}
                      width={110}
                      height={50}
                      className="object-contain max-h-12"
                    />
                  ) : (
                    <span className="font-bold text-navy">{p.client}</span>
                  )}
                </div>
                <Badge variant="teal" size="sm" className="mb-2">{p.industry}</Badge>
                <h4 className="font-bold text-ink group-hover:text-teal transition-colors line-clamp-1 mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-ink-muted line-clamp-2 mb-4">
                  {p.summary}
                </p>
              </div>
              <div className="pt-3 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase text-teal">
                <span>View case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CtaBand */}
      <CtaBand
        title={`Ready to streamline your ${project.industry.toLowerCase()} operations?`}
        subtitle="Speak directly with the engineers who scope and build these systems."
        buttonText="Book a diagnosis"
        buttonHref="/contact"
      />
    </div>
  );
}
