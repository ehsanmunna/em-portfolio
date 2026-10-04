import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import emailjs from "@emailjs/browser";
import { ContactForm } from "./contact-form";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

const sendMock = vi.mocked(emailjs.send);

const emailjsProps = {
  serviceId: "test-service",
  templateId: "test-template",
  publicKey: "test-public-key",
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeEach(() => {
  sendMock.mockResolvedValue({ status: 200, text: "OK" } as never);
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
    let resolveSend: (value: unknown) => void = () => {};
    sendMock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveSend = resolve as (value: unknown) => void;
        }),
    );

    render(<ContactForm {...emailjsProps} />);
    fillContactForm();
    const form = document.querySelector("form");
    fireEvent.submit(form!);
    const submitButton = screen.getByRole("button", { name: /sending/i });
    expect((submitButton as HTMLButtonElement).disabled).toBe(true);
    fireEvent.submit(form!);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(
      "test-service",
      "test-template",
      {
        name: "Casey Visitor",
        email: "casey@example.test",
        message: "I'd like to discuss a project.",
        reply_to: "casey@example.test",
      },
      { publicKey: "test-public-key" },
    );

    resolveSend({ status: 200, text: "OK" });
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("sent successfully"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
    expect((screen.getByRole("button", { name: /send message/i }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("preserves values after a delivery failure and allows retry", async () => {
    sendMock.mockRejectedValueOnce(new Error("EmailJS: 400")).mockResolvedValueOnce({ status: 200, text: "OK" } as never);

    render(<ContactForm {...emailjsProps} />);
    fillContactForm();
    fireEvent.submit(document.querySelector("form")!);

    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("couldn't send"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Casey Visitor");
    expect((screen.getByLabelText("Email Address") as HTMLInputElement).value).toBe("casey@example.test");
    expect((screen.getByLabelText("Message") as HTMLTextAreaElement).value).toBe("I'd like to discuss a project.");

    fireEvent.submit(document.querySelector("form")!);
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("sent successfully"));
    expect(sendMock).toHaveBeenCalledTimes(2);
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
  });

  it("reports failure without calling EmailJS when configuration is missing", async () => {
    render(<ContactForm serviceId="" templateId="" publicKey="" />);
    fillContactForm();
    fireEvent.submit(document.querySelector("form")!);

    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("couldn't send"));
    expect(sendMock).not.toHaveBeenCalled();
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Casey Visitor");
  });

  it("preserves values when the EmailJS request cannot be reached", async () => {
    sendMock.mockRejectedValueOnce(new Error("network offline"));

    render(<ContactForm {...emailjsProps} />);
    fillContactForm();
    fireEvent.submit(document.querySelector("form")!);

    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("couldn't send"));
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Casey Visitor");
  });

  it("does not call EmailJS for invalid input", async () => {
    render(<ContactForm {...emailjsProps} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Casey" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
    fireEvent.submit(document.querySelector("form")!);

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(sendMock).not.toHaveBeenCalled();
  });
});
