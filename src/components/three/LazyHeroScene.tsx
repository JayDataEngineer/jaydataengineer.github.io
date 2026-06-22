"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

/**
 * SSR-safe + reduced-motion-aware hero scene wrapper.
 * The Canvas only loads on the client, after first paint.
 */
const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

export function LazyHeroScene() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <HeroScene />;
}
