"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * The hero: a single wireframe icosahedron rendered three times at slightly
 * different scales with additive blending. Where the three wireframes overlap
 * they sum toward white; where they diverge you see the cyan / violet / magenta
 * fringes that read as chromatic aberration. Slow autorotation + mouse
 * parallax. Reduced-motion collapses to a static frame.
 */

const ICOSA_RADIUS = 1.7;

function Icosahedron() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // One geometry, three materials — the wireframe detail=0 icosahedron has 20
  // triangular faces and 30 unique edges; wireframe:true renders exactly those
  // edges (no interior diagonals at detail=0).
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(ICOSA_RADIUS, 0), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow autorotation — one revolution every ~40s on Y.
    groupRef.current.rotation.y += delta * (Math.PI * 2) / 40;

    // Mouse parallax with a subtle slow wobble baked into the X target so the
    // rig never feels fully static even when the pointer is centered.
    const wobble = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.current.y * 0.18 + wobble,
      delta * 2,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      pointer.current.x * -0.10,
      delta * 2,
    );
  });

  // Three passes — wide-enough scale deltas (±4%) that each color reads as a
  // visible fringe rather than dissolving into a single white line. Violet is
  // the core; cyan sits slightly inside, magenta slightly outside. Additive
  // blending sums the overlap toward white.
  const passes = useMemo(
    () =>
      [
        { scale: 0.96, color: "#00e7ff", opacity: 0.7 }, // cyan, inner fringe
        { scale: 1.0, color: "#8b5cf6", opacity: 0.95 }, // violet, core
        { scale: 1.04, color: "#ff2bd6", opacity: 0.7 }, // magenta, outer fringe
      ] as const,
    [],
  );

  return (
    <group ref={groupRef}>
      {passes.map((p, i) => (
        <mesh key={i} geometry={geometry} scale={p.scale}>
          <meshBasicMaterial
            color={p.color}
            wireframe
            transparent
            opacity={p.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Sparse starfield in a wide shell behind the icosahedron. Adds parallax depth
 * without competing for attention.
 */
function Halo() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 320;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        color="#9aa3b8"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#050507", 5, 12]} />
      <Halo />
      <Icosahedron />
    </Canvas>
  );
}
