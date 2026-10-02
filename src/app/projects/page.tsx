import React from "react";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { PROJECTS, getFeaturedProject } from "@/data/projects";
import { PRODUCTS } from "@/data/products";
import { ProjectsTabs } from "./ProjectsTabs";
import { ProjectFilterGrid } from "./ProjectFilterGrid";
import { ProductFilterGrid } from "./ProductFilterGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  documentTitle: "Client Projects & Proprietary Products | GrydIn",
  socialTitle: "GrydIn Deployments — Built for Real Enterprise Workflows",
  description: "Explore client case studies across industries alongside our proprietary automation tools like GridPilot and FlowMap.",
  path: "/projects",
  keywords: ["client projects", "case studies", "custom software deployments", "AI agent implementations", "proprietary tools"],
});

export default function ProjectsPage() {
  const featured = getFeaturedProject();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects & Products" },
  ];

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Our Work"
        title="Systems built for real enterprise workflows"
        subtitle="Explore client case studies across industries alongside our proprietary automation tools."
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Book a free process diagnosis
            </Button>
            <Button
              href="#our-products"
              variant="outline-light"
              size="md"
            >
              Explore products
            </Button>
          </div>
        }
      />

      {/* 2. In-Page Sticky Tab Bar */}
      <ProjectsTabs
        projectCount={PROJECTS.length}
        productCount={PRODUCTS.length}
      />

      {/* 3. Our Projects Section */}
      <section id="our-projects" className="relative bg-navy py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Client Case Studies"
            title="Recent production deployments"
            accent="production deployments"
            intro="Fixed-scope systems, autonomous agents, and workflow automations deployed for real teams worldwide."
            className="mb-12"
          />
          <ProjectFilterGrid
            projects={PROJECTS}
            featuredProject={featured}
          />
        </div>
      </section>

      {/* 4. Our Products Section */}
      <section id="our-products" className="relative bg-navy-950 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Proprietary Tools"
            title="Software incubated at GrydIn"
            accent="incubated"
            intro="Enterprise tooling and workflow engines built in-house to solve recurring operational bottlenecks."
            className="mb-12"
          />
          <ProductFilterGrid
            products={PRODUCTS}
          />
        </div>
      </section>

      {/* 5. CtaBand */}
      <CtaBand
        title="Have an operational bottleneck in mind? Let's grid it."
        subtitle="Tell us what is slowing your team down. You'll receive a scoped roadmap and fixed quote within 48 hours."
      />
    </div>
  );
}
