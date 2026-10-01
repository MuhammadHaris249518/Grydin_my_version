# GrydIn Content & Newsroom Documentation

All articles in this directory are MDX files rendered at build time via `next-mdx-remote/rsc`.

> **Note on Initial Content:**
> The initial 9 sample posts in this repository are illustrative editorial placeholders representing GrydIn's areas of practice (Insights, News, and Announcements). They do not contain confidential client metrics or unverified external claims. Replace with real articles and editorial announcements as they become available.

---

## How to Add a New Post

1. Create a new file in `content/blog/` named `YYYY-MM-your-slug.mdx` (e.g. `2026-10-modern-ai-agents.mdx`).
2. Add the required frontmatter at the top:
   ```yaml
   ---
   title: "Your Descriptive Title (10 to 110 characters)"
   description: "A concise summary for search engine snippets and card excerpts (50 to 165 characters)."
   category: "blog" # Options: "blog" (Insights), "news", or "announcements"
   date: "2026-10-01" # ISO format YYYY-MM-DD
   author: "grydin-team" # Key from src/data/authors.ts
   tags: ["AI Agents", "Automation"] # 1 to 6 tags
   featured: false # At most one post per category can be featured
   draft: false # Set true to hide from production builds
   ---
   ```
3. Optional fields:
   - `updated`: ISO date (`YYYY-MM-DD`) when an article is revised.
   - `cover`: Path to an image in `public/images/blog/` (recommend 1200×630). If omitted, an algorithmic `<CoverArt />` cover is generated automatically.
   - `source`: For news items (e.g. "GrydIn Research").
   - `externalUrl`: For news items linking out to press publications.
   - `canonical`: Cross-posting canonical URL.

4. Write standard Markdown or MDX in the body. You can use:
   - `<Callout type="info|tip|warning">Your note here</Callout>`
   - `<Stat value="75%" label="Friction eliminated" />`
   - Standard H2 (`##`) and H3 (`###`) headings (which automatically populate the table of contents).
   - Code blocks with syntax highlighting.
5. Run `npm run build`. The build validates frontmatter schemas with Zod and catches any errors before deployment.
