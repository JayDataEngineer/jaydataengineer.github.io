import type { MDXComponents } from "mdx/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";

/**
 * Custom MDX components. Used when MDX is imported as a React component
 * (the pattern we use for project detail pages).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink">
        <Eyebrow accent="cyan" className="mb-2 block">
          §
        </Eyebrow>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-pretty text-lg leading-relaxed text-ink-muted">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-cyan underline decoration-cyan/30 underline-offset-4 transition-colors hover:decoration-cyan"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 text-pretty text-lg leading-relaxed text-ink-muted">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-pretty text-lg leading-relaxed text-ink-muted marker:font-mono marker:text-cyan">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-1 marker:text-cyan">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-ink">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-cyan">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-line bg-bg-deep p-5 font-mono text-sm leading-relaxed text-ink-muted">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-cyan pl-5 text-pretty text-xl italic leading-relaxed text-ink">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="my-10 border-0 border-t border-line" />
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-line-bright px-3 py-2 text-left font-mono text-xs uppercase tracking-wider text-cyan">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-line px-3 py-2 text-ink-muted">{children}</td>
    ),
    Tag,
    ...components,
  };
}
