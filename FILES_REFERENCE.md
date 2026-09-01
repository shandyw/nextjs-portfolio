# Project Files Reference

## Quick File Navigation

### Entry Points

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js optimization

### Application Root

- `app/layout.tsx` - Root layout (fonts, metadata)
- `app/globals.css` - Global styles & design tokens
- `app/page.tsx` - Homepage
- `app/error.tsx` - Error boundary
- `app/not-found.tsx` - Custom 404

### Routes

- `app/portfolio/page.tsx` - Portfolio page
- `app/blog/page.tsx` - Blog page

### Components

**Layout Components** (`components/layout/`)

- `Header.tsx` - Header with skip link + nav
- `Navigation.tsx` - Primary responsive navigation
- `Footer.tsx` - Site footer
- `SkipLink.tsx` - Accessible skip link

**UI Primitives** (`components/ui/`)

- `Container.tsx` - Max-width container
- `Section.tsx` - Section wrapper with spacing

**Exports**

- `components/index.ts` - Barrel exports

### Libraries

**Animation** (`lib/animation/`)

- `utils.ts` - GSAP helpers, reduced-motion detection

**General** (`lib/`)

- `utils.ts` - Utilities (clsx, debounce, etc.)
- `index.ts` - Barrel exports

### Types

- `types/index.ts` - TypeScript definitions

### Configuration Files

- `tailwind.config.js` - Tailwind configuration (design tokens)
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint rules
- `.editorconfig` - Editor formatting
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variables template

### Documentation

- `README.md` - Project overview (existing)
- `DESIGN.md` - Design system (existing)
- `design_tokens.json` - Machine-readable tokens (existing)
- `ARCHITECTURE.md` - Technical architecture guide
- `DEVELOPMENT.md` - Development workflow
- `SITE_MAP.md` - Site structure and navigation
- `IMPLEMENTATION_REPORT.md` - Project completion report (this file)

### Static Assets

- `public/README.md` - Placeholder for assets

---

## File Count Summary

### Application Code

- **Pages**: 5 (home, portfolio, blog, error, 404)
- **Components**: 6 (4 layout + 2 UI)
- **Utilities**: 2 (animation, general)
- **Types**: 1

### Configuration

- **Config Files**: 8
- **Documentation**: 4 new + 2 existing

**Total Files Created**: ~30+

---

## Imports Reference

### Clean Imports (Via Barrel Exports)

```tsx
// Components
import { Header, Navigation, Footer, SkipLink } from "@/components/layout";
import { Container, Section } from "@/components/ui";
import {
  Header,
  Navigation,
  Footer,
  SkipLink,
  Container,
  Section,
} from "@/components";

// Library utilities
import { clsx, debounce, isBrowser } from "@/lib";
import { getGsap, prefersReducedMotion } from "@/lib/animation/utils";

// Types
import type { BlogPost, PortfolioProject, Testimonial } from "@/types";
```

---

## Key Path Aliases

```json
{
  "@/*": ["./*"],
  "@/app/*": ["./app/*"],
  "@/components/*": ["./components/*"],
  "@/lib/*": ["./lib/*"],
  "@/types/*": ["./types/*"]
}
```

---

## NPM Scripts

```json
{
  "dev": "next dev", // Start development server
  "build": "next build", // Production build
  "start": "next start", // Start production server
  "lint": "next lint", // Run ESLint
  "type-check": "tsc --noEmit", // TypeScript validation
  "format": "prettier ...", // Format code
  "analyze": "ANALYZE=true ..." // Bundle analysis
}
```

---

## CSS Classes & Utilities

### Typography

- `.text-display`, `.text-headline-lg`, `.text-headline-md`, `.text-title-lg`
- `.text-body-lg`, `.text-body-md`, `.text-label-md`, `.text-label-sm`
- Font families: `font-sans`, `font-serif`, `font-display`, `font-body`, `font-label`

### Colors

- `bg-background`, `bg-surface`, `bg-primary`, `text-text`, `text-primary`, etc.
- Opacity modifiers: `text-text/80`, `bg-primary/50`, etc.

### Spacing

- `p-*`, `m-*`, `gap-*` with scale: xs, sm, base, md, lg, xl, 2xl
- Named gaps: `gap-gutter` (24px)

### Layout

- `container` - Max-width container with responsive padding
- `px-gutter` - Horizontal padding (24px)
- `py-*`, `pt-*`, `pb-*` - Vertical padding

### Focus & Interactions

- `:focus-visible` - Custom focus styles
- `hover:` - Hover states
- `transition-*` - Smooth transitions

---

## Environment Setup Checklist

After running `npm install`:

1. ✅ Dependencies installed
2. ✅ TypeScript configured
3. ✅ Tailwind CSS ready
4. ✅ Next.js app ready
5. ✅ Dev server ready: `npm run dev`

---

## Development Quick Start

```bash
# Setup
npm install

# Development
npm run dev        # http://localhost:3000
npm run type-check # In another terminal
npm run lint

# Make changes...

# Before committing
npm run format
npm run lint
npm run type-check

# Build for production
npm run build
npm start
```

---

## Documentation Reading Order

1. **ARCHITECTURE.md** - Understand project structure
2. **DEVELOPMENT.md** - Setup development workflow
3. **SITE_MAP.md** - See planned future pages
4. **Code comments** in components and utilities
5. **IMPLEMENTATION_REPORT.md** - Reference for decisions

---

## Support for Future Development

### Adding a New Page

1. Create directory under `app/` (e.g., `app/about/`)
2. Create `page.tsx` with layout components
3. Add metadata to the page export
4. Update navigation if needed

### Adding a New Component

1. Create in appropriate directory (`components/layout/` or `components/ui/`)
2. Add to barrel export (`components/index.ts`)
3. Use in pages/other components

### Adding Animations

1. Use `"use client"` directive
2. Import from `@/lib/animation/utils`
3. Check `prefersReducedMotion()`
4. Use async `getGsap()` pattern
5. Remember to cleanup on unmount

### Styling New Elements

1. Use Tailwind semantic classes first
2. Refer to `tailwind.config.js` for available tokens
3. Check color contrast with APCA guidelines
4. Use CSS custom properties for complex theming

---

## Common Tasks

### Add a new section to homepage

- Edit `app/page.tsx`
- Use `<Section>` component with unique `id`
- Wrap content in `<Container>`
- Reference design tokens for spacing/colors

### Update navigation links

- Edit `Navigation.tsx`
- Update `NAV_ITEMS` constant
- Test mobile menu
- Verify keyboard navigation

### Change colors/spacing

- Check `design_tokens.json` for approved values
- Update `tailwind.config.js` if needed
- Verify contrast with APCA
- Test with `prefers-reduced-motion`

---

Last Updated: [Implementation Date]
Status: ✅ Production-ready foundation
