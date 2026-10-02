import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "../ui/Button";
import { PROJECTS } from "@/data/projects";

export function HomeCases() {
  const cases = PROJECTS.slice(0, 3);

  return (
    <section id="cases" className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Case Studies"
          title="Proven systems engineered for real-world impact"
          accent="real-world impact"
          intro="Explore how our custom software, agentic pipelines, and system integrations solve specific business bottlenecks."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1} className="h-full">
              <GlassCard className="group flex h-full flex-col justify-between p-7 transition-[box-shadow,border-color] duration-300 hover:border-accent/30 hover:shadow-glow">
                <div>
                  <div className="flex items-center justify-between border-b border-surface-line pb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      {c.client}
                    </span>
                    <span className="text-xs text-ink-muted">
                      {c.industry}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                    {c.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    <strong className="text-ink-muted">Problem: </strong>
                    {c.challenge}
                  </p>

                  {c.results && c.results.length > 0 && (
                    <div className="mt-6 rounded-xl border border-accent/30 bg-accent-light p-4">
                      <p className="font-mono text-base font-semibold text-accent">
                        {c.results[0].metric}
                      </p>
                      <p className="mt-1 text-sm text-ink-muted">
                        {c.results[0].label}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-surface-line">
                  <Link
                    href={`/projects/${c.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-ink transition-colors"
                  >
                    Read case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button href="/projects" variant="outline-dark" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            View all client projects
          </Button>
        </div>
      </div>
    </section>
  );
}
