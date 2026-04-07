const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

export const githubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName
    ? `/${repositoryName}`
    : "";

export function withBasePath(path: string) {
  return githubPagesBasePath ? `${githubPagesBasePath}${path}` : path;
}
