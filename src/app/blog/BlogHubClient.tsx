"use client";

import React, { useState } from "react";
import { BlogPost } from "@/lib/content-schema";
import { BlogHero } from "./BlogHero";
import { BlogMainSection } from "./BlogMainSection";

export function BlogHubClient({ posts }: { posts: BlogPost[] }) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSelectTopic = (topic: string | null) => {
    setSelectedTopic(topic);
    if (topic) {
      const articlesSection = document.getElementById("articles-section");
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <BlogHero
        activeTopic={selectedTopic}
        onSelectTopic={handleSelectTopic}
      />
      <div id="articles-section">
        <BlogMainSection
          posts={posts}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
      </div>
    </>
  );
}
