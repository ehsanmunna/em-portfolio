export type IconKey =
  | "atom"
  | "layers"
  | "terminal"
  | "code"
  | "figma"
  | "database"
  | "git"
  | "pen"
  | "layout"
  | "gauge";

export type SocialIconKey = "github" | "linkedin" | "x" | "dribbble";

export type NavigationItem = {
  label: string;
  href: string;
};

export type Technology = {
  name: string;
  icon: IconKey;
};

export type Service = {
  title: string;
  description: string;
  icon: IconKey;
};

export type Project = {
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

export type Feature = {
  title: string;
  description: string;
};

export type Experience = {
  period: string;
  company: string;
  title: string;
  description: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  imageAlt: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconKey;
};

export const portfolioContent = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Certificates", href: "#certificates" },
  ] satisfies NavigationItem[],
  hero: {
    status: "Available for new projects",
    greeting: "Hi, I'm",
    name: "ehsan.",
    role: "Fullstack Web Developer",
    description:
      "A Fullstack Web Developer based In Bangladesh. I craft accessible, pixel-perfect, and performant web experiences using modern technologies.",
    portrait: "/images/hero-portrait.png",
    portraitAlt: "Portrait of Ehsan Munna",
    resumeHref:
      "https://drive.google.com/file/d/1r_tsxf8aZ16_z1e808Cb5NuDPH_ywePq/view?usp=sharing",
  },
  technologyHeading: {
    title: "Technological Foundation",
    description: "The modern tech stack I use to bring ideas to life.",
  },
  technologies: [
    { name: "React", icon: "atom" },
    { name: "Next.js", icon: "layers" },
    { name: "Node.js", icon: "terminal" },
    { name: "TypeScript", icon: "code" },
    { name: "Tailwind CSS", icon: "code" },
    { name: "Figma", icon: "figma" },
    { name: "GraphQL", icon: "code" },
    { name: "PostgreSQL", icon: "database" },
    { name: "Prisma", icon: "database" },
    { name: "Docker", icon: "layers" },
    { name: "Git", icon: "git" },
    { name: "Sass", icon: "code" },
  ] satisfies Technology[],
  serviceHeading: {
    title: "Beyond Just Coding",
    description:
      "I provide holistic web solutions, applying design principles to both user interface and system architecture.",
  },
  services: [
    {
      title: "Fullstack Web Development",
      description:
        "Building robust web applications from architecture to deployment, specializing in React ecosystems.",
      icon: "code",
    },
    {
      title: "UI Implementation",
      description:
        "Translating complex Figma designs into responsive, highly interactive, and pixel-perfect layouts.",
      icon: "layout",
    },
    {
      title: "Backend Engineering",
      description:
        "Designing efficient APIs, solid database schemas, and secure server architectures.",
      icon: "database",
    },
    {
      title: "Performance & SEO",
      description:
        "Optimizing Core Web Vitals, server response times, and content structures for perfect search rankings.",
      icon: "gauge",
    },
  ] satisfies Service[],
  projectHeading: {
    title: "My Recent Works",
    description: "A curated list of web applications I have built and delivered.",
  },
  projects: [
    {
      category: "Fullstack Application",
      title: "Fintech Dashboard System",
      description:
        "A real-time financial tracking and forecasting dashboard, featuring multiple charts and data grids.",
      image: "/images/project-fintech.jpg",
      imageAlt: "Fintech dashboard project preview",
      tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    },
    {
      category: "UI Implementation",
      title: "Task Management SaaS Workspace",
      description:
        "Collaborative project management tool built with kanban boards, active timeline indicators, and calendar integration.",
      image: "/images/project-task-management.jpg",
      imageAlt: "Task management workspace project preview",
      tags: ["React", "Framer Motion", "Tailwind", "Zustand"],
    },
    {
      category: "Backend Architecture",
      title: "API Gateway Microservice",
      description:
        "High-throughput API layer handling rate limiting, auth translation, and load balancing across microservices.",
      image: "/images/project-api-gateway.jpg",
      imageAlt: "API gateway architecture project preview",
      tags: ["Node.js", "Express", "Docker", "Redis"],
    },
  ] satisfies Project[],
  solution: {
    title: "Turning complex problems into elegant solutions.",
    description:
      "I don't just write code; I seek to understand the core operational goals of your business and implement design-focused, scale-conscious codebases.",
    portrait: "/images/solutions-wriented-cartton.jpg",
    portraitAlt: "Ehsan Munna working at a desk",
  },
  features: [
    {
      title: "Clean & Maintainable Code",
      description:
        "Prioritizing solid patterns, complete documentation, and structural clarity.",
    },
    {
      title: "User-Centered Approach",
      description:
        "Ensuring high accessibility compliance (WCAG) and smooth, delightful layouts.",
    },
    {
      title: "Scalable Architecture",
      description:
        "Building systems prepared to handle sudden traffic spikes and complex databases.",
    },
  ] satisfies Feature[],
  experienceHeading: {
    title: "Professional Experience",
    description: "My software engineering journey through distinct technical roles.",
  },
  experience: [
    {
      period: "2023 - Present",
      company: "Alpha Tech, Jakarta",
      title: "Senior Frontend Engineer",
      description:
        "Leading a team of 4 developers migrating legacy PHP systems to unified Next.js architectures, boosting core web vitals by 40%.",
    },
    {
      period: "2021 - 2023",
      company: "InnoLabs Studio",
      title: "Fullstack Web Developer",
      description:
        "Designed, programmed, and shipped over 12 client projects using Postgres, Express, and React ecosystems.",
    },
    {
      period: "2019 - 2021",
      company: "PixelCraft Agency",
      title: "Frontend Developer",
      description:
        "Implemented responsive web interfaces from high-fidelity Figma files, guaranteeing total semantic accuracy.",
    },
  ] satisfies Experience[],
  certificationHeading: {
    title: "My Certifications",
    description:
      "Microsoft .NET Framework 4 certifications earned in 2013.",
  },
  certifications: [
    {
      title: ".NET Framework 4: WCF Development (70-513)",
      issuer: "Microsoft",
      year: "2013",
      image: "/images/cert-wcf-development.svg",
      imageAlt: "Illustration of connected WCF service endpoints for exam 70-513",
    },
    {
      title: ".NET Framework 4: Data Access (70-516)",
      issuer: "Microsoft",
      year: "2013",
      image: "/images/cert-data-access.svg",
      imageAlt: "Illustration of a .NET Framework 4 data access pipeline for exam 70-516",
    },
    {
      title: ".NET Framework 4: Web Application Development (70-515)",
      issuer: "Microsoft",
      year: "2013",
      image: "/images/cert-web-app-development.svg",
      imageAlt: "Illustration of an ASP.NET web application structure for exam 70-515",
    },
    {
      title: ".NET Framework 4: Web Application Design & Development (70-519)",
      issuer: "Microsoft",
      year: "2013",
      image: "/images/cert-web-app-design.svg",
      imageAlt: "Illustration of a web application layout and design grid for exam 70-519",
    },
  ] satisfies Certification[],
  contact: {
    title: "Let's Work Together",
    description:
      "Interested in starting a project, seeking consulting, or just want to say hi? Drop me a line through the form or reach out directly.",
    email: "grmunnabd@gmail.com",
    location: "Dhaka, Bangladesh",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/ehsanmunna",
        icon: "github",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ehsan-munna",
        icon: "linkedin",
      },
      { label: "Twitter", href: "https://x.com/ehsan85", icon: "x" },
    ] satisfies SocialLink[],
  },
  footer: {
    copyright: "© 2025 Djembar. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "#contact" },
      { label: "Terms of Service", href: "#contact" },
    ] satisfies NavigationItem[],
  },
} as const;