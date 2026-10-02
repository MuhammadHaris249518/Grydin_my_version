"use client";

import React from "react";
import Link from "next/link";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProcessTimeline, type TimelineStep } from "@/components/motion/ProcessTimeline";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Globe, CheckCircle2, Shield, Zap, Sparkles } from "lucide-react";

const VALUES = [
  {
    num: "01",
    title: "Surface the Invisible Work",
    desc: "Teams spend hours moving data between systems, chasing approvals, and compiling repetitive reports. We build systems that quietly handle this in the background.",
  },
  {
    num: "02",
    title: "Zero Forced Disruption",
    desc: "We don't force migrations onto proprietary monoliths. We integrate with your existing CRM, ERP, and databases so your operations never skip a beat.",
  },
  {
    num: "03",
    title: "Fixed Scopes & Definite Timelines",
    desc: "No endless retainer billing or open-ended consulting hours. We audit upfront, contract exact milestones, and ship production systems in under two weeks.",
  },
  {
    num: "04",
    title: "Full Production Independence",
    desc: "You own 100% of the code, models, schemas, and runbooks. We empower your team so you never experience vendor lock-in.",
  },
];

const MILESTONES: TimelineStep[] = [
  {
    step: "01",
    phase: "Founded",
    tagline: "AI-NATIVE ENGINEERING",
    desc: "Established with a single thesis: enterprise teams don't have an execution problem; they have an operational plumbing problem.",
    points: [
      { title: "First 10 Deployments", desc: "Automated core client onboarding and financial triage pipelines." },
      { title: "Deterministic Guardrails", desc: "Engineered production agent framework with strict schema validation." },
    ],
  },
  {
    step: "02",
    phase: "Expansion",
    tagline: "CROSS-BORDER REACH",
    desc: "Scaled delivery across five international hubs while launching proprietary enterprise tooling.",
    points: [
      { title: "Global Footprint", desc: "Serving organizations across the US, UK, Australia, Middle East, and Pakistan." },
      { title: "Proprietary Tooling", desc: "Incubated GridPilot and FlowMap internal event engines." },
    ],
  },
  {
    step: "03",
    phase: "Scale",
    tagline: "AUTONOMOUS ENTERPRISE",
    desc: "Deploying multi-model, multi-agent systems with guaranteed sub-second latencies and complete auditable observability.",
    points: [
      { title: "45+ Production Systems", desc: "Managing millions of event payloads across disparate architectures." },
      { title: "Two-Week SLA", desc: "Delivering fixed-scope architectures with zero operational downtime." },
    ],
  },
];

const GLOBAL_REGIONS = [
  { region: "United States", role: "Fintech, Legaltech & Property Management" },
  { region: "United Kingdom", role: "Enterprise Knowledge & Healthcare Workflows" },
  { region: "Australia", role: "Supply Chain & Omnichannel Inventory Flow" },
  { region: "Middle East", role: "Energy Telemetry & Automated Field Dispatch" },
  { region: "Pakistan", role: "Core Engineering Headquarters & Innovation Hub" },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <main className="min-h-screen bg-navy text-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Our Firm & Philosophy"
        title="Engineering certainty for modern enterprises"
        subtitle="GrydIn is an AI-native systems engineering firm. We surface the invisible work slowing your team down, then engineer it away permanently."
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

      {/* 2. Story & Values Section */}
      <section className="relative bg-navy py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Core Values"
            title="The principles governing how we build"
            accent="principles"
            intro="We reject bloated consulting retainers. Instead, we deliver battle-tested software architectures designed around your real operational bottlenecks."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {VALUES.map((val, idx) => (
              <Reveal key={val.num} delay={idx * 0.08}>
                <GlassCard className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-sm font-bold text-teal-glow">
                      {val.num}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-base text-slate-300 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Company Milestones Timeline */}
      <section className="relative bg-navy-950 py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Journey & Evolution"
            title="How GrydIn evolved into a global engineering firm"
            accent="global engineering firm"
            intro="A timeline of technological milestones, production deployments, and cross-border expansion."
            className="mb-16"
          />

          <ProcessTimeline steps={MILESTONES} />
        </div>
      </section>

      {/* 4. Global Clients & Globe Slot Block */}
      <section className="relative bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 3D Globe Slot */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="glass aspect-square max-w-[460px] mx-auto rounded-3xl p-6 border border-white/15 relative overflow-hidden flex items-center justify-center">
                  <ModelSlot label="globe" className="h-full w-full" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-6 text-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-teal-glow">
                      Global Client Deployments
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Global Footprint List */}
            <div className="lg:col-span-6">
              <Reveal delay={0.15}>
                <SectionHeader
                  eyebrow="Global Footprint"
                  title="Serving forward-thinking enterprises worldwide"
                  accent="worldwide"
                  intro="From Silicon Valley startups to established international operations, our architectures run globally with zero maintenance overhead."
                />

                <div className="mt-8 space-y-4">
                  {GLOBAL_REGIONS.map((item, idx) => (
                    <div key={idx} className="glass p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-teal-glow shrink-0" />
                        <div>
                          <p className="font-semibold text-white text-base">{item.region}</p>
                          <p className="text-xs text-slate-400">{item.role}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-teal-glow shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="/contact" variant="primary" size="lg">
                    Book a free process diagnosis
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CtaBand */}
      <CtaBand
        title="Ready to eliminate friction in your business?"
        subtitle="Schedule a diagnosis with a Lead Architect. Fixed-scope roadmap within 48 hours."
      />
    </main>
  );
}