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

## Contact API Configuration

Set `NEXT_PUBLIC_API_BASE_URL` in the client environment before running `npm run dev` or `npm run build`. Use `http://localhost:4000` locally and the deployed Express API base URL in production. Next.js embeds this public value into the client bundle at build time, so rebuild after changing it. Do not put SMTP credentials in the client environment.

Configure the API's `ALLOWED_ORIGINS` with the exact browser origins, including scheme and port where applicable. For example, use `http://localhost:3000` locally and the deployed portfolio origin in production. SMTP credentials, sender, and recipient belong only in the API runtime environment.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This project is structured to keep content, branding, and visual tokens separated so the portfolio can be rebranded or updated with minimal changes to presentation components.
