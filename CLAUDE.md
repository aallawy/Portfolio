# Portfolio Design System Rules

## Project Overview

Single-page portfolio website for Alisa Allawy — a vanilla HTML/CSS/JS project with no build tools, frameworks, or package manager.

## Project Structure

```
Portfolio/
├── index.html              # Single-page HTML (all sections)
├── css/style.css           # All styles (single file, ~1030 lines)
├── js/main.js              # Interactions (smooth scroll, mobile menu, FAQ accordion, scroll reveal, marquee)
├── assets/
│   ├── logo-full.svg       # SVG logo with "Alisa" + "Allawy" text
│   ├── logo-icon.svg       # Icon-only SVG logo
│   ├── wordmark-burgundy-full.png   # Burgundy wordmark (navbar)
│   ├── wordmark-burgundy-icon.png   # Burgundy icon (favicon)
│   ├── wordmark-white-full.png      # White wordmark (footer)
│   ├── wordmark-white-icon.png      # White icon variant
│   └── images/             # Image assets directory
└── CLAUDE.md
```

## Design Tokens

### Colors

Hardcoded throughout `css/style.css` (no CSS custom properties):

| Name            | Hex        | Usage                                      |
| --------------- | ---------- | ------------------------------------------ |
| Primary/Burgundy| `#47141e`  | Buttons, CTAs, accents, borders, dark sections |
| Background      | `#f8f7f7`  | Body background, light sections            |
| Text Dark       | `#0c0b0a`  | Primary text, headings                     |
| Accent Tan      | `#a9927d`  | Secondary elements, dividers, star ratings |
| Accent Brown    | `#5f503f`  | Secondary text, muted elements             |
| White           | `#ffffff`  | Text on dark backgrounds, cards            |

Common RGBA variants:
- `rgba(71, 20, 30, 0.25)` — subtle burgundy shadows/borders
- `rgba(0, 0, 0, 0.04–0.08)` — card shadows
- `rgba(248, 247, 247, 0.95)` — navbar background with transparency

### Typography

Loaded via Google Fonts (`index.html` lines 8–10):

| Role      | Family                                              | Weights              |
| --------- | --------------------------------------------------- | -------------------- |
| Headings  | `'Playfair Display', Georgia, serif`                | 400, 500, 600, 700, 400i, 500i |
| Body/UI   | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | 300, 400, 500, 600   |

Base font size: `16px` on `html`. Body line-height: `1.6`. Heading line-height: `1.2`.

Responsive font sizes use `clamp()`:
```css
/* Section titles */    clamp(1.8rem, 4vw, 2.8rem)
/* Hero title */        clamp(2.5rem, 5.5vw, 4rem)
/* Statement quote */   clamp(1.3rem, 3vw, 2rem)
/* Marquee items */     clamp(1.2rem, 2.5vw, 1.8rem)
```

### Spacing

No formal spacing scale. Common values used:
- **Gaps:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 60px
- **Padding:** 12px, 16px, 20px, 24px, 32px, 40px, 80px, 100px, 140px
- **Container:** max-width `1200px`, padding `0 24px`

### Border Radius

- Buttons: `100px` (fully rounded pill shape)
- Cards: `16px`
- Navbar: `100px` (floating island)
- Testimonial avatars: `50%` (circle)

## Component Patterns

### CSS Methodology

BEM-like naming in a single `css/style.css` file:
```css
.section-name { }
.section-name__element { }
.section-name__element--modifier { }
```

Examples:
```css
.navbar, .navbar__inner, .navbar__logo, .navbar--scrolled
.hero, .hero__inner, .hero__content, .hero__title
.project-card, .project-card__image, .project-card__info
.testimonial-card, .testimonial-card__stars, .testimonial-card__author
.faq__item, .faq__question, .faq__answer, .faq__item--open
```

### Buttons

Two button variants:
```css
/* Primary — burgundy filled pill */
.btn--primary {
  background: #47141e;
  color: #fff;
  padding: 14px 32px;
  border-radius: 100px;
}

/* Outline — transparent with burgundy border */
.btn--outline {
  background: transparent;
  color: #47141e;
  border: 1.5px solid rgba(71, 20, 30, 0.25);
  border-radius: 100px;
}
```

### Layout

- **Grid** for multi-column layouts (hero, services, testimonials, portfolio, footer)
- **Flexbox** for alignment (navbar, card internals, buttons)
- Container class `.container` centers content at max `1200px`

### Hover Effects

```css
/* Card lift */
transform: translateY(-4px);
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

/* Button hover */
background: #5a1a26;  /* lighter burgundy */

/* Nav link underline */
.navbar__link::after  /* pseudo-element width transition */
```

### Animations

- **Scroll reveal:** `.reveal` class + IntersectionObserver adds `.revealed` (opacity 0→1, translateY 30px→0)
- **Marquee:** `@keyframes marquee-scroll` infinite horizontal scroll, pauses on hover
- **FAQ accordion:** max-height transition with chevron rotation

## Sections in index.html

1. **Navbar** — floating island, fixed position, scroll shadow
2. **Hero** — two-column grid (text + SVG placeholder image)
3. **Statement** — centered quote with decorative dot divider
4. **Why Work With Me** — 3-column icon cards
5. **Portfolio/Work** — 2-column project cards with SVG placeholders + bracket overlays
6. **Services** — 3-column service cards with SVG icons
7. **Marquee** — dark burgundy scrolling text banner
8. **Testimonials** — image + 3-column quote cards with star ratings
9. **FAQ** — accordion with mutually-exclusive expand
10. **CTA Footer** — dark burgundy call-to-action section
11. **Footer** — dark (`#0c0b0a`) 3-column footer with logo, nav, socials

## Icon System

All icons are **inline SVGs** embedded directly in `index.html`. No icon font, no sprite sheet, no external icon library.

Common icon patterns:
```html
<!-- Stroke-based icons (cards, services) -->
<svg width="28" height="28" viewBox="0 0 24 24"
     fill="none" stroke="#47141e" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="..."/>
</svg>

<!-- Filled star (testimonials) -->
<svg width="16" height="16" viewBox="0 0 16 16">
  <path fill="#a9927d" d="M8 0l2.5 5 5.5.8-4 3.9.9 5.3L8 12.5..."/>
</svg>

<!-- Chevron (FAQ) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
     stroke="currentColor" stroke-width="2">
  <path d="M5 8l5 5 5-5"/>
</svg>
```

## Asset Management

- **Logo variants** stored in `/assets/` as both SVG and PNG
- **No CDN** — all assets served locally
- **No optimization pipeline** — raw files
- **Placeholder images** — currently using inline SVGs with geometric shapes instead of real photos

## Responsive Breakpoints

Three breakpoints in `css/style.css`:

| Breakpoint        | Max-Width  | Key Changes                                     |
| ----------------- | ---------- | ----------------------------------------------- |
| Tablet            | `1024px`   | Hero → 1-col, services/testimonials → 2-col     |
| Mobile            | `768px`    | Mobile nav sidebar, all grids → 1-col            |
| Small Mobile      | `480px`    | Reduced padding, stacked buttons at full width   |

## JavaScript Interactions (`js/main.js`)

1. **Smooth scroll** — hash links scroll smoothly, closes mobile menu
2. **Mobile menu** — toggle `.nav--open` on hamburger click
3. **Navbar scroll** — adds `.navbar--scrolled` after 50px scroll
4. **FAQ accordion** — mutually exclusive open/close
5. **Scroll reveal** — IntersectionObserver adds `.revealed` to `.reveal` elements
6. **Marquee pause** — pauses animation on hover

## Figma-to-Code Guidelines

When converting Figma designs for this project:

1. **No framework** — output plain HTML + CSS. No JSX, no template syntax.
2. **BEM naming** — follow `block__element--modifier` pattern matching existing sections.
3. **Colors** — map Figma fills to the 5 brand colors above. Do not introduce new colors without discussion.
4. **Typography** — use Playfair Display for headings/display, Inter for body/UI.
5. **Icons** — embed as inline SVGs with `stroke="#47141e"` or `fill="#a9927d"` matching the icon style.
6. **Responsive** — use the 3 breakpoint system (1024/768/480). Use `clamp()` for fluid typography.
7. **Spacing** — match existing spacing values; avoid introducing arbitrary values.
8. **Animations** — keep transitions at `0.3s ease` for hovers, use `.reveal` class for scroll animations.
9. **Images** — place in `assets/images/`. Reference with relative paths (`assets/images/filename.ext`).
10. **Add styles** to the bottom of `css/style.css` (before media queries). Keep component styles grouped together.
