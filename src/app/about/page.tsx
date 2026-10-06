"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/app/globalscope/ui/PageHero";
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
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <main className="min-h-screen bg-surface text-ink">
      <PageHero
        eyebrow="About GrydIn · Grid the Unseen"
        title="We build systems that close the gaps in your business."
        subtitle="Work often gets lost between tools, teams, and decisions. We find those gaps and build technology around how your team actually works."
        breadcrumbs={breadcrumbs}
      />

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
                  <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">
                    {item.number}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
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

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[210px]">
            {OFFICE_PHOTOS.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.07}
                className={photo.className}
              >
                <figure className="group relative h-[280px] overflow-hidden rounded-2xl border border-surface-line bg-ink shadow-[0_20px_55px_-35px_rgba(9,35,62,0.5)] sm:h-[340px] lg:h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
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
              </Reveal>
            ))}
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
