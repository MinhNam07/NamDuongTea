## Context

On the product detail page (e.g. `/san-pham/<slug>`), there is a sticky right-hand panel (`ProductDetailStickyPanel`) that shows a “contact / RFQ” call-to-action block. The user provided reference screenshots and requested redesigning this block to match the sample layout and styling.

This spec covers only the contact block inside the sticky panel (not the whole product detail page layout).

## Goals

- Match the provided visual reference for the “Liên hệ…” block on product pages.
- Keep behavior unchanged:
  - Primary CTA opens the RFQ dialog (quote request form).
  - Secondary CTAs link to the contact page and to the catalogue / RFQ anchor with product preselection.
- Keep changes low-risk and localized to existing components.

## Non-goals

- No changes to the RFQ form fields, API endpoints, or backend behavior.
- No redesign of the breadcrumb, gallery, typography outside of this block.
- No global styling changes that could affect other pages/components.

## Current Implementation

- Block location: `src/components/products/product-detail-sticky-panel.tsx`
- Primary CTA component: `src/components/rfq-button.tsx` (opens dialog, uses `Button variant="brown" size="lg"`)
- Secondary CTAs are `Button variant="outline"` with `Link` children.

## Proposed Design (Approved Direction)

### Layout

Inside the “glass” container:

1. Title line (centered, uppercase, tracking-wide):
   - Text: “LIÊN HỆ ĐỂ NHẬN CHÍNH SÁCH GIÁ SỈ TỐT NHẤT”
2. Primary CTA (full width):
   - Label: “Yêu cầu báo giá”
   - Style: prominent fill (existing `variant="brown"`), rounded, full width
   - Add a trailing icon aligned to the right (per reference).
3. Secondary CTAs (two-column grid on all widths where the block is shown; wrap to 1 column if space is constrained):
   - Left: “Tư vấn ngay” → `/lien-he`
   - Right: “Tải Catalogue” → `/lien-he?product=<slug>#rfq`
   - Style: outline, rounded, full width inside grid cells
   - Each has a leading icon (per reference).

### Visual Styling Tokens (Tailwind-level)

- Container:
  - Keep `glass-panel`, `rounded-2xl`, `p-6`, and existing soft green shadow.
- Title:
  - `text-center`
  - `text-[11px]` to `text-xs` depending on breakpoints
  - `font-semibold`
  - `uppercase`
  - `tracking-[0.22em]` to `tracking-[0.25em]`
  - `text-muted-foreground`
- Primary button:
  - `w-full`
  - `rounded-2xl`
  - `gap-2` with text + icon
  - Icon sized ~16–18px, placed at the end.
- Secondary buttons:
  - `w-full`
  - `rounded-2xl`
  - `justify-center` (or `justify-start` if reference prefers left alignment; default to centered to match screenshot)
  - `gap-2` with icon + label
  - Subtle background (keep current `bg-background/80 hover:bg-background`)

### Copy

- Title: keep Vietnamese sentence as-is (but in UI it appears uppercase).
- Secondary label update:
  - “Liên hệ tư vấn” becomes “Tư vấn ngay” (to match reference).
  - “Tải catalogue” becomes “Tải Catalogue” (capitalization per reference).

## Technical Plan (High-level)

- Update `ProductDetailStickyPanel` to:
  - Use the new layout (title → primary → 2-column secondary).
  - Swap secondary labels to match reference.
  - Add icons (use existing icon library; prefer `lucide-react` if already installed).
- Update `RfqButton` to support:
  - Optional `className` so parent can enforce `w-full` and rounding.
  - Optional `rightIcon` (or internal default icon) without changing default behavior elsewhere.

## Acceptance Criteria

- On product detail page, the contact block visually matches the provided screenshots:
  - Title is centered, uppercase, tracking-wide.
  - Primary button spans full width and includes trailing icon.
  - Two secondary outline buttons appear below in two columns and include leading icons.
- Existing navigation/behavior remains:
  - RFQ button still opens the dialog.
  - Links still navigate to correct destinations.
- No layout regressions in other parts of the page.

