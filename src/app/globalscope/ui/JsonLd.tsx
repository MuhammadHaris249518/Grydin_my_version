import React from "react";
import { jsonLdScript } from "@/lib/seo";

export interface JsonLdProps {
  data: unknown;
  id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
