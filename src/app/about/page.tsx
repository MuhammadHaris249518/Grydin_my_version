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
        <HeroBackdrop network={false} />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_74%_48%,rgba(34,211,238,0.14),transparent_38%)]" />
        <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-[1] hidden h-full w-[68%] opacity-40 lg:block" viewBox="0 0 900 650" fill="none" preserveAspectRatio="xMidYMid slice"><g stroke="#67d9e8" strokeOpacity=".35" strokeWidth="1"><path d="m20 210 130-45 120 72 130-135 110 88 135-112 130 66"/><path d="m35 410 150-88 155 92 145-86 150 96 135-82 95 32"/><path d="m105 590 125-120 170 50 145-95 155 55 130-105 100 25"/><path d="m150 165 35 157-55 88 125 60-25 120m150-363 10 271 30 52m110-362v276l145 58m135-390 5 320 15 50"/></g><g fill="#12cde0"><circle cx="150" cy="165" r="4"/><circle cx="185" cy="322" r="5"/><circle cx="270" cy="237" r="4"/><circle cx="400" cy="102" r="5"/><circle cx="510" cy="190" r="5"/><circle cx="645" cy="78" r="5"/><circle cx="775" cy="144" r="4"/><circle cx="340" cy="414" r="5"/><circle cx="485" cy="328" r="4"/><circle cx="635" cy="424" r="5"/><circle cx="770" cy="342" r="4"/><circle cx="205" cy="470" r="4"/><circle cx="400" cy="520" r="4"/><circle cx="545" cy="425" r="5"/><circle cx="700" cy="480" r="4"/><circle cx="830" cy="375" r="5"/></g></svg>
        <div className="relative z-10 mx-auto grid w-full max-w-[1660px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-12 xl:px-10">
          <Reveal className="max-w-[790px] 2xl:relative 2xl:-top-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_4px_18px_rgba(13,139,153,0.12)]">
              <span className="h-2 w-2 rounded-full bg-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.7)]" />
              About GrydIn
            </div>
            <p className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">
              <span className="h-px w-9 bg-accent/70" />
              Grid the unseen
            </p>
            <h1 className="mt-6 max-w-[790px] font-display text-[clamp(3.5rem,4vw,4.5rem)] font-extrabold leading-[0.99] tracking-[-0.045em] text-ink">
              We build systems that<br className="hidden 2xl:block" /> close the gaps in your<br className="hidden 2xl:block" /> business<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-[790px] text-base leading-relaxed text-ink-muted sm:text-lg sm:leading-[1.65]">
              Work often gets lost between tools, teams, and decisions. We find those gaps and build technology around how your team actually works.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-y-4 text-sm font-medium text-ink-muted sm:mt-10">
              {[
                { icon: Zap, label: <>Smarter<br />Operations</> },
                { icon: Users, label: <>Stronger<br />Teams</> },
                { icon: Workflow, label: <>Better<br />Decisions</> },
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

          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[460px] xl:max-w-[520px] 2xl:ml-16 2xl:max-w-[560px]">
            <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-cyan-200/15 blur-[52px]" />
            <div className="pointer-events-none absolute -inset-y-6 -right-5 left-5 translate-x-4 rounded-[2rem] border border-cyan-300/35 bg-cyan-100/15 shadow-[8px_14px_28px_rgba(3,105,161,0.08)]" />
            <div className="pointer-events-none absolute -inset-y-3 -right-3 left-3 translate-x-2 rounded-[2rem] border border-white/65 bg-white/25" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/65 bg-[linear-gradient(145deg,#073b5d_0%,#052d4a_55%,#041f36_100%)] p-5 text-white shadow-[0_24px_56px_-34px_rgba(0,68,96,0.48),inset_0_1px_0_rgba(255,255,255,0.16)] [transform:rotate(-4deg)] sm:rounded-[2rem] sm:p-7 lg:p-8 2xl:pt-12 2xl:pb-8">
              
              
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:text-xs">The work between the work</p>
                  <h2 className="mt-2 font-display text-xl font-bold tracking-[-0.035em] sm:text-2xl lg:text-[1.8rem]">Make the unseen visible.</h2>
                </div>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/50 bg-cyan-400/10 text-cyan-200 sm:h-[68px] sm:w-[68px]">
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
              </div>
              <div className="relative mt-6 space-y-2.5 sm:mt-7 sm:space-y-3 2xl:space-y-4">
                {[
                  { icon: GitBranch, label: "Tools", detail: "Disconnected systems" },
                  { icon: Users, label: "Teams", detail: "Manual handoffs" },
                  { icon: Workflow, label: "Decisions", detail: "Work that gets missed" },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="group flex items-center gap-3 rounded-[1rem] border border-cyan-100/20 bg-white/[0.07] px-3.5 py-3 transition-colors duration-200 hover:border-cyan-200/45 hover:bg-white/[0.1] sm:gap-4 sm:px-4 sm:py-3.5 2xl:py-[18px]">
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
              <div className="relative mt-3 flex items-center gap-3 rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-500 to-teal-400 px-3.5 py-3.5 text-white shadow-[0_10px_26px_rgba(34,211,238,0.2)] sm:gap-4 sm:px-4 sm:py-4 2xl:py-5">
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
