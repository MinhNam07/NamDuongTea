# Mobile UI Audit — Nam Dương Tea

**Date:** 2026-06-28  
**Viewports:** 320, 360, 390, 430, 768px  
**Method:** Code review + DevTools responsive inspection against 14 frontend routes  
**Stack:** Next.js 15, Tailwind CSS, shadcn/ui (Radix)

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 6 |
| Medium | 9 |
| Low | 5 |

**Shared shell (all routes):** `SiteHeader`, `SiteNavBar`, `SiteFooter`, `SiteFloatingActions` via `src/app/(frontend)/layout.tsx`

---

## Critical

### MUI-C01 — Product detail missing sticky bottom CTA

| Field | Detail |
|-------|--------|
| Severity | Critical |
| Route | `/san-pham/[slug]` |
| Component | `src/components/products/product-detail-sticky-panel.tsx` |
| Viewport | 320px, 390px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-C01-390.png` |
| Issue | RFQ panel stacks below gallery; no fixed bottom CTA. `sticky top-40` ineffective in single-column mobile layout. |
| Fix | Add `ProductDetailMobileCtaBar` (fixed bottom, `md:hidden`); disable sticky on mobile panel |

### MUI-C02 — RFQ Dialog clips long form on short viewports

| Field | Detail |
|-------|--------|
| Severity | Critical |
| Route | `/san-pham/[slug]`, tra-quán products |
| Component | `src/components/rfq-button.tsx`, `src/components/ui/dialog.tsx` |
| Viewport | 320px (landscape), 390px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-C02-320.png` |
| Issue | `DialogContent max-w-2xl` centered modal with no `max-h` / scroll — submit button unreachable when keyboard open |
| Fix | Mobile bottom-sheet style + `max-h-[90svh] overflow-y-auto` |

---

## High

### MUI-H01 — Home hero uses 100vh instead of svh

| Field | Detail |
|-------|--------|
| Severity | High |
| Route | `/` |
| Component | `src/components/home/home-hero-section.tsx:12` |
| Viewport | 390px, 430px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-H01-390.png` |
| Issue | `min-h-[100vh]` causes layout jump when mobile browser chrome shows/hides |
| Fix | `min-h-[80svh] md:min-h-[100svh]` |

### MUI-H02 — Hero headings lack fluid clamp typography

| Field | Detail |
|-------|--------|
| Severity | High |
| Route | `/`, `/san-pham`, `/gioi-thieu` |
| Component | `src/components/home/header-hero-content.tsx:19` |
| Viewport | 320px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-H02-320.png` |
| Issue | `text-5xl` fixed step causes awkward wraps / overflow on 320px |
| Fix | `.text-hero-clamp` utility with `clamp()` |

### MUI-H03 — Input height 40px triggers iOS auto-zoom

| Field | Detail |
|-------|--------|
| Severity | High |
| Route | `/lien-he`, `/dang-ky-dai-ly`, RFQ dialog |
| Component | `src/components/ui/input.tsx:12` |
| Viewport | 390px (Safari iOS) |
| Screenshot | `docs/mobile-ui-screenshots/MUI-H03-390.png` |
| Issue | `h-10 text-sm` below 16px font threshold |
| Fix | `h-12 text-base md:h-10 md:text-sm` |

### MUI-H04 — Pagination overflows horizontally

| Field | Detail |
|-------|--------|
| Severity | High |
| Route | `/san-pham` (multi-page catalog) |
| Component | `src/components/products/products-pagination.tsx:54` |
| Viewport | 320px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-H04-320.png` |
| Issue | `flex` row without wrap — 7+ pills exceed viewport |
| Fix | Compact mobile mode: prev/next + page indicator |

### MUI-H05 — Product breadcrumb does not truncate

| Field | Detail |
|-------|--------|
| Severity | High |
| Route | `/san-pham/[slug]` |
| Component | `src/app/(frontend)/san-pham/[slug]/page.tsx:143` |
| Viewport | 320px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-H05-320.png` |
| Issue | Long product names in flex row without `truncate` — horizontal bleed |
| Fix | `min-w-0 truncate` on product name span |

### MUI-H06 — B2B catalogue table causes page-level horizontal scroll

| Field | Detail |
|-------|--------|
| Severity | High |
| Route | `/nam-duong-tra-quan` |
| Component | `src/components/marketing/tet-gift/tet-gift-b2b-catalogue.tsx:32` |
| Viewport | 320px, 360px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-H06-320.png` |
| Issue | `min-w-[720px]` table can expand page width if container not isolated |
| Fix | `overflow-x-auto overscroll-x-contain` + scroll hint label |

---

## Medium

### MUI-M01 — Header height exceeds 56–64px target

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | All |
| Component | `src/components/site-header.tsx:20`, `site-nav-bar.tsx:40` |
| Viewport | 390px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M01-390.png` |
| Issue | `pt-4` + `py-3` + logo `h-9` ≈ 68px total |
| Fix | Mobile `pt-3`, inner `py-2.5`, logo `h-8` |

### MUI-M02 — Hamburger touch target 40px

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | All |
| Component | `src/components/site-nav-bar.tsx:190`, `ui/button.tsx:32` |
| Viewport | 320px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M02-320.png` |
| Issue | `size="icon"` = `h-10 w-10` (40px) |
| Fix | Icon button `h-11 w-11 md:h-10 md:w-10` |

### MUI-M03 — Section vertical padding too large on mobile

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | `/` |
| Component | `alternating-story-section.tsx:24`, `craft-timeline-section.tsx:24` |
| Viewport | 390px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M03-390.png` |
| Issue | `py-28`, `gap-32` — excessive scroll length |
| Fix | `py-14 md:py-28`, `gap-16 md:gap-32` |

### MUI-M04 — Fixed px image heights cause CLS

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | `/`, `/san-pham/[slug]` |
| Component | `alternating-story-section.tsx:101`, `product-detail-gallery.tsx:185` |
| Viewport | 360px, 768px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M04-360.png` |
| Issue | `h-[420px]` fixed heights vs fluid aspect-ratio |
| Fix | `aspect-[4/3]` on mobile |

### MUI-M05 — `scrollbar-hide` utility undefined

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | `/san-pham/[slug]` |
| Component | `src/components/products/product-detail-tabs.tsx:58` |
| Viewport | 390px |
| Screenshot | N/A (CSS) |
| Issue | Class used but not defined in `globals.css` |
| Fix | Add `.scrollbar-hide` utility |

### MUI-M06 — Floating actions lack safe-area inset

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | All |
| Component | `src/components/site-floating-actions.tsx:84` |
| Viewport | 390px (iPhone notch) |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M06-390.png` |
| Issue | FABs sit at `bottom-5` without `env(safe-area-inset-bottom)` |
| Fix | `.safe-bottom` padding utility |

### MUI-M07 — Product line hero cream strip above dark hero

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | `/dong-tra/bach-tra-shan-tuyet` |
| Component | `src/components/marketing/product-line/product-line-page.tsx` |
| Viewport | 390px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M07-390.png` |
| Issue | Missing `-mt-24` to cancel `FrontendMain` padding |
| Fix | Match catalog hero negative margin pattern |

### MUI-M08 — About stat band overlaps hero on short screens

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | `/gioi-thieu` |
| Component | `src/components/about/about-page-hero.tsx:73-77` |
| Viewport | 320px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M08-320.png` |
| Issue | Absolute stat band at `bottom-8` overlaps subtitle on short viewports |
| Fix | Mobile: relative flow below hero copy |

### MUI-M09 — Partner form heading whitespace-nowrap overflow

| Field | Detail |
|-------|--------|
| Severity | Medium |
| Route | `/` |
| Component | `src/components/home/partner-form-section.tsx:79` |
| Viewport | 320px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-M09-320.png` |
| Issue | `whitespace-nowrap` on "đối tác" forces horizontal overflow |
| Fix | Remove nowrap on mobile |

---

## Low

### MUI-L01 — Gallery controls below 44px touch target

| Field | Detail |
|-------|--------|
| Severity | Low |
| Route | `/san-pham/[slug]` |
| Component | `product-detail-gallery.tsx:237` |
| Viewport | 390px |
| Screenshot | `docs/mobile-ui-screenshots/MUI-L01-390.png` |
| Fix | `h-11 w-11` on mobile |

### MUI-L02 — Catalog tab pills below 44px

| Field | Detail |
|-------|--------|
| Severity | Low |
| Route | `/` |
| Component | `product-collection-tiles-section.tsx:63` |
| Viewport | 320px |
| Fix | `min-h-11` + horizontal scroll row |

### MUI-L03 — Sheet close button hit area small

| Field | Detail |
|-------|--------|
| Severity | Low |
| Route | All (mobile menu) |
| Component | `src/components/ui/sheet.tsx:64` |
| Viewport | 390px |
| Fix | `min-h-11 min-w-11` close button |

### MUI-L04 — Home collection image sizes missing 640px step

| Field | Detail |
|-------|--------|
| Severity | Low |
| Route | `/` |
| Component | `product-collection-tiles-section.tsx:118` |
| Viewport | 640px |
| Fix | Align with `product-card.tsx` sizes pattern |

### MUI-L05 — Hover scale animations on touch devices

| Field | Detail |
|-------|--------|
| Severity | Low |
| Route | `/`, `/san-pham` |
| Component | Multiple card/image components |
| Viewport | 390px |
| Fix | Disable `group-hover:scale` under `(max-width: 767px)` |

---

## Route checklist

| Route | Critical | High | Medium | Low |
|-------|----------|------|--------|-----|
| `/` | — | H01, H02 | M03, M09 | L02, L05 |
| `/gioi-thieu` | — | H02 | M08 | — |
| `/tim-hieu-vung-trong` | — | H02 | M03 | — |
| `/lien-he` | — | H03 | — | — |
| `/dang-ky-dai-ly` | — | H03 | — | — |
| `/nam-duong-tra-quan` | — | H06 | — | — |
| `/san-pham` | — | H04 | — | — |
| `/san-pham/[slug]` | C01, C02 | H05 | M04, M05 | L01 |
| `/san-pham/che-xanh` etc. | — | H04 | — | — |
| `/dong-tra/[slug]` | — | — | M07 | — |
| `/tin-tuc` | — | — | — | — |
| `/tin-tuc/[slug]` | — | — | — | — |
| **Global shell** | C02 | H03 | M01, M02, M06 | L03 |

---

*Screenshots referenced above are captured at audit time via DevTools device toolbar. Re-capture after fixes for regression comparison.*
