import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import { portfolioContent } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

function Brand() {
  return (
    <a className="brand" href="#home" aria-label={`${siteConfig.logo.alt}, home`}>
      {siteConfig.logo.src ? (
        <Image
          className="brand-image"
          src={siteConfig.logo.src}
          alt={siteConfig.logo.alt}
          width={40}
          height={40}
        />
      ) : (
        <span className="brand-mark" aria-hidden="true">
          {siteConfig.logo.mark}
        </span>
      )}
      <span className="brand-name">{siteConfig.name}</span>
    </a>
  );
}

function NavigationLinks() {
  return portfolioContent.navigation.map((item) => (
    <a key={item.href} href={item.href}>
      {item.label}
    </a>
  ));
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-navigation" aria-label="Main navigation">
          <NavigationLinks />
        </nav>
        <a className="button button-small header-cta" href="#contact">
          Contact Me <ArrowUpRight aria-hidden="true" size={16} />
        </a>
        <details className="mobile-navigation">
          <summary aria-label="Toggle navigation">
            <Menu aria-hidden="true" size={22} />
          </summary>
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <NavigationLinks />
            <a href="#contact">Contact Me</a>
          </nav>
        </details>
      </div>
    </header>
  );
}