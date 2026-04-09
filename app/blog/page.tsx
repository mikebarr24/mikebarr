import type { Metadata } from "next";

import { getPublishedBlogPosts } from "./_lib/blog-posts";
import { BlogPostList } from "./blog-post-list";
import { SiteHeader } from "../components/site-header";
import { withBasePath } from "@/lib/github-pages";

const publishedPosts = getPublishedBlogPosts();

export const metadata: Metadata = {
  title: "Blog | Mike Barr",
  description:
    "Notes on product work, engineering decisions, and building useful software.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <SiteHeader currentPage="blog" />

        <section className="max-w-3xl space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Blog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Notes on product, engineering, and shipping useful things.
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              This is a simple home for future writing: short posts, build
              notes, and lessons gathered while working on the products shown
              across the rest of the site.
            </p>
          </div>

          {publishedPosts.length > 0 ? (
            <BlogPostList posts={publishedPosts} />
          ) : (
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                Coming soon
              </p>
              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                Add entries to <code>data/blog-posts.json</code> and validate
                them against the published schema at{" "}
                <a
                  href={withBasePath("/blog-posts.schema.json")}
                  className="font-medium text-zinc-700 underline underline-offset-4 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
                >
                  /blog-posts.schema.json
                </a>
                . Published posts are turned into static pages automatically at
                build time.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
