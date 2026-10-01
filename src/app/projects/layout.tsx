import type { Metadata } from "next";
import { ReactNode } from "react";
import {
  projectsMetadata,
  webPageJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = projectsMetadata;

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const jsonLdData = [
    webPageJsonLd({
      path: "/projects",
      name: "GrydIn Projects & Products",
      description:
        "Explore GrydIn's client case studies and concept products. Real automation, AI agents, and custom software delivered with fixed scopes and measurable outcomes.",
    }),
    collectionPageJsonLd({
      path: "/projects",
      name: "GrydIn Projects Portfolio",
      description:
        "Client case studies and automation deployments delivered across various industries.",
      items: PROJECTS.map((p) => ({
        name: p.title,
        url: `/projects/${p.slug}`,
        description: p.summary,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
