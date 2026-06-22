# Phase 5 — The Plan

> Read this first. Synthesizes Phases 2–4 into a single executable plan with file-level detail.

## TL;DR

Dark, motion-heavy, tech-noir portfolio site for **Jay**, positioning as **AI Infrastructure Engineer**. Built on **Next.js 15 + R3F + Motion + Tailwind v4 + shadcn**. Single-page scroll for the core narrative, MDX-driven detail pages for three marquee projects, contact CTA at the bottom.

## Source documents

- `docs/1-STRATEGY.md` — what the site argues, what it refuses to do, tone of voice
- `docs/2-DECISIONS.md` — every tech choice, with rejected alternatives
- `docs/3-PROJECTS.md` — full project catalog, tiered

## File structure (target)

```
personal-site/
├── docs/                              # planning (already exists)
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # root: fonts, metadata, scroll progress
│   │   ├── page.tsx                   # single-page scroll composition
│   │   ├── globals.css                # tailwind + tokens + base styles
│   │   ├── projects/[slug]/page.tsx   # MDX project detail
│   │   ├── resume/page.tsx            # HTML résumé
│   │   ├── colophon/page.tsx          # "this site is built with…"
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx        # dynamic OG image
│   ├── components/
│   │   ├── ui/                        # shadcn primitives
│   │   ├── sections/                  # Hero, Manifesto, Work, Range, About, Stack, Contact
│   │   ├── three/                     # Scene, ParticleField, shaders
│   │   ├── motion/                    # Reveal, stagger wrappers
│   │   └── layout/                    # Nav, Footer, ScrollProgress, Cursor
│   ├── content/projects/              # MDX
│   │   ├── pux-ray.mdx
│   │   ├── pux.mdx
│   │   └── deep-research-engine.mdx
│   ├── lib/
│   │   ├── projects.ts                # MDX loader + metadata
│   │   ├── site.ts                    # site config (name, email, links)
│   │   └── utils.ts                   # cn(), etc.
│   └── styles/tokens.css              # design tokens (colors, type, motion)
├── public/
│   ├── resume.pdf
│   └── og.png                         # static fallback OG
├── CLAUDE.md                          # project-level Claude notes
├── README.md
├── .gitignore .editorconfig .nvmrc
├── next.config.ts tsconfig.json
├── tailwind.config.ts (minimal — v4 is CSS-first)
├── postcss.config.mjs
└── package.json
```

## Design tokens (locked)

```
Color
  bg-base        #050507   (near-black, slight cool tint)
  bg-elevated    #0c0c11
  border-subtle  rgba(255,255,255,0.06)
  text-primary   #f5f5f7
  text-secondary #a1a1aa
  text-muted     #52525b
  accent-cyan    #00f0ff
  accent-magenta #ff2bd6
  accent-violet  #8b5cf6
  gradient-glow  radial cyan→magenta, low alpha

Type
  font-sans      Geist
  font-mono      Geist Mono
  display-xl     clamp(3rem, 8vw, 7rem), 0.95 line-height, -0.04em tracking
  display-lg     clamp(2.25rem, 5vw, 4rem)
  body-lg        1.125rem, 1.6 line-height
  body           1rem, 1.6 line-height
  code           0.875rem, Geist Mono

Motion
  ease-out-quint   cubic-bezier(0.16, 1, 0.3, 1)
  ease-out-circ    cubic-bezier(0, 0.55, 0.45, 1)
  duration-fast    180ms
  duration-base    320ms
  duration-slow    640ms
  stagger-step     60ms

Spacing
  section-py      clamp(5rem, 12vh, 10rem)
  container-max   1200px
  container-pad   clamp(1.25rem, 5vw, 2.5rem)
```

## The hero scene (3D spec)

- Canvas with `dpr={[1, 2]}`, `frameloop="always"` (we want continuous render)
- ~3000 instanced points arranged on a Fibonacci sphere (radius 2.4)
- Each point uses a custom ShaderMaterial:
  - Vertex: size attenuation + subtle noise displacement driven by `uTime`
  - Fragment: circular point with soft edge, color lerped cyan→magenta by Y position
- Slow autorotation (~0.05 rad/s) around Y axis
- Mouse parallax: scene offsets by `(mouseX * 0.3, mouseY * 0.3)` lerped
- Fog so distant points fade into bg
- Respects `prefers-reduced-motion` — falls back to a static CSS gradient

Behind the particle sphere:
- A second, sparser field of larger "stars" in the deep background for parallax depth
- A subtle radial gradient drawn in CSS behind the canvas for the glow

On top (DOM):
- Eyebrow: `// AI INFRASTRUCTURE ENGINEER` in mono, cyan, letter-spaced
- H1: `Jay` set in display-xl, with a glitch effect on hover (RGB-split via CSS)
- Sub: one-line positioning statement, text-secondary
- Two CTAs: `View work →` (scrolls to #work), `Get in touch` (mailto)
- Scroll hint at bottom: `↓ scroll` in mono, fading in/out

## Section specs

### Manifesto

A single short paragraph, three lines max, set in display-lg. This is the *opinion* the site expresses.

Draft:
> *Most candidates are either researchers who can't deploy or platform engineers who don't understand the model lifecycle. I'm the bridge. I write Go services and LoRA training loops in the same week. I run Talos clusters in my home lab. I think MCP is the most interesting integration surface we've shipped in a decade.*

### Work (Tier 1 — three marquee cards)

Each card:
- Project number (`01`, `02`, `03`) in mono, accent color
- Project name (display-lg)
- One-line tagline
- Stack tags (3–5 chips)
- Hover: card lifts 4px, accent border appears, background subtly shifts
- Click: routes to `/projects/[slug]`

Motion: cards stagger in by 80ms on scroll.

### Range (Tier 2 + Tier 3 grid)

8–10 smaller tiles in a responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop). Each tile:
- Project name
- One-liner
- Stack tags (2–3 max)
- External link icon → GitHub

No detail pages for these. Direct link out.

### About

- Short bio paragraph (3–4 sentences)
- Current location / setup line (e.g., "Currently in [city]. Runs a Ray cluster in the closet.")
- Photo placeholder (we'll ask Jay for a photo later — placeholder uses initials in a styled block)

### Stack

A horizontal marquee (CSS animation, paused on hover) of tools, grouped:
- **Infra**: Kubernetes, Talos, Ray Serve, Docker, Traefik, Caddy, Tailscale, LiteLLM
- **Languages**: Go, Python, TypeScript, GDScript, Bash
- **ML/AI**: PyTorch, LoRA, ComfyUI, LangGraph, MCP, LangFuse, Neo4j
- **Frontend**: Next.js, React, Three.js, Tailwind, shadcn

The marquee scrolls continuously, pauses on hover, and links each tool to its site.

### Contact

- Big CTA: `Let's talk.` in display-xl
- Email link (mailto) with copy-to-clipboard
- GitHub link with icon
- Résumé PDF download

## Implementation order (Phase 6)

1. **Scaffold** — `pnpm create next-app` with TS, Tailwind v4, App Router, src/, import alias `@/*`
2. **Install deps** — three, @react-three/fiber, @react-three/drei, motion, gsap, lucide-react, shadcn init, + MDX
3. **Tokens + globals** — write `globals.css` with Tailwind v4 `@theme` block + design tokens
4. **Layout shell** — fonts, metadata, scroll progress, nav, footer
5. **Hero** — Canvas + particle shader + DOM overlay
6. **Sections** — Manifesto, Work, Range, About, Stack, Contact
7. **Project pages** — MDX setup, three Tier-1 detail pages
8. **Résumé page** + **colophon page**
9. **SEO** — sitemap, robots, OG image, metadata
10. **Polish pass** — reduced-motion, focus rings, mobile breakpoints, perf check
11. **Verify** — start dev server, click through, run Lighthouse

## Definition of done for v1

- Site runs locally with `pnpm dev`, all sections render
- Hero hits 60fps on a 2020 MacBook Air (test in Chrome)
- Mobile layout works (test 375px / 414px / 768px breakpoints)
- Lighthouse Performance ≥ 85 mobile, ≥ 95 desktop
- Three project detail pages render from MDX with full content
- `mailto:` link works, résumé download works
- No console errors, no TypeScript errors
- Committed to git on `main`, repo is push-ready to GitHub

## What v1 deliberately defers

- Real screenshots / demo GIFs in project cards (placeholder gradient blocks until Jay provides)
- Jay's actual photo (initials block until provided)
- Real résumé PDF (HTML page generates one; PDF export TODO)
- Custom domain + deploy (we'll prep for Vercel; Jay triggers the actual deploy)
- Blog infrastructure
- Analytics
- Cookie banner (none — no tracking, no consent needed)
