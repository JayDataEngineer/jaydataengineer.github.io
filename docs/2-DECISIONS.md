# Phase 3 — Framework & Stack Decisions

> Final, locked decisions. Every choice below has a "rejected alternatives" note so future-us doesn't re-litigate.

## Framework: **Next.js 15 (App Router)**

**Why**: RSC gives us server components for SEO + first-paint speed, with islands of client interactivity exactly where needed (3D hero, motion). Best-in-class Three.js / R3F integration, mature metadata API, zero-config static export if we want to self-host on Caddy later. Jay already runs Vercel-style infrastructure in his homelab, so the deploy story is familiar.

**Rejected**:
- *Astro*: Beautiful for content, but its island architecture fights us on a motion-heavy hero. Better fit for a blog-first site, which we explicitly chose not to build (see Strategy).
- *SvelteKit*: Smaller ecosystem for the specific libraries we need (R3F, Motion, shadcn). Svelte 5 runes are great but we'd be the only portfolio on the block maintaining Svelte adapters for everything.
- *Nuxt 4*: Vue. No strategic reason to pick it for a portfolio. Hire signal is weaker.
- *Remix*: Merged into React Router v7. Not worth the divergence.

## Language: **TypeScript (strict)**

No debate. `strict: true`, `noUncheckedIndexedAccess: true`, path aliases `@/*`.

## Styling: **Tailwind CSS v4**

**Why**: v4 is faster (Oxide engine), CSS-first config, no `tailwind.config.js` unless we want one. Container queries built in. Pairs cleanly with shadcn.

**Rejected**:
- *CSS Modules*: too verbose for a motion-heavy site.
- *Vanilla Extract*: zero-runtime is nice but adds build complexity not justified here.
- *Emotion / styled-components*: runtime CSS-in-JS is dead for new projects.

## Components: **shadcn/ui (Radix + Tailwind)**

**Why**: Copy-in components, fully owned, no version-lock to a library. Accessible by default (Radix primitives). Customizable to fit the tech-noir aesthetic without fighting `!important` wars.

**Not using**: MUI, Chakra, Mantine. All impose a visual language we'd have to override constantly.

## Animation: **Motion (formerly Framer Motion)** + **GSAP** (timeline-heavy sequences only)

**Why**: Motion is the React animation standard, performs well, and the API is excellent for scroll-triggered reveals. For the hero specifically — where we want a multi-stage timeline that syncs with the 3D scene — we'll reach for GSAP because its timeline primitive beats Motion for sequencing.

**Not using**: React Spring (API is more awkward for scroll), Auto-Animate (too magic for what we need).

## 3D: **React Three Fiber + Drei + Three.js**

**Why**: Declarative Three.js in JSX. Drei gives us helpers (CameraControls, shaderMaterial, useTexture) that save hundreds of lines. Pair with custom GLSL for the hero shader so the visual doesn't look off-the-shelf.

**Performance budget**: Hero scene must hold 60fps on a 2020 MacBook Air. We achieve this with:
- Instanced meshes for particle fields (one draw call)
- `frameloop="demand"` where possible
- `dpr={[1, 2]}` to cap device pixel ratio
- Progressive enhancement — reduced-motion users get a static gradient

**Not using**: Babylon.js (heavier, less React-idiomatic), P5.js (wrong tool — 2D-focused).

## Fonts: **Geist (sans) + Geist Mono (mono)**

Vercel's open-source typeface family. Mono for code and accents, sans for body. Both have full weight ranges and ship as variable fonts.

**Rejected**: Inter (every portfolio uses it now — too generic), JetBrains Mono (great but we want a matched family), IBM Plex Sans (excellent but reads corporate).

## Content: **MDX for project detail pages**

Project pages are MDX files in `content/projects/*.mdx`. We can embed React components inside markdown for diagrams, code blocks, callouts. Frontmatter carries metadata (title, year, role, stack, links, hero image).

**Rejected**: Plain JSON + React templates (less flexible for long-form writeups), Contentlayer (overkill for ~5 entries), a headless CMS (no editor in the loop).

## Icons: **Lucide**

Clean, consistent, tree-shakeable. Used via shadcn.

## Animation choreography principles

1. **No motion without purpose.** Every animated element reveals information or guides attention. Pure decoration gets cut.
2. **Easing curves are signed.** We use `ease: [0.16, 1, 0.3, 1]` (out-quint) for reveals, `ease: "circOut"` for entrances. Linear is banned except for progress bars.
3. **Stagger, don't synchronize.** When multiple elements animate together, stagger by 40–80ms so it reads as choreographed rather than robotic.
4. **Respect `prefers-reduced-motion`.** All keyframe and scroll animations collapse to opacity-only or static.
5. **Never block interaction.** If a button is mid-animation, it must still be clickable. Pointer events stay live.

## Deploy: **Vercel (primary), self-host on cloud via Caddy (secondary option)**

**Primary**: Vercel for the launched v1. Free tier covers a portfolio; Cloudflare Pages is fine too but Vercel's preview deploys per-PR are better for iterating.

**Secondary**: Since Jay already runs Caddy + Tailscale on the cloud box, we can self-host the static export at `jay.tailb1e597.ts.net` (or a real domain). The Next.js config supports `output: 'export'` for this — we keep the option open without committing to it.

## Tooling

- **Package manager**: `pnpm` (faster than npm, stricter than bun for monorepos, mature)
- **Linter**: ESLint flat config with `next/core-web-vitals` + `@typescript-eslint` + `eslint-plugin-import`
- **Formatter**: Prettier (with `prettier-plugin-tailwindcss` for class sorting)
- **Git hooks**: `lint-staged` + `simple-git-hooks` (lighter than Husky)
- **Type checking**: `tsc --noEmit` in CI

## Accessibility floor

- WCAG 2.2 AA contrast on all text
- Keyboard navigable, focus rings visible (custom ring color: neon cyan)
- `prefers-reduced-motion` honored everywhere
- `aria-label` on all icon-only buttons
- Semantic HTML (no `<div onClick>`)

## Performance budget

- Lighthouse Performance ≥ 95 on desktop, ≥ 85 on mobile (the 3D hero costs us on low-end mobile)
- LCP < 2.0s on cable
- CLS = 0 (everything has reserved space)
- Total JS shipped to landing < 250 KB gzipped (3D is lazy-loaded after first paint)

## What we're explicitly NOT shipping in v1

- Blog (deferred — see Strategy)
- Comments / analytics dashboard
- Contact form backend (mailto: link instead — fewer moving parts, no spam target)
- Search
- i18n
- Dark mode toggle (dark only)
