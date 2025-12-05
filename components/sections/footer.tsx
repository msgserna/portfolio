// components/layout/site-footer.tsx
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-10">
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-tight">
            M. Steven Serna
          </p>
          <p className="text-xs text-muted-foreground">
            Frontend & Creative Developer — building interfaces with React,
            Next.js and generative visuals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-muted-foreground">
            Let&apos;s build something together.
          </span>
          <div className="flex gap-2">
            <Link
              href="mailto:msg.serna.dev@gmail.com"
              aria-label="Email"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full"
              )}
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/msgserna"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full"
              )}
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/msserna"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full"
              )}
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
