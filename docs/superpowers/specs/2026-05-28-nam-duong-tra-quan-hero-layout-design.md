# Nam Dương trà quán — Hero layout refresh (A)

## Goal

Adjust the hero layout on `/nam-duong-tra-quan` to:

- Make the **right hero product image ~10–15% larger on desktop** (starting with size option **A**).
- Bring **text content slightly closer to the image** (reduce column gap).
- Keep the **two-column composition balanced and centered** in the viewport.
- **Do not change the background** behavior or appearance (background image + overlays stay identical); only adjust component layout/sizing classes.

## Current implementation (reference)

- Route: `src/app/(frontend)/nam-duong-tra-quan/page.tsx`
  - Hero: `TetGiftHeroBanner`
- Component: `src/components/marketing/tet-gift/tet-gift-hero-banner.tsx`
  - Container uses `max-w-[1440px]` and a grid with `md:grid-cols-[1fr_auto]` and `md:gap-x-12`.
  - Image figure uses a fixed-height cap by breakpoint:
    - `h-[min(380px,52vh)]`
    - `sm:h-[min(420px,55vh)]`
    - `md:h-[min(480px,58vh)]`
    - `lg:h-[min(520px,60vh)]`

## Proposed approach (recommended)

Use **Approach 1**: adjust **column ratio + gap** (for better balance and closeness), plus **slightly increase image height caps** (for size A).

### Layout changes

Update the container grid on `md+`:

- Change columns from:
  - `md:grid-cols-[1fr_auto]`
  - to `md:grid-cols-[1.05fr_0.95fr]`
- Reduce the column gap from:
  - `md:gap-x-12`
  - to `md:gap-x-8`

Rationale:

- A non-`auto` right column allows the image column to participate in centering more naturally, preventing the layout from feeling left-heavy.
- Reduced `gap-x` brings the text block closer to the image while keeping a clear separation.

### Image size changes (A: +10–15%)

Increase the image wrapper height caps per breakpoint while keeping the same aspect and max-vh behavior.

Proposed new values:

- Base: `h-[min(420px,52vh)]` (was 380px)
- `sm`: `sm:h-[min(460px,55vh)]` (was 420px)
- `md`: `md:h-[min(520px,58vh)]` (was 480px)
- `lg`: `lg:h-[min(580px,60vh)]` (was 520px)

Notes:

- Keep `aspect-[2/3]`, `object-contain`, and border/shadow styles unchanged.
- Keep `sizes="..."` unchanged for now; adjust only if responsive performance suggests it later.

## Non-goals / constraints

- No changes to background image source (`TRA_QUAN_BG_SRC`) or its overlay gradient.
- No changes to typography content, copy, or CTA destinations.
- No global CSS changes; only Tailwind classes inside the hero component.

## Test plan

- Desktop (≥1024px): image appears noticeably larger (~10–15%), text is closer; overall two-column layout remains centered.
- Tablet (≥768px): still balanced, no overflow; image size increase remains proportional.
- Mobile: stacking order remains the same; no horizontal scroll; hero still fits comfortably.

