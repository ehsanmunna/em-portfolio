## MODIFIED Requirements

### Requirement: Accessible consent experience
The system SHALL present consent controls that are keyboard-accessible, dismissible, and visually consistent with the site theme without blocking core content, and SHALL display the banner body copy exactly as approved.

#### Scenario: Keyboard and dismiss flow
- **WHEN** the banner is visible and a keyboard user tabs through it
- **THEN** Accept, Decline, and Learn-more/close controls are reachable and operable, and focus does not trap page content

#### Scenario: Re-open consent settings
- **WHEN** a visitor with a stored choice opens consent settings from the footer
- **THEN** the system shows current choice and allows switching between accept and decline

#### Scenario: Banner message copy
- **WHEN** the consent banner is visible
- **THEN** the banner body text is exactly "We observe to understand visits (clicks, scrolls) and improve usability. It runs only if you accept."
- **AND** the existing title, buttons, and Learn-more link remain unchanged
