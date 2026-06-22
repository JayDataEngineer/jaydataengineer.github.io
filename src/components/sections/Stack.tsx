import { Section } from "@/components/ui/Section";

const ROWS = [
  [
    "Kubernetes",
    "Talos",
    "Ray Serve",
    "KubeRay",
    "Docker",
    "Traefik",
    "Caddy",
    "Tailscale",
    "LiteLLM",
    "Zitadel",
    "Postgres",
    "Redis",
    "Neo4j",
    "MinIO",
  ],
  [
    "Go",
    "Python",
    "TypeScript",
    "GDScript",
    "Bash",
    "Rust",
    "FastAPI",
    "Next.js",
    "Three.js",
    "R3F",
    "Tailwind",
    "Motion",
    "GSAP",
  ],
  [
    "PyTorch",
    "LoRA",
    "ComfyUI",
    "MCP",
    "LangGraph",
    "LangFuse",
    "llama.cpp",
    "Ray",
    "Wan2GP",
    "TRELLIS",
    "Flux",
    "Qwen3",
    "IndexTTS",
    "Whisper",
  ],
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Duplicate the list so the marquee can loop seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="pause-on-hover relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-3 pr-3 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-3">
            <span className="font-mono text-sm text-ink-muted transition-colors hover:text-ink">
              {item}
            </span>
            <span className="text-ink-faint" aria-hidden>
              ✕
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Toolchain"
      eyebrowAccent="lime"
      title="What I reach for."
      intro="Across infra, languages, and the AI/ML layer. Not exhaustive — these are the tools I&apos;ve shipped to production in the last 18 months."
    >
      <div className="space-y-2.5">
        {ROWS.map((row, i) => (
          <Row key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
