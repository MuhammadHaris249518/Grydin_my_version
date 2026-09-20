import {
  faqJsonLd,
  jsonLdScript,
  servicesFaq,
  servicesMetadata,
  servicesPageJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = servicesMetadata;

const jsonLd = [
  webPageJsonLd({
    path: "/services",
    name: "GrydIn - Services",
    description: servicesMetadata.description as string,
  }),
  servicesPageJsonLd(),
  faqJsonLd([...servicesFaq]),
];

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      {children}
    </>
  );
}
