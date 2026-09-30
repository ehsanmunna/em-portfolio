import { afterEach, describe, expect, it } from "vitest";
import {
  CLARITY_CONSENT_STORAGE_KEY,
  clearClarityConsent,
  getClarityConsent,
  setClarityConsent,
} from "./clarity-consent";

afterEach(() => {
  window.localStorage.clear();
});

describe("clarity-consent", () => {
  it("returns null when no choice is stored", () => {
    expect(getClarityConsent()).toBeNull();
  });

  it("persists accepted choice with timestamp", () => {
    const state = setClarityConsent("accepted");
    expect(state.status).toBe("accepted");
    expect(typeof state.updatedAt).toBe("string");
    expect(getClarityConsent()?.status).toBe("accepted");
    expect(
      window.localStorage.getItem(CLARITY_CONSENT_STORAGE_KEY),
    ).toContain("accepted");
  });

  it("returns null for malformed stored value", () => {
    window.localStorage.setItem(CLARITY_CONSENT_STORAGE_KEY, "not-json");
    expect(getClarityConsent()).toBeNull();
    window.localStorage.setItem(
      CLARITY_CONSENT_STORAGE_KEY,
      JSON.stringify({ status: "maybe" }),
    );
    expect(getClarityConsent()).toBeNull();
  });

  it("clears stored consent", () => {
    setClarityConsent("declined");
    clearClarityConsent();
    expect(getClarityConsent()).toBeNull();
  });
});
