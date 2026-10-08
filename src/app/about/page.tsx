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
  Target,
  Sparkles,
} from "lucide-react";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";

const PRINCIPLES = [
  {
    number: "01",
    label: "Diagnose",
    icon: Target,
    title: "Start with the real problem",
    description:
      "We learn where work gets stuck before deciding which technology belongs in the solution.",
  },
  {
    number: "02",
    label: "Design around you",
    icon: Users,
    title: "Fit how your team works",
    description:
      "Each system is shaped around your process and tools, instead of asking your team to fit a template.",
  },
  {
    number: "03",
    label: "Connect the gaps",
    icon: Workflow,
    title: "Connect the whole workflow",
    description:
      "We look across tools, teams, and decisions so the answer addresses the gaps between them.",
  },
];

const OFFICE_PHOTOS = [
  {
    src: "/assets/images/about/team-at-work.png",
    alt: "GrydIn teammates working side by side in the Islamabad office",
    title: "Working through the details",
    className: "sm:col-span-2 lg:col-span-1 lg:row-span-1",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 86vw",
  },
  {
    src: "/assets/images/about/pair-programming.png",
    alt: "Two GrydIn teammates reviewing a project together",
    title: "Solving problems together",
    className: "lg:col-span-1",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 86vw",
  },
  {
    src: "/assets/images/about/focused-work.png",
    alt: "A GrydIn teammate focused on a laptop at the office",
    title: "Focused on the work",
    className: "lg:col-span-1",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 86vw",
  },
  {
    src: "/assets/images/about/team-collaboration.png",
    alt: "GrydIn teammates collaborating at laptops in the Islamabad office",
    title: "Building together",
    className: "lg:col-span-1",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 86vw",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <section style={{ fontFamily: "Inter, Arial, sans-serif" }} className="relative isolate flex min-h-[calc(100svh-68px)] items-center overflow-hidden border-b border-surface-line py-14 sm:py-16 lg:min-h-[calc(100svh-68px)] lg:py-16">
        <HeroBackdrop network={false} />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_74%_48%,rgba(34,211,238,0.14),transparent_38%)]" />
        <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-[1] hidden h-full w-[68%] opacity-40 lg:block" viewBox="0 0 1100 760" fill="none" preserveAspectRatio="xMidYMid slice">
          <g stroke="#67d9e8" strokeOpacity=".35" strokeWidth="1">
            <path d="m12 265 148-45 126 74 140-170 126 110 152-144 120 80 170-65" />
            <path d="m40 470 162-115 182 118 168-105 160 116 168-96 174 45" />
            <path d="m120 665 130-126 192 54 160-112 174 64 170-130 138 32" />
            <path d="m160 220 42 135-52 125 120 59-20 126m176-456 8 288 64 116m62-398 0 286 154 112m152-546 8 352 6 194m114-546-4 195 58 160" />
          </g>
          <g fill="#12cde0">
            <circle cx="160" cy="220" r="4"/><circle cx="202" cy="355" r="6"/><circle cx="328" cy="294" r="4"/><circle cx="426" cy="124" r="5"/><circle cx="552" cy="234" r="6"/><circle cx="704" cy="90" r="5"/><circle cx="824" cy="170" r="4"/><circle cx="994" cy="105" r="4"/><circle cx="202" cy="355" r="4"/><circle cx="384" cy="473" r="5"/><circle cx="552" cy="368" r="4"/><circle cx="712" cy="484" r="5"/><circle cx="880" cy="388" r="4"/><circle cx="1054" cy="433" r="5"/><circle cx="250" cy="539" r="4"/><circle cx="442" cy="593" r="4"/><circle cx="602" cy="481" r="5"/><circle cx="776" cy="545" r="4"/><circle cx="946" cy="415" r="5"/>
          </g>
        </svg>
        <div className="relative z-10 mx-auto grid w-full max-w-[1660px] items-center gap-8 px-5 sm:gap-12 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-12 xl:px-14">
          <Reveal className="max-w-[790px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_4px_18px_rgba(13,139,153,0.12)]">
              <span className="h-2 w-2 rounded-full bg-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.7)]" />
              About GrydIn
            </div>
            <p className="mt-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">
              <span className="h-px w-9 bg-accent/70" />
              Grid the unseen
            </p>
            <h1 className="mt-5 max-w-[790px] font-sans text-[clamp(2.35rem,10vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.05em] text-ink sm:mt-6 sm:text-[clamp(3.5rem,4vw,4.5rem)] sm:leading-[0.99] sm:tracking-[-0.055em]">
              We build systems that<br className="hidden lg:block" /> close the gaps in your<br className="hidden lg:block" /> business<span className="text-accent">.</span>
            </h1>
            <p className="mt-4 max-w-[790px] text-[15px] leading-relaxed text-ink-muted sm:mt-6 sm:text-lg sm:leading-[1.65]">
              Work often gets lost between tools, teams, and decisions. We find those gaps and build technology around how your team actually works.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-y-3 text-xs font-medium text-ink-muted sm:mt-10 sm:gap-y-4 sm:text-sm">
              {[
                { icon: Zap, label: <>Smarter<br />Operations</> },
                { icon: Users, label: <>Stronger<br />Teams</> },
                { icon: ChartNoAxesColumnIncreasing, label: <>Better<br />Decisions</> },
              ].map(({ icon: Icon, label }, index) => (
                <div key={index} className={`flex items-center gap-3.5 ${index > 0 ? "border-l border-slate-300 pl-5 sm:pl-7" : "pr-5 sm:pr-7"}`}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
                  </span>
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
            <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-cyan-200/15 blur-[52px]" />
            <div className="pointer-events-none absolute -inset-y-6 -right-5 left-5 translate-x-4 rounded-[2rem] border border-cyan-300/35 bg-cyan-100/15 shadow-[8px_14px_28px_rgba(3,105,161,0.08)]" />
            <div className="pointer-events-none absolute -inset-y-3 -right-3 left-3 translate-x-2 rounded-[2rem] border border-white/65 bg-white/25" />
            <div className="relative overflow-hidden rounded-[1.4rem] border border-cyan-200/65 bg-[linear-gradient(145deg,#073b5d_0%,#052d4a_55%,#041f36_100%)] p-4 text-white shadow-[0_24px_56px_-34px_rgba(0,68,96,0.48),inset_0_1px_0_rgba(255,255,255,0.16)] [transform:rotate(-1deg)] sm:rounded-[2rem] sm:p-7 sm:[transform:rotate(-3.5deg)] lg:p-8">
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:text-xs">The work between the work</p>
                  <h2 className="mt-2 font-sans text-xl font-bold tracking-[-0.035em] sm:text-2xl lg:text-[1.8rem]">Make the unseen visible.</h2>
                </div>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/50 bg-cyan-400/10 text-cyan-200 sm:h-[68px] sm:w-[68px]">
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
              </div>

              <div className="relative mt-4 space-y-2 sm:mt-7 sm:space-y-3">
                {[
                  { icon: GitBranch, label: "Tools", detail: "Disconnected systems" },
                  { icon: Users, label: "Teams", detail: "Manual handoffs" },
                  { icon: Workflow, label: "Decisions", detail: "Work that gets missed" },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="group flex items-center gap-3 rounded-[1rem] border border-cyan-100/20 bg-white/[0.07] px-3.5 py-3 transition-colors duration-200 hover:border-cyan-200/45 hover:bg-white/[0.1] sm:gap-4 sm:px-4 sm:py-3.5">
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

              <div className="relative mt-3 flex items-center gap-3 rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-500 to-teal-400 px-3.5 py-3.5 text-white shadow-[0_10px_26px_rgba(34,211,238,0.2)] sm:gap-4 sm:px-4 sm:py-4">
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

      <section className="relative isolate overflow-hidden border-b border-surface-line bg-gradient-to-br from-[#eaf8f6] via-[#f8fbfd] to-white py-14 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-32 top-8 h-80 w-80 rounded-full bg-teal-200/25 blur-3xl" />
          <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-100/45 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#0d8b99_0.7px,transparent_0.7px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-teal-400/70 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
          <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-teal-200/80 bg-white/75 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_0_4px_rgba(13,139,153,0.12)]" />
                Our story
              </p>
              <h2 className="max-w-xl text-[2rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-[3.25rem]">
                The work no one sees <span className="text-gradient">can hold a business back.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                We find the friction between people, tools, and decisions, then build the system that helps work move forward.
              </p>
              <div className="mt-6 inline-flex items-center gap-2.5 text-xs font-semibold text-teal-800">
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-teal-200 bg-white/80 text-accent shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                Less friction. Better systems.
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.08}>
              <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-5 shadow-[0_24px_70px_-42px_rgba(13,139,153,0.34)] backdrop-blur-md sm:p-8">
                <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-teal-100/60 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-teal-200 bg-gradient-to-br from-white to-teal-50 text-accent shadow-sm">
                      <Workflow className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-[11px]">
                      The idea that started GrydIn
                    </span>
                  </div>
                  <div className="space-y-4 border-l-2 border-teal-200 pl-4 sm:pl-5">
                    <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      GrydIn grew from a simple observation: businesses lose momentum in the gaps between tools, teams, and decisions. Repeated handoffs and small manual tasks are easy to overlook, but they add friction to the work people are trying to do.
                    </p>
                    <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      We start by understanding what is actually slowing a team down. Then we build the specific system that can help: an AI agent, a workflow automation, a custom integration, or software designed around the way that business works.
                    </p>
                  </div>
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50/90 to-cyan-50/60 p-3.5 sm:items-center sm:p-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-accent shadow-sm sm:mt-0">
                      <Target className="h-4 w-4" />
                    </span>
                    <p className="text-xs font-semibold leading-relaxed text-teal-950 sm:text-sm">
                      No templates or off-the-shelf fixes. Start with the problem, then build what fits.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative mt-8 sm:mt-12">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-teal-300/70 to-transparent md:block" aria-hidden="true" />
            <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
              {PRINCIPLES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.number} delay={index * 0.06} className="w-[84%] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
                    <GlassCard className="group relative h-full overflow-hidden rounded-3xl border border-teal-100/90 bg-white/90 p-5 shadow-[0_14px_38px_-24px_rgba(13,139,153,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_22px_44px_-24px_rgba(13,139,153,0.34)] sm:p-7">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-500" aria-hidden="true" />
                      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-teal-100/70 blur-2xl transition-colors group-hover:bg-cyan-100" aria-hidden="true" />
                      <div className="relative">
                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex items-center rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1 font-mono text-xs font-bold tracking-[0.14em] text-accent">
                            {item.number}
                          </span>
                          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 text-accent shadow-[0_8px_20px_-12px_rgba(13,139,153,0.55)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                            <Icon className="h-5 w-5" strokeWidth={2.1} />
                          </span>
                        </div>
                        <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
                          {item.label}
                        </p>
                        <h3 className="mt-2 text-lg font-bold tracking-tight text-ink sm:text-xl">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                          {item.description}
                        </p>
                      </div>
                    </GlassCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Inside GrydIn"
              title="The people behind the work"
              accent="behind the work"
              intro="A look inside our Islamabad office and the team building solutions around real business problems."
            />
            <p className="shrink-0 pb-1 text-sm font-medium text-accent">
              Islamabad, Pakistan
            </p>
          </div>

          <div
            className="about-team-marquee mt-5 overflow-hidden py-3 sm:mt-9"
            role="region"
            aria-roledescription="carousel"
            aria-label="Photos of the GrydIn team at work"
            tabIndex={0}
          >
            <div className="about-team-marquee-track flex w-max">
              {[false, true].map((isDuplicate) => (
                <div
                  key={isDuplicate ? "duplicate" : "original"}
                  className="about-team-marquee-group flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
                  aria-hidden={isDuplicate || undefined}
                >
                  {OFFICE_PHOTOS.map((photo) => (
                    <figure
                      key={photo.src}
                      className="group relative h-[235px] w-[82vw] max-w-[420px] shrink-0 overflow-hidden rounded-2xl border border-surface-line bg-ink shadow-[0_20px_55px_-35px_rgba(9,35,62,0.5)] sm:h-[300px] sm:w-[42vw] sm:max-w-[460px] lg:h-[280px] lg:w-[31vw] lg:max-w-[400px]"
                    >
                      <Image
                        src={photo.src}
                        alt={isDuplicate ? "" : photo.alt}
                        fill
                        sizes={photo.sizes}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
                      <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <p className="text-lg font-semibold tracking-tight text-white">
                          {photo.title}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let’s talk about what’s slowing your team down."
        subtitle="Tell us what is getting stuck. We’ll start with the work and explore what would help."
        buttonText="Start a conversation"
        buttonHref="/contact"
        secondaryText=""
        secondaryHref=""
      />
    </main>
  );
}
