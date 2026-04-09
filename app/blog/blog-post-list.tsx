"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { PublishedBlogPost } from "./_lib/blog-posts";

const publishedDateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
});

type BlogPostListProps = {
  posts: PublishedBlogPost[];
};

function getPostCountLabel(count: number) {
  return `${count} ${count === 1 ? "post" : "posts"}`;
}

function getResultsLabel(filteredCount: number, totalCount: number, hasFilters: boolean) {
  if (!hasFilters) {
    return `Showing all ${getPostCountLabel(totalCount)}.`;
  }

  return `Showing ${filteredCount} of ${totalCount} ${
    totalCount === 1 ? "post" : "posts"
  }.`;
}

function getSearchableText(post: PublishedBlogPost) {
  return [post.title, post.summary, ...post.tags].join(" ").toLowerCase();
}

function getFilterButtonClasses(isActive: boolean) {
  return `rounded-full border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
    isActive
      ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
      : "border-black/10 bg-white/90 text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-black/30 dark:text-zinc-300 dark:hover:bg-black/50"
  }`;
}

function getPostTagButtonClasses(isActive: boolean) {
  return `rounded-full border px-3 py-1 text-xs font-medium transition ${
    isActive
      ? "border-zinc-700 bg-zinc-200 text-zinc-950 dark:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-50"
      : "border-black/10 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
  }`;
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const availableTags = useMemo(
    () =>
      [...new Set(posts.flatMap((post) => post.tags))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [posts],
  );
  const normalisedQuery = query.trim().toLowerCase();
  const hasFilters = normalisedQuery.length > 0 || selectedTags.length > 0;
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesTag =
          selectedTags.length > 0
            ? selectedTags.some((tag) => post.tags.includes(tag))
            : true;
        const matchesQuery = normalisedQuery
          ? getSearchableText(post).includes(normalisedQuery)
          : true;

        return matchesTag && matchesQuery;
      }),
    [normalisedQuery, posts, selectedTags],
  );

  function toggleTag(tag: string) {
    setIsFilterOpen(true);
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200/80 bg-zinc-100/70 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
        <button
          type="button"
          aria-expanded={isFilterOpen}
          aria-controls="blog-filter-panel"
          onClick={() => setIsFilterOpen((currentState) => !currentState)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Filters
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {getResultsLabel(filteredPosts.length, posts.length, hasFilters)}
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 dark:text-zinc-400 ${
              isFilterOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M5 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none ${
            isFilterOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div id="blog-filter-panel" className="space-y-4 border-t border-black/10 pt-4 dark:border-white/10">
              <div className="space-y-2">
                <label htmlFor="blog-post-search" className="sr-only">
                  Search posts
                </label>
                <input
                  id="blog-post-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search posts"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/40 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={selectedTags.length === 0}
                  onClick={() => setSelectedTags([])}
                  className={getFilterButtonClasses(selectedTags.length === 0)}
                >
                  All tags
                </button>
                {availableTags.map((tag) => {
                  const isActive = selectedTags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => toggleTag(tag)}
                      className={getFilterButtonClasses(isActive)}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {hasFilters ? (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSelectedTags([]);
                    }}
                    className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
                  >
                    Clear filters
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  <span>{publishedDateFormatter.format(new Date(post.publishedAt))}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {post.summary}
                  </p>
                </div>

                {post.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => {
                      const isActive = selectedTags.includes(tag);

                      return (
                        <button
                          key={tag}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => toggleTag(tag)}
                          className={getPostTagButtonClasses(isActive)}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                  >
                    Read post
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            No matches
          </p>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Try a different search term or clear the current filters.
          </p>
        </div>
      )}
    </div>
  );
}
