import {
  aboutMetadata,
  faqJsonLd,
  jsonLdScript,
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
      question: "What does GrydIn do?",
      answer:
        "GrydIn builds AI agents, workflow automation, custom software, and integrations to address the gaps between tools, teams, and business decisions.",
    },
    {
      question: "How does GrydIn approach a project?",
      answer:
        "GrydIn starts by understanding what is slowing a business down, then shapes a solution around its process, people, tools, and constraints.",
    },
    {
      question: "Where is GrydIn based?",
      answer:
        "GrydIn is based in Islamabad, Pakistan.",
    },
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
