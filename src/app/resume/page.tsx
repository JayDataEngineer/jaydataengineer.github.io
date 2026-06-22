import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${site.name} — ${site.role}. Résumé and experience.`,
};

const EXPERIENCE = [
  {
    role: "AI Infrastructure Engineer (independent)",
    period: "2024 — present",
    body: "Building distributed systems for generative AI: Ray Serve clusters on Kubernetes, agent orchestrators in Go, multi-agent research pipelines, MCP servers as production integration surfaces, LoRA fine-tuning for TTS / image models.",
    tags: ["Ray Serve", "Kubernetes", "Go", "MCP", "LoRA"],
  },
];

const PROJECTS = [
  { name: "Pux Ray", note: "Ray Serve on Talos K8s — image, video, audio, 3D, LLM generation through one API." },
  { name: "PUX", note: "Agent orchestrator in Go with three first-class interfaces (Web / TUI / MCP)." },
  { name: "Deep Research Engine", note: "5-node pipeline: Ingest → Drafter → Critic → Neo4j → Synthesizer." },
  { name: "MCP servers (2)", note: "Web research + media analysis. Caddy + Tailscale + Gluetun VPN + Postgres + Redis." },
  { name: "Qwen3-TTS LoRA Trainer", note: "Voice fine-tuning with emotion control, anti-forgetting mixing." },
];

const STACK = {
  Languages: ["Go", "Python", "TypeScript", "GDScript", "Bash"],
  Infra: ["Kubernetes", "Talos", "Ray Serve", "Docker", "Caddy", "Tailscale", "Zitadel"],
  "AI/ML": ["PyTorch", "LoRA", "ComfyUI", "MCP", "LangGraph", "LangFuse", "llama.cpp", "Wan2GP"],
  Data: ["Postgres", "Redis", "Neo4j", "MongoDB", "MinIO"],
  Frontend: ["Next.js", "React", "Three.js", "Tailwind", "shadcn"],
};

export default function ResumePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="flex-1 pt-24">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow accent="cyan">résumé</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {site.name}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-3 font-mono text-sm text-cyan">{site.role}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-muted">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-ink-faint">
              <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
              <span>·</span>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                github.com/{site.handle}
              </a>
            </div>
          </Reveal>

          <div className="mt-16 space-y-12">
            <Reveal>
              <section>
                <Eyebrow accent="cyan">Experience</Eyebrow>
                <div className="mt-5 space-y-6">
                  {EXPERIENCE.map((e) => (
                    <div key={e.role} className="border-l border-line pl-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-lg font-semibold text-ink">{e.role}</h3>
                        <span className="font-mono text-xs text-ink-faint whitespace-nowrap">{e.period}</span>
                      </div>
                      <p className="mt-2 text-pretty leading-relaxed text-ink-muted">{e.body}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {e.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow accent="violet">Selected projects</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {PROJECTS.map((p) => (
                    <li key={p.name} className="flex flex-col gap-1 border-b border-line pb-3 md:flex-row md:items-baseline md:gap-4">
                      <span className="font-semibold text-ink md:w-64 md:shrink-0">{p.name}</span>
                      <span className="text-sm text-ink-muted">{p.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow accent="lime">Stack</Eyebrow>
                <div className="mt-5 space-y-4">
                  {Object.entries(STACK).map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-2 md:flex-row md:gap-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-faint md:w-28 md:shrink-0">{k}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {v.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <div className="rounded-xl border border-line bg-surface/40 p-6">
                <p className="font-mono text-xs text-ink-faint">
                  <span className="text-cyan">$</span> download pdf
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  A polished PDF version is coming. For now,{" "}
                  <a
                    href={`mailto:${site.email}?subject=Résumé request`}
                    className="text-cyan underline decoration-cyan/30 underline-offset-4"
                  >
                    email me
                  </a>{" "}
                  and I&apos;ll send the latest copy directly.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
