import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/app/components/site-header";

import {
  type BlogPostContentBlock,
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "../_lib/blog-posts";

const publishedDateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
});

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog | Mike Barr`,
    description: post.summary,
  };
}

function renderContentBlock(block: BlogPostContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={`paragraph-${index}`}
          className="text-base leading-8 text-zinc-700 dark:text-zinc-300"
        >
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2
          key={`heading-${index}`}
          className="pt-4 text-2xl font-semibold tracking-tight"
        >
          {block.text}
        </h2>
      );

    case "list":
      return (
        <ul
          key={`list-${index}`}
          className="space-y-3 text-base leading-7 text-zinc-700 dark:text-zinc-300"
        >
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <SiteHeader currentPage="blog" />

        <article className="max-w-3xl space-y-8">
          <div className="space-y-5">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Back to blog
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                <span>{publishedDateFormatter.format(new Date(post.publishedAt))}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {post.title}
              </h1>

              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                {post.summary}
              </p>
            </div>

            {post.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">{post.content.map(renderContentBlock)}</div>
        </article>
      </div>
    </main>
  );
}
