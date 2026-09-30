## ADDED Requirements

### Requirement: Mobile project card content visibility
The system SHALL display every "My Recent Works" project card's post-image content (category, title, description, and technology tags) stacked below its image on mobile viewports, with no card's content clipped or hidden.

#### Scenario: Visitor views all projects on a mobile viewport
- **WHEN** a visitor opens the portfolio at a mobile viewport width (at or below the mobile breakpoint)
- **THEN** all three project cards, including "API Gateway Microservice", each show their image followed by their visible category, title, description, and technology tags

#### Scenario: Tablet and desktop project layouts unchanged
- **WHEN** a visitor opens the portfolio above the mobile breakpoint
- **THEN** the projects grid retains its existing multi-column presentation and full card content
