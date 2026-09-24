import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${site.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "BizBuzz",
    },
    publisher: {
      "@type": "Organization",
      name: "The Biz Buzz",
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/logo/logo.png`,
      },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="bg-ink py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="shell max-w-3xl">
        <Link
          href="/blog"
          className="text-sm text-muted transition-colors duration-200 hover:text-paper"
        >
          Back to blog
        </Link>

        <div className="mt-8 flex items-center gap-3 text-xs text-muted">
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

        <h1 className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-paper sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

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

        <div className="mt-12 space-y-6">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-paper/75">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}