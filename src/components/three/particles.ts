/**
 * GLSL for the hero particle field. Lives in a .ts file so we get syntax
 * highlighting via template literals and don't have to fight with bundler
 * loaders for .glsl files.
 *
 * The scene: a fibonacci-sphere distribution of ~3500 points, slowly
 * rotating, with a subtle 1/f noise displacement so the surface "breathes."
 * Color lerps cyan→magenta along Y, with a small violet band in the middle.
 */
export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vDist;

  // Cheap hash-based noise — good enough for a subtle wobble.
  // (We don't need perlin quality on a 4px point.)
  float hash(vec3 p) {
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p, p.yxz + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    vec3 pos = position;

    // Subtle radial displacement — the sphere "breathes".
    float n = hash(position * 1.7 + aSeed + uTime * 0.05);
    pos += normalize(position) * (n - 0.5) * 0.18;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation — farther points shrink.
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);

    vColor = aColor;
    vDist = length(pos);
  }
`;

export const particleFragmentShader = /* glsl */ `
  precision mediump float;

  varying vec3 vColor;
  varying float vDist;

  void main() {
    // Soft circular sprite from gl_PointCoord (0..1 across the point).
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    // Soft edge falloff + slight glow.
    float alpha = smoothstep(0.5, 0.0, d);
    alpha = pow(alpha, 1.6);

    // Fade points slightly toward the camera-facing edge so the silhouette
    // of the sphere reads as a volume, not a shell.
    float depthFade = smoothstep(1.6, 2.6, vDist);
    alpha *= 0.55 + 0.45 * depthFade;

    gl_FragColor = vec4(vColor, alpha);
  }
`;
