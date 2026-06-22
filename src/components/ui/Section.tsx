import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * Standard page section: padded, contained, with eyebrow + heading pattern.
 */
export function Section({
  id,
  eyebrow,
  eyebrowAccent = "cyan",
  title,
  intro,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  eyebrow?: string;
  eyebrowAccent?: "cyan" | "magenta" | "violet" | "lime" | "faint";
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-[clamp(5rem,12vh,10rem)] scroll-mt-24",
        className,
      )}
    >
      <Container className={containerClassName}>
        {(eyebrow || title || intro) && (
          <header className="mb-12 md:mb-16">
            {eyebrow && (
              <Eyebrow accent={eyebrowAccent} className="mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <h2 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
