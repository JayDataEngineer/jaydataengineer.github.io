import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getMarqueeProjects } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const accentRing: Record<string, string> = {
  cyan: "group-hover:border-cyan/50 hover:shadow-[0_0_60px_-20px_var(--color-cyan)]",
  magenta:
    "group-hover:border-magenta/50 hover:shadow-[0_0_60px_-20px_var(--color-magenta)]",
  violet:
    "group-hover:border-violet/50 hover:shadow-[0_0_60px_-20px_var(--color-violet)]",
  lime: "group-hover:border-lime/50 hover:shadow-[0_0_60px_-20px_var(--color-lime)]",
};

const accentIndex: Record<string, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  violet: "text-violet",
  lime: "text-lime",
};

export function Work() {
  const projects = getMarqueeProjects();

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      eyebrowAccent="cyan"
      title={
        <>
          The infrastructure that makes
          <br className="hidden md:inline" />{" "}
          <span className="text-gradient-cm">creative AI</span> run.
        </>
      }
      intro="Three flagship projects. The cluster that serves it, the orchestrator that drives it, and the research pipeline that puts it to work."
    >
      <div className="grid gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              href={`/projects/${p.slug}`}
              className={cn(
                "group relative block overflow-hidden rounded-2xl border border-line bg-surface/40 p-7 transition-all duration-500 hover:-translate-y-0.5 md:p-10",
                accentRing[p.accent],
              )}
            >
              <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cyan/5 blur-3xl transition-opacity duration-500 group-hover:opacity-150 md:bg-cyan/[0.07]" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="space-y-5 md:max-w-3xl">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "font-mono text-xs tracking-[0.3em]",
                        accentIndex[p.accent],
                      )}
                    >
                      {p.index}
                    </span>
                    <span className="font-mono text-xs text-ink-faint">
                      / {p.year}
                    </span>
                  </div>

                  <h3 className="text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-pretty text-lg leading-relaxed text-ink-muted">
                    {p.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.stack.slice(0, 6).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 font-mono text-sm text-ink-muted transition-colors group-hover:text-ink">
                  <span>Case study</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
