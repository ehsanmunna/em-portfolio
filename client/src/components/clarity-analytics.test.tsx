import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLARITY_OPEN_SETTINGS_EVENT,
  ClarityAnalytics,
} from "./clarity-analytics";
import { CLARITY_SCRIPT_ID } from "@/lib/clarity";
import { CLARITY_CONSENT_STORAGE_KEY } from "@/lib/clarity-consent";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.getElementById(CLARITY_SCRIPT_ID)?.remove();
  // @ts-expect-error test cleanup
  delete window.clarity;
  vi.unstubAllEnvs();
});

describe("ClarityAnalytics", () => {
  it("shows banner and loads nothing before consent", () => {
    render(<ClarityAnalytics />);
    expect(
      screen.getByRole("dialog", { name: /analytics consent/i }),
    ).toBeDefined();
    expect(document.getElementById(CLARITY_SCRIPT_ID)).toBeNull();
  });

  it("accept persists consent and loads Clarity once", () => {
    vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "abc12345");
    render(<ClarityAnalytics />);
    fireEvent.click(screen.getByRole("button", { name: /accept analytics/i }));

    expect(window.localStorage.getItem(CLARITY_CONSENT_STORAGE_KEY)).toContain(
      "accepted",
    );
    expect(document.querySelectorAll(`#${CLARITY_SCRIPT_ID}`)).toHaveLength(1);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("decline persists consent and never loads", () => {
    vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "abc12345");
    render(<ClarityAnalytics />);
    fireEvent.click(screen.getByRole("button", { name: /decline/i }));

    expect(window.localStorage.getItem(CLARITY_CONSENT_STORAGE_KEY)).toContain(
      "declined",
    );
    expect(document.getElementById(CLARITY_SCRIPT_ID)).toBeNull();
  });

  it("does not re-prompt when consent already accepted", () => {
    vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "abc12345");
    window.localStorage.setItem(
      CLARITY_CONSENT_STORAGE_KEY,
      JSON.stringify({ status: "accepted", updatedAt: new Date().toISOString() }),
    );
    render(<ClarityAnalytics />);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.querySelectorAll(`#${CLARITY_SCRIPT_ID}`)).toHaveLength(1);
  });

  it("re-opens settings from footer event and shows current choice", async () => {
    window.localStorage.setItem(
      CLARITY_CONSENT_STORAGE_KEY,
      JSON.stringify({ status: "declined", updatedAt: new Date().toISOString() }),
    );
    render(<ClarityAnalytics />);
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => {
      window.dispatchEvent(new CustomEvent(CLARITY_OPEN_SETTINGS_EVENT));
    });
    await waitFor(() =>
      expect(
        screen.getByRole("dialog", { name: /analytics consent/i }).textContent,
      ).toContain("declined"),
    );
  });
});
