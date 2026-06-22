import { ArrowUpRight } from "lucide-react";
import { getRangeProjects } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Range() {
  const projects = getRangeProjects();

  return (
    <Section
      id="range"
      eyebrow="Also shipped"
      eyebrowAccent="magenta"
      title="Range"
      intro="A broader selection. Click through to the code."
    >
      <Stagger
        stagger={0.04}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => {
          const href = p.externalUrl ?? p.links[0]?.href ?? "#";
          return (
            <StaggerItem key={p.slug}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col justify-between rounded-xl border border-line bg-surface/30 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-bright hover:bg-surface/60"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <ArrowUpRight
                      size={14}
                      className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {p.tagline}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((s) => (
                    <Tag key={s} className="text-[10px]">
                      {s}
                    </Tag>
                  ))}
                </div>
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
