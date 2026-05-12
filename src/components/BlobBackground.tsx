"use client";

export default function BlobBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Warm blob top-left */}
      <div
        className="blob-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, oklch(82% 0.06 80) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Cobalt blob top-right */}
      <div
        className="blob-2 absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(68% 0.12 252) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Subtle blob bottom-center */}
      <div
        className="blob-3 absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(75% 0.08 190) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}
