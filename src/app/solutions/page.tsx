import React from "react";
import { SolutionsHero } from "./SolutionsHero";
import { SolutionsTabs } from "./SolutionsTabs";
import { ProjectFilterGrid } from "./ProjectFilterGrid";
import { ProductFilterGrid } from "./ProductFilterGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { PROJECTS, getFeaturedProject } from "@/data/projects";
import { PRODUCTS } from "@/data/products";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  documentTitle: "Industry Solutions, Client Deployments & Products | GrydIn",
  socialTitle: "GrydIn Solutions — Industry Architecture, Client Projects & Proprietary Tools",
  description:
    "Domain-specific automation systems, real-world client deployments, and internal tooling engineered to eliminate operational bottlenecks across enterprises.",
  path: "/solutions",
  keywords: [
    "industry solutions",
    "domain automation",
    "client case studies",
    "production deployments",
    "proprietary tools",
    "AI workflows",
    "GridPilot",
    "FlowMap",
  ],
});

export default function SolutionsHubPage() {
  const featured = getFeaturedProject();

  return (
    <main className="min-h-screen bg-surface">
      {/* 1. Solutions Hero */}
      <SolutionsHero />

      {/* 2. Unified In-Page Sticky Navigation Tabs */}
      <SolutionsTabs
        projectCount={PROJECTS.length}
        productCount={PRODUCTS.length}
      />

      {/* 3. Client Case Studies & Production Deployments Section */}
      <section
        id="client-projects"
        className="relative bg-slate-50/60 py-14 sm:py-20 md:py-28 border-b border-slate-200/80"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Client Case Studies"
            title="Recent production deployments"
            accent="production deployments"
            intro="Fixed-scope systems, autonomous agents, and workflow automations deployed for real teams worldwide."
            className="mb-8 sm:mb-12"
          />
          <ProjectFilterGrid
            projects={PROJECTS}
            featuredProject={featured}
          />
        </div>
      </section>

      {/* 4. Proprietary Products & In-House Tooling Section */}
      <section
        id="proprietary-products"
        className="relative bg-white py-14 sm:py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Proprietary Tools & Engines"
            title="Software incubated at GrydIn"
            accent="incubated at GrydIn"
            intro="Enterprise tooling and autonomous workflow engines built in-house to solve recurring operational bottlenecks."
            className="mb-8 sm:mb-12"
          />
          <ProductFilterGrid
            products={PRODUCTS}
          />
        </div>
      </section>

      {/* 5. Closing Call to Action Band */}
      <CtaBand
        title="Have an operational bottleneck in mind? Let's grid it."
        subtitle="Tell us what is slowing your team down. You'll receive a scoped roadmap and fixed quote within 48 hours."
      />
    </main>
  );
}
