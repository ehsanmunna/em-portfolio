## Why

The Download CV button currently points to a local `/resume.pdf` path instead of the user's shared CV. Updating its configured destination lets visitors access the supplied document.

## What Changes

- Set the Download CV button destination to `https://drive.google.com/file/d/1r_tsxf8aZ16_z1e808Cb5NuDPH_ywePq/view?usp=sharing`.
- Preserve the existing button label, icon, and presentation.

## Capabilities

### New Capabilities

### Modified Capabilities
- `portfolio-experience`: Specify the destination used by the Download CV call to action.

## Impact

- Updates the configured hero resume destination in the client portfolio.
- Does not change the button's presentation or other portfolio content.