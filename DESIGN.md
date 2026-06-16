# Phong cách thiết kế — Nam Dương Tea

Tài liệu tổng quan về ngôn ngữ thiết kế của website **Nam Dương Tea** — nền tảng B2B giới thiệu thương hiệu, catalog sản phẩm và thu lead báo giá.

**Chủ đề thiết kế:** *Heritage & Harvest* — di sản trà Việt gặp thu hoạch từ đồi chè, cân bằng giữa sang trọng thủ công và hiện đại, ấm áp, gần gũi thiên nhiên.

---

## 1. Định vị thương hiệu trên giao diện

| Khía cạnh | Hướng thiết kế |
|-----------|----------------|
| Đối tượng | Đại lý, nhà phân phối, đơn vị xuất khẩu |
| Cảm xúc | Tin cậy, nguyên bản, cao cấp nhưng không xa cách |
| Hình ảnh chủ đạo | Đồi chè, lá trà, sương sớm, ánh vàng kim (trà ô-long / quà biếu) |
| Giọng nói UI | Trang trọng nhẹ, nhiều khoảng thở, typography có chiều sâu |

Website không hướng tới e-commerce lẻ mà là **storytelling thương hiệu + catalog + CTA liên hệ/báo giá**.

---

## 2. Bảng màu

Màu được định nghĩa qua CSS variables trong `src/app/(frontend)/globals.css` và map sang Tailwind token `tea.*` trong `tailwind.config.ts`.

### 2.1. Palette cốt lõi (Heritage & Harvest)

| Token | Hex | Vai trò |
|-------|-----|---------|
| `--nd-background` / `tea-ivory` | `#fbf9f3` | Nền trang — ivory ấm, giấy handmade |
| `--nd-primary` / `tea-dark-green` | `#133200` | Màu thương hiệu chính — xanh trà đậm |
| `--nd-secondary` / `tea-brown-700` | `#6a5e2e` | Nâu vàng — đất, gỗ, packaging |
| `--nd-tertiary-container` / `tea-yellow-green` | `#b9ae27` | Accent vàng olive — highlight, badge |
| `--tea-moss` | `#416828` | Xanh rêu — eyebrow, nhấn phụ trên nền sáng |
| `--tea-olive` | `#8eba6f` | Xanh olive nhạt — italic emphasis trên nền tối |
| `--tea-muted-gold` | `#d7c68c` | Vàng kim muted — CTA hero, accent sang trọng |
| `--nd-on-background` / `tea-ink` | `#1b1c19` | Chữ chính |
| `--nd-on-surface-variant` / `tea-muted` | `#43493d` | Chữ phụ, mô tả |
| `--nd-outline-variant` / `border-soft` | `#c3c9b9` | Viền mềm, divider |

### 2.2. Màu hero & overlay

Trên hero full-bleed, text thường dùng:

- Trắng `#ffffff` / `white/90` cho tiêu đề và body
- Vàng kem `rgba(243,226,166)` — eyebrow, divider, CTA primary
- Vàng italic `rgba(214,198,140)` — emphasis trong tiêu đề serif
- Overlay gradient: `rgba(7,27,0,0.82)` → `rgba(7,27,0,0.45)` — đảm bảo đọc được trên ảnh đồi chè

### 2.3. Surface & elevation

- **Card sản phẩm:** `bg-white/85`, `border-border/60`, shadow xanh nhẹ `rgba(37,74,12,0.06–0.10)`
- **Glass panel:** `bg-white/70 backdrop-blur-[12px] border-border/40`
- **Footer:** `#f4f0e6`, bo góc trên `rounded-t-[40px]`, shadow hướng lên
- **Stat band (About):** `bg-tea-ivory`, viền `tea-moss/15`, shadow-lg — nổi trên hero

### 2.4. shadcn semantic tokens

Các component UI (Button, Input, Dialog…) dùng token HSL `--primary`, `--secondary`, `--accent`, `--muted`… đồng bộ với palette trà. `--radius: 1rem`.

---

## 3. Typography

| Vai trò | Font | Tailwind class | Ghi chú |
|---------|------|----------------|---------|
| Display / Heading | **Nunito** | `font-display` | Tiêu đề section, số thống kê, logo footer |
| Body | **Be Vietnam Pro** | `font-sans` (mặc định) | Dấu tiếng Việt tốt, body copy, nav |
| Heading lớn (hero) | Serif system stack | `font-serif` | Cảm giác editorial, cao cấp — dùng kèm Nunito/display |

Cấu hình: `src/lib/fonts.ts`.

### Quy ước chữ

- **Eyebrow / label:** `uppercase`, `tracking-[0.2em]`–`tracking-[0.28em]`, thường kèm gạch ngang `h-px w-8–12`
- **H1 hero:** `font-serif`, `font-light`, `leading-[1.05–1.1]`, cỡ `text-5xl` → `text-8xl` responsive
- **H2 section:** `font-serif` + phần nhấn *italic* màu `tea-moss` hoặc `tea-olive`
- **Body:** `font-light` hoặc `leading-relaxed`, màu `tea-muted` trên nền sáng, `white/75–90` trên nền tối
- **Label cột footer:** `uppercase tracking-wider font-semibold`

---

## 4. Layout & spacing

| Thông số | Giá trị |
|----------|---------|
| Container chính | `max-w-[1280px]` (header, footer) |
| Content rộng | `max-w-[1440px]` (hero, section lớn) |
| Prose / copy hẹp | `max-w-3xl` (`.container-prose`) |
| Padding ngang | `px-6` mobile, `px-[5vw]` / `px-20` desktop |
| Section vertical | `py-28`–`py-32` cho block lớn |
| Grid gutter | `gap-6` (`.gap-gutter`), story blocks `gap-32` |
| Hero min-height | `min-h-[100vh]` / `min-h-[100svh]` |

**Header fixed:** pill glass bo tròn `rounded-full`, `mt-6`, chiếm `90%` width tối đa 1280px. Trang có hero full-bleed không cần `pt` trên `<main>`; trang nội dung thường `pt-24 md:pt-28`.

---

## 5. Hình ảnh & nền

### 5.1. Hero cinematic

- Ảnh full-bleed `object-cover`, có thể `blur-[1px]` nhẹ (About)
- Gradient overlay đa lớp: linear + radial để tạo chiều sâu và vignette
- `mix-blend-multiply` trên một số hero (trang chủ)

### 5.2. Tea hill backdrop

Component `TeaHillBackdrop`: ảnh đồi chè mờ + gradient `tea-dark-green` → `tea-deep-brown` — dùng cho header/footer marketing.

### 5.3. About surface

Utility `.nd-about-surface`: gradient dọc xanh lá nhạt xen kẽ radial glow — cảm giác đồi chè trong sương.

### 5.4. Ảnh sản phẩm

- Tỷ lệ card: `aspect-[4/3]`
- Hover: `scale-[1.04]` transition 700ms
- Badge category: glass `bg-white/70 backdrop-blur-md`

---

## 6. Component patterns

### 6.1. Section header (`SectionEyebrowTitle`)

```
[—] EYEBROW TEXT          ← tea-moss, uppercase, tracking rộng
Tiêu đề chính             ← font-serif, tea-dark-green, text-4xl–5xl
emphasis italic           ← tea-moss
```

Có thể căn giữa (`centered`) hoặc trái (kèm gạch ngang bên trái).

### 6.2. Nút (Button)

- Bo tròn: `rounded-2xl` mặc định, `rounded-full` trên CTA hero và product card
- Primary: `bg-primary` (xanh đậm) → hover `secondary` (nâu)
- Hero CTA vàng: `bg-[rgba(243,226,166)]` text `#071b00`
- Outline: viền `border`, hover `bg-muted` hoặc `bg-tea-dark-green`

### 6.3. Card sản phẩm

- Bo `rounded-[28px]`
- Shadow xanh olive nhẹ, hover tăng elevation
- Hai CTA xếp dọc: "Yêu cầu báo giá" (filled) + "Xem chi tiết" (outline)

### 6.4. Navigation header

Hai trạng thái scroll:

1. **Đầu trang (dark-on-hero):** glass xanh đậm `rgba(19,50,0,0.35)` → `rgba(7,27,0,0.78)`, viền `white/10`
2. **Sau scroll (dark-on-light):** glass kem `rgba(246,252,235,0.72)`, viền `black/10`, shadow tăng

`backdrop-blur-[20px]`, transition 300ms.

### 6.5. Alternating story

Section nền `#133200`, layout 2 cột xen kẽ (ảnh ↔ copy), stat card glass `border-white/20 bg-white/5`.

### 6.6. Footer

4 cột grid, link hover `translate-x-1` + đổi màu xanh, icon `tea-olive`.

---

## 7. Chuyển động (Motion)

| Class | Mô tả |
|-------|--------|
| `.motion-safe-fade-up` | Fade + translateY 16px, 800ms, easing `cubic-bezier(0.16, 1, 0.3, 1)` |
| `.motion-safe-float` | Float nhẹ ±10px, 3s infinite — scroll hint hero |
| Stagger hero | `[animation-delay:100ms/200ms/300ms]` trên copy block |
| `prefers-reduced-motion` | Tắt animation fade/float |

Nguyên tắc: chuyển động tinh tế, không flashy — phù hợp thương hiệu trà cao cấp.

---

## 8. Kiến trúc UI

- **Foundation:** Tailwind CSS + CSS variables + [shadcn/ui](https://ui.shadcn.com) (Radix primitives) tại `src/components/ui/`
- **Icons:** lucide-react, kích thước ~16–18px inline
- **Forms:** react-hook-form + zod, input/textarea/select theo token shadcn
- **Toast:** sonner, `position="top-center"`

---

## 9. Trang & layout đặc thù

| Route pattern | Đặc điểm |
|---------------|----------|
| `/` | Hero cinematic → sections sáng/xen kẽ → story nền xanh đậm |
| `/gioi-thieu`, `/tim-hieu-vung-trong` | Hero full viewport, stat band chồng đáy hero |
| `/san-pham` | Hero catalog, grid card sản phẩm |
| `/nam-duong-tra-quan` | Hero marketing 2 cột (copy + ảnh sản phẩm), nền đồi chè |
| Trang nội dung thường | Nền `background`, header scroll glass kem |

---

## 10. Accessibility & chất lượng

- `lang="vi"` trên `<html>`
- Ảnh decorative: `alt=""` + `aria-hidden` trên lớp nền
- Hero/section: `aria-label` mô tả mục đích
- Focus ring: `focus-visible:ring-2 ring-ring` (shadcn)
- `antialiased` + `font-feature-settings: "rlig", "calt"` trên body

---

## 11. File tham chiếu trong codebase

| File | Nội dung |
|------|----------|
| `src/app/(frontend)/globals.css` | CSS variables, utilities (glass, about surface, motion) |
| `tailwind.config.ts` | Map màu `tea.*`, font, animation, container |
| `src/lib/fonts.ts` | Be Vietnam Pro, Nunito |
| `data/website-data.json` | Brand assets, màu legacy, copy tĩnh |
| `src/components/site-header.tsx` | Glass pill navigation |
| `src/components/marketing/section-eyebrow-title.tsx` | Pattern tiêu đề section |
| `src/components/ui/button.tsx` | Variants nút |
| `src/components/product-card.tsx` | Card catalog mẫu |

---

## 12. Nguyên tắc khi mở rộng

1. **Giữ palette Heritage & Harvest** — tránh màu neon, xám lạnh, hoặc đen tuyệt đối ngoài hero overlay.
2. **Ưu tiên ảnh thật** (đồi chè, sản phẩm, quy trình) hơn illustration.
3. **Eyebrow + serif heading + italic emphasis** là combo nhận diện section — tái sử dụng thay vì invent pattern mới.
4. **Bo góc lớn** (`rounded-2xl`, `rounded-full`, `rounded-[28px]`) — không dùng góc vuông trừ table/data.
5. **CTA B2B rõ ràng:** "Yêu cầu báo giá", "Liên hệ", "Đăng ký đại lý" — không dùng ngôn ngữ mua lẻ ("Thêm vào giỏ").
6. **Hero = cinematic, body = breathable** — nhiều whitespace, copy ngắn, stat/CTA nổi bật.
7. **Token trước, hex sau** — dùng `tea-dark-green`, `tea-muted`… thay vì hardcode khi có thể; hero overlay là ngoại lệ chấp nhận được.

---

*Tài liệu phản ánh implementation hiện tại (Next.js 15 + Tailwind + shadcn). Cập nhật khi thay đổi `globals.css` hoặc palette thương hiệu.*
