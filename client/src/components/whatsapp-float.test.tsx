import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WhatsappFloat, buildWhatsappUrl } from "./whatsapp-float";

afterEach(() => {
  cleanup();
});

describe("buildWhatsappUrl", () => {
  it("returns null when the number is missing", () => {
    expect(buildWhatsappUrl("")).toBeNull();
    expect(buildWhatsappUrl("   ")).toBeNull();
  });

  it("sanitizes digits and encodes the prefilled message", () => {
    expect(buildWhatsappUrl("+880 1XXX-XXXXXX".replace(/X/g, "1"), "Hi! How are you?")).toBe(
      "https://wa.me/8801111111111?text=Hi!%20How%20are%20you%3F",
    );
  });

  it("omits the query when no message is configured", () => {
    expect(buildWhatsappUrl("8801712345678", "")).toBe("https://wa.me/8801712345678");
    expect(buildWhatsappUrl("8801712345678")).toBe("https://wa.me/8801712345678");
  });
});

describe("WhatsappFloat", () => {
  it("links to wa.me in a new tab with an accessible name", () => {
    render(
      <WhatsappFloat
        number="8801712345678"
        defaultMessage="Hello from the portfolio"
        label="Chat on WhatsApp"
      />,
    );

    const link = screen.getByRole("link", { name: "Chat on WhatsApp" });
    expect(link.getAttribute("href")).toBe(
      "https://wa.me/8801712345678?text=Hello%20from%20the%20portfolio",
    );
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
    expect(link.getAttribute("class")).toContain("whatsapp-float");
  });

  it("renders nothing when the number is unconfigured", () => {
    const { container } = render(<WhatsappFloat number="" defaultMessage="Hi" />);
    expect(container.firstChild).toBeNull();
  });
});
