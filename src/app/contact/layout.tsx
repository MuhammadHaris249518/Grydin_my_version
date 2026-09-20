import {
  contactFaq,
  contactMetadata,
  faqJsonLd,
  jsonLdScript,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = contactMetadata;

const jsonLd = [
  webPageJsonLd({
    path: "/contact",
    name: "GrydIn - Contact",
    description: contactMetadata.description as string,
  }),
  faqJsonLd([...contactFaq]),
];

export default function ContactLayout({
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
