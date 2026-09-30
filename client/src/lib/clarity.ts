export const CLARITY_SCRIPT_ID = "microsoft-clarity-script";
export const CLARITY_SCRIPT_SRC_BASE = "https://www.clarity.ms/tag/";

type ClarityWindow = Window & {
  clarity?: ((...args: unknown[]) => void) & { v?: string; q?: unknown[] };
};

function getWindow(): ClarityWindow | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window as ClarityWindow;
}

export function getClarityProjectId(): string | null {
  const raw = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
  return raw ? raw : null;
}

export function isValidClarityProjectId(projectId: string | null | undefined): boolean {
  if (!projectId) {
    return false;
  }
  return /^[A-Za-z0-9]{4,32}$/.test(projectId.trim());
}

export function isClarityLoaded(): boolean {
  const w = getWindow();
  if (!w || typeof document === "undefined") {
    return false;
  }
  if (document.getElementById(CLARITY_SCRIPT_ID)) {
    return true;
  }
  return typeof w.clarity === "function";
}

function warnMissingId(): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[clarity] NEXT_PUBLIC_CLARITY_PROJECT_ID is missing or invalid; skipping Clarity load.",
    );
  }
}

export function loadClarity(projectId?: string): boolean {
  const w = getWindow();
  if (!w || typeof document === "undefined") {
    return false;
  }

  const resolvedId = (projectId ?? getClarityProjectId() ?? "").trim();
  if (!isValidClarityProjectId(resolvedId)) {
    warnMissingId();
    return false;
  }

  if (isClarityLoaded()) {
    return true;
  }

  try {
    w.clarity =
      w.clarity ??
      ((function () {
        const queue: unknown[] = [];
        const stub = (...args: unknown[]) => {
          queue.push(args);
        };
        (stub as { q?: unknown[] }).q = queue;
        return stub as ClarityWindow["clarity"];
      })() as NonNullable<ClarityWindow["clarity"]>);

    const script = document.createElement("script");
    script.id = CLARITY_SCRIPT_ID;
    script.async = true;
    script.src = `${CLARITY_SCRIPT_SRC_BASE}${resolvedId}`;
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
    return true;
  } catch {
    return false;
  }
}

function clearClarityCookies(): void {
  if (typeof document === "undefined") {
    return;
  }
  const cookieNames = document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim())
    .filter((name) => name && /^(?:_clsk|_clck|CLID|_clt_.*|_cl.*)$/i.test(name));
  for (const name of cookieNames) {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      const hostname = window.location.hostname;
      if (hostname) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${hostname}`;
      }
    } catch {
      // Best-effort cookie removal.
    }
  }
}

function clearClarityLocalKeys(): void {
  const w = getWindow();
  if (!w || !w.localStorage) {
    return;
  }
  try {
    const keysToRemove: string[] = [];
    for (let index = 0; index < w.localStorage.length; index += 1) {
      const key = w.localStorage.key(index);
      if (key && /^_cl/i.test(key)) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      w.localStorage.removeItem(key);
    }
  } catch {
    // Best-effort storage cleanup.
  }
}

export function withdrawClarityConsent(): void {
  const w = getWindow();
  if (w && typeof w.clarity === "function") {
    try {
      (w.clarity as (...args: unknown[]) => void)("consent", false);
    } catch {
      // Ad-blockers or stub states may throw; continue with cleanup.
    }
  }
  if (typeof document !== "undefined") {
    document.getElementById(CLARITY_SCRIPT_ID)?.remove();
  }
  if (w) {
    try {
      delete w.clarity;
    } catch {
      w.clarity = undefined;
    }
  }
  clearClarityCookies();
  clearClarityLocalKeys();
}
