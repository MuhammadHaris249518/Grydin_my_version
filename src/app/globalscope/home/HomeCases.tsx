import Link from "next/link";
import { ArrowRight, Building2, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "../ui/Button";
import { PROJECTS } from "@/data/projects";

export function HomeCases() {
  const cases = PROJECTS.slice(0, 3);

  return (
    <section id="cases" className="relative bg-white py-20 md:py-28 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            CASE STUDIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Proven systems engineered for <span className="text-teal-600">real-world impact</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore how our custom software, agentic pipelines, and system integrations solve specific business bottlenecks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1} className="h-full">
              <div className="group h-full bg-white border border-slate-200/80 shadow-md rounded-3xl p-7 hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                      {c.client}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {c.industry}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-3">
                    {c.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    <strong className="font-bold text-slate-900">Problem: </strong>
                    {c.challenge}
                  </p>

                  {c.results && c.results.length > 0 && (
                    <div className="rounded-2xl border border-teal-200/80 bg-teal-50/50 p-4">
                      <p className="font-mono text-lg font-extrabold text-teal-700 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-teal-600" />
                        {c.results[0].metric}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 font-medium">
                        {c.results[0].label}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/projects/${c.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform"
                  >
                    Read case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/projects" variant="outline-dark" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            VIEW ALL CLIENT PROJECTS
          </Button>
        </div>
      </div>
    </section>
  );
}
