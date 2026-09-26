## Why

The repository has no initialized portfolio application, while the intended visual design already exists in `docs/portfolio.fig`. This change establishes that design as the source of truth for a production-ready Next.js portfolio that can be rebranded and extended through configuration rather than duplicated code.

## What Changes

- Create a reusable React portfolio application with Next.js that matches the supplied Figma design across desktop and mobile layouts.
- Add centralized, typed configuration for site name, logo, theme colors, and portfolio content.
- Build shared page sections and components so content and presentation can grow without coupling the design to one person's branding.
- Keep the existing server directory out of scope; no CMS, database, or runtime editing interface is assumed.

## Capabilities

### New Capabilities
- `portfolio-experience`: Responsive portfolio pages and reusable sections that follow `docs/portfolio.fig`.
- `portfolio-configuration`: Configurable branding, theme color tokens, and portfolio content used by the experience.

### Modified Capabilities

## Impact

- Initializes the currently empty `client/` application as a Next.js project and adds its required dependencies and scripts.
- Uses `docs/portfolio.fig` and its embedded assets as the visual reference; configuration and reusable UI live in the client application.
- Does not change `server/` or introduce external persistence or a content-management dependency.