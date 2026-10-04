## Purpose

Lets portfolio visitors start a WhatsApp conversation with the owner from any page via a persistent floating button.

## ADDED Requirements

### Requirement: Display a persistent floating WhatsApp button
The system MUST display a WhatsApp action button fixed to the bottom-right of the viewport on all pages, without blocking primary content or navigation.

#### Scenario: Button is visible site-wide
- **WHEN** a visitor opens any page of the portfolio
- **THEN** a WhatsApp button is visible fixed to the bottom-right viewport corner

#### Scenario: Button does not obscure content on small screens
- **WHEN** the viewport is a mobile width
- **THEN** the button remains reachable and does not cover form submit actions or footer navigation

### Requirement: Open a WhatsApp chat with preconfigured contact
The system MUST link the button to the configured WhatsApp number using a `wa.me` URL with an optional URL-encoded prefilled message, opening in a new tab with safe rel attributes.

#### Scenario: Visitor starts a chat
- **WHEN** the visitor activates the floating button
- **THEN** the system opens a new tab to the configured `wa.me` chat URL including the prefilled message when configured

#### Scenario: WhatsApp contact is configurable
- **WHEN** the configured number or default message changes in site/portfolio config
- **THEN** the button links to the updated chat URL without code changes to the component

### Requirement: Keep the button accessible
The floating button MUST expose an accessible name, remain keyboard-focusable with a visible focus state, and meet contrast requirements.

#### Scenario: Keyboard and screen-reader access
- **WHEN** a keyboard or screen-reader user tabs to the floating button
- **THEN** the button announces its purpose (e.g. "Chat on WhatsApp") and can be activated with Enter or Space
