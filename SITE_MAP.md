# Site Structure & Navigation Map

## Pages

### Homepage `/`

**Purpose**: Main entry point, showcases work and introduces the brand

**Sections**:

1. **Hero** (`#hero`)
   - Large display headline
   - Supporting tagline
   - CTA buttons
2. **About** (`#about`)
   - Brief bio and positioning
   - Background and philosophy
3. **Expertise** (`#expertise`)
   - Grid of skill/technology areas
   - 6 expertise cards (Frontend, Animation, Accessibility, Performance, UX, Design)
4. **Portfolio** (`#portfolio`)
   - Featured projects (2 items shown)
   - Link to full portfolio page
5. **Testimonials** (`#testimonials`)
   - Social proof from clients/colleagues
   - 2-4 testimonial cards
6. **Contact** (`#contact`)
   - Call to action
   - Contact form (to be fully implemented)

### Portfolio Page `/portfolio`

**Purpose**: Showcase all projects with case studies

**Planned Content**:

- Project grid/list view
- Project details pages (individual case studies)
- Project filtering by technology/type (optional)
- Project details include:
  - Problem/challenge
  - Solution approach
  - Technologies used
  - Outcomes/impact
  - Live link or demo

### Blog Page `/blog`

**Purpose**: Articles and insights on web development

**Planned Content**:

- Blog post listing with pagination
- Post filtering by category/tag
- Individual post pages with:
  - Publication date
  - Reading time estimate
  - Author info
  - Related posts
  - Comments (optional)

## Navigation Structure

### Primary Navigation

```
Home
├── Portfolio
├── Blog
└── Contact (anchor link)
```

Located in sticky header, responsive mobile menu.

### Footer Navigation

```
About
├── Portfolio
├── Blog
└── Contact

Connect
├── GitHub
├── LinkedIn
└── Twitter
```

### Accessibility Features

- Skip to content link (first focusable element)
- Keyboard-navigable menu with Escape support
- `aria-current="page"` on active nav items
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`

## URL Structure

```
/                    Homepage
/portfolio           Portfolio index
/portfolio/[slug]    Individual project (future)
/blog                Blog index
/blog/[slug]         Individual post (future)
/404                 Custom not-found page
```

## Metadata & Social Sharing

### Shared Metadata

- Site title: "Shandy Ward - Senior Web Developer & Designer"
- Description: "Senior frontend engineer specializing in Next.js, React, TypeScript, and high-performance web experiences."
- Open Graph image: [To be added]
- Twitter handle: @shandyward

### Per-Page Overrides

- Each page has custom title and description
- Portfolio and blog posts can have custom OG images

## Performance Considerations

### Lazy Loading

- Blog post images: lazy loaded
- Portfolio images: lazy loaded
- Below-fold sections: consider intersection observer

### Caching Strategy

- Static pages: cache headers for 1 year
- Blog/portfolio pages: revalidate on demand
- API routes: cache based on content freshness

### Image Optimization

- Use Next.js `<Image />` component
- Provide responsive `sizes` attribute
- Format conversion: WebP, AVIF
- Lazy loading by default

## Analytics & Tracking

### Events to Track (Optional)

- Portfolio link clicks
- Blog post views
- Contact form submissions
- Social link clicks
- Scroll depth

### Performance Monitoring

- Core Web Vitals via Vercel Analytics
- Error tracking via Sentry (optional)

## Internationalization

Currently: English only
Future consideration: Multi-language support via i18n

## Security Considerations

- No sensitive data in client-side code
- Form submissions should be server-side validated
- CORS headers configured appropriately
- CSP headers for protection against XSS
- Environment variables for sensitive config

## Accessibility Features by Page

### All Pages

- Skip-to-content link
- Keyboard-navigable navigation
- Visible focus indicators
- Semantic HTML structure
- Proper color contrast
- Reduced motion support

### Homepage

- Landmark sections with meaningful IDs
- Heading hierarchy (h1 → h2 → h3)
- Form labels and error states
- Semantic button semantics

### Portfolio Page

- Grid or list with keyboard navigation
- Link descriptions
- Image alt text
- Filter controls (if implemented)

### Blog Page

- Article semantics
- Post metadata clearly labeled
- Pagination controls
- Link descriptions for "Read more"

## Future Enhancements

### Phase 2

- Dynamic blog posts (Markdown or CMS)
- Portfolio case study pages
- Contact form backend
- Email notifications

### Phase 3

- Search functionality
- Blog comments/discussions
- Newsletter signup
- Portfolio project filters

### Phase 4

- Dark mode variant
- Internationalization (i18n)
- Advanced animations
- Performance analytics dashboard
