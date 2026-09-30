export type ClarityConsentStatus = "accepted" | "declined";

export type ClarityConsentState = {
  status: ClarityConsentStatus;
  updatedAt: string;
};

export const CLARITY_CONSENT_STORAGE_KEY = "clarity-consent";

function isConsentStatus(value: unknown): value is ClarityConsentStatus {
  return value === "accepted" || value === "declined";
}

export function getClarityConsent(): ClarityConsentState | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(CLARITY_CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<ClarityConsentState>;
    if (!parsed || !isConsentStatus(parsed.status)) {
      return null;
    }
    return {
      status: parsed.status,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}

export function setClarityConsent(status: ClarityConsentStatus): ClarityConsentState {
  const state: ClarityConsentState = {
    status,
    updatedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(
        CLARITY_CONSENT_STORAGE_KEY,
        JSON.stringify(state),
      );
    } catch {
      // Storage may be unavailable (private mode); consent still applies in-memory.
    }
  }
  return state;
}

export function clearClarityConsent(): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(CLARITY_CONSENT_STORAGE_KEY);
    } catch {
      // Ignore storage errors on clear.
    }
  }
}
