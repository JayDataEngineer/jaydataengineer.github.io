"use client";

import { useState } from "react";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore — the mailto link is the primary CTA.
    }
  };

  return (
    <section id="contact" className="relative py-[clamp(5rem,12vh,10rem)]">
      {/* Big background type for impact */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden"
      >
        <span className="select-none whitespace-nowrap text-[clamp(8rem,28vw,22rem)] font-semibold leading-none tracking-tighter text-surface-hi/60">
          let&apos;s talk
        </span>
      </div>

      <Container className="relative">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-cyan">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_12px_2px_var(--color-cyan)]" />
            Open to opportunities
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-balance text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            Let&apos;s build the{" "}
            <span className="text-gradient-cm">unsexy layer</span>
            <br className="hidden md:inline" /> that makes AI run.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
            AI infrastructure, distributed systems, agent orchestration,
            creative tooling. If you&apos;re building something where the
            engineering is harder than the model, I want to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-sm text-bg transition-all hover:bg-cyan hover:shadow-[0_0_40px_-5px_var(--color-cyan)]"
            >
              <span>{site.email}</span>
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
            <button
              onClick={onCopy}
              type="button"
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-4 py-3 font-mono text-sm text-ink-muted transition-colors hover:border-cyan/40 hover:text-ink"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-cyan" /> Copied
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy
                </>
              )}
            </button>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-4 py-3 font-mono text-sm text-ink-muted transition-colors hover:border-cyan/40 hover:text-ink"
            >
              GitHub
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
