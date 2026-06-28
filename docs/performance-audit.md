# Performance Audit — Nam Dương Tea

**Date:** 2026-06-28  
**Stack:** Next.js 15.4.11, Payload CMS 3, PostgreSQL (Neon), pnpm, Vercel  
**Scope:** Frontend storefront (`src/app/(frontend)`, components, data layer, public API)

---

## Hiện trạng

### Baseline build (pre-optimization)

| Check | Result |
|-------|--------|
| `pnpm build` | Pass |
| `pnpm lint` | Pass — no warnings |
| `pnpm typecheck` | Pass |
| Client components (`"use client"`) | **21** |
| Shared First Load JS | **102 kB** |

### Route rendering

| Route | Mode | First Load JS |
|-------|------|---------------|
| `/` | Static (ISR 5m) | 153 kB |
| `/san-pham` | Dynamic (searchParams) | 119 kB |
| `/san-pham/[slug]` | Dynamic (ISR 5m) | 161 kB |
| `/nam-duong-tra-quan` | Static (no revalidate) | 121 kB |
| `/dong-tra/[slug]` | SSG + ISR 5m | 111 kB |
| `/tin-tuc`, `/tin-tuc/[slug]` | ISR / Dynamic | 106–102 kB |
| `/lien-he` | Dynamic (searchParams) | 136 kB |
| `/gioi-thieu`, `/tim-hieu-vung-trong` | Static | 111 kB |

### Infrastructure

- **Không có** `vercel.json`, middleware
- **Không có** `force-dynamic`, `no-store` trên frontend
- DB: Neon PostgreSQL qua `DATABASE_URI`
- Media: Cloudflare R2 CDN (`S3_PUBLIC_BASE_URL`)
- ISR + `unstable_cache` + tag revalidation đã có trên data layer chính

### Điểm tốt

- Data layer `src/data/*` dùng `unstable_cache` + tag revalidation (300s)
- Lucide named imports (tree-shakeable)
- Không có lodash, framer-motion, swiper
- Không có chatbot/widget script
- GA gated bởi env var, `strategy="afterInteractive"`
- Payload admin tách route group `(payload)`

---

## Findings

### Critical

#### C1 — Hero LCP không qua Next Image optimizer

| Field | Detail |
|-------|--------|
| **Severity** | Critical |
| **File** | `src/components/home/home-hero-section.tsx:16-20` |
| **Impact** | LCP element (`hero.JPG`) không preload, không WebP/AVIF, không responsive srcset — chậm First Contentful Paint trên mobile |
| **Fix** | `next/image` với `fill`, `priority`, `sizes="100vw"`, giữ gradient overlay |
| **Risk** | Thấp — visual giữ nguyên với `object-cover` |

---

### High

#### H1 — Homepage client fetch waterfall

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/components/home/product-collection-tiles-section.tsx:43-86`, `src/app/(frontend)/page.tsx:13-26` |
| **Impact** | Sau SSR, client fetch thêm `/api/public/products` → skeleton flash, +1 round-trip, TTI chậm |
| **Fix** | Server prefetch 3 tabs (`Promise.all`) → pass `initialProductsByTab` props |
| **Risk** | Thấp — TTFB home tăng nhẹ, net win vì cache layer đã có |

#### H2 — `/san-pham` fetch Tra Quán dư thừa

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/app/(frontend)/san-pham/page.tsx:42-51` |
| **Impact** | Luôn query Tra Quán kể cả tab `che-xanh`/`che-den`; sequential thay vì parallel cho `tat-ca` |
| **Fix** | Conditional fetch; `Promise.all` khi `tab === "tat-ca"` |
| **Risk** | Thấp |

#### H3 — Tra Quán loader không cache

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/lib/tra-quan-products.ts:42-78`, `src/app/(frontend)/nam-duong-tra-quan/page.tsx` |
| **Impact** | 2 DB round-trips mỗi request (category lookup + products); không ISR |
| **Fix** | `unstable_cache` + `export const revalidate = 300` + tag revalidation |
| **Risk** | Trung bình — cần tag invalidation khi publish product Tra Quán |

#### H4 — Duplicate fetch metadata + page

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/app/(frontend)/san-pham/[slug]/page.tsx:55,80`; `tin-tuc/[slug]/page.tsx`; `dong-tra/[slug]/page.tsx` |
| **Impact** | `generateMetadata` + page component gọi cùng getter — 2× DB nếu cache miss trong cùng request |
| **Fix** | React `cache()` wrap exported getters |
| **Risk** | Thấp |

#### H5 — Public API bypass cache layer

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/app/api/public/products/[slug]/route.ts`, `categories/route.ts`, `products/route.ts` |
| **Impact** | Raw Payload queries; revalidate 60s vs pages 300s — cache tier mismatch |
| **Fix** | Route qua `getProductBySlug` / `getCategories`; align `revalidate = 300` |
| **Risk** | Thấp — API response shape giữ nguyên |

#### H6 — Zero code-splitting

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/app/(frontend)/layout.tsx`, `page.tsx`, `san-pham/[slug]/page.tsx`, `rfq-button.tsx` |
| **Impact** | Forms (react-hook-form + zod), carousels load eager → First Load JS cao trên `/` và product detail |
| **Fix** | `next/dynamic` cho below-fold: `PartnerFormSection`, `ProductDetailGallery`, `QuoteRequestForm` |
| **Risk** | Thấp — loading skeleton invisible/minimal |

#### H7 — Font weights dư thừa

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/lib/fonts.ts:3-14` |
| **Impact** | 10 weight files (5 Be Vietnam + 5 Nunito) — tăng FCP/render blocking |
| **Fix** | Giảm Nunito 500 (không dùng trên `font-display`); Be Vietnam giữ 300/400/500/600/700 vì `font-light`/`font-medium` trên `font-sans` |
| **Risk** | Trung bình — phải verify typography classes trước khi drop weight |

#### H8 — Nav logo `priority` trên mọi page

| Field | Detail |
|-------|--------|
| **Severity** | High |
| **File** | `src/components/site-nav-bar.tsx:122` |
| **Impact** | Logo nhỏ compete với page LCP trên inner routes |
| **Fix** | Bỏ `priority` |
| **Risk** | Thấp |

---

### Medium (deferred — Phase 2 không sửa)

| Issue | File | Lý do defer |
|-------|------|-------------|
| `FrontendMain` client chỉ vì padding | `src/components/frontend-main.tsx` | Route groups refactor — scope lớn |
| `SiteNavBar` 330-line client shell | `src/components/site-nav-bar.tsx` | Tách server/client nav — refactor lớn |
| CMS globals cached nhưng không wired | `src/data/home-page.ts`, `site-settings.ts` | Không phải bottleneck; wiring = thay đổi content |
| CSS background images | `craft-timeline-section.tsx`, `tea-hill-backdrop.tsx` | Không phải LCP path |
| Categories thiếu revalidation hooks | `src/collections/Categories.ts` | Không block render chính |
| Sitemap sequential Tra Quán fetch | `src/app/sitemap.ts:62` | Background, không ảnh hưởng TTFB user |

---

### Low (deferred)

| Issue | File | Lý do defer |
|-------|------|-------------|
| GA `afterInteractive` | `src/components/google-analytics.tsx` | Industry standard |
| `newsletter-form.tsx` unused | `src/components/marketing/newsletter-form.tsx` | Không import → không bundle |
| Dead `--font-inter` in Tailwind | `tailwind.config.ts:100` | Cosmetic config |

---

## Vercel Dashboard recommendations

| Setting | Recommendation |
|---------|----------------|
| **Function Region** | Khớp Neon primary region (e.g. `sin1` nếu DB ở Singapore) |
| **Node.js** | `>=20.9.0` |
| **Install** | `pnpm install` |
| **Build** | `pnpm build` |
| **ISR / Data Cache** | Enabled (default) |
| **Speed Insights** | Enable để monitor LCP/CLS sau deploy |
| **Env vars** | `DATABASE_URI`, `PAYLOAD_SECRET`, `REVALIDATION_SECRET`, R2 vars |
