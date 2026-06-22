# Phase 7 — Next-Project Backlog

> Resume-boosting project ideas. Each one is concrete, ships in days (not weeks), and layers onto the existing homelab + portfolio narrative. Goal: every project here makes a hiring manager say "this person has shipped the hard version, not just the demo."

## How to read this doc

For each project:
- **Pitch** — one line a recruiter/hiring manager would understand.
- **Signal** — what competency it demonstrates (this is what interviewers will probe).
- **Effort** — honest estimate in days.
- **MVP scope** — the minimum that ships and reads as real.
- **Leverages** — what existing homelab/portfolio piece it builds on, so the marginal cost is small.
- **Talking points** — the 3 things you'd say in an interview about it.

Priority order is roughly: highest signal-to-effort ratio first.

---

## Tier A — Weekend projects (1–3 days, ship immediately)

These read as production engineering on a personal lab. Highest signal-to-effort on the resume.

### A1. LLM Gateway in Go (`pux-gateway`)

**Pitch**: A reverse-proxy that sits between clients and the model API, adding per-tenant auth, rate limiting, cost accounting, and request tracing.

**Signal**: Platform thinking. Demonstrates you can build the layer that turns "a model on a GPU" into "a product surface." This is the exact thing companies hiring "AI Infra Engineer" actually need.

**Effort**: 2 days.

**MVP scope**:
- `~200 LOC` Go binary, single config file
- Routes `POST /v1/chat/completions` to one upstream (Ollama / vLLM / Ray Serve)
- Middleware chain: API-key auth → per-key token-bucket rate limit → request log (model, tokens, latency, cost) → upstream forward
- Prometheus metrics at `/metrics`
- README with `curl` examples

**Leverages**: Sits in front of `pux-ray`. Gives the existing cluster a real product surface.

**Talking points**:
- Why token-bucket over leaky-bucket for LLM workloads (burst tolerance vs. sustained throughput).
- How to meter cost server-side without trusting the upstream's token counts.
- Why a separate gateway matters: model swap (Claude → self-hosted) shouldn't require client changes.

---

### A2. Speculative Decoding Benchmark (`spec-decode-bench`)

**Pitch**: Quantifies the throughput win from speculative decoding on llama.cpp across model sizes and draft-model pairings.

**Signal**: Systems-level performance intuition. Most candidates talk about "fast LLMs"; this shows you've actually measured one.

**Effort**: 1 day.

**MVP scope**:
- Python harness that loads `{7B, 13B, 70B}` base + draft models via llama.cpp
- Runs fixed prompt set (`prompts.jsonl`)
- Reports: tokens/sec, accept rate, VRAM peak, time-to-first-token
- Markdown table + matplotlib chart in README
- Reproducible: pin llama.cpp commit + model SHAs

**Leverages**: Existing Ray Serve cluster has the GPUs already. Just book time on them.

**Talking points**:
- Why accept rate matters more than raw tokens/sec at scale.
- The latency/throughput tradeoff — spec decoding hurts TTFT, helps steady-state. When is that the right call?
- What the bench *didn't* measure (KV cache reuse, batching gain) and why you'd add it next.

---

### A3. Eval Harness for Agent Loops (`agent-evals`)

**Pitch**: JSONL test cases that replay agent conversations and assert on tool-call sequences, final answers, and token budgets.

**Signal**: AI engineering rigor. Shows you know that "it works in the demo" is not the same as "it works in production."

**Effort**: 2 days.

**MVP scope**:
- `cases/*.jsonl` — each row is `{input, expected_tools, expected_pattern, max_tokens, max_steps}`
- Runner in Python: spawns the agent with the input, intercepts tool calls, asserts on the sequence
- Reports: pass/fail per case + aggregate (e.g. "PUX passes 47/52 cases")
- CI-mode: exits non-zero on regression
- Seed with 10–20 cases targeting `pux` and the MCP servers

**Leverages**: Replays through `pux` and the existing MCP servers. Turns the existing demos into a test suite.

**Talking points**:
- Why structural assertions (which tools, in what order) are more reliable than text assertions.
- How to handle non-determinism: temperature=0 doesn't fully fix it. Multi-run voting.
- The regression-protection angle: this is what stops an LLM swap from silently breaking production.

---

### A4. MCP Server Stress Tester (`mcp-stress`)

**Pitch**: A CLI that hammers an MCP server with realistic tool-call traffic and reports p50/p95/p99 latency plus correctness (did the response match a recorded fixture?).

**Signal**: Production mindset. Shows you think about reliability, not just "does it work once."

**Effort**: 1 day.

**MVP scope**:
- Go binary, ~150 LOC
- Reads a `fixtures.jsonl` of tool calls + expected responses (or schemas)
- Concurrent runners (10, 100, 1000 RPS), per-call timing
- Output: latency histogram + correctness % + failure breakdown
- Used in CI: `mcp-stress --threshold-p99=500ms` exits non-zero

**Leverages**: The two MCP servers (web-research, media-analysis) are already running. Test them.

**Talking points**:
- Why correctness-under-load is the real metric, not raw throughput.
- What breaks first in an MCP server: the model call, the network egress, the schema validation.
- How this differs from `k6` / `wrk`: tool-call semantics, not just HTTP.

---

### A5. Quantization Bake-off (`quant-bake`)

**Pitch**: Takes a model, produces GPTQ / AWQ / INT8 / FP16 variants, benchmarks all of them on identical workloads, picks the Pareto-optimal one.

**Signal**: Hands-on with the full optimization stack. Most resumes say "experience with quantization"; this is a repo that proves it.

**Effort**: 2 days.

**MVP scope**:
- One Python script per quant method (`gptq.py`, `awq.py`, etc.)
- Calibrate on a fixed corpus
- Benchmark each variant on the same eval set (use A2's harness)
- Output: a single comparison table + recommendation
- Pick one model (e.g. Qwen2.5-7B) to keep scope tight

**Leverages**: Same Ray Serve GPUs. Same benchmark harness as A2.

**Talking points**:
- Quality degradation by quant method — which loses the most on long-form generation vs. tool-use.
- VRAM/throughput Pareto frontier — when INT8 is enough, when you need FP16.
- Why "the smallest model that fits the SLA" is the right framing for cost.

---

## Tier B — Week projects (4–7 days, ship when you can focus)

Bigger pieces. These are the ones that move a "junior" read into "mid" or "mid" into "senior."

### B1. OpenTelemetry for Ray Serve (`ray-otel`)

**Pitch**: A wrapper that emits OpenTelemetry traces for every Ray Serve request, with spans for queue time, model load, inference, and post-processing.

**Signal**: Observability depth. The "where do I add the span" question is one of the most revealing interview questions for AI infra candidates.

**Effort**: 5 days.

**MVP scope**:
- Python package, drop-in decorator
- Spans: `serve.handle` → `model.preprocess` → `model.infer` → `model.postprocess`
- Exports to OTLP (works with Tempo, Jaeger, Honeycomb, Grafana Cloud free tier)
- Screenshots of real traces in README
- One deployed example on `pux-ray`

**Leverages**: Existing Ray Serve cluster. The screenshots sell it.

**Talking points**:
- Why queue time and inference time need separate spans (they have different SLOs).
- The cost of tracing at scale: sampling strategies.
- How this catches real bugs: "we found model.load was 40% of p99 latency for cold starts."

---

### B2. KV-Cache-Aware Router (`kv-router`)

**Pitch**: A routing layer in front of multiple LLM replicas that routes requests to the replica most likely to have the prefix cached, improving cache hit rate.

**Signal**: Deep systems thinking. Demonstrates you understand *why* LLM serving is hard, not just *how* to serve one.

**Effort**: 7 days.

**MVP scope**:
- Go or Rust router
- Tracks prefix hashes per replica
- Routes new requests to the replica with the longest matching prefix
- Falls back to least-loaded if no cache hit
- Benchmark: 2–4 vLLM replicas, mixed prompt workload, report cache hit % uplift

**Leverages**: Multiple Ray Serve deployments behind one ingress.

**Talking points**:
- Why naive round-robin destroys cache hit rate.
- Prefix hashing tradeoffs: full SHA vs. rolling hash.
- What changes at scale (1000 replicas vs. 4).

---

### B3. Sandbox for Agent Tool Execution (`agent-sandbox`)

**Pitch**: A minimal container-per-session execution environment that lets agents run untrusted code (Python, shell) with resource limits and audit logging.

**Signal**: Security + infra. Tells hiring managers "I take production safety seriously."

**Effort**: 6 days.

**MVP scope**:
- Go orchestrator that spins up firecracker containers (or gVisor runsc) per session
- Per-session: CPU/memory/wall-time limits, no network by default, allowlist egress
- Audit log of every command run + output
- HTTP API for agents: `POST /exec {session, code}` → `{stdout, stderr, exit_code}`
- Example: wire into an MCP tool

**Leverages**: Lives on the homelab. Can be the sandbox layer for `pux`.

**Talking points**:
- Why firecracker over Docker for untrusted code (VM boundary vs. namespace boundary).
- The egress allowlist problem: agents need *some* network, never *all* network.
- Audit logs as the security primitive, not prevention.

---

### B4. Prompt Cache Middleware (`prompt-cache`)

**Pitch**: Sits between client and LLM, hashes the prompt prefix, returns cached responses for prefix-stable requests.

**Signal**: Cost engineering. Every company serving LLMs at scale cares about this; very few have it.

**Effort**: 4 days.

**MVP scope**:
- Redis-backed cache
- Prefix-tree key for partial prefix matching
- TTL + LRU eviction
- Cache headers in the API response (so clients can opt out)
- Bench: 70%+ hit rate on a realistic workload, ~50ms p99 vs. ~2s p99 cold

**Leverages**: Same Redis already in the homelab stack.

**Talking points**:
- When cache hits *hurt* (retrieval pipelines, RAG with fresh docs).
- Hashing strategy: structural (AST) vs. raw text.
- Why most teams should build this before they build anything fancier.

---

## Tier C — Multi-week marquee (only if there's time)

These would replace one of the current marquee projects or sit alongside them. Skip unless you have a real block of time.

### C1. GPU Multiplexer for Kubernetes (`gpu-mux`)

**Pitch**: Time-shares a single GPU across multiple low-utilization workloads via MPS or MIG slicing, with a scheduler that allocates fractional GPUs to pods.

**Signal**: This is the kind of thing Nvidia charges money for. Building it as OSS is a serious flex.

**Effort**: 2–3 weeks.

**MVP scope**:
- K8s device plugin that exposes fractional GPU resources
- Scheduler extender that places pods based on current utilization
- Default policy: MPS for compatible workloads, MIG for incompatible
- Demo: 4 pods sharing 1 GPU, all hitting their SLO

**Leverages**: Pux Ray cluster has the GPUs.

### C2. Distributed Inference Control Plane (`ray-control`)

**Pitch**: A web UI + API for managing Ray Serve deployments: deploy, scale, rollback, route traffic, drain nodes — the "control plane" that production inference clusters actually need.

**Signal**: Platform engineering depth. The thing every team wants and nobody has time to build.

**Effort**: 3–4 weeks.

**MVP scope**:
- Read API: list deployments, replicas, versions, traffic splits, SLOs
- Write API: deploy new version, canary 10%, promote, rollback
- Web UI: minimal but real (Next.js + the existing design system from this site)
- Auth + audit log

**Leverages**: The existing Pux Ray cluster is the demo target.

---

## Anti-patterns — what NOT to build

These all read as "beginner project" on a resume and would dilute the signal:

- **Another RAG chatbot over my notes** — everyone has one. Doesn't differentiate.
- **A wrapper around the OpenAI API** — no infra depth.
- **A Discord/Slack bot** — fine as a hobby project, reads as junior on a resume.
- **"I trained a model from scratch"** — without a *specific* reason, this signals you don't know that fine-tuning is usually the right answer.
- **A clone of an existing OSS project** — only worth doing if you can articulate why yours is meaningfully different.
- **Anything with "v1", "MVP", or "experimental" in the README** — read as unfinished. Ship it as 1.0 or don't ship it.

## Recommended shipping order

If you only do three:

1. **A1 (LLM Gateway)** — most directly aligned with "AI Infra Engineer" job descriptions.
2. **A3 (Agent Evals)** — shows rigor, and turns existing work into a test suite.
3. **B1 (OTel for Ray Serve)** — observability story makes the homelab read as production.

These three together would shift the portfolio from "I built some things" to "I build, observe, and test production AI infrastructure." That is the gap most candidates have.

## How each project updates the site

Each new project gets:
1. A new `.mdx` file in `src/content/projects/` with frontmatter
2. Either promoted to marquee (if Tier B/C) or added to the Range grid (if Tier A)
3. A row in `/resume` under "Selected projects"
4. Mentioned in the relevant `About` trajectory entry if it represents a meaningful expansion

The site's MDX-driven architecture means a new project is a 5-minute add once the code is shipped — no site refactor needed.
