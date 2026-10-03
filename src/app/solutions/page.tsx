import React from "react";
import { SolutionsHero } from "./SolutionsHero";
import { SolutionsClient } from "./SolutionsClient";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  documentTitle: "Industry Solutions | Autonomous AI & Systems Architecture | GrydIn",
  socialTitle: "GrydIn Industry Solutions — Tailored Automation Systems",
  description: "Domain-specific automation systems, AI agents, and custom software architected to eliminate operational bottlenecks across legal, real estate, logistics, and retail.",
  path: "/solutions",
  keywords: ["industry solutions", "domain automation", "AI workflows", "legal tech", "supply chain automation"],
});

export default function SolutionsHubPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SolutionsHero />

      <SolutionsClient />

      <CtaBand
        title="Ready to eliminate friction in your industry workflows?"
        subtitle="Talk directly with an engineer to audit your operational bottlenecks."
      />
    </main>
  );
}
