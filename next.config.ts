import type { NextConfig } from "next";
import { githubPagesBasePath } from "./lib/github-pages";

const nextConfig: NextConfig = {
  output: "export",
  basePath: githubPagesBasePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
