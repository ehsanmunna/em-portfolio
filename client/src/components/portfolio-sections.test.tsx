import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContactSection, ProjectsSection } from "./portfolio-sections";

afterEach(() => {
  cleanup();
});

describe("ContactSection", () => {
  it("renders the Facebook link immediately after X", () => {
    render(<ContactSection />);

    const socialLinks = screen.getByRole("list", { name: "Social links" });
    const links = within(socialLinks).getAllByRole("link");

    expect(links.map((link) => link.getAttribute("aria-label"))).toEqual([
      "GitHub",
      "LinkedIn",
      "Twitter",
      "Facebook",
    ]);
    expect(within(socialLinks).getByRole("link", { name: "Facebook" }).getAttribute("href"))
      .toBe("https://www.facebook.com/ehsanmunna");
  });
});

describe("ProjectsSection", () => {
  it("renders the updated project content and e-commerce preview", () => {
    render(<ProjectsSection />);

    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Real State Dashboard System",
      "e-commarce SaaS website",
      "API Gateway Microservice",
    ]);
    expect(
      screen.getByText(
        "A real estate dashboard for tracking property listings, market trends, and sales performance with interactive charts and data grids.",
      ),
    ).toBeTruthy();

    const ecommerceImage = screen.getByRole("img", {
      name: "E-commerce SaaS website project preview",
    });
    expect(decodeURIComponent(ecommerceImage.getAttribute("src") ?? "")).toContain(
      "/images/ecommerce-sass.jpg",
    );
  });

  it("renders post-image content for every project card", () => {
    const view = render(<ProjectsSection />);

    const cards = view.getAllByRole("article");
    expect(cards.length).toBe(3);

    const expectedProjects = [
      {
        category: "Fullstack Application",
        title: "Real State Dashboard System",
        description:
          "A real estate dashboard for tracking property listings, market trends, and sales performance with interactive charts and data grids.",
        tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
      },
      {
        category: "UI Implementation",
        title: "e-commarce SaaS website",
        description:
          "Collaborative project management tool built with kanban boards, active timeline indicators, and calendar integration.",
        tags: ["React", "Framer Motion", "Tailwind", "Zustand"],
      },
      {
        category: "Backend Architecture",
        title: "API Gateway Microservice",
        description:
          "High-throughput API layer handling rate limiting, auth translation, and load balancing across microservices.",
        tags: ["Node.js", "Express", "Docker", "Redis"],
      },
    ];

    expectedProjects.forEach((project, index) => {
      const card = within(cards[index] as HTMLElement);
      expect(card.getByText(project.category)).toBeTruthy();
      expect(
        card.getByRole("heading", { level: 3, name: project.title }),
      ).toBeTruthy();
      expect(card.getByText(project.description)).toBeTruthy();
      for (const tag of project.tags) {
        expect(card.getByText(tag)).toBeTruthy();
      }
    });
  });
});
