# mikebarr

This repository contains the source for a personal static site that will be hosted on GitHub Pages. Its purpose is simple: provide a lightweight place to showcase selected work and projects.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production build:

```bash
npm run build
```

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Blog content

Blog posts are stored in `data/blog-posts.json` and validated during the build.

- Use `public/blog-posts.schema.json` as the contract for generated content.
- Use `data/blog-posts.example.json` as a concrete example payload.
- Set `status` to `published` to generate a static page under `/blog/[slug]/`.

## Deployment

This site is configured to deploy to GitHub Pages with GitHub Actions. Pushing to `main` will trigger the deployment workflow.
