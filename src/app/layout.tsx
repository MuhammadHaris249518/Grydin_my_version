import "./globals.css";
import { RouteChangeHandler } from "./globalscope/RouteChangeHandler";
import { ContentProtection } from "./globalscope/ContentProtection";
import { SiteFooter } from "./globalscope/SiteFooter";
import { BRAND_ACCENT } from "@/lib/brand";
import {
  jsonLdScript,
  organizationJsonLd,
  professionalServiceJsonLd,
  rootMetadata,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata = rootMetadata;

const jsonLd = [
  organizationJsonLd(),
  websiteJsonLd(),
  professionalServiceJsonLd(),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ "--brand-accent": BRAND_ACCENT } as React.CSSProperties}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site index" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ContentProtection />
        <RouteChangeHandler />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
