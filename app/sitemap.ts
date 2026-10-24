import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";

/* Lists every public page so Google can find new blog posts quickly. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/blog", "/work", "/design", "/tools/gbp-check"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/blog" || path === "" ? ("daily" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })
  );

  const posts = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
