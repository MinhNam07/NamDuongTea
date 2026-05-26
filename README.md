# Nam Dương Tea — Website B2B

Website giới thiệu công ty, catalog sản phẩm và nhận yêu cầu báo giá B2B cho ngành trà. Stack: **Next.js 15 (App Router) + Payload CMS v3 + PostgreSQL + Tailwind + shadcn/ui**.

---

## Stack

| Layer        | Công nghệ                                                              |
| ------------ | ---------------------------------------------------------------------- |
| Framework    | Next.js 15 (App Router, RSC, Server Actions)                           |
| Ngôn ngữ     | TypeScript                                                             |
| CMS / API    | Payload CMS v3 (admin UI + REST + GraphQL tự sinh)                     |
| Database     | PostgreSQL 16 (qua `@payloadcms/db-postgres`, Drizzle ORM)             |
| Styling      | Tailwind CSS + CSS variables                                           |
| UI kit       | shadcn/ui (Radix + cva) — components copy-paste tại `src/components/ui` |
| Form         | react-hook-form + zod                                                  |
| Icon         | lucide-react                                                           |
| Image        | sharp + `next/image`                                                   |

---

## Design system ngành trà

### Color palette (HSL trong `globals.css` + Tailwind tokens)

| Token              | Hex       | Mục đích                        |
| ------------------ | --------- | ------------------------------- |
| `tea.green`        | `#2F6B3F` | Primary — xanh trà              |
| `tea.green.dark`   | `#1F4A2A` | Hover/active                    |
| `tea.green.light`  | `#4A8A5A` | Accent xanh                     |
| `tea.green.50`     | `#EEF6F0` | Background nhẹ, badge muted     |
| `tea.gold`         | `#D8B56D` | Accent — vàng kim trà ô-long    |
| `tea.gold.dark`    | `#B89556` | Hover                           |
| `tea.cream`        | `#F8F4EA` | Background mặc định             |
| `tea.ink`          | `#1F2A24` | Text chính                      |
| `tea.muted`        | `#6B7A6F` | Text phụ                        |

### Typography

- **Heading** (`font-display`): **Lora** — serif, premium, hợp ngành trà thủ công.
- **Body** (`font-sans`): **Be Vietnam Pro** — dấu tiếng Việt tốt nhất.
- **UI/Numeric** (`font-mono`): **Inter** — fallback international.

Cấu hình tại `src/lib/fonts.ts`.

### Spacing / Radius

- `--radius: 1rem` (rounded-2xl) — match brand.
- Container max-width 1280px, padding responsive.

---

## Folder structure

```
namduongtea/
├── src/
│   ├── app/
│   │   ├── (frontend)/                  # Public site
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                 # /
│   │   │   ├── globals.css
│   │   │   ├── gioi-thieu/page.tsx
│   │   │   ├── san-pham/
│   │   │   │   ├── page.tsx             # CODE MẪU FE
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── dang-ky-dai-ly/page.tsx
│   │   │   ├── tin-tuc/{,[slug]}/page.tsx
│   │   │   └── lien-he/page.tsx
│   │   ├── (payload)/                   # Payload admin + REST/GQL
│   │   │   ├── admin/[[...segments]]/
│   │   │   ├── api/[...slug]/route.ts
│   │   │   ├── api/graphql/route.ts
│   │   │   └── api/graphql-playground/route.ts
│   │   └── api/public/                  # Public JSON API
│   │       ├── products/{,[slug]}/route.ts   # CODE MẪU BE
│   │       ├── contact/route.ts
│   │       └── quote-request/route.ts
│   ├── collections/                     # Payload schemas
│   ├── components/
│   │   ├── ui/                          # shadcn primitives
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── quote-request-form.tsx
│   │   ├── agent-register-form.tsx
│   │   └── rfq-button.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── payload.ts
│   │   ├── fonts.ts
│   │   └── seo.ts
│   └── payload.config.ts
├── public/
│   ├── images/
│   └── media/                           # Payload uploads (dev)
├── docker-compose.yml                   # postgres dev
├── .env.example
└── ...
```

---

## Setup

### 1. Yêu cầu

- Node.js ≥ 20.9
- pnpm ≥ 9 (`npm i -g pnpm`)
- Docker (cho PostgreSQL local)

### 2. Cài đặt

```bash
pnpm install
cp .env.example .env
```

Chỉ hai đối số: nguồn `.env.example`, đích `.env`. Không thêm tên biến (ví dụ `PAYLOAD_SECRET`) làm đối số thứ ba — `cp` sẽ báo lỗi kiểu “Not a directory”.

Sửa `.env` (tạo `PAYLOAD_SECRET` bằng shell rồi dán giá trị vào file, hoặc gán trực tiếp):

```bash
openssl rand -hex 32
```

Trong `.env`:

```ini
DATABASE_URI=postgres://namduong:namduong@localhost:5432/namduongtea
PAYLOAD_SECRET=paste-the-64-char-hex-from-openssl-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### 3. Khởi PostgreSQL

```bash
pnpm db:up
```

Hoặc: `docker compose up -d db`

### 4. Chạy dev

```bash
pnpm dev
```

Lần đầu Payload sẽ tự migrate schema. Truy cập:

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (tạo user admin lần đầu)
- API public: http://localhost:3000/api/public/products
- Payload REST: http://localhost:3000/api/products
- GraphQL: http://localhost:3000/api/graphql-playground

### 5. Generate types & importmap

Sau khi sửa schema collections:

```bash
# Ghi file src/payload-types.ts
pnpm generate:types

# Ghi file src/app/(payload)/admin/importMap.js (dấu ngoặc trong đường dẫn — chỉ chạy lệnh pnpm, đừng dán đường dẫn vào shell)
pnpm generate:importmap
```

---

## API endpoints

### Public (thiết kế cho FE/đối tác)

| Method | Endpoint                          | Mô tả                            |
| ------ | --------------------------------- | -------------------------------- |
| GET    | `/api/public/products`            | List sản phẩm (?category, ?limit, ?featured) |
| GET    | `/api/public/products/:slug`      | Chi tiết sản phẩm                |
| POST   | `/api/public/contact`             | Gửi form liên hệ / đăng ký đại lý |
| POST   | `/api/public/quote-request`       | Gửi yêu cầu báo giá B2B          |

### Payload tự sinh (admin/internal)

`/api/{collection}` REST + `/api/graphql` cho mọi collection.

---

## Deploy

### Vercel + Postgres cloud

1. Tạo Postgres cloud (Neon / Supabase / Railway / RDS).
2. Push repo lên GitHub.
3. Import vào Vercel:
   - Set env: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`.
   - Build command: `pnpm build`.
4. Cho media uploads ở production: chuyển `Media.upload.staticDir` sang adapter S3 (`@payloadcms/storage-s3`) hoặc Vercel Blob.

### Tự host

```bash
pnpm build
pnpm start
```

Dùng PM2 / systemd. PostgreSQL có thể chạy cùng máy hoặc DB riêng.

---

## Lộ trình

- [x] Tuần 1: Branding, sitemap, UI, design system, scaffold code.
- [ ] Tuần 2: Frontend chi tiết, CMS data thực, blog SEO.
- [ ] Tuần 3: Form RFQ + email notification + Google Analytics + responsive QA.
- [ ] Tuần 4: Deploy production, submit Search Console, sitemap.xml, robots.txt.

---

## License

© Nam Dương Tea — All rights reserved.
