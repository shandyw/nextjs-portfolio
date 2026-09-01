---
accessibility:
  primaryOnBackground:
    apcaLc: 49
    background: "#FFF5D7"
    foreground: "#FF5E6C"
    restriction: Large/display text and decorative emphasis only; never
      body copy or small UI text
  rules:
    - "Use #151515 on #FFF5D7 for primary reading text, navigation,
      labels, and long-form content."
    - "Do not use #FF5E6C as normal-size text on #FFF5D7."
    - "Do not use white text on #FF5E6C."
    - "For small interactive labels, prefer #151515 and #FFF5D7 as the
      foreground/background pair."
    - "Use #FF5E6C primarily for large display emphasis, fills, graphic
      shapes, borders, focus accents, and non-text decoration."
    - "Use #FEB300 as an accent or larger highlighted surface; pair text
      on it with #151515."
    - "Use #FFAAAB as a feature surface; keep text #151515 and avoid small
      low-contrast secondary copy."
    - Never communicate state by color alone; pair color with text, icons,
      underlines, borders, or shape changes.
  standard: APCA-aware design system; WCAG 2.2 AA remains the
    conformance baseline
  textOnAccent:
    apcaLc: 70
    background: "#FEB300"
    foreground: "#151515"
  textOnBackground:
    apcaLc: 99
    background: "#FFF5D7"
    foreground: "#151515"
  textOnPrimary:
    apcaLc: 48
    background: "#FF5E6C"
    foreground: "#151515"
    restriction: Large/display text only; do not use for body copy,
      small labels, or button labels
  textOnSurface:
    apcaLc: 69
    background: "#FFAAAB"
    foreground: "#151515"
colors:
  accent: "#FEB300"
  background: "#FFF5D7"
  primary: "#FF5E6C"
  surface: "#FFAAAB"
  text: "#151515"
components:
  button-primary:
    accentColor: "{colors.primary}"
    backgroundColor: "{colors.text}"
    padding: "{spacing.sm} {spacing.md}"
    rounded: "{rounded.DEFAULT}"
    textColor: "{colors.background}"
    typography: "{typography.label-md}"
  button-primary-hover:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.text}"
    textColor: "{colors.text}"
  button-secondary:
    backgroundColor: transparent
    borderColor: "{colors.text}"
    padding: "{spacing.sm} {spacing.md}"
    rounded: "{rounded.DEFAULT}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
  card:
    backgroundColor: "{colors.background}"
    padding: "{spacing.md}"
    rounded: "{rounded.DEFAULT}"
    shadow: "{shadows.layered}"
    textColor: "{colors.text}"
  card-feature:
    backgroundColor: "{colors.surface}"
    padding: "{spacing.lg}"
    rounded: "{rounded.DEFAULT}"
    textColor: "{colors.text}"
  input-field:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.text}"
    padding: "{spacing.sm}"
    rounded: "{rounded.DEFAULT}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
darkMode: Out of scope
name: Shandy Ward Portfolio
rounded:
  DEFAULT: 8px
  full: 9999px
  lg: 8px
  md: 8px
  sm: 4px
  xl: 8px
shadows:
  layered: 0 1px 2px rgb(21 21 21 / 0.05), 0 8px 24px rgb(21 21 21 /
    0.08)
spacing:
  2xl: 96px
  base: 8px
  gutter: 24px
  lg: 40px
  margin: 24px
  md: 24px
  sm: 12px
  xl: 64px
  xs: 4px
typography:
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: 400
    lineHeight: 32px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
  display:
    fontFamily: Satoshi
    fontSize: 72px
    fontWeight: 800
    letterSpacing: "-0.04em"
    lineHeight: 72px
  headline-lg:
    fontFamily: Satoshi
    fontSize: 48px
    fontWeight: 700
    letterSpacing: "-0.03em"
    lineHeight: 52px
  headline-md:
    fontFamily: Satoshi
    fontSize: 32px
    fontWeight: 700
    letterSpacing: "-0.02em"
    lineHeight: 38px
  label-md:
    fontFamily: Satoshi
    fontSize: 16px
    fontWeight: 700
    letterSpacing: 0.01em
    lineHeight: 22px
  label-sm:
    fontFamily: Satoshi
    fontSize: 14px
    fontWeight: 700
    letterSpacing: 0.02em
    lineHeight: 20px
  title-lg:
    fontFamily: Satoshi
    fontSize: 22px
    fontWeight: 700
    lineHeight: 28px
---

## Brand & Style

The portfolio uses a **Swiss Pop / Editorial Modernist** direction: bold
typography, disciplined grids, generous negative space, geometric forms,
high-impact project imagery, and controlled bursts of color.

The personality should feel **creative, experienced, technically sharp,
vibrant, and simple**. The site should look like the portfolio of a
design-minded senior web developer rather than a conventional developer
template. Motion should support the composition instead of competing
with it.

The visual system is built around a warm editorial canvas with coral,
pink, and yellow used as graphic energy. Deep charcoal anchors the
palette and provides the primary readable text color.

## Colors

The palette is intentionally limited to five semantic roles.

- **Background --- Ragin Beige `#FFF5D7`:** Default page canvas and
  the dominant neutral.
- **Surface --- Pink Leaf `#FFAAAB`:** Feature panels, project
  callouts, large graphic fields, and occasional section backgrounds.
- **Primary --- Coral Pink `#FF5E6C`:** Brand identifier, large
  display emphasis, graphic shapes, focus accents, and selected
  interactive decoration.
- **Text --- Deep Charcoal `#151515`:** Primary text, navigation,
  labels, icons, and high-legibility UI.
- **Accent --- Sleuthe Yellow `#FEB300`:** Secondary graphic emphasis,
  badges, geometric forms, and selected highlighted surfaces.

### APCA usage rules

APCA evaluates perceptual contrast as `Lc` rather than using the WCAG
contrast-ratio model. Approximate APCA values for the core pairings are:

- `#151515` on `#FFF5D7`: **Lc 99** --- preferred reading combination.
- `#151515` on `#FFAAAB`: **Lc 69** --- suitable for prominent text;
  use the beige background for dense or smaller reading text.
- `#151515` on `#FEB300`: **Lc 70** --- suitable for prominent text
  and larger UI.
- `#151515` on `#FF5E6C`: **Lc 48** --- restrict to large/bold display
  treatment.
- `#FF5E6C` on `#FFF5D7`: **Lc 49** --- restrict to large/bold display
  treatment and decorative emphasis.

**Critical rule:** Coral Pink is a brand color, not the default readable
text color. Normal body copy, navigation, button labels, metadata, and
form labels should use Deep Charcoal on Ragin Beige wherever practical.

WCAG 2.2 AA should still be treated as the shipping conformance
requirement. APCA is used here as an additional design-quality
constraint for perceptual contrast.

## Typography

The font pairing is **Satoshi + Source Serif 4**.

- **Satoshi:** Display headlines, navigation, buttons, labels, project
  titles, numbers, and interface typography.
- **Source Serif 4:** Body copy, project narratives, editorial
  introductions, pull quotes, and selective italic display phrases.
- **Display:** Satoshi ExtraBold at large scale creates the strong
  Swiss Pop structure.
- **Editorial contrast:** Source Serif 4 introduces warmth and
  sophistication without turning the portfolio into a retro pastiche.
- **Labels:** Satoshi Bold keeps small interface typography distinct
  and legible.

Large typography is a core design element. Headlines should be allowed
to dominate the composition, with selective serif phrases providing
contrast.

## Layout & Spacing

The layout follows a **responsive editorial grid** rather than a uniform
card grid.

- **Desktop:** Use a 12-column grid for asymmetrical compositions and
  oversized project imagery.
- **Tablet:** Collapse to 8 columns while preserving deliberate
  offsets.
- **Mobile:** Use 4 columns and simplify overlapping compositions.
- **Whitespace:** Use `xl` and `2xl` spacing between major sections.
- **Rhythm:** Base spacing remains on an 8px system.
- **Containers:** Favor wide editorial containers with intentional
  empty space rather than filling every column.
- **Project layouts:** Alternate proportions and image placement so
  the portfolio does not become a repetitive stack of cards.

## Elevation & Depth

The design uses **layered shadows sparingly**.

Example:

`0 1px 2px rgb(21 21 21 / 0.05), 0 8px 24px rgb(21 21 21 / 0.08)`

- Most sections should remain flat.
- Use shadows only when an element genuinely needs to sit above
  another layer.
- Prefer overlap, typography, color fields, borders, and motion for
  hierarchy.
- Do not apply generic shadows to every card.
- Avoid glow effects.

## Shapes

The shape language is **subtle --- 8px**.

- **Buttons:** `8px`.
- **Cards:** `8px`.
- **Inputs:** `8px`.
- **Project media:** `8px` or square when the editorial composition
  benefits from a hard edge.
- **Decorative geometry:** Circles, semicircles, stripes, dots,
  oversized arcs, and cropped geometric forms are encouraged.
- **Pills:** Reserve fully rounded shapes for compact badges or
  intentional graphic elements, not as the default UI convention.

## Motion

GSAP motion should reinforce the editorial hierarchy.

- Use masked headline reveals, image clipping, pinned project
  storytelling, restrained parallax, staggered grid entrances, and
  large typography moving at different scroll speeds.
- Prefer movement in one clear direction rather than simultaneous
  decorative motion.
- Keep hover motion short and purposeful.
- Respect `prefers-reduced-motion` and provide a complete static
  experience when motion is reduced.
- Never make essential content dependent on animation.

## Components

### Buttons & Links

Primary CTA buttons use Deep Charcoal `#151515` with Ragin Beige
`#FFF5D7` text. Coral Pink may appear as a border, arrow, underline,
adjacent geometric accent, or hover decoration rather than forcing an
inaccessible small-text color pairing.

Secondary actions should favor text links with strong underlines,
arrows, or borders. Do not rely on color alone to indicate
interactivity.

### Cards & Project Features

Avoid a generic card-heavy interface. Featured projects should behave
more like editorial compositions.

Use Pink Leaf for occasional large feature surfaces with Deep Charcoal
typography. Standard project information should generally remain on the
Ragin Beige background for maximum readability.

### Navigation

Navigation uses Satoshi Bold with Deep Charcoal text on Ragin Beige.
Active and hover states may introduce Coral Pink through an underline,
border, dot, or background shape while preserving a high-contrast text
color.

### Forms

Form labels and input text use Deep Charcoal. Inputs use the Ragin Beige
background with a visible charcoal border. Focus states should combine a
visible outline with Coral Pink so focus is not communicated by color
alone.

## Accessibility

Accessibility is part of the visual system, not a final QA pass.

- Target **WCAG 2.2 AA** for production conformance.
- Use **APCA** during design to avoid perceptually weak text
  combinations even when a color pairing is visually attractive.
- Do not use Coral Pink `#FF5E6C` as normal-size text on Ragin Beige
  `#FFF5D7`.
- Do not use white as the default text color on Coral Pink.
- Maintain visible keyboard focus.
- Respect reduced-motion preferences.
- Provide meaningful alt text for portfolio imagery.
- Ensure interactive targets are appropriately sized and separated.
- Never encode project categories, status, errors, or interaction
  states through color alone.

## Dark Mode

**Out of scope.**

The warm Ragin Beige canvas is fundamental to the identity of this
direction. A separate dark mode would require a second semantic palette
and independent APCA/WCAG validation rather than mechanically inverting
these colors.
