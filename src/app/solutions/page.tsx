import React from "react";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { SolutionsClient } from "./SolutionsClient";
import { ArrowRight } from "lucide-react";
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
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions" },
  ];

  return (
    <div className="min-h-screen bg-navy">
      <PageHero
        eyebrow="Industry Expertise"
        title="Solutions engineered for your industry"
        subtitle="Domain-specific automation systems, AI agents, and custom software architected to eliminate operational bottlenecks."
        breadcrumbs={breadcrumbs}
        actions={
          <Button
            href="/contact"
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Book a free process diagnosis
          </Button>
        }
      />

      <SolutionsClient />

      <CtaBand
        title="Ready to eliminate friction in your industry workflows?"
        subtitle="Talk directly with an engineer to audit your operational bottlenecks."
      />
    </div>
  );
}
