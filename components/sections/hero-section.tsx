// components/sections/hero-section.tsx
"use client";

import { LogoLoop } from "@/components/logoloop/LogoLoop";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";
import P5Portrait from "@/components/p5-portrait";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MorphingText } from "@/components/ui/morphing-text";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiCss,
  SiGit,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiDocker,
} from "react-icons/si";

const techLogos = [
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiCss />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
];

export default function HeroSection() {
  return (
    <section className="h-screen w-screen bg-transparent p-0">
      <div className="flex h-full w-full overflow-hidden">
        {/* IZQUIERDA -> 50% */}
        <div className="relative h-full w-1/2 overflow-hidden">
          {/* Capa transparente para SmoothCursor / SmoothPointer (si la necesitas) */}
          <div className="absolute inset-0 bg-transparent" />

          {/* Canvas p5 */}
          <P5Portrait />

          {/* Degradado radial por ENCIMA del canvas */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_10%,_hsl(var(--background))_60%)]" />
        </div>

        {/* DERECHA -> 50% */}
        <div className="flex h-full w-1/2 flex-col justify-between px-8 py-10 lg:px-16 lg:py-16">
          <div className="mt-[100px] space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Thinking in...
            </p>
            <div className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <MorphingText
                className="mx-0 text-left"
                texts={[
                  "Solutions",
                  "Innovation",
                  "Experiences",
                  "Interfaces",
                  "Products",
                ]}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Badge
              variant="outline"
              className="mt-20 text-xs uppercase tracking-[0.35em] text-muted-foreground"
            >
            App Web Developer
            </Badge>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TextAnimate animation="blurInUp" by="character" once as="span">
                  Hi, i&apos;m M. Steven Serna
                </TextAnimate>
              </h1>

              <div className="mt-5 max-w-lg text-md text-muted-foreground">
                <TextAnimate animation="blurInUp" by="character" once as="p">
                  I enjoy breaking down complex ideas into simple, usable
                  interfaces and I’m constantly exploring new tools and technologies to improve my work especially within the React
                  and Next.js ecosystem.
                </TextAnimate>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <a href="#projects" rel="noreferrer">
                <InteractiveHoverButton>Projects</InteractiveHoverButton>
              </a>
              <a
                href="https://github.com/msgserna"
                target="_blank"
                rel="noreferrer"
              >
                <InteractiveHoverButton>GitHub</InteractiveHoverButton>
              </a>
            </div>

            <div
              style={{
                height: "120px",
              }}
              className="w-full mt-20 overflow-hidden rounded-lg"
            >
              <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                ariaLabel="Technology partners"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
