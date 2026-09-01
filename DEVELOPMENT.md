# Development Guide

## Quick Start

### Prerequisites

- Node.js 18.17+
- npm or yarn
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

The development server includes hot module replacement (HMR) for instant feedback.

## Code Organization

### Components

Components are organized by purpose:

- **`components/layout/`** - Page structure (Header, Navigation, Footer)
- **`components/ui/`** - Reusable primitives (Container, Section)
- **`components/index.ts`** - Barrel exports for clean imports

Add new components to the appropriate directory and update the barrel export.

### Pages & Routes

- Add new routes as directories under `app/`
- Each route directory contains a `page.tsx` file
- Use layout files (`layout.tsx`) for shared structure
- Update metadata in route files

### Utilities

- **`lib/utils.ts`** - General helpers
- **`lib/animation/`** - GSAP-related utilities
- **`lib/index.ts`** - Barrel exports

### Types

- Add type definitions to `types/index.ts`
- Create domain-specific type files if needed: `types/blog.ts`, etc.

## Working with the Design System

### Using Tailwind Classes

Prefer semantic Tailwind classes from `tailwind.config.js`:

```tsx
// ✅ Good - uses design tokens
<div className="text-headline-md text-text bg-surface">

// ❌ Avoid - arbitrary values
<div className="text-[#151515] bg-[#FFAAAB]">
```

### Font Setup

**Current Status:**

- ✅ Source Serif 4 - Loaded from Google Fonts via `next/font`
- ✅ Satoshi - Self-hosted from `public/fonts/` with @font-face declarations in `globals.css`

**Satoshi Font Setup:**

Satoshi is now self-hosted from the `public/fonts/` directory with @font-face declarations in `app/globals.css`. The font is active across the site.

**To update font files:**

1. Replace files in `public/fonts/`:
   - `satoshi-regular.woff2` (font-weight: 400)
   - `satoshi-bold.woff2` (font-weight: 700)
   - `satoshi-extrabold.woff2` (font-weight: 800)

2. The @font-face rules in `globals.css` automatically reference these files

**To add different font weights:**

1. Add new @font-face rules to `app/globals.css`
2. Place font files in `public/fonts/`
3. Update the font-weight value to match

### CSS Custom Properties

Available CSS variables in `globals.css`:

```css
--color-background:
  #fff5d7 --color-surface: #ffaaab --color-primary: #ff5e6c
    --color-text: #151515 --color-accent: #feb300 --spacing- *
    /* xs, sm, base, md, lg, xl, 2xl */ --radius,
  --radius-sm, --radius-full --shadow-editorial --duration-fast,
  --duration-default, --duration-slow --ease-editorial;
```

Use in CSS or inline styles:

```tsx
<div style={{ color: "var(--color-primary)" }} />
```

## Styling Patterns

### New Components

1. Use Tailwind classes for layout and spacing
2. Use semantic color tokens (not hex values)
3. Apply focus-visible styles for interactive elements
4. Test with keyboard navigation
5. Verify color contrast (APCA or WCAG)

### Color Usage Guidelines

From `design.md`:

- **#151515 on #FFF5D7** (Lc 99) - Primary reading text, labels, UI
- **#151515 on #FFAAAB** (Lc 69) - Prominent text, callouts
- **#151515 on #FEB300** (Lc 70) - Large display text
- **#151515 on #FF5E6C** (Lc 48) - Large display only, never body copy

Never use color alone to communicate state. Pair with text, icons, or borders.

## Accessibility Checklist

Before committing changes:

- [ ] Semantic HTML structure
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible and have sufficient contrast
- [ ] Color choices meet WCAG AA or APCA requirements
- [ ] Form labels are properly associated with inputs
- [ ] Error messages are screen-reader accessible
- [ ] Images have meaningful alt text
- [ ] Links describe their destination
- [ ] Test with a screen reader (NVDA, JAWS, VoiceOver)

### Testing Accessibility

#### Keyboard Navigation

```bash
# Test without mouse
Tab through interactive elements
Shift+Tab to go backwards
Enter on buttons and links
Space on checkboxes
Arrow keys in select elements
Escape to close modals/menus
```

#### Screen Reader (macOS)

```bash
# Enable VoiceOver
Cmd + F5

# Navigate by heading
VO + U (opens rotor)
Select "Headings"
```

#### Axe DevTools

1. Install [Axe DevTools Chrome/Firefox extension](https://www.deque.com/axe/devtools/)
2. Run scan on each page
3. Fix critical and serious issues
4. Document known limitations

## Performance Optimization

### Before Building

```bash
# Type check
npm run type-check

# Run linter
npm run lint
```

### Monitoring Bundle Size

```bash
# Analyze bundle
npm run analyze
```

### Performance Checklist

- [ ] Server components by default (no unnecessary "use client")
- [ ] Images use Next.js `<Image />` with appropriate `sizes`
- [ ] Fonts are optimized via `next/font`
- [ ] No layout shift from fonts or images
- [ ] CSS is efficient (Tailwind utilities, not custom)
- [ ] No duplicate dependencies in package.json
- [ ] GSAP animations respect `prefers-reduced-motion`

### Testing Performance

Use Chrome DevTools Lighthouse:

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Desktop" or "Mobile"
4. Click "Analyze page load"
5. Review metrics and recommendations

Target scores:

- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+
- **Performance**: 90+

## Git Workflow

### Branch Naming

```
feature/section-name
bugfix/issue-description
docs/documentation-update
```

### Commit Messages

```
feat: Add hero section with animation
fix: Resolve keyboard navigation in menu
docs: Update accessibility guidelines
style: Fix button hover state contrast
```

### Before Pushing

```bash
# Format code
npm run format

# Type check
npm run type-check

# Lint
npm run lint

# Test in browser
npm run dev
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Run type check
npm run type-check

# Fix common issues
# - Import types with: import type { Type } from "module"
# - Avoid using `any` type
# - Check for missing type definitions
```

### Styling Not Updating

```bash
# Tailwind caches generated CSS. Clear it:
rm -rf .next
npm run dev
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://gsap.com/docs)
- [Web Accessibility Standards (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [APCA Contrast Guide](https://git.apcacontrast.com)

## Getting Help

1. Check documentation first
2. Search existing issues in version control
3. Review error messages carefully
4. Test in isolation (create minimal reproduction)
5. Consult with team leads or experienced developers
