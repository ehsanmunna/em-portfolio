## Context

The portfolio already manages page composition through centralized content and shared section components. The current design issue is limited to the solutions-section artwork: the file name and appearance need to reflect the updated branded illustration, but no broader layout or content architecture changes are required.

## Goals / Non-Goals

**Goals:**
- Update the solutions-section artwork asset reference to the new branded file name.
- Apply the required 0.7 opacity treatment for the illustration.
- Preserve the existing content hierarchy, spacing, and accessibility semantics.

**Non-Goals:**
- Reworking the solutions section layout or content structure.
- Changing the portfolio's underlying data model or navigation behavior.
- Introducing a new image pipeline or external asset service.

## Decisions

### Keep the change narrowly scoped to the visual asset and styling
The issue is a controlled asset and styling update, not a feature expansion. Updating the asset reference and applying CSS opacity keeps the solution aligned with the design intent while minimizing churn in shared presentation code.

### Use the existing image configuration pattern
The current portfolio sections already source images from centralized content definitions. Reusing that pattern allows the updated asset name to be changed in one place while keeping the component structure consistent.

### Apply opacity at the image layer instead of redesigning the section
A direct opacity value on the image or its wrapper is the lowest-risk way to achieve the 0.7 visual treatment. This preserves the rest of the section layout and avoids unnecessary component refactoring.

## Risks / Trade-offs

- [The new asset may differ visually from the expected brand treatment] → Verify the updated file in the browser before release.
- [An opacity of 0.7 could reduce readability if the image is too strong] → Check contrast and layout balance during review before final approval.
- [A narrow asset-only fix could mask broader design drift] → Keep the change limited to the solutions illustration and confirm the surrounding section remains visually stable.

## Migration Plan

1. Add the new `solutions-wriented-cartton.jpg` asset to the client public images directory.
2. Update the solutions section image reference to the new file name.
3. Apply the 0.7 opacity rule to the illustration while preserving other layout and accessibility behavior.
4. Review the rendered page and revert the asset or opacity value if visual balance is off.

## Open Questions

None.
