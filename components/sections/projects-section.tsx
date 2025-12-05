"use client";

import { Marquee } from "@/components/ui/marquee";
import projects from "@/components/projectsData";
import { TextAnimate } from "@/components/ui/text-animate"
import CurvedLoop from "@/components/curvedloop/CurvedLoop";

type Project = {
  id: number | string;
  name: string;
  image: string;
  link: string;
};

const ProjectSection: React.FC = () => {
  return (
    <section className="bg-background text-foreground pt-24 lg:pt-32 pb-24 lg:pb-32 w-full" id="projects">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* TOP LABEL + BIG TITLE */}
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
          my experience
        </p>

        <h2 className="text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05] font-semibold tracking-tight mb-10">
          <TextAnimate animation="blurInUp" by="character" once as="span">
          My projects
          </TextAnimate>
        </h2>

        {/* TWO-COLUMN TEXT BLOCK */}
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 space-y-8">
            <div className="max-w-md text-sm sm:text-base text-muted-foreground">
              <TextAnimate animation="blurInUp" by="character" once as="p">
              I like to bring design, motion and a bit of generative art
              together to build interfaces that feel alive, yet stay simple and
              intuitive to use.
              </TextAnimate>
            </div>

            {/* Avatar / signature */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                <img
                  src="/images/steven_perfil.png"
                  alt="M. Steven Serna"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-sm leading-tight">
                <p className="font-medium">M. Steven Serna</p>
                <p className="text-xs text-muted-foreground">
                  Frontend & Creative Developer
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 space-y-6 lg:pt-4">
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold leading-snug">
            <TextAnimate animation="blurInUp" by="character" once as="p">
              I&apos;m a Fullstack developer focused on React, Next.js and
              modern UI and working with BBDD MySQL. I design and build digital products that feel fast,
              intentional and crafted – from clean landing pages to playful,
              generative experiences that leave a mark.
            </ TextAnimate>
            </div>

            <div className="text-sm text-muted-foreground">
               <TextAnimate animation="blurInUp" by="character" once as="p">
              Every project starts with a few simple questions: What are we
              trying to achieve? Who are we building this for? How can we make
              it effortless, accessible and enjoyable on every screen? This
              portfolio is a selection of the work that best reflects those
              answers.
              </TextAnimate>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: PROJECTS MARQUEE (replacing the big photo) */}
      <div className="mt-16 border-t border-border pt-10">
        <Marquee pauseOnHover className="py-8 [--duration:45s]">
          {(projects as Project[]).map(({ id, name, image, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="relative mx-4 rounded-2xl w-[320px] sm:w-[380px] lg:w-[460px] h-64 sm:h-72 lg:h-80 block overflow-hidden group border border-border bg-card"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              <span className="absolute top-4 right-4 bg-background/80 text-foreground text-xs lg:text-sm uppercase tracking-wide leading-[1.4] px-4 py-1 rounded-full border border-border">
                {name}
              </span>
            </a>
          ))}
        </Marquee>
      </div>
      <div>
        <CurvedLoop marqueeText="Building thoughtful interfaces — React · Next · TypeScript · Design" />
      </div>
    </section>
  );
};

export default ProjectSection;
