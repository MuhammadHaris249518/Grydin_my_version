import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

const PROBLEMS = [
  {
    num: "01",
    title: "Manual Handoffs",
    desc: "Critical workflows stall across inbox threads and chat pings while employees manually copy data between systems.",
  },
  {
    num: "02",
    title: "Disconnected Tools",
    desc: "Your CRM, ERP, and databases operate as disconnected silos, requiring continuous manual reconciliations and duplicate data entry.",
  },
  {
    num: "03",
    title: "Slow Reporting",
    desc: "Leadership waits days or weeks for manual spreadsheet compilation instead of acting on continuous, real-time verified intelligence.",
  },
];

export function HomeProblem() {
  return (
    <section className="relative bg-surface-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Operational Bottlenecks"
          title="Where operations quietly leak time"
          accent="leak time"
          intro="Most organizations do not have an execution problem. They have an infrastructure problem where valuable engineering and operations hours vanish into repetitive friction."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1}>
              <div className="flex flex-col">
                <span className="font-mono text-4xl sm:text-5xl font-bold text-accent/30">
                  {p.num}
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
