import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Colophon",
  description: "How this site is built.",
};

const STACK = [
  { k: "Framework", v: "Next.js 16 (App Router, Turbopack, RSC)" },
  { k: "Language", v: "TypeScript, strict" },
  { k: "Styling", v: "Tailwind CSS v4 — CSS-first config" },
  { k: "3D", v: "Three.js via React Three Fiber + custom GLSL" },
  { k: "Motion", v: "Motion (formerly Framer Motion)" },
  { k: "Content", v: "MDX with gray-matter frontmatter" },
  { k: "Type", v: "Geist Sans + Geist Mono (variable)" },
  { k: "Icons", v: "Lucide" },
  { k: "Package manager", v: "pnpm" },
  { k: "Deploy", v: "Vercel (primary), self-host option via Caddy" },
];

const PRINCIPLES = [
  "Dark only. No toggle. The aesthetic is the brand.",
  "No motion without purpose. Decoration gets cut.",
  "Respect prefers-reduced-motion everywhere.",
  "Single-page scroll for the core narrative; project detail pages only for marquee work.",
  "Source READMEs as ground truth — link, don't paraphrase.",
  "Lighthouse Performance ≥ 85 mobile, ≥ 95 desktop.",
];

export default function ColophonPage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="flex-1 pt-24">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow accent="lime">colophon</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              How this site is built.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-muted">
              The site is itself a portfolio piece. Every choice is deliberate
              and the rationale is in the source.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <Reveal direction="right">
              <Eyebrow accent="cyan">Stack</Eyebrow>
              <dl className="mt-5 space-y-3">
                {STACK.map((s) => (
                  <div key={s.k} className="grid grid-cols-[100px_1fr] gap-3 border-b border-line pb-2">
                    <dt className="font-mono text-xs uppercase tracking-wider text-ink-faint pt-0.5">{s.k}</dt>
                    <dd className="text-sm text-ink">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal direction="left">
              <Eyebrow accent="violet">Principles</Eyebrow>
              <ul className="mt-5 space-y-3">
                {PRINCIPLES.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                    <span className="text-cyan mt-0.5">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-14 rounded-xl border border-line bg-surface/40 p-6">
              <p className="font-mono text-xs text-ink-faint">
                <span className="text-cyan">$</span> open source
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                The hero shader, the particle field, and every animation are
                plain TypeScript + GLSL. No closed-source dependencies. The
                full plan and rationale are documented in{" "}
                <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-cyan">docs/</code>.
              </p>
            </div>
          </Reveal>
        </Container>
      </main>
      <Footer />
    </>
  );
}
