"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#range", label: "Range" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/resume", label: "Résumé" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-md border border-line bg-surface transition-colors group-hover:border-cyan/50">
            <span className="text-cyan">{site.initials}</span>
          </span>
          <span className="text-ink">
            {site.name}
            <span className="text-ink-faint">.engineer</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href={`mailto:${site.email}`}
          className="group flex items-center gap-1.5 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-cyan/40 hover:text-ink"
        >
          <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_0_var(--color-cyan)]" />
          <span className="hidden sm:inline">Available for hire</span>
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </a>
      </nav>
    </header>
  );
}
