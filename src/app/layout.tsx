import "./globals.css";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import { RouteChangeHandler } from "./globalscope/RouteChangeHandler";
import { ContentProtection } from "./globalscope/ContentProtection";
import { SiteFooter } from "./globalscope/SiteFooter";
import Navbar from "./globalscope/Navbar";
import { BRAND_ACCENT } from "@/lib/brand";
import {
  jsonLdScript,
  organizationJsonLd,
  professionalServiceJsonLd,
  rootMetadata,
  websiteJsonLd,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
      <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans`} suppressHydrationWarning>
        <ContentProtection />
        <RouteChangeHandler />
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
