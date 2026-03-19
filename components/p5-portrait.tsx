// components/p5-portrait.tsx
"use client";

import { useEffect, useRef } from "react";

export default function P5Portrait() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const sendTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      iframeRef.current?.contentWindow?.postMessage(
        { type: "theme-change", theme: isDark ? "dark" : "light" },
        "*"
      );
    };

    // Observar cambios de clase en <html> (next-themes / toggler)
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden bg-background">
      <iframe
        ref={iframeRef}
        src="/p5-portrait/index.html"
        title="Retrato generativo"
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}
