## Why

On mobile, the hero portrait is capped at 76vw and 320px, leaving unused space within the hero content area. Making the portrait wrapper fill that available width gives the image a stronger, more consistent mobile presentation.

## What Changes

- Set the hero portrait wrapper to use 100% of the available mobile hero content width.
- Preserve the existing square aspect ratio, image crop behavior, and desktop sizing.

## Capabilities

### New Capabilities

### Modified Capabilities
- `portfolio-experience`: Specify full-width hero portrait presentation on mobile viewports.

## Impact

- Updates responsive hero styling in the client portfolio.
- Does not change image content, desktop layout, or page navigation.