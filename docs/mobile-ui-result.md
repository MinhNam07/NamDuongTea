# Mobile UI Result — Nam Dương Tea

**Date:** 2026-06-28  
**Audit reference:** [docs/mobile-ui-audit.md](./mobile-ui-audit.md)  
**Viewports tested:** 320, 360, 390, 430, 768px (code + build verification)

---

## Verification

| Check | Result |
|-------|--------|
| `pnpm lint` | Pass — no warnings |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass — 29 routes compiled |
| Lighthouse mobile | Manual run recommended (see below) |

### Lighthouse (manual)

Run after `pnpm build && pnpm start`:

```bash
npx lighthouse http://localhost:3000 --preset=mobile --only-categories=performance,accessibility,best-practices --output=json --output-path=docs/lighthouse-mobile-home.json
```

Suggested URLs: `/`, `/san-pham`, `/san-pham/che-xanh`, `/lien-he`

---

## Issues fixed by severity

| ID | Severity | Fix summary |
|----|----------|-------------|
| MUI-C01 | Critical | Added `ProductDetailMobileCtaBar` sticky bottom RFQ on mobile |
| MUI-C02 | Critical | Dialog mobile bottom-sheet + `max-h-[90svh] overflow-y-auto` |
| MUI-H01 | High | Heroes use `80svh` mobile / `100svh` desktop |
| MUI-H02 | High | `.text-hero-clamp` / `.text-section-clamp` utilities |
| MUI-H03 | High | Input `h-12 text-base` mobile, `md:h-10 md:text-sm` desktop |
| MUI-H04 | High | Pagination `flex-wrap` + 44px touch targets |
| MUI-H05 | High | Breadcrumb `truncate` + `flex-wrap` |
| MUI-H06 | High | B2B table `overscroll-x-contain` + scroll hint |
| MUI-M01 | Medium | Header compact: `px-4 pt-3`, logo `h-8`, inner `py-2.5` |
| MUI-M02 | Medium | Icon buttons `h-11 w-11` on mobile |
| MUI-M03 | Medium | Section padding `py-14` mobile, reduced gaps |
| MUI-M04 | Medium | `aspect-[4/3]` replaces fixed gallery/story heights |
| MUI-M05 | Medium | `.scrollbar-hide` defined in globals.css |
| MUI-M06 | Medium | `.safe-bottom` on FAB cluster |
| MUI-M07 | Medium | Product line hero `-mt-24` cancels main padding |
| MUI-M08 | Medium | About stat band flows below hero on mobile |
| MUI-M09 | Medium | Partner heading nowrap only `md+` |
| MUI-L01 | Low | Gallery nav buttons 44px mobile |
| MUI-L02 | Low | Catalog tabs horizontal scroll + `min-h-11` |
| MUI-L03 | Low | Sheet/dialog close 44px hit area |
| MUI-L04 | Low | Home collection `sizes` includes 640px step |
| MUI-L05 | Low | Disable hover scale animations on mobile |

---

## Files changed (34)

### New

- `docs/mobile-ui-audit.md`
- `docs/mobile-ui-result.md`
- `src/components/products/product-detail-mobile-cta-bar.tsx`

### Foundation & UI primitives

- `src/app/(frontend)/globals.css` — mobile utilities, overflow-x clip, scrollbar-hide, safe-bottom, reduced motion
- `src/components/ui/input.tsx` — 48px mobile inputs
- `src/components/ui/button.tsx` — 44px icon buttons mobile
- `src/components/ui/dialog.tsx` — bottom sheet mobile, scroll, close target
- `src/components/ui/sheet.tsx` — close target, overscroll-contain via nav panel

### Shell

- `src/components/site-header.tsx`
- `src/components/site-nav-bar.tsx`
- `src/components/site-footer.tsx` — mobile social row (Zalo, Facebook)
- `src/components/site-floating-actions.tsx` — safe-area, product detail offset
- `src/components/frontend-main.tsx` — header offset sync

### Home

- `src/components/home/home-hero-section.tsx`
- `src/components/home/header-hero-content.tsx`
- `src/components/home/alternating-story-section.tsx`
- `src/components/home/craft-timeline-section.tsx`
- `src/components/home/product-collection-tiles-section.tsx`
- `src/components/home/partner-form-section.tsx`
- `src/components/home/news-events-section.tsx`

### Products

- `src/app/(frontend)/san-pham/page.tsx` — filter horizontal scroll
- `src/app/(frontend)/san-pham/[slug]/page.tsx` — breadcrumb, mobile CTA bar, aspect placeholder
- `src/components/products/products-hero.tsx`
- `src/components/products/products-pagination.tsx`
- `src/components/products/product-detail-gallery.tsx`
- `src/components/products/product-detail-sticky-panel.tsx`
- `src/components/products/product-detail-tabs.tsx`
- `src/components/products/tra-quan-product-detail-view.tsx`

### About & marketing

- `src/components/about/about-page-hero.tsx`
- `src/components/marketing/product-line/product-line-page.tsx`
- `src/components/marketing/tet-gift/tet-gift-hero-banner.tsx`
- `src/components/marketing/tet-gift/tet-gift-b2b-catalogue.tsx`

### Forms

- `src/app/(frontend)/lien-he/page.tsx` — form first on mobile
- `src/app/(frontend)/dang-ky-dai-ly/page.tsx` — form first on mobile
- `src/components/quote-request-form.tsx` — full-width submit
- `src/components/rfq-button.tsx` — scrollable dialog

---

## Before / after highlights

### Product detail (MUI-C01)

**Before:** RFQ panel only in page flow; user scrolls past gallery to find CTA.  
**After:** Fixed bottom bar `ProductDetailMobileCtaBar` with full-width "Yêu cầu báo giá" (`md:hidden`).

### Header (MUI-M01, MUI-M02)

**Before:** ~68px total height; 40px hamburger.  
**After:** ~56–60px pill; logo `h-8`; 44px menu trigger.

### Hero (MUI-H01, MUI-H02)

**Before:** `min-h-[100vh]`; fixed `text-5xl`.  
**After:** `min-h-[80svh]` mobile; `clamp()` via `.text-hero-clamp`.

### Forms (MUI-H03, MUI-C02)

**Before:** 40px inputs; dialog clips on short screens.  
**After:** 48px + 16px font mobile; bottom-sheet dialog with scroll.

### Catalog filters (MUI-L02)

**Before:** `flex-wrap` causing multi-line tab labels.  
**After:** Horizontal scroll row with `scrollbar-hide`, `whitespace-nowrap`.

---

## Remaining issues / follow-ups

1. **Lighthouse scores** — not captured in CI; run manually on production/staging URL.
2. **Screenshot regression folder** — `docs/mobile-ui-screenshots/` not populated; capture after deploy for visual diff.
3. **CMS rich text** (`/tin-tuc/[slug]`) — future embedded tables/images may need prose overflow rules.
4. **B2B table on `/nam-duong-tra-quan`** — intentional horizontal scroll within container; card-based mobile layout could be a future enhancement (out of scope).
5. **Keyboard overlap on inline forms** — `/lien-he` uses page scroll; dialog RFQ uses bottom sheet. Native iOS keyboard behavior should be spot-checked on device.

---

## DevTools checklist (post-fix)

- [x] No page-level horizontal overflow (`body { overflow-x: clip }` mobile)
- [x] Header within 56–64px target on mobile
- [x] Product detail sticky bottom CTA present
- [x] Touch targets ≥44px on nav, pagination, tabs, gallery controls
- [x] Forms single column; inputs 48px mobile
- [x] Desktop layout unchanged at `md+` breakpoints

---

*Implementation complete. Branding, copy, API logic, and desktop UI preserved per plan guardrails.*
