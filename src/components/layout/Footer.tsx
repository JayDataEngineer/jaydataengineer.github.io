import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-sm text-ink">{site.name}</p>
          <p className="font-mono text-xs text-ink-faint">
            © {year} — Built in the home lab.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-ink-muted">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub ↗
          </a>
          <Link
            href="/colophon"
            className="transition-colors hover:text-ink"
          >
            Colophon
          </Link>
        </div>
      </Container>
    </footer>
  );
}
