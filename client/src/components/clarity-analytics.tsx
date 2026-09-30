"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getClarityConsent,
  setClarityConsent,
  type ClarityConsentStatus,
} from "@/lib/clarity-consent";
import { loadClarity, withdrawClarityConsent } from "@/lib/clarity";

export const CLARITY_OPEN_SETTINGS_EVENT = "clarity:open-settings";

export function openClaritySettings(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CLARITY_OPEN_SETTINGS_EVENT));
  }
}

export function ClarityAnalytics() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<ClarityConsentStatus | null>(null);

  useEffect(() => {
    // Hydration-safe: read persisted consent only after mount so server and
    // initial client render match (both hidden), then sync UI state.
    const stored = getClarityConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(stored?.status ?? null);
    if (stored?.status === "accepted") {
      loadClarity();
    } else if (!stored) {
      setVisible(true);
    }

    const handleOpenSettings = () => {
      setStatus(getClarityConsent()?.status ?? null);
      setVisible(true);
    };
    window.addEventListener(CLARITY_OPEN_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(CLARITY_OPEN_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  const handleAccept = useCallback(() => {
    setClarityConsent("accepted");
    setStatus("accepted");
    loadClarity();
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    setClarityConsent("declined");
    setStatus("declined");
    withdrawClarityConsent();
    setVisible(false);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="clarity-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
    >
      <div className="clarity-banner-copy">
        <p className="clarity-banner-title">Help improve this site</p>
        <p className="clarity-banner-text">
          We observe to understand visits (clicks, scrolls) and improve
          usability. It runs only if you accept.
          {status ? ` Current choice: ${status}.` : ""}
        </p>
      </div>
      <div className="clarity-banner-actions">
        <button
          type="button"
          className="button button-small"
          onClick={handleAccept}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className="button button-small button-secondary"
          onClick={handleDecline}
        >
          Decline
        </button>
        <a
          className="clarity-banner-link"
          href="https://clarity.microsoft.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
