// components/sections/how-i-work-section.tsx
"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiFigma,
  SiFramer,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

const steps = [
  {
    title: "Listen & understand",
    body: "I start by understanding the context: who we're building for, what problem we're solving, and what success looks like. This keeps design and code aligned with a clear goal.",
    tools: [
      { icon: <SiFigma />, label: "Figma" },
      { icon: <SiGit />, label: "Git" },
      { icon: <SiGithub />, label: "GitHub" },
    ],
  },
  {
    title: "Explore & prototype",
    body: "I translate ideas into quick wireframes, motion sketches or interactive prototypes using React, Next.js and modern UI libraries.",
    tools: [
      { icon: <SiReact />, label: "React" },
      { icon: <SiNextdotjs />, label: "Next.js" },
      { icon: <SiFramer />, label: "Framer Motion" },
      { icon: <SiTailwindcss />, label: "Tailwind CSS" },
    ],
  },
  {
    title: "Build & refine",
    body: "I turn the prototype into a production-ready interface with clean, maintainable code, focusing on performance, accessibility and details.",
    tools: [
      { icon: <SiTypescript />, label: "TypeScript" },
      { icon: <SiPostgresql />, label: "PostgreSQL" },
    ],
  },
  {
    title: "Deploy & ship",
    body: "I set up automated deployments and CI/CD pipelines to ensure fast, reliable releases. Every push is tested and shipped with confidence.",
    tools: [
      { icon: <SiVercel />, label: "Vercel" },
      { icon: <SiDocker />, label: "Docker" },
      { icon: <SiGithub />, label: "GitHub Actions" },
    ],
  },
];

export default function HowIWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const windowH = window.innerHeight;

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        // 0 = top of viewport, 1 = bottom
        const progress = Math.min(Math.max(cardCenter / windowH, 0), 1);

        // Cards start slightly scaled down and translated, animate to normal
        const distFromCenter = Math.abs(progress - 0.5) * 2; // 0 at center, 1 at edges
        const scale = 1 - distFromCenter * 0.05;
        const opacity = 1 - distFromCenter * 0.4;

        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Process · Collaboration
          </p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            How I work
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
            A simple process to move from vague ideas to polished, shippable
            interfaces — with clear communication at every step.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="rounded-3xl border border-border/60 bg-card p-10 shadow-lg transition-transform duration-100 will-change-transform sm:p-14"
              style={{ transformOrigin: "center center" }}
            >
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.title}
                </h3>

                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {step.body}
                </p>

                <div className="flex flex-wrap gap-2 pt-3">
                  {step.tools.map((tool) => (
                    <Badge
                      key={tool.label}
                      variant="secondary"
                      className="gap-1.5 px-3 py-1 text-sm font-normal"
                    >
                      <span className="text-base">{tool.icon}</span>
                      {tool.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
