"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import { LazyHeroScene } from "@/components/three/LazyHeroScene";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="grain relative flex min-h-dvh flex-col overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <LazyHeroScene />
      </div>

      {/* Radial vignette to anchor text */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(5,5,7,0.6) 80%, var(--color-bg) 100%)",
        }}
      />

      {/* Grid floor at the bottom for depth */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-[40vh] bg-grid opacity-30"
        style={{
          maskImage:
            "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pt-24 pb-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.28em] text-cyan"
          >
            <span className="inline-block size-1.5 rounded-full bg-cyan shadow-[0_0_12px_2px_var(--color-cyan)]" />
            {site.role}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-[clamp(3.5rem,12vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
          >
            <span className="block">{site.name}</span>
            <span className="block text-gradient-cm">engineer</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-sm text-bg transition-all hover:bg-cyan hover:shadow-[0_0_30px_-5px_var(--color-cyan)]"
            >
              <span>View work</span>
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-5 py-2.5 font-mono text-sm text-ink-muted backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-ink"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint"
        >
          <span>Scroll</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
