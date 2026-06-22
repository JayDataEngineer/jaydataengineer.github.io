import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "projects");

export type ProjectTier = "marquee" | "range";

export interface ProjectMeta {
  slug: string;
  title: string;
  tagline: string;
  /** "01" | "02" | "03" — marquee only */
  index?: string;
  tier: ProjectTier;
  year: number;
  role: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** Hero accent color — must match a token in globals.css */
  accent: "cyan" | "magenta" | "violet" | "lime";
  /** Path under src/content/projects — defaults to slug */
  contentPath?: string;
  /** For range-tier projects: optional external URL (no detail page) */
  externalUrl?: string;
}

/** Read every MDX file under content/projects and parse frontmatter. */
function readAll(): ProjectMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<ProjectMeta, "slug">) } as ProjectMeta;
    })
    .sort((a, b) => {
      // Marquee projects sort by index, then range projects by year desc.
      if (a.tier !== b.tier) return a.tier === "marquee" ? -1 : 1;
      if (a.tier === "marquee") {
        return (a.index ?? "99").localeCompare(b.index ?? "99");
      }
      return b.year - a.year;
    });
}

let cache: ProjectMeta[] | null = null;

export function getAllProjects(): ProjectMeta[] {
  if (!cache) cache = readAll();
  return cache;
}

export function getMarqueeProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.tier === "marquee");
}

export function getRangeProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.tier === "range");
}

export function getProject(slug: string): ProjectMeta | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
