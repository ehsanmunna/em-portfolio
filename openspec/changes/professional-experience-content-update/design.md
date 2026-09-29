## Context

The experience section is already driven by structured data in the client portfolio configuration, which keeps the visual presentation reusable and centralized. The work here is content-focused: replace outdated or placeholder career entries with the verified information from the supplied PDF while preserving the current section layout and typographic treatment.

## Goals / Non-Goals

**Goals:**
- Update the Professional Experience content to reflect the source PDF.
- Keep the existing experience timeline structure and styling intact.
- Preserve maintainability by editing the structured content source rather than hard-coding copy in presentation components.

**Non-Goals:**
- Redesigning the experience section layout or adding new visual patterns.
- Changing the site architecture or introducing a CMS or external data dependency.
- Modifying unrelated portfolio sections beyond the experience content.

## Decisions

### Keep the update data-driven
The existing portfolio model stores roles in typed configuration arrays. Updating those entries is the lowest-risk and most maintainable path because it preserves the shared section structure and avoids duplication across components.

### Treat the PDF as the source of truth for content accuracy
The PDF provides the approved reference for titles, employers, periods, and role summaries. The implementation should align the visible content to that material and avoid introducing interpretation beyond the source data.

### Limit the change to necessary content updates
The scope is intentionally narrow: replace the professional timeline entries, confirm the copy still fits within the current layout, and avoid broader restructuring unless the PDF introduces a missing requirement that impacts readability.

## Risks / Trade-offs

- [The PDF may contain role details that exceed the current section's ideal length] → trim descriptions for readability while preserving the source meaning.
- [Role ordering and chronology may need interpretation] → preserve the ordering described in the PDF and confirm any ambiguous periods before implementation.
- [A content-only update could reveal layout strain] → validate the experience section at the standard responsive breakpoints before final sign-off.

## Migration Plan

1. Review the supplied PDF and extract the approved professional experience entries.
2. Update the structured content source in the client config for the experience section.
3. Validate the rendered timeline for hierarchy, readability, and spacing.
4. If text length or layout breaks, adjust copy to fit the current design without altering the section structure.

## Open Questions

None.
