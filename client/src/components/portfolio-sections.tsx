import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
} from "lucide-react";
import { portfolioContent } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/contact-form";
import { Icon, SocialIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";

export function HeroSection() {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="availability">
          <span className="availability-dot" aria-hidden="true" />
          {portfolioContent.hero.status}
        </p>
        <h1 id="hero-title">
          {portfolioContent.hero.greeting} <span>{portfolioContent.hero.name}</span>
        </h1>
        <p className="hero-description">{portfolioContent.hero.description}</p>
        <div className="hero-actions">
          <a className="button" href="#contact">
            Contact Me <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a className="button button-secondary" href={portfolioContent.hero.resumeHref}>
            Download CV <ArrowDownToLine aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
      <div className="hero-portrait-wrap">
        <Image
          className="hero-portrait"
          src={portfolioContent.hero.portrait}
          alt={portfolioContent.hero.portraitAlt}
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 760px) 76vw, 404px"
        />
      </div>
    </section>
  );
}

export function TechnologySection() {
  return (
    <section className="section-wrap technology-section" aria-labelledby="technology-title">
      <SectionHeading
        id="technology-title"
        title={portfolioContent.technologyHeading.title}
        description={portfolioContent.technologyHeading.description}
      />
      <ul className="technology-list">
        {portfolioContent.technologies.map((technology) => (
          <li className="technology-chip" key={technology.name}>
            <span className="chip-icon">
              <Icon name={technology.icon} size={16} />
            </span>
            <span>{technology.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section-wrap content-section" id="services" aria-labelledby="services-title">
      <SectionHeading
        id="services-title"
        title={portfolioContent.serviceHeading.title}
        description={portfolioContent.serviceHeading.description}
      />
      <div className="services-grid">
        {portfolioContent.services.map((service) => (
          <article className="service-card" key={service.title}>
            <span className="service-icon">
              <Icon name={service.icon} size={21} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section className="section-wrap content-section" id="portfolio" aria-labelledby="projects-title">
      <SectionHeading
        id="projects-title"
        title={portfolioContent.projectHeading.title}
        description={portfolioContent.projectHeading.description}
      />
      <div className="projects-grid">
        {portfolioContent.projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-image-wrap">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1400}
                height={400}
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 45vw, 30vw"
              />
            </div>
            <div className="project-info">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-tags" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SolutionsSection() {
  return (
    <section className="section-wrap solutions-section" id="about" aria-labelledby="solutions-title">
      <div className="solutions-image-wrap">
        <Image
          src={portfolioContent.solution.portrait}
          alt={portfolioContent.solution.portraitAlt}
          width={928}
          height={1152}
          sizes="(max-width: 760px) 100vw, 380px"
        />
      </div>
      <div className="solutions-copy">
        <h2 id="solutions-title">{portfolioContent.solution.title}</h2>
        <p className="solutions-description">{portfolioContent.solution.description}</p>
        <ul className="feature-list">
          {portfolioContent.features.map((feature) => (
            <li className="feature-item" key={feature.title}>
              <span className="feature-check">
                <Check aria-hidden="true" size={16} />
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section-wrap content-section" aria-labelledby="experience-title">
      <SectionHeading
        id="experience-title"
        title={portfolioContent.experienceHeading.title}
        description={portfolioContent.experienceHeading.description}
      />
      <ol className="experience-list">
        {portfolioContent.experience.map((role) => (
          <li className="experience-item" key={`${role.company}-${role.period}`}>
            <div className="experience-meta">
              <p>{role.period}</p>
              <span>{role.company}</span>
            </div>
            <div className="experience-description">
              <span className="timeline-dot" aria-hidden="true" />
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section className="section-wrap content-section" id="certificates" aria-labelledby="certifications-title">
      <SectionHeading
        id="certifications-title"
        title={portfolioContent.certificationHeading.title}
        description={portfolioContent.certificationHeading.description}
      />
      <div className="certifications-grid">
        {portfolioContent.certifications.map((certification) => (
          <article className="certification-card" key={certification.title}>
            <div className="certification-image-wrap">
              <Image
                src={certification.image}
                alt={certification.imageAlt}
                width={1584}
                height={672}
                sizes="(max-width: 760px) 100vw, 48vw"
              />
            </div>
            <div className="certification-info">
              <h3>{certification.title}</h3>
              <p>{certification.issuer}</p>
              <span>{certification.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section-wrap contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-copy">
        <h2 id="contact-title">{portfolioContent.contact.title}</h2>
        <p className="contact-description">{portfolioContent.contact.description}</p>
        <a className="contact-method" href={`mailto:${portfolioContent.contact.email}`}>
          <span className="contact-icon"><Mail aria-hidden="true" size={18} /></span>
          <span>{portfolioContent.contact.email}</span>
        </a>
        <div className="contact-method">
          <span className="contact-icon"><MapPin aria-hidden="true" size={18} /></span>
          <span>{portfolioContent.contact.location}</span>
        </div>
        <ul className="social-links" aria-label="Social links">
          {portfolioContent.contact.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                <SocialIcon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ContactForm />
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>{portfolioContent.footer.copyright}</p>
        <nav aria-label="Footer navigation">
          {portfolioContent.footer.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label} <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          ))}
          <span className="footer-name">{siteConfig.name}</span>
        </nav>
      </div>
    </footer>
  );
}