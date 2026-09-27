import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function fillContactForm() {
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Casey Visitor" },
  });
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "casey@example.test" },
  });
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "I'd like to discuss a project." },
  });
}

describe("ContactForm", () => {
  it("prevents duplicate submissions while pending and clears the form after acceptance", async () => {
    let resolveRequest: (response: { status: number }) => void = () => {};
    const fetchMock = vi.fn(() => new Promise<{ status: number }>((resolve) => {
      resolveRequest = resolve;
    }));
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm apiBaseUrl="https://api.example.test/" />);
    fillContactForm();
    const form = document.querySelector("form");
    fireEvent.submit(form!);
    const submitButton = screen.getByRole("button", { name: /sending/i });
    expect((submitButton as HTMLButtonElement).disabled).toBe(true);
    fireEvent.submit(form!);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("https://api.example.test/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Casey Visitor",
        email: "casey@example.test",
        message: "I'd like to discuss a project.",
      }),
    });

    resolveRequest({ status: 202 });
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("sent successfully"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
    expect((screen.getByRole("button", { name: /send message/i }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("preserves values after an HTTP failure and allows retry", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ status: 503 })
      .mockResolvedValueOnce({ status: 202 });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm apiBaseUrl="https://api.example.test" />);
    fillContactForm();
    fireEvent.submit(document.querySelector("form")!);

    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("couldn't send"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Casey Visitor");
    expect((screen.getByLabelText("Email Address") as HTMLInputElement).value).toBe("casey@example.test");
    expect((screen.getByLabelText("Message") as HTMLTextAreaElement).value).toBe("I'd like to discuss a project.");

    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("sent successfully"));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
  });

  it("preserves values when the API cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(<ContactForm apiBaseUrl="https://api.example.test" />);
    fillContactForm();
    fireEvent.submit(document.querySelector("form")!);

    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("couldn't send"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Casey Visitor");
  });
});
