import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.tagline,
      url: `${site.url}/projects/${slug}`,
    },
  };
}

async function getProjectBody(slug: string): Promise<{
  Component: React.FC;
  frontmatter: Record<string, unknown>;
}> {
  const file = path.join(process.cwd(), "src", "content", "projects", `${slug}.mdx`);
  if (!fs.existsSync(file)) notFound();
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  const { default: Component } = await import(`@/content/projects/${slug}.mdx`);
  return { Component, frontmatter: data };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { Component } = await getProjectBody(slug);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="flex-1 pt-24">
        <Container className="max-w-3xl">
          <Reveal>
            <Link
              href="/#work"
              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint transition-colors hover:text-cyan"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
              Back to work
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-6 flex items-center gap-4 font-mono text-xs">
              <span className="text-cyan tracking-[0.3em]">{project.index}</span>
              <span className="text-ink-faint">/ {project.year}</span>
              <span className="text-ink-faint">/ {project.role}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-balance text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-pretty text-xl leading-relaxed text-ink-muted md:text-2xl">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/40 px-4 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-cyan/40 hover:text-ink"
                >
                  {l.label}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 space-y-6 border-t border-line pt-12 [&_p:first-child]:mt-0 [&_h2:first-child]:mt-0">
            <Component />
          </div>

          <div className="mt-20 border-t border-line pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
              {"// more work"}
            </p>
            <Link
              href="/#work"
              className="group mt-4 inline-flex items-center gap-2 font-mono text-sm text-ink transition-colors hover:text-cyan"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
              Back to all projects
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
