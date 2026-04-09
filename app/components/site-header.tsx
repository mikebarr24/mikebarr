import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

type SiteHeaderProps = {
  currentPage: "home" | "blog";
};

const navItems = [
  { href: "/", label: "Home", page: "home" },
  { href: "/blog", label: "Blog", page: "blog" },
] as const;

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/michaelbarr24/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  {
    href: "https://github.com/mikebarr24",
    label: "GitHub",
    icon: FaGithub,
  },
] as const;

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <Link
        href="/"
        className="text-base font-medium uppercase tracking-[0.35em] text-zinc-500 transition hover:text-zinc-700 sm:text-lg dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        Mike Barr
      </Link>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
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

        <div className="mt-1 flex flex-wrap items-center gap-2 sm:mt-0 sm:ml-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} profile`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
