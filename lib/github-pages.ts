export const githubPagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return githubPagesBasePath ? `${githubPagesBasePath}${path}` : path;
}
