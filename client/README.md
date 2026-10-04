# Portfolio Client

A Next.js portfolio site for showcasing a developer profile, services, projects, certifications, and contact information.

## Overview

This application is built with Next.js and TypeScript and uses a configuration-driven approach for branding and theme values. The visual system is intentionally centralized so colors and shared UI tokens can be updated from one place instead of being hardcoded across components.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- CSS custom properties
- Variable font loading via Fontsource
- Lucide and React Icons

## Project Structure

- `src/app` — app shell, layout, and page entry points
- `src/components` — reusable sections and UI building blocks
- `src/config` — site metadata and theme configuration
- `public/images` — local assets used in the portfolio

## Theme Configuration

The configurable theme is defined in `src/config/site.ts`.

- `siteConfig.theme` contains the primary brand colors for the app.
- `themeStyle` maps those values to CSS custom properties such as:
  - `--color-background`
  - `--color-surface`
  - `--color-foreground`
  - `--color-accent`
  - `--color-muted`
  - `--color-border`
- Those variables are applied to the root HTML element in `src/app/layout.tsx`.

To update the portfolio branding, change the values in `src/config/site.ts` instead of hardcoding colors inside component styles.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the app.

## Contact Form Configuration (EmailJS)

Contact inquiries are sent directly from the browser through EmailJS. No backend contact endpoint is required.

Set the following public values in the client environment before running `npm run dev` or `npm run build`:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

See `client/.env.example` for blank placeholders. Next.js embeds `NEXT_PUBLIC_*` values into the client bundle at build time, so rebuild/redeploy the client after changing them. Do not commit secrets; values are public identifiers by design.

EmailJS setup:

1. Create an EmailJS service connected to your mailbox and note the service ID.
2. Create a template addressed to the portfolio owner address with params `name`, `email`, `message`, and `reply_to` (reply-to set to the visitor email).
3. Copy the public key from EmailJS dashboard account settings.
4. In the EmailJS dashboard, restrict allowed sending domains/senders to your portfolio origins.
5. Deploy the client with the three `NEXT_PUBLIC_EMAILJS_*` values and send a staged inquiry to verify success and failure states.

Note: `POST /api/contact` has been removed from the Express API and returns 404. Contact delivery no longer uses SMTP, CORS allowlists, or server rate limiting.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This project is structured to keep content, branding, and visual tokens separated so the portfolio can be rebranded or updated with minimal changes to presentation components.
