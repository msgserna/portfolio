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
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

export default function HeroSection() {
  return (
    <section className="h-screen w-screen bg-transparent p-0">
      {/* Contenedor 100% x 100% */}
      
      <div className="flex h-full w-full overflow-hidden">
        {/* IZQUIERDA -> 50% */}
        <div className="relative h-full w-1/2 overflow-hidden">
          {/* Capa transparente para SmoothCursor / SmoothPointer */}
          <div className="absolute inset-0 bg-transparent" />

          {/* Aquí solo se monta el canvas */}
          <P5Portrait />

          {/* Si quieres, luego volvemos a meter el degradado, pero primero que se vea bien el trazo */}
          {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_hsl(var(--background))_80%,_hsl(var(--background))_100%)]" /> */}
        </div>

        {/* DERECHA -> 50% */}
        <div className="flex h-full w-1/2 flex-col justify-between px-8 py-10 lg:px-16 lg:py-16">
          {/* BLOQUE SUPERIOR: Thinking in + MorphingText */}
          <div className="mt-[100px] space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Thinking in...
            </p>
            <div className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <MorphingText
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

          {/* BLOQUE CENTRAL: Nombre, rol, botones */}
          <div className="space-y-4">
            <Badge
              variant="outline"
              className="mt-20 text-xs uppercase tracking-[0.35em] text-muted-foreground"
            >
              Web Developer
            </Badge>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TextAnimate animation="blurInUp" by="character" once as="span">
                  Hi, i&apos;m M. Steven Serna
                </TextAnimate>
              </h1>

              <div className="mt-2 text-lg text-muted-foreground">
                <TextAnimate animation="blurInUp" by="character" once as="p">
                  I enjoy breaking down complex ideas into simple, usable
                  interfaces and I’m constantly exploring new tools and
                  technologies to improve my work—especially within the React
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
          </div>

          {/* LOOP DE LOGOS */}
          <div
            style={{
              height: "120px",
              width: "50vw",
              position: "relative",
            }}
            className="mt-4"
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
              fadeOutColor="hsl(var(--background) / 0.9)" // 90% opaco
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
