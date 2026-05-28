# Nam Dương trà quán Hero Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enlarge the hero product image ~10–15% and tighten text-image spacing on `/nam-duong-tra-quan` without changing the background rendering.

**Architecture:** Update Tailwind layout/sizing classes in the hero component only. Keep background image + overlays identical and limit changes to the foreground grid and image wrapper sizing.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, `next/image`

---

### Task 1: Implement hero layout adjustments (A)

**Files:**
- Modify: `src/components/marketing/tet-gift/tet-gift-hero-banner.tsx`

- [ ] **Step 1: Update the container grid columns and gap**
  - Change `md:grid-cols-[1fr_auto]` → `md:grid-cols-[1.05fr_0.95fr]`
  - Change `md:gap-x-12` → `md:gap-x-8`

- [ ] **Step 2: Increase image wrapper height caps (~10–15%)**
  - Change:
    - `h-[min(380px,52vh)]` → `h-[min(420px,52vh)]`
    - `sm:h-[min(420px,55vh)]` → `sm:h-[min(460px,55vh)]`
    - `md:h-[min(480px,58vh)]` → `md:h-[min(520px,58vh)]`
    - `lg:h-[min(520px,60vh)]` → `lg:h-[min(580px,60vh)]`

- [ ] **Step 3: Verify no background changes**
  - Ensure `TRA_QUAN_BG_SRC` usage and the overlay gradient div remain unchanged.

- [ ] **Step 4: Run lint/typecheck (project standard)**
  - Run:
    - `pnpm lint`
    - `pnpm typecheck` (or `pnpm build` if typecheck script is unavailable)
  - Expected: no new errors.

- [ ] **Step 5: Manual visual verification**
  - Open `http://localhost:3000/nam-duong-tra-quan`
  - Confirm:
    - Image is ~10–15% larger on desktop
    - Text sits closer to the image
    - Two columns remain balanced and centered
    - No background visual differences (same image + same gradient overlay)

---

### Task 2: Iterate sizing if needed (B/C)

**Files:**
- Modify: `src/components/marketing/tet-gift/tet-gift-hero-banner.tsx`

- [ ] **Step 1: If image still small, bump height caps to option B or C**
- [ ] **Step 2: Re-run `pnpm lint` and refresh page**

