import React from "react";
import Link from "next/link";
import { SOLUTIONS } from "@/data/solutions";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import {
  FileText,
  Building2,
  ShoppingBag,
  HeartPulse,
  Zap,
  Truck,
  ArrowRight,
  Search,
  Cpu,
  Rocket,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Building2,
  ShoppingBag,
  HeartPulse,
  Zap,
  Truck,
};

export default function SolutionsHubPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions" },
  ];

  const steps = [
    {
      num: "01",
      icon: <Search className="w-6 h-6 text-teal" />,
      title: "Diagnose",
      tagline: "Forensic Workflow Audit",
      desc: "We shadow your team, trace data handoffs across SaaS tools, and pinpoint exact points of operational friction.",
    },
    {
      num: "02",
      icon: <Cpu className="w-6 h-6 text-teal" />,
      title: "Design",
      tagline: "Fixed-Scope Architecture",
      desc: "We specify a deterministic blueprint with clear deliverables, API endpoints, safety guardrails, and a fixed quote.",
    },
    {
      num: "03",
      icon: <Rocket className="w-6 h-6 text-teal" />,
      title: "Deploy",
      tagline: "Shipped in Two Weeks",
      desc: "We assemble, test against synthetic edge cases, and launch your production system with guaranteed operational support.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Industry Expertise"
        title="SOLUTIONS FOR YOUR INDUSTRY"
        subtitle="Domain-specific automation systems, AI agents, and custom software architected to eliminate operational bottlenecks."
        breadcrumbs={breadcrumbs}
        actions={
          <Button
            href="/contact"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Request an industry diagnosis
          </Button>
        }
      />

      {/* 2. Industry Card Grid */}
      <Section
        tone="white"
        eyebrow="Target Sectors"
        title="Where We Apply Our Architecture"
        intro="Explore tailored operational workflows engineered for high-velocity teams in key industries."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((sol) => {
            const IconComponent = ICON_MAP[sol.icon] || FileText;

            return (
              <Card
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                className="h-full flex flex-col justify-between p-8 hover:border-slate-300 shadow-xs hover:shadow-lg"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-teal-light text-teal flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-ink tracking-tight mb-2.5 group-hover:text-teal transition-colors">
                    {sol.name}
                  </h3>

                  <p className="text-xs font-semibold text-teal-dark mb-3">
                    {sol.headline}
                  </p>

                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 mb-6">
                    {sol.summary}
                  </p>
                </div>

                <div>
                  {/* Service badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {sol.services.map((svc) => (
                      <Badge key={svc} variant="default" size="sm">
                        {svc.replace(/-/g, " ")}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal group-hover:text-teal-dark">
                    <span>Explore solution</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 3. How We Work Strip (Diagnose -> Design -> Deploy) */}
      <Section
        tone="soft"
        eyebrow="Methodology"
        title="How GrydIn Deploys In Two Weeks"
        intro="Our 3-step async delivery framework ensures zero time-zone friction, transparent scopes, and reliable software."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-8 border border-surface-line relative overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-black text-slate-200 mb-4">
                {step.num}
              </div>

              <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-ink tracking-tight mb-1">
                {step.title}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-teal mb-3">
                {step.tagline}
              </p>

              <p className="text-sm text-ink-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. CtaBand */}
      <CtaBand
        title="Don't see your industry listed?"
        subtitle="Our core systems layer—AI agents, APIs, and workflow orchestration—adapts to any data-driven operation."
        buttonText="Schedule a consultation"
        buttonHref="/contact"
      />
    </div>
  );
}
