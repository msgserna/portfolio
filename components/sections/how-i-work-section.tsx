// components/sections/how-i-work-section.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";

const steps = [
  {
    title: "Listen & understand",
    body:
      "I start by understanding the context: who we’re building for, what problem we’re solving, and what success looks like. This keeps design and code aligned with a clear goal.",
  },
  {
    title: "Explore & prototype",
    body:
      "I translate ideas into quick wireframes, motion sketches or interactive prototypes using React, Next.js and modern UI libraries.",
  },
  {
    title: "Build & refine",
    body:
      "I turn the prototype into a production-ready interface with clean, maintainable code, focusing on performance, accessibility and details.",
  },
];

const skills = [
  "React & Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion / GSAP",
  "p5.js / generative visuals",
  "Git & GitHub",
  "Vercel & deployment",
];

export default function HowIWorkSection() {
  return (
    <section className="bg-background text-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Process · Collaboration
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            How I work
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A simple process to move from vague ideas to polished, shippable
            interfaces — with clear communication at every step.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12">
          {/* Steps */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, index) => (
              <BlurFade
                key={step.title}
                delay={0.25 + index * 0.1}
                inView
              >
                <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base sm:text-lg">
                        {step.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80 sm:inline-flex"
                      >
                        Step {index + 1}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pl-12 sm:pl-12">
                    <p className="text-sm text-muted-foreground">
                      {step.body}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>

          {/* Skills + MagicUI */}
          <div className="lg:col-span-5">
            <div className="relative h-full">
              {/* Glow / border animado */}
              <BorderBeam className="pointer-events-none absolute inset-0 rounded-3xl" />

              <BlurFade delay={0.4} inView className="h-full">
                <Card className="relative h-full border-border/60 bg-card/70 backdrop-blur-sm overflow-hidden rounded-3xl">
                  <CardHeader>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] uppercase tracking-[0.18em]"
                    >
                      Tools I like to work with
                    </Badge>
                    <CardTitle className="mt-2 text-lg sm:text-xl">
                      Tech & tools that shape my work
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      I mix a solid modern stack with motion and generative
                      visuals whenever it makes the experience better.
                    </p>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
