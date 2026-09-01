# Shandy Ward Portfolio

A high-performance, accessible portfolio website built with Next.js, React, TypeScript, Tailwind CSS, and GSAP.

## Project Overview

This is a production-ready base architecture for a senior frontend engineer portfolio. The site prioritizes:

- **Performance**: Server components by default, minimal client-side JavaScript
- **Accessibility**: WCAG 2.2 AA compliance with APCA principles
- **Design**: Editorial modernist aesthetic with bold typography and controlled color
- **Code Quality**: TypeScript, semantic HTML, clean architecture

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with design tokens
- **Animation**: GSAP (with ScrollTrigger support when needed)
- **Fonts**: Source Serif 4 through `next/font`; self-hosted Satoshi through CSS `@font-face`
- **Dev Tools**: ESLint, Prettier, Vitest, and TypeScript strict mode

## Project Structure

```
app/
├── blog/               # Blog page
├── portfolio/          # Portfolio page
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx            # Homepage
├── globals.css         # Global styles, CSS variables, accessibility
├── error.tsx           # Error boundary
└── not-found.tsx       # 404 page

components/
├── layout/
│   ├── Header.tsx      # Header + skip link + navigation
│   ├── Navigation.tsx  # Responsive primary navigation
│   ├── Footer.tsx      # Footer with links
│   └── SkipLink.tsx    # Skip to content link
├── ui/
│   ├── Container.tsx   # Layout container primitive
│   └── Section.tsx     # Section wrapper with spacing
└── index.ts            # Barrel exports

lib/
├── animation/
│   └── utils.ts        # GSAP helpers and reduced-motion support
├── utils.ts            # General utilities
└── index.ts            # Barrel exports

public/                # Static assets (images, fonts, etc.)

Configuration:
├── tsconfig.json       # TypeScript configuration with path aliases
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS design tokens
├── postcss.config.js   # PostCSS plugins (Tailwind, autoprefixer)
├── .eslintrc.json      # ESLint rules
├── .editorconfig       # Editor formatting rules
├── package.json        # Dependencies
└── design.md          # Design system documentation
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## Design System

The portfolio follows a strict design system defined in `DESIGN.md` and `design_tokens.json`.

### Color Palette

- **Background**: #FFF5D7 (Ragin Beige)
- **Surface**: #FFAAAB (Pink Leaf)
- **Primary**: #FF5E6C (Coral Pink)
- **Text**: #151515 (Deep Charcoal)
- **Accent**: #FEB300 (Sleuthe Yellow)

All colors are configured as Tailwind utilities and CSS custom properties.

### Typography

- **Display Font**: Satoshi (800 weight)
- **Heading Font**: Satoshi (700 weight)
- **Body Font**: Source Serif 4 (400 weight)

Fonts use `next/font` for automatic optimization and zero layout shift.

### Spacing Scale

- xs: 4px
- sm: 12px
- base: 8px
- md: 24px
- lg: 40px
- xl: 64px
- 2xl: 96px

## Accessibility

The site is built with accessibility as a core requirement:

### WCAG 2.2 AA Compliance

- Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Correct heading hierarchy (h1 → h6)
- Keyboard-accessible navigation and forms
- Visible focus indicators (3px outline with contrast)
- Skip-to-content link
- Proper ARIA labels and current state indicators

### APCA-Aware Color Usage

- Primary text color (#151515) on background (#FFF5D7) has Lc 99
- No reliance on color alone for state (paired with text, icons, borders)
- Error states distinguished by color + icon/text + border styling

### Motion & Reduced Motion

- All animations respect `prefers-reduced-motion: reduce`
- GSAP animations are disabled for users with reduced motion preference
- No layout shift from fonts or images
- Progressive enhancement: content is usable without JavaScript

## Forms Foundation

Global form styling supports:

- Text and email inputs
- Textareas
- Semantic labels
- Required indicators
- Error states with clear visual distinction
- Helper and error text
- Disabled states
- Focus and hover states

All form controls use accessible patterns:

```tsx
<label htmlFor="email" className="label-required">
  Email
</label>
<input
  type="email"
  id="email"
  aria-invalid={hasError}
  aria-describedby={errorId}
/>
<div id={errorId} className="form-error">
  {error}
</div>
```

## Animation Architecture

GSAP animations use a safe, patterns-based approach:

### Utilities (`lib/animation/utils.ts`)

- `prefersReducedMotion()`: Check user preference
- `getGsap()`: Safely load GSAP (async)
- `getScrollTrigger()`: Safely load ScrollTrigger plugin
- `initGsapScrollTrigger()`: Register plugin with cleanup
- `createAnimation()`: Wrapper for animations with motion detection

### Usage Pattern

```tsx
"use client";

import { useEffect } from "react";
import { getGsap } from "@/lib/animation/utils";

export function AnimatedComponent() {
  useEffect(() => {
    (async () => {
      const gsap = await getGsap();
      if (!gsap) return; // User prefers reduced motion

      gsap.to(".element", { duration: 1, opacity: 1 });
    })();
  }, []);

  return <div className="element" />;
}
```

### Rules

- Use client components only when animation is needed
- Always check `prefersReducedMotion()` before animating
- Use GSAP contexts for cleanup
- Register plugins (ScrollTrigger) properly
- Kill all tweens on component unmount

## Routing

The site uses Next.js App Router:

### Pages

- `/` - Homepage with placeholder sections (Hero, About, Expertise, Portfolio, Testimonials, Contact)
- `/portfolio` - Portfolio page stub
- `/blog` - Blog page stub
- `/404` - Custom not-found page
- Error boundary for unexpected errors

### Metadata

Each page has route-specific metadata. The root layout provides:

- Title template: "%s | Shandy Ward"
- Site description
- Open Graph tags
- Twitter card setup

## Performance Optimization

### Server Components by Default

Components are server-rendered unless they require interactivity. Navigation,
Hero, Footer, and the root error boundary are client components.

### Image Optimization

- Next.js `<Image />` is configured for future raster content; current artwork is inline SVG
- Automatic format conversion (AVIF, WebP)
- Responsive `sizes` attribute
- Lazy loading below-the-fold images

### Font Optimization

- `next/font` with `display: swap`
- No layout shift
- Fonts are preloaded automatically
- CSS variables for easy theming

### Code Splitting

- Automatic per-page code splitting
- Dynamic imports for animation libraries
- Tree-shakeable component exports

### CSS Efficiency

- Tailwind provides only used styles
- CSS custom properties for theming
- Minimal global CSS
- No unnecessary resets

## Error Handling

### Error Boundaries

- `app/error.tsx` - Catches unexpected errors with user-friendly UI
- `app/not-found.tsx` - Custom 404 page with helpful navigation

Both follow the design system and are fully keyboard accessible.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- ES2020+ JavaScript

## Deployment

The site is optimized for deployment on:

- Vercel (recommended for Next.js)
- Netlify
- Self-hosted Node.js servers

Build output is fully static-renderable with selective dynamic routes.

## Next Steps

This foundation is ready for building individual page sections:

1. **Hero Section** - Large display typography, background treatment
2. **About Section** - Introductory copy, brand voice
3. **Expertise Cards** - Skills grid with icons/badges
4. **Portfolio Grid** - Project cards with images and case study links
5. **Testimonials** - Client quotes with attribution
6. **Contact Form** - Form handling with validation and submission

Each section can be built as a separate task while reusing the established layout components, design tokens, and accessibility patterns.

## Development Workflow

```bash
# Start development
npm run dev

# In separate terminal, run type checking
npm run type-check

# Make changes, test in browser

# Check accessibility (run axe DevTools in browser)

# Check performance (use Lighthouse in DevTools)

# Format code before committing
npm run format

# Run final lint
npm run lint
```

## Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **First Contentful Paint**: < 1.8s

Measured with Lighthouse on throttled network.

## License

All rights reserved © 2024 Shandy Ward
