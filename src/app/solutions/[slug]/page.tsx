import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getAllSolutions,
  getSolutionBySlug,
  SOLUTIONS,
} from "@/data/solutions";
import { getProjectBySlug } from "@/data/projects";
import { SERVICE_SEO } from "@/lib/seo";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
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
  Cpu,
  Layers,
  Sparkles,
  Search,
  Rocket,
  ChevronRight,
} from "lucide-react";

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

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLdData} />

      {/* PageHero */}
      <PageHero
        eyebrow="Industry Solution"
        title={sol.name.toUpperCase()}
        subtitle={sol.headline}
        breadcrumbs={breadcrumbs}
        actions={
          <Button
            href="/contact"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Start your industry diagnosis
          </Button>
        }
      />

      {/* 1. Challenges Section */}
      <Section
        tone="white"
        eyebrow="Operational Bottlenecks"
        title="Common Challenges We Eliminate"
        intro={`The recurring friction points that slow down ${sol.name.toLowerCase()} operations.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-allow-copy>
          {sol.challenges.map((ch, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface-soft border border-surface-line flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <p className="text-sm sm:text-base text-ink leading-relaxed font-medium">
                {ch}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 2. Our Approach (3 Steps) */}
      <Section
        tone="soft"
        eyebrow="GrydIn Approach"
        title="How We Architect the Solution"
        intro="From initial workflow mapping to production deployment in fourteen days."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sol.approach.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-surface-line shadow-xs relative"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-teal mb-3">
                Step 0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-ink tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Services We Apply */}
      <Section
        tone="white"
        eyebrow="Core Services"
        title="Technologies Applied"
        intro={`The foundation services leveraged in our ${sol.name.toLowerCase()} architectures.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appliedServices.map((svc) => (
            <Card
              key={svc.slug}
              href="/services"
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <Badge variant="teal" size="sm" className="mb-3">
                  Service
                </Badge>
                <h4 className="text-lg font-bold text-ink tracking-tight mb-2 group-hover:text-teal transition-colors">
                  {svc.name}
                </h4>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 mb-4">
                  {svc.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase text-teal group-hover:text-teal-dark">
                <span>View service</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. Related Projects */}
      {relatedProjects.length > 0 && (
        <Section
          tone="soft"
          eyebrow="Case Studies"
          title="Related Deployments"
          intro={`Real systems deployed for clients in ${sol.name.toLowerCase()}.`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((p) => (
              <Card
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="p-8 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="bg-surface-soft rounded-xl p-6 mb-6 flex items-center justify-center border border-surface-line h-24">
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt={`${p.client} logo`}
                        width={140}
                        height={60}
                        className="object-contain max-h-16"
                      />
                    ) : (
                      <span className="font-bold text-navy text-lg">{p.client}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="teal" size="sm">{p.industry}</Badge>
                    <span className="text-xs text-ink-muted">{p.year}</span>
                  </div>

                  <h4 className="text-xl font-bold text-ink tracking-tight mb-2 group-hover:text-teal transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed mb-6">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase text-teal">
                  <span>Read case study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* 5. Outcomes Strip */}
      <Section
        tone="white"
        eyebrow="Target Outcomes"
        title="Expected Business Impact"
        intro="What your team achieves when manual friction is permanently engineered away."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-allow-copy>
          {sol.outcomes.map((out, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-surface-line bg-surface-soft flex items-center gap-3.5"
            >
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
              <span className="text-sm font-semibold text-ink">
                {out}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. CtaBand */}
      <CtaBand
        title={`Ready to streamline your ${sol.name.toLowerCase()} operations?`}
        subtitle="Book a diagnosis call. We scope your project and provide a fixed quote in 24 hours."
        buttonText="Book a diagnosis"
        buttonHref="/contact"
      />
    </div>
  );
}
