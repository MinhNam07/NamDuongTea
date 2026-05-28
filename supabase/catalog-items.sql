-- Import "đống sản phẩm" hiện đang hardcode trong repo vào Supabase.
-- Nguồn: `src/lib/product-lines.ts` + `src/lib/tet-gift-sets.ts`
--
-- Cách dùng:
-- 1) Mở Supabase -> SQL Editor -> New query
-- 2) Paste toàn bộ file này -> Run

create extension if not exists pgcrypto;

create table if not exists public.catalog_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  kind text not null check (kind in ('product_line', 'tet_gift_set')),
  href text,
  description text,
  detail text,
  image text,
  gallery jsonb not null default '[]'::jsonb,
  has_detail_page boolean,
  price_vnd bigint,
  stock_note text,
  tagline text,
  teas jsonb,
  gift_highlights jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional: index phục vụ tìm kiếm theo kind
create index if not exists catalog_items_kind_idx on public.catalog_items(kind);

-- Upsert theo slug để chạy lại không bị duplicate.
insert into public.catalog_items (
  slug,
  name,
  kind,
  href,
  description,
  detail,
  image,
  gallery,
  has_detail_page,
  price_vnd,
  stock_note,
  tagline,
  teas,
  gift_highlights
)
values
  (
    'bach-tra-shan-tuyet',
    'Bạch trà shan tuyết',
    'product_line',
    '/dong-tra/bach-tra-shan-tuyet',
    'Bạch trà tuyển từ búp shan tuyết vùng cao — hương thanh nhẹ, vị ngọt dịu, ít chất đắng.',
    'Bạch trà shan tuyết Nam Dương được chế biến tối giản để giữ trọn vẹn hương vị tự nhiên của búp trà vùng cao. Sắc nước trong, hương thảo mộc nhẹ và vị hậu ngọt dài — phù hợp thưởng thức nguyên chất hoặc phục vụ quán trà cao cấp.',
    '/images/bach-tra-shan-tuyet/DSC_3122%20copy%202.png',
    '["/images/bach-tra-shan-tuyet/DSC_3122%20copy%202.png","/images/bach-tra-shan-tuyet/DSC_3139%20copy%202.png"]'::jsonb,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'tra-dinh-ngoc',
    'Trà đinh ngọc',
    'product_line',
    '/dong-tra/tra-dinh-ngoc',
    'Búp non một tôm một lá, sắc xanh ngọc — đặc trưng vùng trà Nam Dương.',
    'Trà đinh ngọc là dòng trà xanh tuyển chọn từ búp non nhất, một tôm một lá. Hương thơm tươi mát, vị thanh ngọt cân bằng — lý tưởng cho pha trà truyền thống và chuỗi F&B cần hồ sơ hương vị ổn định theo mùa.',
    '/images/tra-dinh-ngoc/DSC_3112%20copy%202.png',
    '["/images/tra-dinh-ngoc/DSC_3112%20copy%202.png","/images/tra-dinh-ngoc/DSC_3137%20copy%202.png"]'::jsonb,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'hong-tra',
    'Hồng trà',
    'product_line',
    '/dong-tra/hong-tra',
    'Hồng trà lên men vừa — hương mật ong, vị đậm đà cho pha trà và pha chế.',
    'Hồng trà Nam Dương được lên men và sấy khô theo quy trình kiểm soát, cho sắc nước hổ phách ấm và hương ngọt tự nhiên. Phù hợp pha nóng, pha lạnh và ứng dụng đồ uống F&B cần vị trà rõ, ổn định.',
    '/images/hong-tra/DSC_3117%20copy%202.png',
    '["/images/hong-tra/DSC_3117%20copy%202.png","/images/hong-tra/DSC_3134%20copy%202.png"]'::jsonb,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'tra-o-long',
    'Trà ô long',
    'product_line',
    '/dong-tra/tra-o-long',
    'Ô long bán lên men — hương hoa quả nhẹ, thích hợp quán trà và đại lý cao cấp.',
    'Trà ô long Nam Dương nằm giữa trà xanh và trà đen: hương thơm đa tầng, vị ngọt thanh, hậu vị kéo dài. Dòng sản phẩm được các quán trà và nhà phân phối ưa chuộng nhờ profile hương vị nhất quán.',
    '/images/tra-o-long/DSC_3126%20copy%202.png',
    '["/images/tra-o-long/DSC_3126%20copy%202.png","/images/tra-o-long/DSC_3132%20copy%202.png"]'::jsonb,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'nam-duong-tra-quan',
    'Nam Dương trà quán',
    'product_line',
    '/nam-duong-tra-quan',
    'Bộ quà biếu thất phẩm gỗ chạm khắc — trà tuyển chọn, trình bày sang trọng.',
    'Nam Dương trà quán là bộ sưu tập quà biếu cao cấp gồm năm thất phẩm gỗ chạm khắc, mỗi thất phẩm kể một câu chuyện riêng về trà và nghệ thủ công đóng gói.',
    '/images/products/tet-gift-sets/nam-moc-tra-quan-hero.JPG',
    '["/images/products/tet-gift-sets/nam-moc-tra-quan-hero.JPG"]'::jsonb,
    false,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'nam-moc-tra-quan',
    'Nam mộc trà quán',
    'tet_gift_set',
    null,
    null,
    null,
    '/images/products/tet-gift-sets/nam-moc-tra-quan.jpg',
    '["/images/products/tet-gift-sets/nam-moc-tra-quan.jpg","/images/products/tet-gift-sets/nam-moc-tra-quan-2.jpg"]'::jsonb,
    null,
    950000,
    '25 set',
    'Tinh hoa trà shan & hồng trà trong thất phẩm gỗ',
    '[{"name":"Bạch trà shan tuyết","weight":"80gr"},{"name":"Hồng trà","weight":"80gr"}]'::jsonb,
    '["Hộp gỗ chạm khắc tinh xảo","Hai dòng trà cao cấp","Quà biếu Tết sang trọng"]'::jsonb
  ),
  (
    'son-moc-tra-quan',
    'Sơn mộc trà quán',
    'tet_gift_set',
    null,
    null,
    null,
    '/images/products/tet-gift-sets/son-moc-tra-quan.jpg',
    '["/images/products/tet-gift-sets/son-moc-tra-quan.jpg","/images/products/tet-gift-sets/son-moc-tra-quan-2.jpg"]'::jsonb,
    null,
    820000,
    '25 set',
    'Shan tuyết thanh khiết cùng đinh ngọc quý phái',
    '[{"name":"Bạch trà shan tuyết","weight":"80gr"},{"name":"Trà đinh ngọc","weight":"100gr"}]'::jsonb,
    '["Cân bằng vị trà trắng & trà xanh","Thiết kế quán trà cổ điển","Phù hợp biếu đối tác B2B"]'::jsonb
  ),
  (
    'thanh-nhien-tra-quan',
    'Thanh nhiên trà quán',
    'tet_gift_set',
    null,
    null,
    null,
    '/images/products/tet-gift-sets/thanh-nhien-tra-quan.jpg',
    '["/images/products/tet-gift-sets/thanh-nhien-tra-quan.jpg","/images/products/tet-gift-sets/thanh-nhien-tra-quan-2.jpg"]'::jsonb,
    null,
    750000,
    '20 set',
    'Ô long thơm lâu, đinh ngọc thanh nhã',
    '[{"name":"Trà ô long","weight":"150gr"},{"name":"Trà đinh ngọc","weight":"100gr"}]'::jsonb,
    '["Dung lượng ô long hào phóng","Hương vị đa tầng","Set quà Tết tinh tế"]'::jsonb
  ),
  (
    'bach-nhien-tra-quan',
    'Bạch nhiên trà quán',
    'tet_gift_set',
    null,
    null,
    null,
    '/images/products/tet-gift-sets/bach-nhien-tra-quan.jpg',
    '["/images/products/tet-gift-sets/bach-nhien-tra-quan.jpg","/images/products/tet-gift-sets/bach-nhien-tra-quan-2.jpg"]'::jsonb,
    null,
    620000,
    '25 set',
    'Ba sắc trà trong một thất phẩm thanh nhã',
    '[{"name":"Trà ô long","weight":"100gr"},{"name":"Trà đinh ngọc","weight":"50gr"},{"name":"Hồng trà","weight":"30gr"}]'::jsonb,
    '["Trải nghiệm ba dòng trà","Giá trị quà tặng linh hoạt","Đóng gói cao cấp"]'::jsonb
  ),
  (
    'van-lo-tra-quan',
    'Vân lộ trà quán',
    'tet_gift_set',
    null,
    null,
    null,
    '/images/products/tet-gift-sets/van-lo-tra-quan.jpg',
    '["/images/products/tet-gift-sets/van-lo-tra-quan.jpg","/images/products/tet-gift-sets/van-lo-tra-quan-2.jpg"]'::jsonb,
    null,
    690000,
    null,
    'Tứ vị trà — bộ sưu tập giới hạn',
    '[{"name":"Trà ô long","weight":"100gr"},{"name":"Trà đinh ngọc","weight":"50gr"},{"name":"Bạch trà shan tuyết","weight":"30gr"}]'::jsonb,
    '["Kết hợp ô long, đinh ngọc, shan","Thiết kế vân lộ tinh xảo","Phiên bản đặc biệt"]'::jsonb
  )
on conflict (slug) do update set
  name = excluded.name,
  kind = excluded.kind,
  href = excluded.href,
  description = excluded.description,
  detail = excluded.detail,
  image = excluded.image,
  gallery = excluded.gallery,
  has_detail_page = excluded.has_detail_page,
  price_vnd = excluded.price_vnd,
  stock_note = excluded.stock_note,
  tagline = excluded.tagline,
  teas = excluded.teas,
  gift_highlights = excluded.gift_highlights,
  updated_at = now();

