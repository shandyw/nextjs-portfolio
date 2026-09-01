# Current Project State

Last verified: August 13, 2026.

## Implementation

- The App Router exposes `/`, `/portfolio`, and `/blog` plus root error and not-found handling.
- The homepage contains Hero, About, Expertise, Portfolio, Testimonials, and Contact sections.
- The Hero is the only bespoke, animated homepage section. Other content remains placeholder work.
- There are no dynamic project or blog routes, CMS, MDX pipeline, or form API.

## Runtime Conventions

- Use server components by default.
- Navigation, Hero, Footer, and the root error boundary are client components.
- Reuse `Container`, `Section`, and the semantic Tailwind tokens.
- Use Deep Charcoal for normal-size readable text. Coral Pink is reserved for large display emphasis, decoration, borders, and focus accents.
- Motion must preserve visible, usable final states and respect `prefers-reduced-motion`.

## Hero and Asset Ownership

The React SVG files in `components/hero/` are the runtime source for Hero artwork. They remain inline so GSAP can address internal paths. The portrait animation depends on stable group IDs, `.draw-group`, and direct `getTotalLength()` access.

The matching files in `public/graphics/hero/` are source/reference exports, not runtime assets. Do not delete or switch representations until an explicit generation or design-export workflow is selected.

## Tooling

- `npm run lint`: Next.js ESLint rules
- `npm run type-check`: strict TypeScript verification
- `npm test`: Vitest unit tests in jsdom
- `npm run format:check`: non-mutating Prettier verification
- `npm run build`: production compilation and static generation

## Known Product Work

- Replace placeholder portfolio, blog, and testimonial content with approved content rather than fabricated data.
- Select a content source before adding dynamic detail routes.
- Connect the contact form to an approved delivery mechanism with accessible validation and status feedback.
- Add real portfolio and social imagery using Next Image where raster optimization is useful.
