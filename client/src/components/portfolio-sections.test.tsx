import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./portfolio-sections";

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