import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function Manifesto() {
  return (
    <section className="relative py-[clamp(4rem,10vh,8rem)]">
      <Container>
        <Reveal as="p" className="text-balance font-mono text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.5] tracking-[-0.01em] text-ink-muted">
          <span className="text-ink-faint">{"// "}</span>
          Most candidates are either researchers who can&apos;t deploy or
          platform engineers who don&apos;t understand the model lifecycle.{" "}
          <span className="text-ink">I&apos;m the bridge.</span> I write Go
          services and LoRA training loops in the same week. I run Talos
          clusters in my home lab. I think{" "}
          <span className="text-gradient-cm font-semibold">MCP</span> is the
          most interesting integration surface we&apos;ve shipped in a decade.
        </Reveal>
      </Container>
    </section>
  );
}
