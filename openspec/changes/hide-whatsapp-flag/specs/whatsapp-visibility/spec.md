## Purpose

Provides a configurable flag to control the visibility of the WhatsApp floating button on the portfolio site.

## ADDED Requirements

### Requirement: WhatsApp visibility flag

The system SHALL provide a boolean configuration flag `showWhatsapp` that controls whether the WhatsApp floating button is rendered. The flag MUST default to `false`.

#### Scenario: WhatsApp hidden by default

- **WHEN** the site loads with `showWhatsapp` set to `false`
- **THEN** the WhatsApp floating button is not rendered anywhere on the page

#### Scenario: WhatsApp visible when enabled

- **WHEN** the site loads with `showWhatsapp` set to `true`
- **THEN** the WhatsApp floating button is rendered in its default position

#### Scenario: Flag is configurable

- **WHEN** a developer changes the `showWhatsapp` value in the portfolio config
- **THEN** the next build reflects the updated visibility without code changes
