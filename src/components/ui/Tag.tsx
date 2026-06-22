import { cn } from "@/lib/utils";

/**
 * Stack tag chip. Used in project cards + about section.
 */
export function Tag({
  children,
  className,
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide",
        active
          ? "border-cyan/40 bg-cyan/5 text-cyan"
          : "border-line bg-surface/50 text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
