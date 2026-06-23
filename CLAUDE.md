@AGENTS.md

# personal-site

Jay's portfolio. Dark, motion-heavy, single-page scroll with project detail pages.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve production build
```

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19.2**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **Motion** (formerly Framer Motion) — scroll reveals, stagger
- **React Three Fiber + Three.js** — hero wireframe icosahedron with chromatic aberration
- **MDX** — project detail pages in `src/content/projects/*.mdx`
- **pnpm** as package manager

## Project structure

```
docs/                   — phase-by-phase plan + decisions (read 0-PLAN.md first)
src/
  app/                  — routes
    layout.tsx          — root: fonts, metadata, viewport
    page.tsx            — single-page scroll composition
    projects/[slug]/    — MDX-driven project detail pages
    resume/             — résumé page
    colophon/           — "how this site is built"
    sitemap.ts          — sitemap.xml
    robots.ts           — robots.txt
    opengraph-image.tsx — dynamic OG image
    not-found.tsx       — 404
    globals.css         — design tokens + base styles
  components/
    layout/             — Nav, Footer, ScrollProgress
    sections/           — Hero, Manifesto, Work, Range, About, Stack, Contact
    three/              — HeroScene (Canvas), LazyHeroScene
    motion/             — Reveal, Stagger (motion/react wrappers)
    ui/                 — Container, Section, Eyebrow, Tag, ArrowLink
  content/projects/     — MDX project files
  lib/
    site.ts             — single source of truth for name, email, links
    projects.ts         — MDX loader + frontmatter parser
    utils.ts            — cn(), slugify()
mdx-components.tsx      — MDX element styling overrides
```

## How to add a project

1. Create `src/content/projects/<slug>.mdx`
2. Add frontmatter matching the `ProjectMeta` type in `src/lib/projects.ts`
3. For marquee (featured) projects, set `tier: marquee` and `index: "01"` etc. — must be unique.
4. For range (grid) projects, set `tier: range` and `externalUrl`.
5. The site picks it up automatically on next build.

## Design system

Defined in `src/app/globals.css` under `@theme`. Use Tailwind utilities like:
- `bg-bg`, `bg-surface`, `bg-surface-hi`, `bg-bg-deep`
- `text-ink`, `text-ink-muted`, `text-ink-faint`
- `text-cyan`, `text-magenta`, `text-violet`, `text-lime`
- `border-line`, `border-line-bright`
- `font-mono`, `font-sans`
- `ease-out-quint`, `ease-spring`

Custom utilities: `.container-page`, `.text-gradient-cm`, `.bg-grid`, `.bg-dots`, `.grain`, `.animate-marquee`, `.cursor-blink`.

## Next.js 16 notes (from the bundled AGENTS.md)

- **`params` and `searchParams` are Promises** — always `await` them.
- **Turbopack is default** — no flag needed for `next dev` or `next build`.
- **No `next lint`** — run ESLint directly via `pnpm lint`.
- **`middleware` → `proxy`** if needed (we don't use either).
- **ESLint flat config** is default.

## Motion / animation principles

- Easing: `[0.16, 1, 0.3, 1]` (out-quint) for reveals, `circOut` for entrances
- Stagger: 40–80ms between siblings
- Reduced motion: every animated component checks `useReducedMotion()` and collapses to static
- No motion without purpose — pure decoration gets cut

## Deploy

- Primary: GitHub Pages via Actions. Push to `main` → `.github/workflows/deploy.yml` builds and deploys.
- The site uses `output: 'export'` to produce static HTML in `out/`. No server runtime.
- Live URL: `https://jaydataengineer.github.io/` (User Pages at root, no basePath needed).
- `public/.nojekyll` prevents Pages' Jekyll pass from dropping `_next/`.
- To self-host elsewhere (Caddy, etc.): `pnpm build` then serve the `out/` directory.

## TODO

- [ ] Real photo for About section
- [ ] Project hero screenshots / demo GIFs
- [ ] PDF résumé export (currently HTML only)
