import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

/*
  A slim "latest posts" strip. Kept short on purpose: one row of three
  compact cards (small thumbnail, date, two-line title) so it adds very
  little page length. It reads the newest posts from the blog data, so a
  new post shows up here with no edit to the homepage.
*/
export function BlogStrip() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="blog" className="blog-cyan py-12 md:py-16">
      <div className="shell">
        <div className="flex items-baseline justify-between gap-4">
          <p className="section-label">Latest from the blog</p>
          <Link
            href="/blog"
            className="text-sm text-paper/70 transition-colors duration-200 hover:text-accent-soft"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-4">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-line blog-card p-3 transition-colors duration-300 hover:border-paper/20"
            >
              {post.image && (
                <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-md border border-line sm:w-28">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
              )}
              <div className="min-w-0">
                <time dateTime={post.date} className="text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-paper transition-colors duration-300 group-hover:text-accent-soft">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
