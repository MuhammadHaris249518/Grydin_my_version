"use client";

import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  Eye,
  GitBranch,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";

const CAPABILITIES = [
  {
    icon: Bot,
    title: "AI agents",
    description:
      "Purpose-built agents that can reason through defined tasks and take action across the tools your team already uses.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Connected workflows that take repetitive handoffs off your team's plate and keep information moving between systems.",
  },
  {
    icon: Boxes,
    title: "Custom software & integrations",
    description:
      "Software and integrations designed around your process when off-the-shelf tools leave an important gap.",
  },
];

const APPROACH = [
  {
    number: "01",
    title: "Understand the work",
    description:
      "We learn how the process works today, where information gets stuck, and what a better outcome needs to look like.",
  },
  {
    number: "02",
    title: "Choose the right fit",
    description:
      "We shape the solution around your people, tools, and constraints instead of starting with a preset technology.",
  },
  {
    number: "03",
    title: "Build for real use",
    description:
      "We engineer the system to fit into day-to-day operations, with the integrations and handoffs the workflow needs.",
  },
  {
    number: "04",
    title: "Keep improving",
    description:
      "We use what the team learns in practice to guide the next improvements to the system and process.",
  },
];

const OFFICE_PHOTOS = [
  {
    src: "/images/about/team-at-work.png",
    alt: "GrydIn teammates working side by side in the office",
    title: "Working through the details",
    detail: "Focused engineering, built around real business needs.",
    className: "lg:col-span-7 lg:row-span-2 lg:min-h-[460px]",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    src: "/images/about/pair-programming.png",
    alt: "Two GrydIn teammates reviewing a project together",
    title: "Better work, together",
    detail: "Sharing context and solving problems as a team.",
    className: "lg:col-span-5 lg:min-h-[222px]",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    src: "/images/about/focused-work.png",
    alt: "A GrydIn teammate focused on a laptop at the office",
    title: "Attention to the craft",
    detail: "Thoughtful execution, one problem at a time.",
    className: "lg:col-span-5 lg:min-h-[222px]",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <main className="min-h-screen bg-surface text-ink">
      <PageHero
        eyebrow="About GrydIn · Grid the Unseen"
        title="We build systems that close the gaps in your business."
        subtitle="The work slowing a business down is often hard to see: a manual handoff, a disconnected tool, or a process no one has time to fix. GrydIn finds those gaps and builds what helps close them."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <Button
              href="/contact"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Talk about your workflow
            </Button>
            <Button href="/services" variant="outline-dark" size="md">
              Explore what we build
            </Button>
          </>
        }
        slot={
          <div className="relative mx-auto max-w-[440px]">
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-accent/10 blur-3xl" />
            <GlassCard className="relative overflow-hidden border border-surface-line bg-white/80 p-6 shadow-[0_24px_70px_-36px_rgba(0,120,130,0.4)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    The work between the work
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                    Make the unseen visible.
                  </h2>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <Eye className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  { icon: GitBranch, label: "Tools", detail: "Disconnected systems" },
                  { icon: Building2, label: "Teams", detail: "Manual handoffs" },
                  { icon: Workflow, label: "Decisions", detail: "Work that gets missed" },
                ].map(({ icon: Icon, label, detail }, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-surface-line bg-white/80 px-3.5 py-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold text-ink">{label}</span>
                        <span className="block truncate text-xs text-ink-muted">{detail}</span>
                      </span>
                    </div>
                    <ArrowDownRight
                      className={`h-4 w-4 shrink-0 text-accent ${index === 2 ? "opacity-0" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-white shadow-[0_8px_24px_-10px_rgba(0,145,145,0.9)]">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">A system built for your process</p>
                  <p className="mt-0.5 text-xs text-ink-muted">AI · Automation · Software</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-accent" />
              </div>
            </GlassCard>
          </div>
        }
      />

      <section className="border-b border-surface-line bg-surface-soft py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:items-start lg:px-16">
          <Reveal className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-8 bg-accent/60" />
              Why GrydIn
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[3.25rem]">
              The right solution starts with the{" "}
              <span className="text-gradient">real problem.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              A business does not need technology for its own sake. It needs the right system for the work that keeps falling between tools, teams, and decisions.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                title: "Start with the slowdown",
                text: "We begin by understanding what is actually costing your team time, attention, or momentum.",
              },
              {
                title: "Fit the way you work",
                text: "The solution is shaped around your real process and existing stack, not a generic template.",
              },
              {
                title: "Connect the pieces",
                text: "We look at the full flow across people, decisions, and systems so the fix works where it matters.",
              },
              {
                title: "Make it useful every day",
                text: "We focus on practical systems your team can put to work in its normal operations.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <GlassCard className="h-full p-6 sm:p-7">
                  <span className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="What we build"
            title="Technology shaped around your operation"
            accent="your operation"
            intro="From autonomous task handling to the software that connects your stack, we build around the problem in front of your team."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 0.07}>
                <GlassCard className="group h-full p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-line bg-surface-soft py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Inside GrydIn"
            title="The people behind the systems"
            accent="behind the systems"
            intro="A glimpse inside our Islamabad office—where the team works together to turn real operational problems into useful technology."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:auto-rows-[222px]">
            {OFFICE_PHOTOS.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.07}
                className={photo.className}
              >
                <figure className="group relative h-[300px] overflow-hidden rounded-2xl border border-surface-line bg-ink shadow-[0_20px_55px_-35px_rgba(9,35,62,0.5)] sm:h-[380px] lg:h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={photo.sizes}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-lg font-semibold tracking-tight text-white">
                      {photo.title}
                    </p>
                    <p className="mt-1 text-sm text-white/75">{photo.detail}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-line bg-surface-soft py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="How we work"
            title="From understanding the work to improving the system"
            accent="improving the system"
            intro="A clear, collaborative path keeps the work connected to the way your business actually runs."
            className="mb-12"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06}>
                <div className="relative h-full rounded-2xl border border-surface-line bg-white/75 p-6 shadow-[0_12px_40px_-32px_rgba(10,36,68,0.32)] sm:p-7">
                  <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">{item.number}</p>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  {index < APPROACH.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-8 z-10 hidden h-5 w-5 rounded-full bg-surface-soft p-0.5 text-accent lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-accent/15 bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Based in Islamabad</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">A focused engineering team</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">GrydIn is a technology company based in Islamabad, Pakistan.</p>
              </div>
            </div>
            <Button href="/contact" variant="outline-dark" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
              Meet us in a conversation
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let’s find the work hiding in your workflow."
        subtitle="Tell us where work gets stuck. We’ll talk through the process and what a useful solution could look like."
        buttonText="Start a conversation"
        secondaryText="Explore our services"
        secondaryHref="/services"
      />
    </main>
  );
}
