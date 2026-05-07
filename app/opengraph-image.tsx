import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Autoškola POHL — Řidičský průkaz v Dobrušce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "#f8f6f2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: "#1e2f6e",
          }}
        />

        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1e2f6e",
            marginBottom: 16,
          }}
        >
          Akreditované školící středisko · Dobruška
        </p>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#171717",
            margin: 0,
            marginBottom: 24,
          }}
        >
          Autoškola POHL
        </h1>

        <p
          style={{
            fontSize: 24,
            color: "#555",
            margin: 0,
          }}
        >
          Skupiny AM · A1 · A2 · A · B · BE · B96 · C · CE
        </p>
      </div>
    ),
    { ...size }
  );
}
