import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";

const FOCUS = [
  "Distributed systems for generative AI",
  "Ray Serve + KubeRay on consumer GPUs",
  "MCP servers as a first-class integration surface",
  "LoRA fine-tuning for TTS / image models",
  "Go for orchestration, Python for the model layer",
  "Self-hosted everything — Talos, Caddy, Tailscale",
];

const HISTORY = [
  {
    year: "2026",
    title: "Shipping AI infra",
    body: "Ray Serve cluster on Talos K8s, MCP servers wired through Caddy + Tailscale, multi-agent research engine in production for personal use.",
  },
  {
    year: "2025",
    title: "Tooling for creative AI",
    body: "LoRA pipelines for Qwen3-TTS, ComfyUI pose-director, TRELLIS.2 3D inference, Common Voice dataset browser.",
  },
  {
    year: "2024",
    title: "Home lab maturity",
    body: "Migrated homelab to Talos Linux; built shared Docker infrastructure; deployed Zitadel SSO across services.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      eyebrowAccent="violet"
      title="The shape of the work."
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal direction="right" className="space-y-8">
          {/* Avatar block — initials in a styled card until a real photo ships */}
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(0,231,255,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,43,214,0.14), transparent 50%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-[clamp(4rem,12vw,7rem)] font-semibold tracking-tighter text-gradient-cm">
                {site.initials}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
              <span>{site.name}</span>
              <span className="text-cyan">● online</span>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <p className="text-ink-faint">{"// current focus"}</p>
            <ul className="space-y-1.5">
              {FOCUS.map((f) => (
                <li key={f} className="text-ink-muted">
                  <span className="text-cyan">→</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="space-y-12">
          <Reveal>
            <p className="text-pretty text-xl leading-relaxed text-ink md:text-2xl">
              I&apos;m {site.name}, an AI infrastructure engineer. My home lab
              runs a{" "}
              <span className="text-ink">Ray Serve cluster on Talos Kubernetes</span>{" "}
              that generates images, video, audio, 3D, and text through one
              unified API. I wrote the agent orchestrator that drives it in{" "}
              <span className="text-ink">Go</span>. I tune TTS models with LoRA
              for emotion-controlled character voices. I ship the MCP servers
              that let agents reach into the cluster.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-pretty text-base leading-relaxed text-ink-muted">
              The pattern across all of it: I build the unglamorous,
              load-bearing layer that makes the flashy stuff work. The
              generation is the easy part — VRAM scheduling, request routing,
              sandbox isolation, observability, and the integration surfaces
              between agents and tools are where the real engineering lives.
              That&apos;s where I live.
            </p>
          </Reveal>

          <Reveal>
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
                {"// trajectory"}
              </p>
              <ol className="space-y-5 border-l border-line">
                {HISTORY.map((h) => (
                  <li
                    key={h.year}
                    className="relative pl-6"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-[5px] top-1.5 size-2 rounded-full border border-cyan bg-bg"
                    />
                    <p className="font-mono text-xs text-cyan">{h.year}</p>
                    <p className="mt-1 font-semibold text-ink">{h.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {h.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Go",
                "Python",
                "TypeScript",
                "GDScript",
                "Kubernetes",
                "Talos",
                "Ray Serve",
                "Docker",
                "Caddy",
                "Tailscale",
                "Three.js",
                "Next.js",
                "PyTorch",
                "LoRA",
                "ComfyUI",
                "LiteLLM",
                "LangFuse",
                "Neo4j",
                "Postgres",
                "Redis",
              ].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
