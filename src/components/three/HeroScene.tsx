"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { particleVertexShader, particleFragmentShader } from "./particles";

const COUNT = 3500;
const RADIUS = 2.35;

/**
 * Fibonacci sphere distribution — perfectly even points on a sphere,
 * no clumping at the poles. Better than random for this aesthetic.
 */
function fibonacciSphere(n: number, radius: number): THREE.BufferAttribute {
  const positions = new Float32Array(n * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // -1..1
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    positions[i * 3 + 0] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
  }
  return new THREE.BufferAttribute(positions, 3);
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Build all geometry once.
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = fibonacciSphere(COUNT, RADIUS);

    const scales = new Float32Array(COUNT);
    const seeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    // Color gradient stops: cyan (top) -> violet (middle) -> magenta (bottom).
    const cTop = new THREE.Color("#00e7ff");
    const cMid = new THREE.Color("#8b5cf6");
    const cBot = new THREE.Color("#ff2bd6");

    for (let i = 0; i < COUNT; i++) {
      // Vary point size — most points small, a few larger "stars".
      const r = Math.random();
      scales[i] = r < 0.92 ? 6 + Math.random() * 14 : 24 + Math.random() * 30;
      seeds[i] = Math.random() * 100;

      const y = positions.array[i * 3 + 1] / RADIUS; // -1..1
      const t = (y + 1) / 2; // 0..1
      const color = t < 0.5
        ? cTop.clone().lerp(cMid, t * 2)
        : cMid.clone().lerp(cBot, (t - 0.5) * 2);
      colors[i * 3 + 0] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute("position", positions);
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !matRef.current) return;

    // Slow autorotation — one full revolution every ~80s.
    pointsRef.current.rotation.y += delta * 0.075;

    // Mouse parallax — tilt the whole field slightly toward the pointer.
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      pointer.current.y * 0.18,
      delta * 2,
    );
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      pointer.current.x * -0.04,
      delta * 2,
    );

    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 28 },
      uPixelRatio: {
        value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2),
      },
    }),
    [],
  );

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Far-back starfield — sparse, large, slow. Adds parallax depth.
 */
function StarField() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 180;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // Random in a large shell behind the main field.
      const r = 8 + Math.random() * 6;
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
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Ambient light isn't needed (we use a custom shader) but fog adds depth. */}
      <fog attach="fog" args={["#050507", 5.5, 12]} />
      <StarField />
      <ParticleField />
    </Canvas>
  );
}
