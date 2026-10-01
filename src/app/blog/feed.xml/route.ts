import { getAllPosts, CATEGORY_NAMES } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();

  const feedItems = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date + "T00:00:00Z").toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${CATEGORY_NAMES[post.category]}]]></category>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GrydIn Newsroom &amp; Engineering Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical perspectives on AI agents, workflow automation, and modern systems architecture from GrydIn.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
