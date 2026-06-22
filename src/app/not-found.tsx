import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24">
        <Container className="max-w-3xl py-[clamp(5rem,15vh,10rem)] text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            {"// 404"}
          </p>
          <h1 className="mt-6 text-[clamp(3rem,10vw,7rem)] font-semibold leading-none tracking-tighter text-gradient-cm">
            signal lost
          </h1>
          <p className="mt-6 text-pretty text-lg text-ink-muted">
            The page you&apos;re after isn&apos;t here. Either it never existed,
            or it was sandboxed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-5 py-2.5 font-mono text-sm text-ink-muted transition-colors hover:border-cyan/40 hover:text-ink"
          >
            ← Back to base
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
