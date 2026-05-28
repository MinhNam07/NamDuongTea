# Product Detail Contact Block Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the “Liên hệ…” CTA block on product detail pages to match the provided screenshots (title + primary RFQ button + two secondary buttons with icons).

**Architecture:** Keep the existing `ProductDetailStickyPanel` structure and `RfqButton` behavior; only adjust layout/styling and add icon support through small, backwards-compatible prop additions.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, shadcn/ui (`Button`), icon set (prefer `lucide-react` if present).

---

## File Structure (what changes where)

- Modify: `src/components/products/product-detail-sticky-panel.tsx`
  - Update the internal contact block layout and copy.
  - Add icons to the two secondary outline buttons.
- Modify: `src/components/rfq-button.tsx`
  - Add `className` passthrough to allow `w-full` and rounding from the parent.
  - Add optional trailing icon (default on product pages; keep existing default label and behavior).
- Verify icon dependency:
  - If `lucide-react` is already present, use it.
  - If not present, either add it or use any existing icon component already used elsewhere in repo (search).

---

### Task 1: Confirm icon library and patterns

**Files:**
- Inspect: `package.json`
- Search: icon usage in `src/components/**/*.tsx`

- [ ] **Step 1: Check whether `lucide-react` is installed**
  - Look in `package.json` for `"lucide-react"`.
- [ ] **Step 2: Find existing icon usage conventions**
  - Search for imports like `from "lucide-react"` or `@radix-ui/react-icons`.
- [ ] **Step 3: Decide icons**
  - Primary trailing icon: something “document/quote” (e.g. `FileText`).
  - Secondary left icons:
    - “Tư vấn ngay”: phone (e.g. `Phone`)
    - “Tải Catalogue”: download (e.g. `Download`)

---

### Task 2: Update `RfqButton` to support parent styling + trailing icon

**Files:**
- Modify: `src/components/rfq-button.tsx`

- [ ] **Step 1: Update props**
  - Add optional `className?: string`
  - Add optional `showIcon?: boolean` (default `false` to avoid affecting other usages)
- [ ] **Step 2: Apply `className` to the internal `Button`**
  - Keep existing `size="lg"` and `variant="brown"`.
  - Merge provided `className`.
- [ ] **Step 3: Render trailing icon when `showIcon`**
  - Place icon after label with `gap-2`.
  - Icon size ~18px.
- [ ] **Step 4: Typecheck/lint sanity**
  - Run `pnpm lint` (or repo equivalent) and ensure no new errors from this file.

---

### Task 3: Redesign the contact block layout in `ProductDetailStickyPanel`

**Files:**
- Modify: `src/components/products/product-detail-sticky-panel.tsx`

- [ ] **Step 1: Adjust title styling**
  - Keep text content but display as uppercase styling:
    - `text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground`
- [ ] **Step 2: Make primary button full-width**
  - Render `RfqButton` with:
    - `className="w-full rounded-2xl"`
    - `showIcon`
- [ ] **Step 3: Replace secondary CTA copy**
  - `/lien-he`: change label to `Tư vấn ngay`
  - catalogue link: change label to `Tải Catalogue`
- [ ] **Step 4: Convert secondary buttons to a 2-col grid**
  - Replace `flex` row with:
    - `grid grid-cols-2 gap-3`
  - Each button:
    - `w-full rounded-2xl bg-background/80 hover:bg-background`
    - Add left icon + label with `gap-2`
- [ ] **Step 5: Keep destinations unchanged**
  - `/lien-he`
  - `/lien-he?product=${productSlug}#rfq`

---

### Task 4: Verification (visual + behavior)

**Files:**
- No new files

- [ ] **Step 1: Verify RFQ dialog still opens**
  - On a product page, click “Yêu cầu báo giá”.
  - Expected: dialog opens, form visible.
- [ ] **Step 2: Verify links navigate**
  - “Tư vấn ngay” → `/lien-he`
  - “Tải Catalogue” → `/lien-he?product=<slug>#rfq`
- [ ] **Step 3: Verify visual match**
  - Title uppercase + tracking, centered.
  - Primary button full width + trailing icon.
  - Two secondary buttons in two columns with leading icons.
- [ ] **Step 4: Run repo checks**
  - Run: `pnpm lint`
  - Run: `pnpm typecheck` (if available)

