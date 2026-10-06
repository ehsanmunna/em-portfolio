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

export type SocialIconKey = "github" | "linkedin" | "x" | "facebook" | "dribbble";

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

export type WhatsappContact = {
  number: string;
  defaultMessage: string;
  label: string;
  showWhatsapp: boolean;
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
      "I have 10+ years of experience building enterprise web applications, APIs and data-driven systems, with a strong focus on Angular, React, TypeScript, .NET, Node.js and modern backend architecture.",
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
      title: "Real State Dashboard System",
      description:
        "A real estate dashboard for tracking property listings, market trends, and sales performance with interactive charts and data grids.",
      image: "/images/project-fintech.jpg",
      imageAlt: "Fintech dashboard project preview",
      tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    },
    {
      category: "UI Implementation",
      title: "e-commarce SaaS website",
      description:
        "Collaborative project management tool built with kanban boards, active timeline indicators, and calendar integration.",
      image: "/images/ecommerce-sass.jpg",
      imageAlt: "E-commerce SaaS website project preview",
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
      period: "2025 (Aug) - 2026 (Sep)",
      company: "Xtroit, Singapore",
      title: "Senior Software Engineer",
      description:
        ` ● Full-Stack Engineering: Architected scalable web applications and high-performance REST APIs leveraging Angular and .NET pipelines. 
          ● Containerization: Containerized full-stack applications using Docker to streamline development workflows, ensure environment consistency, and simplify deployment processes.
          ● Frontend Refactoring & Deployment: Led zero-downtime production migrations to the latest Angular version, executing critical breaking-change refactoring and dependency modernization. 
          ● Reviewed pull requests and mentored two junior developers on Angular best practices 
          ● Performance Optimization: Drastically reduced production bundle sizes and enhanced runtime stability while ensuring seamless, continuous daily business operations. `,
    },
    {
      period: "2022 (Jun) - 2025 (Jul)",
      company: "Surbana Technologies Pte. Ltd., (Dhaka, Bangladesh)",
      title: "Senior Software Engineer",
      description:
        `
        ● Frontend Optimization: Spearheaded a comprehensive architectural restructuring and
modularized core Angular components using lazy loading, cutting production bundle size
by ~50% and reducing page load time by 30%.
      ● Scalable Feature Engineering: Built an end-to-end Daily Activity tracking system 
      tailored for multi-tenant data isolation, featuring paginated infinite scroll and serving 
      optimized thumbnail images (reducing average image payload by ~97%, from 2MB to 
      50KB) backed by Azure Blob Storage. 
      ● Data Pipeline Orchestration: Engineered high-performance ETL processes and 
      multi-format parsing engines to securely ingest, map, and synchronize external tracking 
      datasets (Excel, MPP, P6) into primary system databases. 
      ● Event-Driven Architecture: Engineered asynchronous microservices and distributed 
      event-driven workflows using RabbitMQ, MassTransit, and SignalR for real-time 
      bi-directional backend communication, while integrating frontend WebSockets for live 
      updates; refactored file processing to cut memory usage by ~60% for large-file handling, 
      ensuring fault-tolerant, decoupled communication across systems. 
        `,
    },
    {
      period: "2021 (Aug) - 2022 (May)",
      company: "SoftBD Ltd., (Dhaka, Bangladesh)",
      title: "Software Engineer",
      description:
        `
        ● Engineered a responsive scheduling module for the online learning portal by integrating an external calendar library, course tracking, and operational management. 
        ● Developed full-stack e-commerce applications using Angular, Node.js, and JavaScript. 
        ● Built and integrated frontend components and backend services.
        `,
    },
    {
      period: "2021 (Aug) - 2022 (May)",
      company: "CoKreates Limited, (Dhaka, Bangladesh)",
      title: "Senior Programmer (Angular)",
      description:
        `
        ● Developed and maintained Angular-based frontend applications, resolving memory leak issues from ~120 unmanaged RxJS subscriptions across 30+ components, stabilizing long-session memory usage.. 
        ● Worked on accounting and business application modules. 
        `,
    },
    {
      period: "2014 (May) - 2019 (Nov)",
      company: "Daffodil International University - Software Section, (Dhaka, Bangladesh)",
      title: "Front-End Developer",
      description:
        `
        ● Architecture & Migration: Re-engineered the legacy jQuery and .NET MVC Treatment 
        Management System into a high-performance Angular single-page application powered 
        by RESTful APIs. 
        ● Backend Engineering: Deployed core backend services for the DIU-Employee 
        Application using Node.js, Express.js, and Sequelize ORM to secure enterprise 
        transactions. 
        ● ERP Contribution: Maintained and optimized scalable web and mobile features across 
        university enterprise systems, including Bill Budget and ERP Procurement platforms. 

        `,
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
    whatsapp: {
      number: "+8801717463510",
      defaultMessage: "Hi! I found your portfolio and would like to chat.",
      label: "Chat on WhatsApp",
      showWhatsapp: false,
    } satisfies WhatsappContact,
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
      {
        label: "Facebook",
        href: "https://www.facebook.com/ehsanmunna",
        icon: "facebook",
      },
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