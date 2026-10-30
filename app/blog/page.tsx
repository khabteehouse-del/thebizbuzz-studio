import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";
import { BlogList } from "@/components/blog/blog-list";
import { ScholarArt } from "@/components/shared/scholar-art";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technology stories from across the globe, from the BizBuzz team: AI, big tech, cybersecurity and more, each sourced, with what it means for your business.",
  alternates: {
    canonical: `${site.url}/blog`,
  },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="blog-cyan py-20 md:py-36">
      <BreadcrumbSchema items={[{ name: "Blog", path: "/blog" }]} />
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <div>
          <p className="section-label">Blog</p>
          <h1 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
            Technology stories from across the globe
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            The stories shaping technology, each one sourced, with what it means for your business.
          </p>
          </div>
          <ScholarArt className="scholar-art mx-auto h-auto w-64 shrink-0 sm:w-80 md:mx-0 md:w-[26rem]" />
        </div>

        <BlogList posts={sorted} />
      </div>
    </section>
  );
}