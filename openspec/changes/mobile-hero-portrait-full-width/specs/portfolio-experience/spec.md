## ADDED Requirements

### Requirement: Mobile hero portrait fills the available width
The portfolio MUST display the hero portrait at 100% of the available hero content width on mobile viewports while preserving its square aspect ratio and cover crop. The portrait MUST remain within the page layout without causing horizontal overflow.

#### Scenario: Visitor views the hero on a mobile viewport
- **WHEN** a visitor opens the portfolio at a mobile viewport width
- **THEN** the hero portrait wrapper spans the available hero content width and the image fills the square wrapper using its existing crop behavior

#### Scenario: Visitor views the hero on a desktop viewport
- **WHEN** a visitor opens the portfolio at a desktop viewport width
- **THEN** the hero portrait retains its existing desktop dimensions and layout