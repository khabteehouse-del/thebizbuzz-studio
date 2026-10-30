"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories, getBlogCategory, type BlogPost } from "@/data/blog";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string>("All");

  const counts = new Map<string, number>();
  for (const p of posts) {
    const c = getBlogCategory(p);
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  const categories = blogCategories.filter((c) => counts.has(c));
  const visible =
    active === "All" ? posts : posts.filter((p) => getBlogCategory(p) === active);

  const chip = (label: string, count: number) => {
    const on = active === label;
    return (
      <button
        key={label}
        type="button"
        onClick={() => setActive(label)}
        aria-pressed={on}
        className={`rounded-sm border px-4 py-2 text-sm transition-colors duration-200 ${
          on
            ? "border-accent bg-accent/10 text-paper"
            : "border-line text-paper/60 hover:border-paper/30 hover:text-paper"
        }`}
      >
        {label} <span className="text-paper/40">{count}</span>
      </button>
    );
  };

  return (
    <>
      <div className="mt-14 flex flex-wrap gap-2" role="group" aria-label="Filter posts by category">
        {chip("All", posts.length)}
        {categories.map((c) => chip(c, counts.get(c) ?? 0))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
        {visible.map((post) => (
          <article
            key={post.slug}
            className="group relative h-full rounded-xl border border-line blog-card p-7 transition-colors duration-500 hover:border-paper/20 md:p-10"
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
              <span className="text-accent-soft">{getBlogCategory(post)}</span>
              <span>·</span>
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
    </>
  );
}
