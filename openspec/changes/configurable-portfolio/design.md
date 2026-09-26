## Context

The `client/` and `server/` directories contain no application files. `docs/portfolio.fig` is the supplied design source and includes a canvas, metadata, preview, and embedded image assets. See `proposal.md` for motivation and the change specs for observable behavior.

## Goals / Non-Goals

**Goals:**
- Establish a maintainable Next.js application in `client/` that follows the supplied design.
- Keep identity, theme tokens, and portfolio content in typed, centralized configuration.
- Make repeated content and page sections reusable while retaining design-specific presentation.

**Non-Goals:**
- Add a CMS, database, API, or in-browser editing experience.
- Build a general-purpose site builder or change the visual direction of the Figma design.
- Initialize or modify the existing `server/` directory.

## Decisions

### Use Next.js App Router with TypeScript

Build the client as a standard Next.js App Router project. Keep pages server-rendered by default and add client-side behavior only for interactions that require it. This supports a fast, indexable portfolio and keeps the initial implementation deployable without a separate server. The Pages Router or a standalone React/Vite app would also work, but would not align as directly with the requested Next.js foundation.

### Separate site identity, theme, and content configuration

Keep a typed site configuration for the site name, logo asset and accessible label, metadata, and theme color set; keep portfolio content in typed structured data. Apply theme values as CSS custom properties at the application root so shared components consume tokens rather than individual brand values. This makes a rebrand a configuration and asset change instead of a component rewrite. Environment variables are not appropriate for public presentation content, and a CMS is outside the requested scope.

### Build design-specific reusable sections

Implement a shared page shell and reusable components for repeated content, while preserving sections and layout specific to the supplied design. Represent repeatable items such as projects as data and render them through shared patterns. Avoid a generic arbitrary-section renderer: it would add indirection without improving fidelity or the expected extension path.

### Treat the local Figma file as the visual authority

Inspect the canvas and embedded assets in `docs/portfolio.fig` during implementation, and place only the assets needed by the site in the client public asset directory. Keep the original design file unchanged. Validate the rendered page against the design at desktop and narrow viewport sizes; use exported frames/assets from Figma if the archive does not expose a required font or image at suitable quality.

## Risks / Trade-offs

- [Embedded assets or typography may not be directly reusable at production quality] → Inspect the canvas and asset archive during implementation and export missing source assets from Figma rather than substituting unrelated imagery.
- [A highly generic component system could weaken visual fidelity] → Reuse at the level of repeated content and shared site chrome; keep unique Figma sections purpose-built.
- [Configurable color combinations can become inaccessible] → Choose accessible defaults and verify contrast for the shipped theme; document that custom theme values remain the operator's responsibility.

## Migration Plan

There is no existing client application to migrate. Initialize the Next.js app in `client/`, implement the design and configuration, then verify the production build and responsive rendering. Rollback consists of removing the newly introduced client application files; the design source and server directory remain untouched.