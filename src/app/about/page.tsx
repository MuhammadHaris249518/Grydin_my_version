"use client";

import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Eye,
  GitBranch,
  Users,
  Workflow,
  Zap,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";

const PRINCIPLES = [
  {
    number: "01",
    title: "Start with the real problem",
    description:
      "We learn where work gets stuck before deciding which technology belongs in the solution.",
  },
  {
    number: "02",
    title: "Fit how your team works",
    description:
      "Each system is shaped around your process and tools, instead of asking your team to fit a template.",
  },
  {
    number: "03",
    title: "Connect the whole workflow",
    description:
      "We look across tools, teams, and decisions so the answer addresses the gaps between them.",
  },
];

const OFFICE_PHOTOS = [
  {
    src: "/images/about/team-at-work.png",
    alt: "GrydIn teammates working side by side in the Islamabad office",
    title: "Working through the details",
    className: "sm:col-span-2 lg:col-span-7 lg:row-span-2",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    src: "/images/about/pair-programming.png",
    alt: "Two GrydIn teammates reviewing a project together",
    title: "Solving problems together",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    src: "/images/about/focused-work.png",
    alt: "A GrydIn teammate focused on a laptop at the office",
    title: "Focused on the work",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <section className="relative isolate flex min-h-[calc(100svh-68px)] items-center overflow-hidden border-b border-surface-line py-14 sm:py-16 lg:min-h-[calc(100svh-68px)] lg:py-16">
        <HeroBackdrop network />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_77%_49%,rgba(34,211,238,0.12),transparent_38%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1580px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-16 xl:px-20">
          <Reveal className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_4px_18px_rgba(13,139,153,0.12)]">
              <span className="h-2 w-2 rounded-full bg-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.7)]" />
              About GrydIn
            </div>
            <p className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">
              <span className="h-px w-9 bg-accent/70" />
              Grid the unseen
            </p>
            <h1 className="mt-6 max-w-[710px] text-[clamp(2.8rem,5.2vw,5rem)] font-semibold leading-[0.99] tracking-[-0.055em] text-ink">
              We build systems that close the gaps in your business<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-[710px] text-base leading-relaxed text-ink-muted sm:text-lg sm:leading-[1.65]">
              Work often gets lost between tools, teams, and decisions. We find those gaps and build technology around how your team actually works.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-y-4 text-sm font-medium text-ink-muted sm:mt-10">
              {[
                { icon: Zap, label: <>Smarter<br />Operations</> },
                { icon: Users, label: <>Stronger<br />Teams</> },
                { icon: ChartNoAxesColumnIncreasing, label: <>Better<br />Decisions</> },
              ].map(({ icon: Icon, label }, index) => (
                <div key={index} className={`flex items-center gap-3.5 ${index > 0 ? "border-l border-slate-300 pl-5 sm:pl-7" : "pr-5 sm:pr-7"}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600">
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
            <div className="pointer-events-none absolute -inset-10 rounded-[4rem] bg-cyan-300/30 blur-[70px]" />
            <div className="pointer-events-none absolute -inset-x-2 inset-y-6 translate-x-5 rotate-[3deg] rounded-[2rem] border border-cyan-300/60 bg-sky-100/55 shadow-[14px_18px_36px_rgba(3,105,161,0.16)]" />
            <div className="pointer-events-none absolute -inset-x-2 inset-y-3 translate-x-2 rotate-[1.5deg] rounded-[2rem] border border-white/80 bg-white/45" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/70 bg-[radial-gradient(circle_at_78%_10%,rgba(0,213,231,0.27),transparent_29%),linear-gradient(145deg,#063353_0%,#052944_50%,#031d34_100%)] p-5 text-white shadow-[0_35px_90px_-28px_rgba(0,91,140,0.68),inset_0_1px_0_rgba(255,255,255,0.18)] [transform:perspective(1500px)_rotateY(-5deg)_rotateZ(-1.3deg)] sm:rounded-[2rem] sm:p-7 lg:p-8">
              <div className="pointer-events-none absolute -right-14 -top-20 h-64 w-64 rounded-full border border-cyan-300/20 shadow-[0_0_70px_rgba(34,211,238,0.12)]" />
              <div className="pointer-events-none absolute -right-4 -top-10 h-44 w-44 rounded-full border border-cyan-300/20" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:text-xs">The work between the work</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-[1.8rem]">Make the unseen visible.</h2>
                </div>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.32)] sm:h-[68px] sm:w-[68px]">
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
              </div>
              <div className="relative mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
                {[
                  { icon: GitBranch, label: "Tools", detail: "Disconnected systems" },
                  { icon: Users, label: "Teams", detail: "Manual handoffs" },
                  { icon: Workflow, label: "Decisions", detail: "Work that gets missed" },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="group flex items-center gap-3 rounded-2xl border border-cyan-100/20 bg-gradient-to-r from-white/[0.12] to-white/[0.06] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_20px_rgba(0,8,25,0.16)] transition duration-300 hover:translate-x-1 hover:border-cyan-200/50 sm:gap-4 sm:px-4 sm:py-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-300/35 bg-cyan-400/15 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.16)] sm:h-[52px] sm:w-[52px]">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold sm:text-base">{label}</span>
                      <span className="mt-0.5 block text-xs text-blue-100/80 sm:text-sm">{detail}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-cyan-200 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
              <div className="relative mt-3 flex items-center gap-3 rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 px-3.5 py-3.5 text-white shadow-[0_0_28px_rgba(34,211,238,0.5),inset_0_1px_0_rgba(255,255,255,0.55)] sm:gap-4 sm:px-4 sm:py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/50 bg-white/15 shadow-[0_0_18px_rgba(255,255,255,0.2)] sm:h-[52px] sm:w-[52px]">
                  <Bot className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold sm:text-base">A system built for your process</span>
                  <span className="mt-0.5 block text-xs text-white/90 sm:text-sm">AI · Automation · Software</span>
                </span>
                <ArrowRight className="h-6 w-6 shrink-0" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-surface-line bg-surface-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                <span className="h-px w-8 bg-accent/60" />
                Our story
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[3rem]">
                The work no one sees can hold a business back.
              </h2>
            </Reveal>
            <Reveal className="space-y-5 lg:col-span-7" delay={0.08}>
              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                GrydIn grew from a simple observation: businesses lose momentum in the gaps between tools, teams, and decisions. Repeated handoffs and small manual tasks are easy to overlook, but they add friction to the work people are trying to do.
              </p>
              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                We start by understanding what is actually slowing a team down. Then we build the specific system that can help: an AI agent, a workflow automation, a custom integration, or software designed around the way that business works.
              </p>
              <p className="border-l-2 border-accent pl-4 text-sm font-medium leading-relaxed text-ink">
                No templates or off-the-shelf fixes. Start with the problem, then build what fits.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06}>
                <GlassCard className="h-full p-6 sm:p-7">
                  <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">{item.number}</p>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow="Inside GrydIn" title="The people behind the work" accent="behind the work" intro="A look inside our Islamabad office and the team building solutions around real business problems." />
            <p className="shrink-0 pb-1 text-sm font-medium text-accent">Islamabad, Pakistan</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[210px]">
            {OFFICE_PHOTOS.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.07} className={photo.className}>
                <figure className="group relative h-[280px] overflow-hidden rounded-2xl border border-surface-line bg-ink shadow-[0_20px_55px_-35px_rgba(9,35,62,0.5)] sm:h-[340px] lg:h-full">
                  <Image src={photo.src} alt={photo.alt} fill sizes={photo.sizes} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-lg font-semibold tracking-tight text-white">{photo.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Let’s talk about what’s slowing your team down." subtitle="Tell us what is getting stuck. We’ll start with the work and explore what would help." buttonText="Start a conversation" buttonHref="/contact" secondaryText="" secondaryHref="" />
    </main>
  );
}
