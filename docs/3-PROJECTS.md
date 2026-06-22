# Phase 4 — Project Catalog

> Source of truth for what appears on the site. Each project has: slug, one-line pitch, role, stack, links, talking points. Marquee projects get detail pages; the rest live in the grid.

## Tier 1 — Marquee (3 featured, get full detail pages + hero placement)

These three tell the story end-to-end: I build the infra, I write the orchestration layer, and I tune the models.

---

### 1. `pux-ray` — Home AI cluster on Kubernetes Ray Serve

**Tagline**: A unified API for image, video, audio, 3D, and LLM generation — running on consumer GPUs in my home lab.

**Role**: Architect + sole engineer.

**Stack**: Kubernetes (Talos), KubeRay, Ray Serve, Wan2GP (mmgp offloading), Traefik, Python, Docker, MCP.

**Pitch**:
- One ingress (`/image`, `/video`, `/audio`, `/3d`, `/llm`) routes to model families on shared GPUs.
- VRAM-aware scheduling across 12+ model families with automatic offloading.
- MCP servers expose tools to agents; DAG pipelines compose multi-step workflows (character creation, video editing, pose transfer).
- Wired through Traefik + Tailscale so the cluster is reachable from anywhere.

**Links**: github.com/JayDataEngineer/pux-ray

**Why it matters for AI infra roles**: This is the exact pattern production AI teams are building — multi-model serving with VRAM management. Doing it on consumer hardware is harder than doing it on H100s.

---

### 2. `auto-developer-orchestrator` (PUX) — Agent orchestrator in Go

**Tagline**: A contract-based agent orchestrator with three first-class interfaces (Web, TUI, MCP) and a sandboxed execution environment.

**Role**: Architect + sole engineer.

**Stack**: Go 1.26, Bun (TUI), Docker (sandboxes), MCP, contract RPC.

**Pitch**:
- Go backend speaks a small contract language the Web UI, TUI, and MCP server all consume — so adding a new interface is mechanical, not architectural.
- Sandboxed desktop + browser + vision toolkit native to the runtime.
- Provider-agnostic: use Opus for planning and a local Qwen for execution in the same workflow.
- Designed against vendor lock-in — explicitly motivated by hostile billing practices from major AI labs.

**Links**: github.com/JayDataEngineer/auto-developer-orchestrator

**Why it matters**: Demonstrates systems thinking (contract-based design, three interfaces from one core), Go chops, and a clear point of view on vendor lock-in. The README itself is a position statement.

---

### 3. `deep-research-engine` — Multi-agent research with knowledge graph

**Tagline**: A 5-node pipeline (Ingest → Drafter → Critic → Neo4j → Synthesizer) that turns raw material into structured, queryable knowledge.

**Role**: Architect + sole engineer.

**Stack**: Python, LangGraph-style agent flow, Neo4j, LiteLLM, LangFuse, MCP, pgvector, MongoDB, MinIO.

**Pitch**:
- Drafter uses Flash Subagents + Specialist Sub-sub-agents to gather context and build drafts.
- Critic loops back to the Drafter when quality isn't there — generator-critic without the academic fluff.
- Optional Neo4j builder extracts entities and relationships for persistent, queryable knowledge graphs.
- Optional Synthesizer formats output to reports, threads, or podcast scripts.
- Plugged into LiteLLM for routing and LangFuse for prompt versioning + trace observability.

**Links**: github.com/JayDataEngineer/deep-research-engine (private — making public per Jay's note)

**Why it matters**: This is the exact shape of production research systems being built at AI labs in 2026. The critic loop and knowledge graph integration signal that Jay has thought about output quality, not just generation.

---

## Tier 2 — Marquee alternates (could swap in if any Tier 1 needs to drop)

### 4. `QwenTTS-Lora-Trainer` — Voice fine-tuning pipeline

**Tagline**: LoRA fine-tune Qwen3-TTS for custom character voices with emotion control, while preserving the base model's instruct-following.

**Stack**: Python, PyTorch, LoRA, SoX/audio preprocessing, IndexTTS2 (synthetic data), Faster-Whisper (ASR for real-recording mode).

**Pitch**:
- LoRA adapts ~1% of parameters (voice timbre) while keeping emotion pathways intact.
- Two data modes: synthetic (clone from a script) or real recordings (VAD + ASR pipeline).
- 8-emotion instruct sweep + LoRA scale sweep for testing.
- Anti-catastrophic-forgetting mixing data generated automatically.

**Links**: github.com/JayDataEngineer/QwenTTS-Lora-Trainer

---

### 5. `local-web-mcp` / `media-analysis-mcp` — Production MCP servers

**Tagline**: Two production-grade MCP servers — one for web research, one for media analysis — with proper deploy, observability, and resilience.

**Stack**: FastMCP, Crawl4AI, SeleniumBase, SearXNG, PostgreSQL, Redis, Caddy, Tailscale, Gluetun VPN.

**Pitch (web MCP)**:
- Multi-engine search (Brave, Bing, DDG, Ask) with 10-page pagination.
- Smart scraping waterfall: Crawl4AI → SeleniumBase (stealth) → blacklist.
- Domain learning — Postgres tracks which method works per domain.
- All traffic routed through Gluetun WireGuard tunnel; Caddy handles TLS via Tailscale.

**Pitch (media MCP)**:
- Vision (YOLOv8, Florence-2, SAM2), audio (transcription, diarization, fingerprinting), video (scene detection, keyframes).
- Face + voice embeddings with HDBSCAN clustering.
- CPU and GPU modes.

**Links**: github.com/JayDataEngineer/local-web-mcp, github.com/JayDataEngineer/media-analysis-mcp

**Why it matters**: MCP is the hottest integration surface in 2026. Showing two production deployments — not toy demos — signals real understanding.

---

### 6. `tech-noir-studio` — Godot survival horror game

**Tagline**: A survival horror game in Godot 4 — built alongside the AI tooling that generates its assets.

**Stack**: Godot 4 (GDScript), Blender, AI asset pipeline (ComfyUI + custom nodes).

**Pitch**: Demonstrates creative range and end-to-end product thinking — not just infra. Survival horror inventory research notes in the repo show rigorous design work.

**Links**: github.com/JayDataEngineer/tech-noir-studio

---

## Tier 3 — Range grid ("also shipped")

Six-to-eight tile entries, no detail pages. Direct GitHub links. These prove breadth.

| Project | One-liner | Stack |
|---|---|---|
| `make-llmstxt` | Generate llms.txt for documentation sites; multi-provider LLMs; LangFuse observability. | Python, MCP, LangChain |
| `common-voice-browser` | Browse + filter Mozilla Common Voice (200k+ hrs) by audio quality metrics. | Python, Gradio, SQLite |
| `postal-go` | Go client for the Postal mail server. | Go |
| `comfyui-pose-director` | ComfyUI node for directing character pose from reference. | Python, ComfyUI |
| `trellis2-inference` | Inference harness for Microsoft TRELLIS.2 image-to-3D. | Python, PyTorch |
| `redshiftdb-talos` | Talos Kubernetes cluster deployment for the home lab. | YAML, Talos, K8s |
| `redshiftdb-staging` | Go-based staging infrastructure. | Go |
| `act-scheduler-bot` | Telegram bot for community event RSVP. | Python, Telegram API |
| `z_img_expert` / `qwen_img_expert` | System prompts for Z-Image and Qwen3 image models. | Markdown, prompt engineering |
| `music-pipeline` | Automated music download, tagging, and library management. | Python |

---

## How projects appear on the site

```
HERO                    → name + positioning + 3D
MANIFESTO               → 3-line statement
#work (Tier 1)          → pux-ray, PUX, deep-research-engine
                          (large cards, motion, link to /projects/[slug])
#range (Tier 2+3)       → grid of 8–10 smaller tiles, GitHub-linked
ABOUT                   → bio paragraph + photo (optional)
STACK                   → tools clustered by category, shown in project context
CONTACT                 → email + GitHub + résumé PDF
```

## Projects we explicitly do NOT feature

- Forks of upstream repos (Comfy-Cozy, AniGen, kreuzberg, llama-go, firecrawl, TRELLIS.2, Wan2GP, see-through, stretchystudio, handcrafted-persona-engine, kan). They're study references, not portfolio work.
- `unified-llm-interface-backup` (backup, not a maintained product).
- `finetune` (too generic to feature without context).
- `twitter-agent`, `jellyfin_act` (interesting but small; could move to Tier 3 later).
- `kan-zitadel`, `postal-infra`, `shared-docker-infra` (infrastructure plumbing — strong evidence of skill but hard to make legible to a recruiter in a tile).

## Per-project assets we need from Jay (later)

For each Tier 1 project, ideally:
- 1 hero screenshot or short demo GIF (5–10s)
- 1 architecture diagram (can be auto-generated from the README's existing ASCII art, polished)
- Optional: 30-second Loom walkthrough

These are NOT blocking v1. The site ships with type + motion first; assets slot in when ready.
