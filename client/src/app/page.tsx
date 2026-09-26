import { SiteHeader } from "@/components/site-header";
import {
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  SiteFooter,
  SolutionsSection,
  TechnologySection,
} from "@/components/portfolio-sections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TechnologySection />
        <ServicesSection />
        <ProjectsSection />
        <SolutionsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
