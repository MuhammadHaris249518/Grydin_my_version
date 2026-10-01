import type { Metadata } from "next";
import { ReactNode } from "react";
import {
  solutionsMetadata,
  webPageJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { SOLUTIONS } from "@/data/solutions";

export const metadata: Metadata = solutionsMetadata;

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  const jsonLdData = [
    webPageJsonLd({
      path: "/solutions",
      name: "GrydIn Industry Solutions",
      description:
        "Tailored AI and automation solutions architected for legal, real estate, retail, healthcare, energy, and logistics businesses.",
    }),
    collectionPageJsonLd({
      path: "/solutions",
      name: "Industry Solutions Catalog",
      description: "Comprehensive industry-specific automation and software solutions by GrydIn.",
      items: SOLUTIONS.map((s) => ({
        name: s.name,
        url: `/solutions/${s.slug}`,
        description: s.summary,
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
