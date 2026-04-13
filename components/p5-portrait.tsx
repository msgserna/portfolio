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

    // Pausar/reanudar el sketch según visibilidad del iframe
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        iframeRef.current?.contentWindow?.postMessage(
          { type: entry.isIntersecting ? "resume" : "pause" },
          "*"
        );
      },
      { threshold: 0.1 }
    );
    if (iframeRef.current) visibilityObserver.observe(iframeRef.current);

    // Observar cambios de clase en <html> (next-themes / toggler)
    const themeObserver = new MutationObserver(sendTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      visibilityObserver.disconnect();
      themeObserver.disconnect();
    };
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
