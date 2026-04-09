import type { Metadata } from "next";

import { SiteHeader } from "../components/site-header";

type PlannedTopic = {
  title: string;
  summary: string;
  focus: string[];
};

const plannedTopics: PlannedTopic[] = [
  {
    title: "Shipping useful AI features",
    summary:
      "Short notes on where AI genuinely improves a product and where simpler UX decisions usually matter more.",
    focus: [
      "Keeping AI outputs grounded in user context",
      "Designing flows that feel guided instead of noisy",
      "Balancing flexibility with trust and clarity",
    ],
  },
  {
    title: "Product decisions in the open",
    summary:
      "Write-ups on trade-offs, iteration paths, and why certain product choices win over more complicated ideas.",
    focus: [
      "Reducing friction in onboarding and setup",
      "Finding the smallest useful version of a feature",
      "Learning from what users actually need",
    ],
  },
  {
    title: "Notes from building and refining",
    summary:
      "Practical engineering observations from working on small products, polishing interfaces, and tightening systems over time.",
    focus: [
      "Structuring interfaces for clarity and momentum",
      "Improving maintainability without overbuilding",
      "Turning rough concepts into sharper releases",
    ],
  },
];

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

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Coming soon
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              The first posts are still being written, but the blog landing page
              is now in place and ready to grow into a proper writing archive.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Planned topics
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              What will show up here
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plannedTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {topic.title}
                  </h3>
                  <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {topic.summary}
                  </p>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {topic.focus.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
