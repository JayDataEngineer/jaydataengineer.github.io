/**
 * Site-wide configuration. Edit values here to update the entire site.
 * Keep this the single source of truth — don't hardcode name/email/links
 * anywhere else.
 */
export const site = {
  name: "Jay",
  handle: "JayDataEngineer",
  role: "AI Infrastructure Engineer",
  // Single-line positioning statement. Used in metadata + hero.
  tagline:
    "Builds the unglamorous, load-bearing infrastructure that makes creative AI run at scale.",
  // Used for <meta name="description"> + OG description.
  description:
    "Jay is an AI infrastructure engineer who ships distributed systems for generative AI — Ray Serve on Kubernetes, agent orchestrators in Go, multi-agent research pipelines, and the MCP servers that connect them.",
  keywords: [
    "AI infrastructure engineer",
    "distributed systems",
    "Ray Serve",
    "Kubernetes",
    "Talos",
    "Go",
    "Python",
    "MCP",
    "LLM",
    "agent orchestration",
  ] as string[],
  url: "https://jaydataengineer.github.io",
  email: "CodeEngineering@pm.me",
  github: "https://github.com/JayDataEngineer",
  // Initials for the avatar fallback block
  initials: "JD",
  // Where the user is based (leave empty if you'd rather not say)
  location: "",
} as const;

export type Site = typeof site;
