---
name: Nam Dương Tea
description: B2B Tea Brand Website
colors:
  primary: "#133200"
  secondary: "#6a5e2e"
  tertiary: "#b9ae27"
  neutral-bg: "#fbf9f3"
  tea-moss: "#416828"
  tea-olive: "#8eba6f"
  tea-muted-gold: "#d7c68c"
  tea-ink: "#1b1c19"
  tea-muted: "#43493d"
  border-soft: "#c3c9b9"
typography:
  display:
    fontFamily: "Nunito, system-ui, sans-serif"
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
  headline:
    fontFamily: "serif"
rounded:
  full: "9999px"
  2xl: "1rem"
  card: "28px"
spacing:
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.2xl}"
  product-card:
    backgroundColor: "rgba(255,255,255,0.85)"
    rounded: "{rounded.card}"
---

# Design System: Nam Dương Tea

## 1. Overview

**Creative North Star: "Heritage & Harvest"**

Vietnamese tea heritage meets the tea hill harvest, balancing handmade luxury and modernity, warm and close to nature. The UI voice is lightly formal, with plenty of breathing room, and typographic depth. It avoids feeling overly clinical, tech-focused, or detached like a generic SaaS template.

**Key Characteristics:**
- Reliable, original, premium but not distant
- Imagery focused on tea hills, tea leaves, morning dew, and golden light
- Organic, Warm, Approachable

## 2. Colors

The palette is warm, natural, and grounded in the tea harvest.

### Primary
- **Deep Tea Green** (#133200): Main brand color used for backgrounds on story sections and primary buttons.

### Secondary
- **Brown Wood** (#6a5e2e): Earth, wood, and packaging.
- **Moss Green** (#416828): Used for eyebrows and secondary emphasis on light backgrounds.
- **Olive Green** (#8eba6f): Used for italic emphasis on dark backgrounds.

### Tertiary
- **Yellow Green** (#b9ae27): Olive gold accent used for highlights and badges.
- **Muted Gold** (#d7c68c): Luxurious accent for hero CTAs.

### Neutral
- **Ivory Warm** (#fbf9f3): Page background — warm ivory, feels like handmade paper.
- **Ink** (#1b1c19): Main text color.
- **Muted** (#43493d): Secondary text and descriptions.
- **Border Soft** (#c3c9b9): Soft borders and dividers.

## 3. Typography

**Display Font:** Nunito (with system-ui)
**Body Font:** Be Vietnam Pro (with system-ui)
**Label/Mono Font:** Inter (with monospace)

**Character:** A balanced pairing between a geometric display font for numbers/stats and a highly legible sans-serif for Vietnamese text, with serif accents for editorial elegance.

### Hierarchy
- **Display** (font-display): Section titles, statistics, footer logos.
- **Headline** (font-serif, text-5xl to 8xl, leading-tight): High-end editorial feel for heroes.
- **Title** (font-serif): H2 sections, often paired with italic colored emphasis.
- **Body** (font-sans, font-light or leading-relaxed): General copy.
- **Label** (uppercase, tracking-widest, font-semibold): Eyebrows, footer columns.

## 4. Elevation

The system uses soft, colored shadows to convey elevation, avoiding harsh gray dropshadows.

### Shadow Vocabulary
- **Card Shadow** (`rgba(37,74,12,0.06-0.10)`): Soft olive-tinted shadow for product cards, lifting them slightly off the background.
- **Glass Panel** (`backdrop-blur-md`): Used for badges and headers to create depth without opacity.

## 5. Components

### Buttons
- **Shape:** Soft edges (16px radius for default, fully rounded for hero CTAs).
- **Primary:** Deep Tea Green with white text.
- **Hover / Focus:** Transitions to secondary brown on hover.
- **Hero CTA:** Warm gold background with deep green text.

### Cards / Containers
- **Corner Style:** Large radii (28px) for product cards.
- **Background:** Slightly translucent white over the ivory background.
- **Shadow Strategy:** Soft olive shadows.

### Navigation
- **Style:** Glass pill floating near the top of the viewport.
- **State:** Dark-on-hero (dark green glass) transitioning to dark-on-light (cream glass) when scrolling past the hero.

## 6. Do's and Don'ts

### Do:
- **Do** use large corner radii (rounded-2xl, rounded-full) to maintain the organic, approachable feel.
- **Do** use the "Eyebrow + Serif Heading + Italic Emphasis" combo for section titles.
- **Do** use real photography (tea hills, products) rather than illustrations.

### Don't:
- **Don't** use a generic SaaS template. It should avoid feeling overly clinical, tech-focused, or detached.
- **Don't** use neon colors, cool grays, or absolute black (outside of hero overlays).
- **Don't** use retail e-commerce language like "Add to cart" — stick to B2B language like "Request Quote" or "Contact Us".
