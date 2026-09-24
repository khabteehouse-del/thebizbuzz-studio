import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on local search, AI systems and building things that actually ship, from the BizBuzz team.",
  alternates: {
    canonical: `${site.url}/blog`,
  },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="bg-ink py-20 md:py-36">
      <div className="shell">
        <p className="section-label">Blog</p>
        <h1 className="mt-7 max-w-2xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
          Notes on local search and AI systems
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          What we learn building for clients and shipping our own products.
        </p>

        <div className="mt-16 grid gap-px bg-line md:grid-cols-2">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="group relative h-full bg-ink p-7 transition-colors duration-500 md:p-10"
            >
              {post.image && (
                <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-sm border border-line">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 text-xs text-muted">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="mt-4 font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors duration-300 hover:text-accent-soft"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-paper/60">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-line px-3 py-1.5 text-xs text-paper/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-paper transition-colors duration-200 hover:text-accent-soft"
              >
                Read more
                <span className="h-px w-4 bg-accent transition-all duration-300 group-hover:w-7" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}