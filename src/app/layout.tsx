import "./globals.css";

export const metadata = {
  title: "GrydIn",
  description: "Built for the gaps in your business.",
  metadataBase: new URL("https://grydin.co"),
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "GrydIn",
    description: "Built for the gaps in your business.",
    url: "https://grydin.co",
    siteName: "GrydIn",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrydIn",
    description: "Built for the gaps in your business.",
    images: ["/og.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GrydIn",
    url: "https://grydin.co",
    logo: "https://grydin.co/logo.png",
    description:
      "Software and AI automation studio based in Islamabad, Pakistan. We surface the invisible work slowing your team down and eliminate it — AI agents, workflow automation, AI integration, custom software, system integration, and full-stack development.",
    email: "hello@grydin.co",
    telephone: "+923296637320",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    areaServed: "Worldwide",
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GrydIn Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI Agents" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Workflow Automation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI Integration" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Custom Software" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "System Integration" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Full-Stack Development" },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GrydIn",
    url: "https://grydin.co",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
