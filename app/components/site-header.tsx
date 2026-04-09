import Link from "next/link";

type SiteHeaderProps = {
  currentPage: "home" | "blog";
};

const navItems = [
  { href: "/", label: "Home", page: "home" },
  { href: "/blog", label: "Blog", page: "blog" },
] as const;

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        Mike Barr
      </Link>

      <nav className="flex flex-wrap items-center gap-2">
        {navItems.map((item) => {
          const isActive = item.page === currentPage;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                  : "border-black/10 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
