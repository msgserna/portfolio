// components/p5-portrait.tsx
"use client";

export default function P5Portrait() {
  return (
    <div className="h-full w-full overflow-hidden bg-background">
      <iframe
        src="/p5-portrait/index.html"
        title="Retrato generativo"
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}
