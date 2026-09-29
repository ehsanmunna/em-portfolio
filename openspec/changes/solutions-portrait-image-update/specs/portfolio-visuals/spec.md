## Purpose

Defines the visible portfolio asset behavior for the solutions section so the experience uses the updated branded illustration with the intended translucency.

## ADDED Requirements

### Requirement: Updated solutions illustration asset
The portfolio SHALL use the `solutions-wriented-cartton.jpg` image for the solutions section in place of the previous portrait asset.

#### Scenario: Solutions section loads the new illustration
- **WHEN** a visitor loads the portfolio homepage
- **THEN** the solutions section renders the `solutions-wriented-cartton.jpg` asset instead of the previous portrait file

### Requirement: Reduced opacity for the solutions illustration
The portfolio SHALL render the solutions illustration at 0.7 opacity so the image remains visible without overpowering adjacent content.

#### Scenario: Illustrated panel is displayed
- **WHEN** the solutions section is shown
- **THEN** the illustration opacity is set to 0.7 while preserving readability and layout integrity
