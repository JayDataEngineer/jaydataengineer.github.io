# personal-site

Jay's portfolio. Dark, motion-heavy, single-page scroll with MDX-driven project detail pages.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion · React Three Fiber + custom GLSL · MDX · pnpm

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build

The site is configured for static export (`output: 'export'`). The build emits HTML/CSS/JS to `out/`.

```bash
pnpm build        # produces out/
npx serve out     # preview the static build locally
```

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`, which builds and uploads `out/` to GitHub Pages. Live at `https://jaydataengineer.github.io/`.

## Architecture

See [`docs/0-PLAN.md`](./docs/0-PLAN.md) for the full plan, design tokens, and per-phase decisions. The short version: single-page scroll composes Hero → Manifesto → Work → Range → About → Stack → Contact. Three marquee projects (Pux Ray, PUX, Deep Research Engine) get full MDX detail pages. Range projects link directly to GitHub.

## Configure

All site-wide values (name, email, links, social) live in `src/lib/site.ts`. Edit one file, the whole site updates.

## License

MIT
