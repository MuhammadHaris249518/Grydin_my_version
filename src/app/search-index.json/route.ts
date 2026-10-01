import { SERVICE_SEO } from "@/lib/seo";
import { SOLUTIONS } from "@/data/solutions";
import { PROJECTS } from "@/data/projects";
import { PRODUCTS } from "@/data/products";
import { getAllPosts, CATEGORY_NAMES } from "@/lib/blog";

export const dynamic = "force-static";

export interface SearchEntry {
  type: string;
  title: string;
  url: string;
  summary: string;
}

export async function GET() {
  const posts = getAllPosts();

  const servicesEntries: SearchEntry[] = SERVICE_SEO.map((svc) => ({
    type: "Service",
    title: svc.name,
    url: "/services",
    summary: svc.summary,
  }));

  const solutionsEntries: SearchEntry[] = SOLUTIONS.map((sol) => ({
    type: "Solution",
    title: `${sol.name} Solutions`,
    url: `/solutions/${sol.slug}`,
    summary: sol.summary,
  }));

  const projectsEntries: SearchEntry[] = PROJECTS.map((proj) => ({
    type: "Project",
    title: `${proj.title} (${proj.client})`,
    url: `/projects/${proj.slug}`,
    summary: proj.summary,
  }));

  const productsEntries: SearchEntry[] = PRODUCTS.map((prod) => ({
    type: "Product",
    title: `${prod.name} — ${prod.tagline}`,
    url: `/products/${prod.slug}`,
    summary: prod.summary,
  }));

  const postsEntries: SearchEntry[] = posts.map((post) => ({
    type: CATEGORY_NAMES[post.category],
    title: post.title,
    url: `/blog/${post.slug}`,
    summary: post.description,
  }));

  const index: SearchEntry[] = [
    ...servicesEntries,
    ...solutionsEntries,
    ...projectsEntries,
    ...productsEntries,
    ...postsEntries,
  ];

  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
