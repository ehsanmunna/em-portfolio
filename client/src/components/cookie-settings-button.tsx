"use client";

import { CLARITY_OPEN_SETTINGS_EVENT } from "@/components/clarity-analytics";

export function CookieSettingsButton() {
  function handleClick() {
    window.dispatchEvent(new CustomEvent(CLARITY_OPEN_SETTINGS_EVENT));
  }

  return (
    <button
      type="button"
      className="footer-cookie-settings"
      onClick={handleClick}
      aria-label="Open cookie settings"
    >
      Cookie settings
    </button>
  );
}
