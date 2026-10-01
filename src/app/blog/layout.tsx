import type { Metadata } from "next";
import { ReactNode } from "react";
import {
  blogMetadata,
  webPageJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import { getAllPosts, CATEGORY_NAMES } from "@/lib/blog";

export const metadata: Metadata = blogMetadata;

export default function BlogLayout({ children }: { children: ReactNode }) {
  const posts = getAllPosts();

  const jsonLdData = [
    webPageJsonLd({
      path: "/blog",
      name: "GrydIn Newsroom & Insights",
      description:
        "Read the latest engineering insights, product news, and company announcements from GrydIn.",
    }),
    collectionPageJsonLd({
      path: "/blog",
      name: "GrydIn Newsroom Articles",
      description: "Collection of technology insights, research articles, and press announcements.",
      items: posts.map((p) => ({
        name: p.title,
        url: `/blog/${p.slug}`,
        description: p.description,
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
