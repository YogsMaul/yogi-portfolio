import { HeroSection } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { ProjectGrid } from "@/components/sections/project-grid";
import { SkillsSection } from "@/components/sections/skills";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <AboutPreview />
      <ProjectGrid />
      <SkillsSection />
      <CTASection />
    </div>
  );
}
