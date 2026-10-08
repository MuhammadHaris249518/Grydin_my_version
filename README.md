# Grydin website

The Grydin marketing website is a Next.js application. The repository keeps the application code, published website assets, and design/reference materials in separate locations.

## Project structure

- `src/app/` — App Router pages, layouts, API routes, and page sections.
- `src/components/` — reusable interface components, including 3D and video components.
- `src/data/` and `src/lib/` — site content data and shared utilities.
- `content/blog/` — authored blog posts and content guidance.
- `public/assets/` — images, brand files, partner logos, and video served by the website. Reference these from code with URLs such as `/assets/images/about/team-at-work.png`.
- `public/robots.txt` and `public/llms.txt` — root-level website discovery files; keep them at the public root.
- `assets/source/` — preserved editable/source logo and partner artwork masters.
- `assets/reference/` — screenshots and copy snapshots retained as project references, not served by the website.
- `docs/` — technical project notes.
- `functions/` — deployment-platform function handlers.
- `scripts/` — project maintenance and operational scripts.

## Local development

Requirements: Node.js 20 or later.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`. To create a production build, run `npm run build`.

## Configuration notes

Copy `.env.example` to `.env.local` and provide the values required for the features you use. Never commit secrets. Contact form handlers exist both as a Next.js route and as a platform function; retain the one required by the deployment target and keep their validation and delivery behavior aligned.
