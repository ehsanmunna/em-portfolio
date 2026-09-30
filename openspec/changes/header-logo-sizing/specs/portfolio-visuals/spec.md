## ADDED Requirements

### Requirement: Header brand logo size and padding
The portfolio SHALL display the header brand logo image at 32px with 8px padding instead of full-bleed, while preserving the brand tile styling, name, home link, and accessible brand name.

#### Scenario: Visitor views the header on desktop
- **WHEN** a visitor loads the portfolio at a desktop viewport width
- **THEN** the logo image displays at 32px with 8px padding inside its tile, with the brand name, home link, and accessible name unchanged

#### Scenario: Visitor views the header on mobile
- **WHEN** a visitor loads the portfolio at a mobile viewport width
- **THEN** the logo keeps its 32px image with 8px padding in a slightly smaller tile, consistent with the existing mobile step-down, with no layout breakage
