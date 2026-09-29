## Purpose

Defines the expected professional experience content and presentation so the portfolio reflects the latest vetted career history from the reference PDF while preserving the current page structure and accessibility expectations.

## ADDED Requirements

### Requirement: Portfolio experience content reflects source PDF
The portfolio SHALL present professional experience entries that match the latest approved timeline, titles, employers, and descriptions provided in the source PDF.

#### Scenario: Experience content is updated
- **WHEN** a visitor opens the site and reaches the Professional Experience section
- **THEN** the displayed roles, companies, periods, and descriptions match the current source material rather than stale placeholder content

### Requirement: Experience content remains structured and maintainable
The portfolio SHALL store professional experience entries as structured data so the content can be updated without rewriting the underlying presentation component.

#### Scenario: Experience data changes
- **WHEN** an editor updates the approved experience content in configuration
- **THEN** the rendered experience timeline reflects the new values using the existing reusable section pattern

### Requirement: Supporting section metadata remains consistent
The portfolio SHALL keep the section heading and descriptive copy aligned with the experience timeline while updating the role content from the provided source material.

#### Scenario: Experience section renders with updated metadata
- **WHEN** the portfolio loads the experience section
- **THEN** the section heading and description remain coherent with the updated timeline content and visual hierarchy
