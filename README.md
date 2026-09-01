# Shandy Ward Portfolio

A bold, editorial portfolio site for Shandy Ward, a senior web developer focused on creating fast, accessible, high-performance digital experiences.

The visual direction combines **Swiss Pop**, **editorial modernism**, and a warm retro-inspired palette. The site uses oversized typography, generous whitespace, geometric shapes, black-and-white portrait imagery, and restrained motion to create a professional portfolio that feels vibrant, memorable, and design-led without becoming visually noisy.

The frontend is built with **Next.js**, **Tailwind CSS**, and **GSAP**. The
homepage structure is implemented; its Hero is animated and the remaining
sections currently use placeholder content while their content architecture is
finalized.

## Design Direction

The site is based on the following core palette:

- **Background:** Ragin Beige `#FFF5D7`
- **Surface:** Pink Leaf `#FFAAAB`
- **Primary:** Coral Pink `#FF5E6C`
- **Text:** Deep Charcoal `#151515`
- **Accent:** Sleuthe Yellow `#FEB300`

Typography uses the pairing:

- **Satoshi** — display typography, headings, navigation, buttons, labels, and UI
- **Source Serif 4** — body copy, project narratives, editorial text, and selective italic display accents

The visual system favors:

- Large, high-impact typography
- Editorial grid layouts
- Asymmetrical compositions
- Geometric circles, arcs, stripes, and dot patterns
- Black-and-white photography paired with saturated color fields
- Minimal borders and restrained layered shadows
- Subtle `8px` border radii
- Generous spacing and negative space
- Purposeful GSAP motion rather than decorative animation
- No dark mode in the initial scope

## Accessibility

Accessibility is a core part of the design system.

The site will target **WCAG 2.2 AA** for production conformance and use **APCA** as an additional design constraint when evaluating text and background combinations.

Important palette rules include:

- Use `#151515` as the primary readable text color.
- Do not use Coral Pink `#FF5E6C` as normal-size text on Ragin Beige `#FFF5D7`.
- Do not use white text as the default foreground on Coral Pink.
- Use Coral Pink primarily for large display emphasis, graphic elements, borders, focus accents, and selected interactive decoration.
- Use Sleuthe Yellow and Pink Leaf as supporting surfaces with Deep Charcoal text.
- Never communicate state or meaning through color alone.
- Respect `prefers-reduced-motion`.
- Maintain visible keyboard focus and accessible interactive targets.

The detailed design tokens and contrast rules live in `DESIGN.md`.

## Technology

- **Next.js**
- **React**
- **Tailwind CSS**
- **GSAP**
- **TypeScript**
- **Accessible semantic HTML**
- **Responsive, mobile-first layouts**

## Files

| File                 | Description                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `design.md`          | Complete design-system specification, including palette, typography, APCA usage rules, accessibility guidance, spacing, shapes, motion, and component direction. |
| `CURRENT_STATE.md`   | Verified implementation status, conventions, known gaps, and asset ownership.                                                                                    |
| `tailwind.config.js` | Tailwind theme configuration derived from the design tokens in `DESIGN.md`.                                                                                      |
| `design_tokens.json` | Portable design-token file for use with Tailwind, Figma, Style Dictionary, and other token workflows.                                                            |
| `README.md`          | Project overview, visual direction, technology stack, accessibility goals, and file reference.                                                                   |

## Planned Site Direction

The homepage hero will establish the core visual language immediately: oversized editorial messaging on a warm beige canvas, Coral Pink emphasis, geometric yellow and pink shapes, black-and-white portrait imagery, and a simple navigation system.

The rest of the site should extend that same language into:

- Featured work and case studies
- About / experience
- Services or capabilities
- Technical stack
- Contact
- Optional journal or writing section

Project layouts should feel more like editorial compositions than repeated cards. GSAP will be used for masked text reveals, image clipping, staggered entrances, pinned storytelling, restrained parallax, and other motion that reinforces hierarchy without reducing usability.
