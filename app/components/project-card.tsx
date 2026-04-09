'use client';

import { useLayoutEffect, useState } from "react";

export type Project = {
  name: string;
  status: "live" | "work-in-progress";
  href?: string;
  summary: string;
  stack: string[];
  highlights: string[];
  details: {
    overview: string;
    sections: {
      title: string;
      items: string[];
    }[];
  };
};

type ProjectCardProps = {
  project: Project;
};

function getPanelId(projectName: string) {
  return `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-details`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = getPanelId(project.name);
  const isWorkInProgress = project.status === "work-in-progress";
  const statusClasses = isWorkInProgress
    ? "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300"
    : "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  const statusLabel = isWorkInProgress ? "Work in progress" : "Live product";

  useLayoutEffect(() => {
    return () => {
      setIsExpanded(false);
    };
  }, []);

  return (
    <article className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-zinc-950">
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="space-y-3">
              <div
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${statusClasses}`}
              >
                {statusLabel}
              </div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {project.name}
              </h3>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {project.summary}
              </p>
            </div>

            <ul className="space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {project.stack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="w-full shrink-0 lg:w-auto">
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:justify-end">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Visit site
                </a>
              ) : null}

              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setIsExpanded((expanded) => !expanded)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 sm:w-auto dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>{isExpanded ? "Hide details" : "More Info"}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ease-out motion-reduce:transition-none dark:text-zinc-400 ${
                    isExpanded ? "rotate-180" : ""
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
            </div>
          </div>
        </div>

        <div
          className={`mt-0 grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded ? "mt-6" : "mt-0"
          } ${
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div
              id={panelId}
              aria-hidden={!isExpanded}
              className={`rounded-3xl border border-black/10 bg-zinc-50/80 p-4 sm:p-6 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none dark:border-white/10 dark:bg-zinc-900/50 ${
                isExpanded ? "translate-y-0" : "-translate-y-2"
              }`}
            >
              <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                <section className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5 dark:border-white/10 dark:bg-black/20">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                    Project overview
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {project.details.overview}
                  </p>
                </section>

                {project.details.sections.map((section) => (
                  <section
                    key={section.title}
                    className="rounded-2xl border border-black/10 bg-white/80 p-4 sm:p-5 dark:border-white/10 dark:bg-black/20"
                  >
                    <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                      {section.title}
                    </h4>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
