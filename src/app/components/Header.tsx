"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_TITLE } from "@/lib/constants"; 

interface navItem {
  href: string,
  label: string,
}

const DEFAULT_NAV_ITEMS: navItem[] = [
  { href: "/blog", label: "Blog" },
  { href: "/wiki", label: "Wiki" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

const BLOG_NAV_ITEMS: navItem[] = [
  { href: "/blog/archive", label: "Archive" },
  { href: "/blog/categories", label: "Categories" },
  { href: "/blog/series", label: "Series" },
  { href: "/blog/tags", label: "Tags" },
]

const WIKI_NAV_ITEMS: navItem[] = [
  { href: "/wiki", label: "Wiki" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
]

function generateTitle(pathname: string) {
  let SITE_SUBTITLE = "";
  let SITE_SUBHREF = "/";
  if (pathname.startsWith("/blog")) {
    SITE_SUBTITLE = "Blog";
    SITE_SUBHREF = "/blog";
  }
  else if (pathname.startsWith("/wiki")) {
    SITE_SUBTITLE = "Wiki"; 
    SITE_SUBHREF = "/wiki";
  }

  return (
    <div className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
      <Link
        href="/"
        className="hover:underline"
      >
        {SITE_TITLE}
      </Link>

      {SITE_SUBTITLE !== "" && (
        <>
          <span className="mx-1">::</span>

          <Link
            href={SITE_SUBHREF}
            className="hover:underline"
          >
            {SITE_SUBTITLE}
          </Link>
        </>
      )}
    </div>
  ); 
}

export default function Header() {
  const pathname = usePathname();

  let navItems: navItem[] = DEFAULT_NAV_ITEMS;
  if (pathname.startsWith("/blog"))
    navItems = BLOG_NAV_ITEMS
  else if (pathname.startsWith("/wiki"))
    navItems = WIKI_NAV_ITEMS

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-[var(--gap)]">
        
        {/* Logo / Site Title */}
        {generateTitle(pathname)}

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}