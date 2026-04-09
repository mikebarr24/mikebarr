# Copilot Instructions

## Build, lint, and test commands

- `npm install` installs dependencies.
- `npm run dev` starts the local Next.js dev server.
- `npm run lint` runs ESLint with the Next.js core-web-vitals and TypeScript config from `eslint.config.mjs`.
- `npm run build` creates the production static export in `out/`.
- There is currently no automated test runner or `npm test` script in this repository, so there is no single-test command to use.

## High-level architecture

- This is a Next.js 16 App Router site that is deployed as a static export. `app/layout.tsx` sets global fonts and metadata, and `app/page.tsx` renders the current homepage route.
- The homepage is data-driven. `app/page.tsx` defines a typed `Project[]` array and maps it into `ProjectCard` components, so adding or editing showcased work usually means updating structured project data rather than rewriting layout markup.
- `app/components/project-card.tsx` is the interactive client boundary. It owns the expand/collapse state for project details, while the page and layout stay as server components by default.
- GitHub Pages deployment is built into the app configuration. `next.config.ts` enables `output: "export"`, `trailingSlash: true`, and `images.unoptimized`, and the GitHub Actions workflow publishes the generated `out/` directory.
- Base-path behaviour depends on deployment context. In GitHub Actions, `next.config.ts` derives `basePath` from `GITHUB_REPOSITORY` unless `public/CNAME` exists. Reuse `lib/github-pages.ts` and `withBasePath()` for asset or link paths that must work both locally and under a repository subpath on GitHub Pages.

## Key conventions

- Read the relevant Next.js 16 docs under `node_modules/next/dist/docs/` before making framework-level changes. This repository explicitly warns against relying on older Next.js assumptions.
- Use British English in documentation and assistant-written prose unless a code symbol or API requires another form.
- Only create commits or push changes when the user explicitly asks.
- Keep content declarative. The `Project` type in `app/components/project-card.tsx` and the inline `projects` array in `app/page.tsx` are the source of truth for the homepage content model.
- Keep `'use client'` scoped to files that actually need client interactivity. In this codebase, that boundary currently sits at `app/components/project-card.tsx`.
- Styling follows Tailwind CSS v4 utilities in TSX plus the shared token setup in `app/globals.css` (`@import "tailwindcss"` and `@theme inline`). Follow that pattern instead of adding a parallel styling approach.
- TypeScript runs in `strict` mode, and the repo exposes an `@/*` path alias from the repository root via `tsconfig.json`.
