## 1. Establish the Next.js application

- [x] 1.1 Initialize a TypeScript Next.js App Router application in `client/` with development, lint, and production build scripts.
- [x] 1.2 Inspect the Figma canvas and embedded assets; identify the page sections, typography, images, and interactions required for implementation.
- [x] 1.3 Add the required design assets to the client public assets and configure the design typography without changing `docs/portfolio.fig`.

## 2. Add centralized configuration

- [x] 2.1 Define typed site identity and metadata configuration for the name, logo, and accessible logo label.
- [x] 2.2 Define a typed theme color set and apply it through shared CSS custom properties with accessible default color combinations.
- [x] 2.3 Define structured, typed portfolio content and configured destinations for the sections and repeated entries present in the design.

## 3. Implement the portfolio experience

- [x] 3.1 Build the shared page shell and design-specific reusable sections to match the Figma composition and styling.
- [x] 3.2 Render repeated portfolio entries from configuration and connect visible navigation and calls to action to their configured destinations or actions.
- [x] 3.3 Implement narrow-viewport layouts that preserve the design hierarchy and keep all content usable without horizontal scrolling.

## 4. Verify behavior and visual fidelity

- [x] 4.1 Compare desktop and narrow-viewport renders with the Figma design and correct material differences in layout, typography, imagery, and colors.
- [x] 4.2 Verify that changing site identity, theme colors, and supported content configuration updates the rendered experience without editing presentation components.
- [x] 4.3 Run the client lint and production build checks and resolve failures introduced by the implementation.