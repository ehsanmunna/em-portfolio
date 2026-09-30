import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLARITY_SCRIPT_ID,
  getClarityProjectId,
  isClarityLoaded,
  isValidClarityProjectId,
  loadClarity,
  withdrawClarityConsent,
} from "./clarity";

afterEach(() => {
  document.getElementById(CLARITY_SCRIPT_ID)?.remove();
  vi.unstubAllEnvs();
  window.localStorage.clear();
  document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim())
    .filter(Boolean)
    .forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  // @ts-expect-error test cleanup
  delete window.clarity;
});

describe("clarity loader", () => {
  it("validates project IDs", () => {
    expect(isValidClarityProjectId(null)).toBe(false);
    expect(isValidClarityProjectId("")).toBe(false);
    expect(isValidClarityProjectId("ab")).toBe(false);
    expect(isValidClarityProjectId("abc12345")).toBe(true);
    expect(isValidClarityProjectId("  abc12345  ")).toBe(true);
  });

  it("reads project ID from env", () => {
    vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "  test1234  ");
    expect(getClarityProjectId()).toBe("test1234");
    vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "");
    expect(getClarityProjectId()).toBeNull();
  });

  it("does not inject when ID is missing or invalid", () => {
    vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "");
    expect(loadClarity()).toBe(false);
    expect(document.getElementById(CLARITY_SCRIPT_ID)).toBeNull();
    expect(isClarityLoaded()).toBe(false);

    expect(loadClarity("!!")).toBe(false);
    expect(document.getElementById(CLARITY_SCRIPT_ID)).toBeNull();
  });

  it("injects exactly once for repeated calls", () => {
    expect(loadClarity("abc12345")).toBe(true);
    expect(loadClarity("abc12345")).toBe(true);
    const scripts = document.querySelectorAll(`#${CLARITY_SCRIPT_ID}`);
    expect(scripts).toHaveLength(1);
    expect((scripts[0] as HTMLScriptElement).src).toContain(
      "https://www.clarity.ms/tag/abc12345",
    );
    expect(isClarityLoaded()).toBe(true);
  });

  it("withdraw removes script, clarity handle, and clarity storage", () => {
    loadClarity("abc12345");
    expect(isClarityLoaded()).toBe(true);
    document.cookie = "_clsk=test-value; path=/";
    window.localStorage.setItem("_clsk", "test-value");

    withdrawClarityConsent();

    expect(document.getElementById(CLARITY_SCRIPT_ID)).toBeNull();
    expect(isClarityLoaded()).toBe(false);
    expect(window.localStorage.getItem("_clsk")).toBeNull();
  });
});
