# Phase 2 — Portfolio Strategy & Site Feel

> How the site should *feel* and *what it argues about Jay*.

## The thesis in one sentence

**Jay builds the unglamorous, load-bearing infrastructure that makes creative AI run at scale — and ships the creative applications on top of it.**

This is rare. Most candidates are either "ML researcher who can't deploy" or "platform engineer who doesn't understand the model lifecycle." Jay is the bridge: he writes Go services and LoRA training loops in the same week, runs Talos clusters in his home lab, and has a Godot survival horror game on the side. The site's job is to make that breadth legible in 90 seconds.

## What the site must accomplish, in priority order

1. **First scroll**: convince a recruiter / hiring manager / staff engineer skimming at 11pm that this person is senior, opinionated, and ships. Accomplished via the hero — name, one-line positioning, motion that signals craft.
2. **First 30 seconds**: show 3–4 marquee projects with depth, not 12 thumbnails. Recruiters click maybe two. Pick the two we want them to click and make them impossible to miss.
3. **First 2 minutes**: prove range. AI infra → distributed systems → creative AI → game dev. Without range, "AI Infrastructure Engineer" reads as narrow; with it, the positioning reads as a deliberate choice.
4. **Last scroll**: convert. Easy contact, GitHub link, résumé download, no friction.

## What the site explicitly does NOT do

- **No blog by default.** A blog is a graveyard if you don't post. v1 ships without one; v2 can add it once there's content.
- **No fake metrics.** No "5+ years experience," no "50+ projects shipped." If we can't source a number honestly, we don't put one up.
- **No stock photography or AI-generated hero images of abstract gradients.** Either real screenshots of Jay's actual work, or pure motion / type / 3D.
- **No "skills matrix" with 5-star ratings.** That's a junior tell. We use a stack section that *shows* the tools in context of real projects instead.
- **No dark-mode toggle.** Dark is the default and the only mode. Cleaner brand, less code, more committed aesthetic.

## Information architecture

```
/                       ← single-page scroll for the core story
  ├─ #hero              ← name + positioning + 3D
  ├─ #manifesto         ← 3-line statement of how Jay thinks about the work
  ├─ #work              ← 3–4 marquee projects with motion
  ├─ #range             ← secondary project grid ("also shipped")
  ├─ #about             ← bio, current obsessions, photo optional
  ├─ #stack             ← tools in context (no ratings)
  └─ #contact           ← CTA, email, GitHub, résumé download

/projects/[slug]        ← long-form detail pages for the 3–4 marquee projects
/resume                 ← static résumé page (HTML + PDF download)
/colophon               ← "this site is built with…" — meta flex for engineers
```

Single-page scroll for the core narrative. Project detail pages exist for the marquee work only — every other project lives in the grid with a direct GitHub link, no detail page. This keeps the writing surface manageable.

## Tone of voice

- **Senior, dry, specific.** "Distributed systems for generative AI" beats "Passionate engineer crafting delightful experiences."
- **Verbs over adjectives.** "Ships," "tunes," "debugs," "orchestrates" — not "loves," "enjoys," "is passionate about."
- **No exclamation points.** No emoji (except in code-block tool names where they appear in the actual project).
- **Specific > generic.** "VRAM-aware scheduling across 12 model families" beats "intelligent resource management."

## The 90-second pitch the site should encode

> I'm Jay. I build the infrastructure that lets creative AI run at scale.
> My home lab runs a Ray Serve cluster on Talos Kubernetes that generates images, video, audio, 3D, and text through one unified API. I wrote the agent orchestrator that drives it in Go. I tune TTS models with LoRA for emotion-controlled character voices. I ship the MCP servers that let agents reach into the cluster.
> The portfolio below is what I've shipped. Pick any project and dig in.

## Why this strategy beats the alternatives

| Alternative strategy | Why we rejected it |
|---|---|
| Minimal editorial (white, serif, restrained) | Beautiful but doesn't signal "extreme frontend expert." The brief asks for jaw-dropping. |
| Blog-first personal site | Requires sustained writing output Jay hasn't committed to. |
| Multi-page traditional portfolio (Home / About / Projects / Blog / Contact as separate routes) | Distributes the narrative. Recruiters drop off. |
| Link-in-bio style minimal page | Under-sells the breadth. |
| Heavy case-study format (5+ project detail pages) | Writing surface too large for v1; risks unfinished pages. |

## Success criteria

After v1 ships, the site is successful if:

- A staff engineer at an AI lab can skim it in 90 seconds and walk away with: "this person runs real infra, writes Go, trains models, and clearly cares about craft."
- A recruiter can copy-paste the hero positioning line into a hiring committee note and have it be accurate.
- The site itself, on its own merits, gets shared in engineering circles as "look at this portfolio" — i.e., the site *is* a portfolio piece.
