import type { CSSProperties } from "react";

export const siteConfig = {
  name: "Ehsan Munna",
  description:
    "Full-stack web developer creating accessible, performant digital experiences.",
  logo: {
    src: null as string | null,
    mark: "EM",
    alt: "Ehsan Munna",
  },
  theme: {
    background: "#080A10",
    surface: "#111524",
    surfaceRaised: "#161B2F",
    foreground: "#FFFFFF",
    muted: "#94A3B8",
    subdued: "#64748B",
    border: "#1E293B",
    accent: "#10B981",
    violet: "#8B5CF6",
    blue: "#3B82F6",
    onAccent: "#080A10",
  },
} as const;

export const themeStyle = {
  "--color-background": siteConfig.theme.background,
  "--color-surface": siteConfig.theme.surface,
  "--color-surface-raised": siteConfig.theme.surfaceRaised,
  "--color-foreground": siteConfig.theme.foreground,
  "--color-muted": siteConfig.theme.muted,
  "--color-subdued": siteConfig.theme.subdued,
  "--color-border": siteConfig.theme.border,
  "--color-accent": siteConfig.theme.accent,
  "--color-violet": siteConfig.theme.violet,
  "--color-blue": siteConfig.theme.blue,
  "--color-on-accent": siteConfig.theme.onAccent,
} as CSSProperties;