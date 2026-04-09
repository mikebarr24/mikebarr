import { existsSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const hasCustomDomain = existsSync(join(process.cwd(), "public", "CNAME"));

const githubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName && !hasCustomDomain
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: githubPagesBasePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
