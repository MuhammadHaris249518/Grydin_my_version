import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages serves static files from /out. Contact form uses functions/api/contact.ts.
};

export default nextConfig;
