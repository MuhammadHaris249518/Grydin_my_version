import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import {
  BlogPost,
  BlogPostFrontmatterSchema,
  BlogCategory,
  TocItem,
} from "./content-schema";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
export const POSTS_PER_PAGE = 9;

export const CATEGORY_NAMES: Record<BlogCategory, string> = {
  blog: "Insights",
  news: "News",
  announcements: "Announcements",
};

export const CATEGORY_DESCRIPTIONS: Record<BlogCategory, string> = {
  blog: "In-depth perspectives and technical breakdowns on AI agents, workflow automation, and engineering architecture.",
  news: "Company updates, technology partnerships, industry analysis, and media coverage from GrydIn.",
  announcements: "Official releases, office openings, product beta launches, and platform notices.",
};

/**
 * Extracts H2 and H3 headings from markdown content and generates slugs
 * matching rehype-slug output via github-slugger.
 */
export function getToc(markdownContent: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_`]/g, ""); // strip markdown formatting
    const id = slugger.slug(text);
    toc.push({ id, text, level });
  }

  return toc;
}

/**
 * Parses all MDX files in content/blog, validates frontmatter with Zod,
 * sorts by date descending, and enforces unique slugs.
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
  const posts: BlogPost[] = [];
  const seenSlugs = new Set<string>();

  const isProduction = process.env.NODE_ENV === "production";
  const today = new Date().toISOString().split("T")[0];

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");

    const { data: rawFrontmatter, content } = matter(fileContents);

    // Derive slug: remove leading YYYY-MM- or YYYY-MM-DD- prefix and .mdx
    const slug = filename
      .replace(/^\d{4}-\d{2}(-\d{2})?-/, "")
      .replace(/\.mdx$/, "");

    if (seenSlugs.has(slug)) {
      throw new Error(
        `[GrydIn Content Error] Duplicate post slug "${slug}" detected in ${filename}. Post slugs must be globally unique.`
      );
    }
    seenSlugs.add(slug);

    // Validate frontmatter with Zod
    const parseResult = BlogPostFrontmatterSchema.safeParse(rawFrontmatter);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(
        `[GrydIn Content Error] Invalid frontmatter in ${filename}: ${errorMsg}`
      );
    }

    const frontmatter = parseResult.data;

    // Filter out drafts in production
    if (isProduction && frontmatter.draft) {
      continue;
    }

    // Filter out future-dated posts in production
    if (isProduction && frontmatter.date > today) {
      continue;
    }

    const rt = readingTime(content);
    const toc = getToc(content);

    posts.push({
      ...frontmatter,
      slug,
      content,
      readingTime: rt.text,
      wordCount: rt.words,
      toc,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Enforce at most ONE featured per category (if multiple are marked, retain only the newest)
  const categoryFeaturedSeen = new Set<string>();
  for (const post of posts) {
    if (post.featured) {
      if (categoryFeaturedSeen.has(post.category)) {
        post.featured = false;
      } else {
        categoryFeaturedSeen.add(post.category);
      }
    }
  }

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((p) => p.category === category);
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0];
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const posts = getAllPosts().filter((p) => p.slug !== currentPost.slug);

  // Score posts: same category +3, shared tags +1 per match
  const scored = posts.map((p) => {
    let score = 0;
    if (p.category === currentPost.category) score += 3;
    const sharedTags = p.tags.filter((t) => currentPost.tags.includes(t));
    score += sharedTags.length;
    return { post: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function getAdjacentPosts(currentPost: BlogPost): {
  prev?: BlogPost;
  next?: BlogPost;
} {
  const categoryPosts = getPostsByCategory(currentPost.category);
  const index = categoryPosts.findIndex((p) => p.slug === currentPost.slug);

  return {
    next: index > 0 ? categoryPosts[index - 1] : undefined,
    prev: index < categoryPosts.length - 1 ? categoryPosts[index + 1] : undefined,
  };
}

export function paginatePosts<T>(items: T[], page = 1, pageSize = POSTS_PER_PAGE) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const offset = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(offset, offset + pageSize);

  return {
    items: paginatedItems,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}
