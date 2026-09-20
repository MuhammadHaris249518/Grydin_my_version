import {
  aboutMetadata,
  faqJsonLd,
  jsonLdScript,
  servicesFaq,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = aboutMetadata;

const jsonLd = [
  webPageJsonLd({
    path: "/about",
    name: "GrydIn - About",
    description: aboutMetadata.description as string,
  }),
  faqJsonLd([
    {
      question: "What is GrydIn?",
      answer:
        "GrydIn is a software and business AI automation company based in Islamabad, Pakistan, building for businesses globally. We surface invisible manual work - gaps between tools, teams, and decisions - and eliminate it without disruption.",
    },
    {
      question: "What does GrydIn believe about automation?",
      answer:
        "GrydIn believes automation should be invisible, systems should fit the process before features, humans are not the bottleneck - manual work is, and every project should be scoped tight, shipped fast, with post-launch accountability.",
    },
    ...servicesFaq.slice(3, 5),
  ]),
];

export default function AboutLayout({
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
