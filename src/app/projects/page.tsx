import React from "react";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { PROJECTS, getFeaturedProject } from "@/data/projects";
import { PRODUCTS } from "@/data/products";
import { ProjectsTabs } from "./ProjectsTabs";
import { ProjectFilterGrid } from "./ProjectFilterGrid";
import { ProductFilterGrid } from "./ProductFilterGrid";
import { ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const featured = getFeaturedProject();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects & Products" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Our work"
        title="BUILT FOR REAL BUSINESSES"
        subtitle="Explore client case studies across industries alongside our proprietary automation tools."
        breadcrumbs={breadcrumbs}
        image="/images/hero/hero-banner.jpg"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Start a project
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
      <Section
        id="our-projects"
        tone="white"
        eyebrow="Client Case Studies"
        title="Recent Client Engagements"
        intro="Fixed-scope systems, autonomous agents, and workflow automations deployed for real teams worldwide."
      >
        <ProjectFilterGrid
          projects={PROJECTS}
          featuredProject={featured}
        />
      </Section>

      {/* 4. Our Products Section */}
      <Section
        id="our-products"
        tone="soft"
        eyebrow="Proprietary Tools"
        title="Software Incubated at GrydIn"
        intro="Enterprise tooling and workflow engines built in-house to solve recurring operational bottlenecks."
      >
        <ProductFilterGrid
          products={PRODUCTS}
        />
      </Section>

      {/* 5. CtaBand */}
      <CtaBand
        title="Have something in mind? Let's grid it."
        subtitle="Tell us what is slowing your team down. You'll receive a scoped roadmap and fixed quote within 24 hours."
        buttonText="Start a conversation"
        buttonHref="/contact"
      />
    </div>
  );
}
