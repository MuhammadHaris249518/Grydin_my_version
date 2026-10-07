import React from "react";
import Link from "next/link";
import {
  getAllPosts,
  getPostsByCategory,
} from "@/lib/blog";
import { BlogHubClient } from "./BlogHubClient";
import { AnnouncementRow } from "./AnnouncementRow";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  documentTitle: "Perspectives on Systems & Engineering | GrydIn Blog",
  socialTitle: "GrydIn Blog — Perspectives on Systems & Engineering",
  description:
    "Thoughts, lessons and practical insights on AI agents, workflow automation, and modern systems architecture from Grydin.",
  path: "/blog",
  keywords: [
    "AI agents",
    "workflow automation",
    "systems architecture",
    "engineering perspectives",
    "GrydIn blog",
    "tech insights",
  ],
});

export default function BlogHubPage() {
  const allPosts = getAllPosts();
  const announcementPosts = getPostsByCategory("announcements").slice(0, 5);

  return (
    <main className="min-h-screen bg-white text-ink">
      {/* 1. Blog Hero & Main Interactive Section */}
      <BlogHubClient posts={allPosts} />

      {/* 2. Official Announcements / Releases */}
      {announcementPosts.length > 0 && (
        <section className="bg-surface-soft py-12 sm:py-16 md:py-20 border-t border-surface-line">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-surface-line">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0d8b99] mb-2 font-mono">
                  <span className="w-4 h-0.5 bg-[#0d8b99]" />
                  <span>NOTICES &amp; RELEASES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Official Announcements
                </h2>
              </div>
              <Link
                href="/blog/category/announcements"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0d8b99] hover:text-[#0b7884] group shrink-0 transition-colors"
              >
                <span>View all notices</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-surface-line divide-y divide-slate-100 overflow-hidden shadow-sm">
              {announcementPosts.map((post) => (
                <AnnouncementRow key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CtaBand */}
      <CtaBand
        title="Have an engineering problem worth writing about?"
        subtitle="Let's diagnose your workflows and architect an automated solution."
      />
    </main>
  );
}
