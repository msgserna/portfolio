// app/page.tsx
import HeroSection from "@/components/sections/hero-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { DockDemo } from "@/components/sections/mymenu";
import ProjectSection from "@/components/sections/projects-section";
import HowIWorkSection from "@/components/sections/how-i-work-section";
import Footer from "@/components/sections/footer";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { ChevronLeft,ChevronRight, FileCode } from "lucide-react";

export default function HomePage() {
  return (
    <main className="absolute top-0 left-0 min-h-screen w-full bg-transparent text-foreground overflow-x-hidden">
      <SmoothCursor />
      <ScrollProgress />
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-end px-4 lg:px-16">
        <DockDemo />
      </div>

      <div className="flex flex-col items-center justify-center gap-3 pt-16 w-full">
        <HeroSection />
        <HowIWorkSection />
        <div className="h-60 w-full px-4 lg:px-16 flex items-center justify-center">
        <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl">
          <ScrollVelocityRow baseVelocity={10} direction={1}>
          Full Stack Developer 
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={10} direction={-1}>
            Full Stack Developer 
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        </div>
        <ProjectSection />
        <Footer />
      </div>
    </main>
  );
}
