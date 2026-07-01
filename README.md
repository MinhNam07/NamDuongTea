# Nam Dương Tea — Website B2B

Website giới thiệu thương hiệu trà, catalog sản phẩm và form liên hệ / báo giá B2B.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3 · shadcn/ui · nội dung tĩnh (`data/website-data.json` + `src/lib/*`)

## Chạy local

```bash
npm install
cp .env.example .env   # chỉnh NEXT_PUBLIC_SITE_URL nếu cần
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Chạy bản build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest |
| `npm run lint` | ESLint (Next) |

## Cấu trúc chính

```
src/app/              # Trang marketing + catalog
src/app/api/public/   # JSON API + form POST
src/data/             # Loaders (cache + static fallback)
src/lib/              # Catalog, SEO, email, website-data
data/website-data.json
```

## Form lead

`POST /api/public/contact`, `/quote-request`, `/newsletter` — validate Zod, log server console, trả `{ ok: true }`. Chưa lưu DB hay gửi email.

## Thiết kế

Xem `DESIGN.md` (palette, typography, layout patterns).
