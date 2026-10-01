import { z } from "zod";

export const BlogCategorySchema = z.enum(["blog", "news", "announcements"]);
export type BlogCategory = z.infer<typeof BlogCategorySchema>;

export const BlogPostFrontmatterSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(110, "Title must not exceed 110 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(165, "Description must not exceed 165 characters"),
  category: BlogCategorySchema,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be ISO format YYYY-MM-DD"),
  updated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Updated date must be ISO format YYYY-MM-DD")
    .optional(),
  author: z.string().min(1, "Author must be specified"),
  tags: z
    .array(z.string())
    .min(1, "At least 1 tag is required")
    .max(6, "Maximum 6 tags allowed"),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
  source: z.string().optional(),
  externalUrl: z.string().url().optional(),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>;

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
  wordCount: number;
  toc: TocItem[];
}
