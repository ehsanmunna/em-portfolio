import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection, ProjectsSection } from "./portfolio-sections";

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
});