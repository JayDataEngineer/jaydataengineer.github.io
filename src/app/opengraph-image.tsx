import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050507",
          color: "#f5f5f7",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(0,231,255,0.16), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,43,214,0.14), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "#0c0c11",
              color: "#00e7ff",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            {site.name}.engineer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 22,
              color: "#00e7ff",
              fontFamily: "monospace",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{site.name}</span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00e7ff 0%, #8b5cf6 50%, #ff2bd6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              engineer
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#a1a1aa",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Builds the unglamorous, load-bearing infrastructure that makes
            creative AI run at scale.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
