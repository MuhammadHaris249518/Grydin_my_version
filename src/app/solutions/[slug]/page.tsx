import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getSolutionBySlug,
  SOLUTIONS,
} from "@/data/solutions";
import { getProjectBySlug } from "@/data/projects";
import { SERVICE_SEO } from "@/lib/seo";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import {
  buildMetadata,
  solutionJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { ProcessTimeline, type TimelineStep } from "@/components/motion/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((sol) => ({
    slug: sol.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);

  if (!sol) {
    return { title: "Solution Not Found | GrydIn" };
  }

  return buildMetadata({
    documentTitle: `${sol.name} Automation Solutions | GrydIn`,
    socialTitle: `${sol.name} - ${sol.headline} | GrydIn`,
    description: sol.summary,
    path: `/solutions/${sol.slug}`,
    keywords: [
      sol.name,
      ...sol.services,
      "industry automation",
      "workflow solutions",
    ],
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);

  if (!sol) {
    notFound();
  }

  const relatedProjects = (sol.projects || [])
    .map((pSlug) => getProjectBySlug(pSlug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const appliedServices = SERVICE_SEO.filter((s) =>
    sol.services.includes(s.slug)
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: sol.name },
  ];

  const jsonLdData = [
    solutionJsonLd(sol),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Solutions", url: "/solutions" },
      { name: sol.name, url: `/solutions/${sol.slug}` },
    ]),
  ];

  const timelineSteps: TimelineStep[] = sol.approach.map((step, idx) => ({
    step: `0${idx + 1}`,
    phase: idx === 0 ? "Diagnose" : idx === 1 ? "Design" : "Deploy",
    tagline: step.title,
    desc: step.text,
    points: [],
  }));

  return (
    <div className="min-h-screen bg-navy text-white">
      <JsonLd data={jsonLdData} />

      {/* PageHero with 3D industry-hero slot */}
      <PageHero
        eyebrow="Industry Solution"
        title={sol.name}
        subtitle={sol.headline}
        breadcrumbs={breadcrumbs}
        slot={<ModelSlot label="industry-hero" className="aspect-[4/3] w-full border border-white/10" />}
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

      {/* 1. Challenges Section */}
      <section className="relative bg-navy py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Operational Bottlenecks"
            title={`Common challenges in ${sol.name.toLowerCase()}`}
            accent="Common challenges"
            intro={`The recurring friction points and manual bottlenecks that slow down ${sol.name.toLowerCase()} operations.`}
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {sol.challenges.map((ch, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <GlassCard className="p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <p className="text-base text-slate-200 leading-relaxed">
                    {ch}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Our Approach (Process Timeline) */}
      <section className="relative bg-navy-950 py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Engineering Methodology"
            title="How we architect the solution"
            accent="architect the solution"
            intro="From initial workflow mapping to production deployment in fourteen days with guaranteed fixed scopes."
          />

          <div className="mt-14">
            <ProcessTimeline steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* 3. Services We Apply */}
      <section className="relative bg-navy py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Core Services"
            title="Technologies and architectures applied"
            accent="Technologies"
            intro={`The foundational capabilities leveraged in our ${sol.name.toLowerCase()} systems.`}
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {appliedServices.map((svc, idx) => (
              <Reveal key={svc.slug} delay={idx * 0.1}>
                <Link href={`/services#${svc.slug}`} className="group block h-full">
                  <GlassCard className="p-7 h-full flex flex-col justify-between transition-[box-shadow,border-color] duration-300 group-hover:border-teal-glow/50 group-hover:shadow-glow">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-teal-glow bg-teal/20 px-2.5 py-1 rounded-md border border-teal-glow/30">
                        Capability
                      </span>
                      <h4 className="mt-4 text-xl font-semibold text-white group-hover:text-teal-glow transition-colors">
                        {svc.name}
                      </h4>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        {svc.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-teal-glow">
                      <span>Explore capability</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="relative bg-navy-950 py-20 md:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <SectionHeader
              eyebrow="Case Studies"
              title="Related client deployments"
              accent="client deployments"
              intro={`Real systems engineered and launched for clients in ${sol.name.toLowerCase()}.`}
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p, idx) => (
                <Reveal key={p.slug} delay={idx * 0.1}>
                  <Link href={`/projects/${p.slug}`} className="group block h-full">
                    <GlassCard className="p-8 h-full flex flex-col justify-between transition-[box-shadow,border-color] duration-300 group-hover:border-teal-glow/50 group-hover:shadow-glow">
                      <div>
                        <div className="bg-white/5 rounded-xl p-5 mb-6 flex items-center justify-center border border-white/10 h-24">
                          {p.logo ? (
                            <Image
                              src={p.logo}
                              alt={`${p.client} logo`}
                              width={140}
                              height={60}
                              className="object-contain max-h-16"
                            />
                          ) : (
                            <span className="font-semibold text-white text-lg">{p.client}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-xs text-teal-glow">{p.industry}</span>
                          <span className="text-slate-500">•</span>
                          <span className="font-mono text-xs text-slate-400">{p.year}</span>
                        </div>

                        <h4 className="text-xl font-semibold text-white group-hover:text-teal-glow transition-colors">
                          {p.title}
                        </h4>
                        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                          {p.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-teal-glow">
                        <span>Read case study</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </GlassCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Outcomes Strip */}
      <section className="relative bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Target Outcomes"
            title="Expected business impact"
            accent="business impact"
            intro="What your team achieves when manual operational friction is permanently engineered away."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sol.outcomes.map((out, idx) => (
              <Reveal key={idx} delay={idx * 0.06}>
                <div className="glass p-5 rounded-xl flex items-center gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-glow shrink-0" />
                  <span className="text-base text-slate-200">
                    {out}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CtaBand */}
      <CtaBand
        title={`Ready to streamline your ${sol.name.toLowerCase()} operations?`}
        subtitle="Book a diagnosis call. We scope your project and provide a fixed quote within 48 hours."
      />
    </div>
  );
}
