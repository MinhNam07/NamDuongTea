# Performance Optimization Results — Nam Dương Tea

**Date:** 2026-06-28  
**Baseline:** Pre-optimization build  
**Post-fix:** After Critical + High fixes

---

## Verification commands

| Command | Before | After |
|---------|--------|-------|
| `pnpm build` | Pass | Pass |
| `pnpm lint` | Pass | Pass |
| `pnpm typecheck` | Pass | Pass |
| `pnpm test` | — | Pass (10 tests) |

---

## Metrics comparison

### First Load JS (shared baseline: 102 kB)

| Route | Before | After | Delta |
|-------|--------|-------|-------|
| `/` | 153 kB | 153 kB | 0 |
| `/san-pham/[slug]` | **161 kB** | **138 kB** | **-23 kB (-14%)** |
| `/san-pham` | 119 kB | 119 kB | 0 |
| `/nam-duong-tra-quan` | 121 kB | 121 kB | 0 |
| `/lien-he` | 136 kB | 136 kB | 0 |
| `/dang-ky-dai-ly` | 135 kB | 136 kB | +1 kB |
| `/dong-tra/[slug]` | 111 kB | 111 kB | 0 |

### Page-specific JS (route chunk only)

| Route | Before | After | Notes |
|-------|--------|-------|-------|
| `/` | 11.1 kB | 13 kB | Server prefetch data inlined; client fetch removed |
| `/san-pham/[slug]` | 7.98 kB | 7.57 kB | Gallery + RFQ form code-split |
| `/dang-ky-dai-ly` | 2.38 kB | 3.93 kB | RFQ dynamic import boundary shift |

### Route rendering mode

| Route | Before | After |
|-------|--------|-------|
| `/nam-duong-tra-quan` | Static (no ISR label) | Static ISR **5m** |
| All other routes | Unchanged | Unchanged |

### Client components

| Metric | Before | After |
|--------|--------|-------|
| `"use client"` files | 21 | 21 |

No new client boundaries added; existing client components simplified (product tiles no longer fetch).

### Build warnings

| Type | Before | After |
|------|--------|-------|
| ESLint | None | None |
| TypeScript | None | None |
| Next.js build | None | None |

### Homepage initial requests (logical)

| Request | Before | After |
|---------|--------|-------|
| SSR HTML + data | `getPosts()` | `getPosts()` + 3× `loadCatalogProducts` (parallel, cached) |
| Client `/api/public/products` | **Yes (after hydration)** | **No** |
| Loading skeleton on product tiles | Yes | No (data in HTML) |

### Database / server efficiency

| Path | Before | After |
|------|--------|-------|
| `/san-pham?category=che-xanh` | Tra Quán fetch + tab fetch (sequential) | Tab fetch only |
| `/san-pham?category=tat-ca` | Tra Quán + main (sequential) | `Promise.all` parallel |
| `/nam-duong-tra-quan` | Uncached 2-query Tra Quán load | `unstable_cache` + ISR 300s |
| Detail pages metadata + page | Potential 2× getter call | React `cache()` dedup per request |
| Public API GET routes | Raw Payload, revalidate 60s | Cached data layer, revalidate 300s |

### Font weights loaded

| Family | Before | After |
|--------|--------|-------|
| Be Vietnam Pro | 5 (300–700) | 5 (unchanged — `font-light`/`font-medium` on sans) |
| Nunito | 5 (400–800) | **4** (400, 600, 700, 800 — dropped unused 500) |
| **Total** | **10** | **9** |

---

## Files changed

| File | Change |
|------|--------|
| `docs/performance-audit.md` | Audit report (Phase 1) |
| `docs/performance-result.md` | This file (Phase 3) |
| `src/components/home/home-hero-section.tsx` | Hero `next/image` + `priority` for LCP |
| `src/app/(frontend)/page.tsx` | Server prefetch tabs; dynamic `PartnerFormSection` |
| `src/components/home/product-collection-tiles-section.tsx` | Props-driven tabs; removed client fetch |
| `src/app/(frontend)/san-pham/page.tsx` | Conditional + parallel catalog fetch |
| `src/lib/tra-quan-products.ts` | `unstable_cache` for Tra Quán queries |
| `src/data/cache.ts` | Added `traQuan` cache tag |
| `src/app/(frontend)/nam-duong-tra-quan/page.tsx` | `revalidate = 300` |
| `src/hooks/revalidateContent.ts` | Revalidate Tra Quán tag + path on product change |
| `src/data/products.ts` | React `cache()` on exported getters |
| `src/data/posts.ts` | React `cache()` on exported getters |
| `src/data/product-lines.ts` | React `cache()` on exported getters |
| `src/app/api/public/products/route.ts` | `revalidate = 300` |
| `src/app/api/public/products/[slug]/route.ts` | Use `getProductBySlug`; `revalidate = 300` |
| `src/app/api/public/categories/route.ts` | Use `getCategories`; `revalidate = 300` |
| `src/app/(frontend)/san-pham/[slug]/page.tsx` | Dynamic `ProductDetailGallery` |
| `src/components/rfq-button.tsx` | Dynamic `QuoteRequestForm` on dialog open |
| `src/lib/fonts.ts` | Dropped Nunito weight 500 |
| `src/components/site-nav-bar.tsx` | Removed logo `priority` |

---

## Rationale per change

1. **Hero `next/image`** — Enables preload, WebP/AVIF, responsive srcset for LCP element.
2. **Home product tiles server prefetch** — Eliminates post-hydration API waterfall and loading skeleton.
3. **`/san-pham` conditional fetch** — Avoids wasted Tra Quán DB query on non-Tra-Quán tabs.
4. **Tra Quán `unstable_cache` + ISR** — Caches category lookup + product list; aligns with other CMS pages.
5. **React `cache()`** — Dedupes metadata + page getter calls within same request.
6. **API route alignment** — Single cache layer; consistent 300s revalidation.
7. **`next/dynamic`** — Defers heavy form/carousel JS until needed; **-23 kB** on product detail.
8. **Font trim** — One fewer Nunito weight file without affecting used typography classes.
9. **Nav logo priority removed** — Stops small logo from competing with page LCP on inner routes.

---

## Not fixed (deferred) and why

| Item | Reason |
|------|--------|
| `FrontendMain` / route-group layouts | Large refactor; padding logic works; risk to layout |
| `SiteNavBar` server/client split | 330-line refactor; above-fold; needs dedicated PR |
| CMS globals wiring (`getHomePage`, etc.) | Content source change, not perf bottleneck |
| CSS background images (craft timeline) | Not on LCP path |
| Category collection revalidation hooks | Low traffic path; manual `/api/revalidate` available |
| GA `lazyOnload` | Standard `afterInteractive`; marginal gain |
| Be Vietnam Pro weight reduction | `font-light` (300) and `font-medium` (500) used on `font-sans` elements |

---

## Vercel Dashboard configuration

| Setting | Action |
|---------|--------|
| **Function Region** | Set to match Neon PostgreSQL primary region (check Neon dashboard → use same Vercel region, e.g. `sin1`) |
| **Node.js Version** | `20.x` or `22.x` (project requires `>=20.9.0`) |
| **Install Command** | `pnpm install` |
| **Build Command** | `pnpm build` |
| **Environment Variables** | Ensure `DATABASE_URI`, `PAYLOAD_SECRET`, `REVALIDATION_SECRET`, R2/S3 vars are set |
| **Speed Insights** | Enable for ongoing LCP/CLS monitoring post-deploy |
| **Web Analytics** | Optional; GA already via `NEXT_PUBLIC_GA_MEASUREMENT_ID` |

No `vercel.json` added — defaults are sufficient for this App Router + ISR setup.

---

## Production test checklist

- [ ] **`/`** — Hero image loads immediately; product tabs switch instantly without skeleton or `/api/public/products` in Network tab
- [ ] **`/san-pham?category=che-xanh`** — Products load; no Tra Quán section unless `tat-ca`
- [ ] **`/san-pham?category=tat-ca`** — Both Tra Quán and main grid render
- [ ] **`/san-pham/[slug]`** — Gallery carousel works; RFQ dialog opens and submits
- [ ] **`/nam-duong-tra-quan`** — Products render; publish product in CMS → page updates within revalidation window
- [ ] **`/admin`** — Unaffected; login and publish flow work
- [ ] **`/api/revalidate`** — Webhook with `REVALIDATION_SECRET` invalidates cache after CMS edit
- [ ] **Lighthouse mobile** on `/` — Compare LCP before/after deploy (expect hero improvement)

---

## Summary

The largest measurable win is **`/san-pham/[slug]` First Load JS down 23 kB (14%)** via code-splitting gallery and RFQ form. Homepage eliminates a client-side API waterfall (same 153 kB bundle but faster TTI and no skeleton flash). Tra Quán and catalog pages reduce redundant server work. All checks pass: build, lint, typecheck, tests.
