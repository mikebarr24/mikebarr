import Link from "next/link";

import { ProjectCard, type Project } from "./components/project-card";
import { SiteHeader } from "./components/site-header";

const projects: Project[] = [
  {
    name: "Logical Fitness",
    status: "live",
    href: "https://logicalfitness.ai",
    summary:
      "AI-generated fitness plans tailored to each user's goals, experience, available equipment, and health considerations.",
    stack: ["Next.js", "TypeScript", "MongoDB", "OpenAI", "NextAuth"],
    highlights: [
      "Generates structured workout plans from a guided onboarding flow.",
      "Supports medical considerations, equipment constraints, and experience level.",
      "Lets users follow plans, complete workouts, and track progress over time.",
    ],
    details: {
      overview:
        "Logical Fitness is designed to turn a complex planning problem into a guided experience that feels personal from the first session onward.",
      sections: [
        {
          title: "What the product covers",
          items: [
            "A guided onboarding flow collects goals, training background, equipment access, and relevant health considerations.",
            "The workout engine uses that profile to generate plans that feel realistic for the user instead of relying on generic templates.",
            "Each plan is built to be actionable, with structure that helps users know what to do next and why it fits their situation.",
          ],
        },
        {
          title: "Member experience",
          items: [
            "Users can review their plan, move through workouts, and log completion as they train.",
            "The product emphasizes clarity and momentum so the experience stays useful after plan generation, not just during signup.",
            "Progress tracking helps users see consistency over time and makes the plan feel like an evolving tool rather than a one-off output.",
          ],
        },
        {
          title: "Technical approach",
          items: [
            "The app is built with Next.js and TypeScript, with MongoDB for persistence and NextAuth for authentication.",
            "OpenAI is used to help generate personalized workout programming based on the user's inputs and constraints.",
            "The stack is aimed at supporting flexible plan generation while keeping the overall experience fast and approachable.",
          ],
        },
      ],
    },
  },
  {
    name: "draft-path",
    status: "work-in-progress",
    summary:
      "A concept-to-plan MVP that turns one idea into short iterative suggestions, learns from likes and skips, and grows that signal into a structured plan.",
    stack: ["Next.js", "TypeScript", "Drizzle", "OpenAI", "Tailwind CSS"],
    highlights: [
      "Starts from a single concept and generates a batch of short, focused ideas to react to.",
      "Uses like and skip feedback to save promising directions and trigger plan generation.",
      "Keeps refining from the original concept, saved ideas, and latest plan instead of resetting each round.",
    ],
    details: {
      overview:
        "draft-path is an in-progress product exploring a lightweight concept-to-plan workflow, so this site surfaces context about the direction without linking to a public app yet.",
      sections: [
        {
          title: "Core flow",
          items: [
            "A user starts with a single concept, then reviews a batch of small ideas generated from that starting point.",
            "Liked ideas are saved while skipped ideas are discarded, creating a simple feedback loop that sharpens the direction over time.",
            "Once enough signal has been gathered, the app generates a lightweight plan and uses it to inform the next round of refinements.",
          ],
        },
        {
          title: "Product focus",
          items: [
            "The product is designed around incremental progress rather than one oversized AI response.",
            "Each generated idea should be small, clear, and grounded in the current direction instead of suggesting a disruptive pivot.",
            "The aim is to help a concept become more concrete through repeated, practical iterations.",
          ],
        },
        {
          title: "Current state",
          items: [
            "The repository is still at scaffold stage, with the MVP structure and workflow defined before a public launch.",
            "The planned stack centres on Next.js, Tailwind CSS, Drizzle, and OpenAI-backed idea and plan generation.",
            "Because the product is still in progress, the card intentionally shows only a More Info button for now.",
          ],
        },
      ],
    },
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
        <SiteHeader currentPage="home" />

        <section className="max-w-3xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Selected projects and product work.
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              I build useful software with a focus on practical UX, clear
              systems, and products that solve real problems.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Visit blog
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                Projects
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                Current work
              </h2>
            </div>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
