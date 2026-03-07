# TEXPLO'26 Website

Official landing page for **TEXPLO'26**, a national-level technical symposium conducted by **Mookambigai College of Engineering**.

This repository contains a polished single-page event website built with Next.js. It showcases the symposium, departments, event listings, gallery media, coordinators, venue details, and the registration call to action.

## Project status

- The site content is currently configured for **TEXPLO'26**.
- Event dates in the UI are set to **March 4, 2026**.
- Registration deadline logic is set to **March 3, 2026**.
- If this repository is reused for a future edition, update the hard-coded dates, text content, and assets before deploying.

## Highlights

- Animated hero section with countdown timer
- About section with symposium stats
- Media carousel for past-event highlights
- Expandable department-wise event listings
- Flip cards with rules, coordinators, venue, duration, and prizes
- Gallery lightbox for event photos
- General instructions and important dates
- Embedded Google Maps location section
- Coordinator contact cards
- Registration CTA with countdown and Google Forms link

## Tech stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [tRPC 11](https://trpc.io/)
- [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open <http://localhost:3000>.

## Available scripts

- `npm run dev` - Start the Next.js dev server with Turbopack
- `npm run build` - Create a production build
- `npm run start` - Run the production build
- `npm run preview` - Build and start locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix lint issues where possible
- `npm run typecheck` - Run TypeScript checks
- `npm run check` - Run lint and type checks together
- `npm run format:check` - Check Prettier formatting
- `npm run format:write` - Format the codebase with Prettier

## Content management

Most editable event content is stored in JSON files, which makes the site easy to maintain without changing component logic.

### Update event/content data

- `src/data/events.json` - Department and event details
- `src/data/coordinators.json` - Convenor and coordinator contacts
- `src/data/carousel.json` - Carousel media entries
- `src/data/gallery.json` - Gallery images

### Update assets

- `public/images/` - Image assets
- `public/images/gallery/` - Gallery-related images
- `public/logos/` - Brand assets
- `public/videos/` - Video assets for the carousel

### Update important hard-coded values

- `src/app/_components/hero.tsx` - Main event countdown target date
- `src/app/_components/register-cta.tsx` - Registration deadline and form link
- `src/app/_components/location.tsx` - Venue details and directions
- `src/app/layout.tsx` - SEO metadata and favicon

## Project structure

```text
src/
	app/
		_components/     Reusable landing-page sections
		api/trpc/        App Router tRPC route handler
		layout.tsx       Root layout and metadata
		page.tsx         Homepage composition
	data/              JSON-driven event and content data
	server/            tRPC server setup
	styles/            Global styles
	trpc/              Client/server tRPC helpers
public/              Static images, videos, and logos
```

## Environment notes

This project uses environment validation through `@t3-oss/env-nextjs`.

Current required server variable:

- `NODE_ENV`

You can also use `SKIP_ENV_VALIDATION=1` when needed for certain build environments.

## Deployment

This project can be deployed on any platform that supports Next.js, including:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- Self-hosted Node.js environments

Before deploying, verify:

1. Event dates are up to date.
2. Registration link is correct.
3. All image/video paths resolve correctly.
4. Metadata in `layout.tsx` matches the latest edition.

## Notes

- The codebase still includes T3/tRPC scaffolding, even though the current site is primarily content-driven.
- The homepage is assembled in `src/app/page.tsx` from section-based components.
- This repository is a good base for future symposium editions by swapping content, dates, and assets.
