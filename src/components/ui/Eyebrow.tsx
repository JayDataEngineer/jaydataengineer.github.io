import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The `// LABEL` mono-text eyebrow used above section headings.
 */
export function Eyebrow({
  children,
  className,
  accent = "cyan",
}: {
  children: ReactNode;
  className?: string;
  accent?: "cyan" | "magenta" | "violet" | "lime" | "faint";
}) {
  const color = {
    cyan: "text-cyan",
    magenta: "text-magenta",
    violet: "text-violet",
    lime: "text-lime",
    faint: "text-ink-faint",
  }[accent];

  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-[0.22em] inline-flex items-center gap-2",
        color,
        className,
      )}
    >
      <span aria-hidden className="opacity-50">
        {"//"}
      </span>
      {children}
    </span>
  );
}
