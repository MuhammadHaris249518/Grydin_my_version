"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, LayoutGrid, Mail, Target, TrendingUp, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS } from "@/data/projects";

const IMPACT_ICONS = [Zap, Mail, FileText];
const CORNER_TONES = ["bg-sky-100", "bg-indigo-100", "bg-teal-100"];
const IMPACT_TONES = [
  { panel: "border-teal-100 bg-[#f1f9f8]", icon: "bg-teal-100 text-teal-700" },
  { panel: "border-indigo-100 bg-[#f5f6ff]", icon: "bg-indigo-100 text-indigo-600" },
  { panel: "border-teal-100 bg-[#f1f9f8]", icon: "bg-teal-100 text-teal-700" },
];

export function HomeCases() {
  const cases = PROJECTS.slice(0, 3);

  return (
    <section id="cases" className="border-b border-slate-200/80 bg-[#fbfcfd] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-7 max-w-3xl">
          <div className="mb-2.5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
            <span className="h-px w-6 bg-teal-600" aria-hidden="true" />
            CASE STUDIES
          </div>
          <h2 className="mb-2.5 text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Proven systems engineered for{" "}
            <span className="text-teal-600">real-world impact</span>
          </h2>
          <p className="max-w-2xl text-sm font-normal leading-relaxed text-slate-600 sm:text-[15px]">
            Explore how our custom software, agentic pipelines, and system integrations solve specific business bottlenecks.
          </p>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-3">
          {cases.map((c, i) => {
            const primaryResult = c.results && c.results.length > 0 ? c.results[0] : null;
            const ImpactIcon = IMPACT_ICONS[i % IMPACT_ICONS.length];
            const impactTone = IMPACT_TONES[i % IMPACT_TONES.length];

            return (
              <Reveal key={c.slug} delay={i * 0.1} className="h-full">
                <article className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-lg sm:p-5">
                  <div
                    className={`pointer-events-none absolute right-0 top-0 h-12 w-12 ${CORNER_TONES[i % CORNER_TONES.length]} [clip-path:polygon(100%_0,100%_100%,0_0)]`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 mb-3 flex h-12 items-center">
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt={`${c.client} logo`}
                        width={230}
                        height={60}
                        className={`h-10 w-auto max-w-[78%] object-contain object-left ${i === 0 ? "brightness-0 saturate-100" : ""}`}
                      />
                    ) : (
                      <span className="text-base font-extrabold uppercase text-slate-800">{c.client}</span>
                    )}
                  </div>

                  <div className="mb-2.5">
                    <span className="inline-flex max-w-full rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium leading-tight text-slate-600">
                      {c.industry}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-teal-700 sm:text-[19px]">
                      {c.title}
                  </h3>

                  <div className="mb-3.5">
                    <div className="mb-1 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-teal-700">
                      <Target className="h-3.5 w-3.5" aria-hidden="true" />
                        THE CHALLENGE
                    </div>
                    <p className="line-clamp-3 text-xs leading-[1.5] text-slate-600 sm:text-[12.5px]">
                      {c.challenge}
                    </p>
                  </div>

                  {primaryResult && (
                    <div className={`mb-3.5 flex min-h-[68px] items-center gap-2.5 rounded-lg border p-2.5 ${impactTone.panel}`}>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${impactTone.icon}`}>
                        <ImpactIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <div className="mb-0.5 flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-teal-700">
                          <TrendingUp className="h-3 w-3" aria-hidden="true" />
                          THE IMPACT
                        </div>
                        <p className="text-sm font-extrabold leading-tight text-slate-900">{primaryResult.metric}</p>
                        <p className="mt-0.5 text-[10px] leading-snug text-slate-600">{primaryResult.label}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-1">
                    <Link
                      href={`/projects/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 transition-transform group-hover:translate-x-0.5"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="pt-1 text-center">
          <Link
            href="/solutions#client-projects"
            className="inline-flex items-center gap-2.5 rounded-md border border-[#0D8B99] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D8B99] shadow-xs transition-colors duration-200 hover:bg-[#0D8B99] hover:text-white"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>VIEW ALL CLIENT PROJECTS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
