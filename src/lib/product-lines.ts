/** Đường dẫn ảnh tĩnh trong public/images (tên file có thể chứa khoảng trắng). */
export function productLineImageSrc(folder: string, filename: string) {
  return `/images/${folder}/${encodeURIComponent(filename)}`;
}

export type ProductLine = {
  slug: string;
  name: string;
  description: string;
  /** Mô tả dài trên trang chi tiết */
  detail: string;
  href: string;
  image: string;
  gallery: string[];
  /** Trang chi tiết tại /dong-tra/[slug] — trừ bộ trà quán */
  hasDetailPage: boolean;
};

const BACH_TRA_SHAN_TUYET_IMAGES = [
  productLineImageSrc("bach-tra-shan-tuyet", "DSC_3122 copy 2.png"),
  productLineImageSrc("bach-tra-shan-tuyet", "DSC_3139 copy 2.png"),
] as const;

const TRA_DINH_NGOC_IMAGES = [
  productLineImageSrc("tra-dinh-ngoc", "DSC_3112 copy 2.png"),
  productLineImageSrc("tra-dinh-ngoc", "DSC_3137 copy 2.png"),
] as const;

const HONG_TRA_IMAGES = [
  productLineImageSrc("hong-tra", "DSC_3117 copy 2.png"),
  productLineImageSrc("hong-tra", "DSC_3134 copy 2.png"),
] as const;

const TRA_O_LONG_IMAGES = [
  productLineImageSrc("tra-o-long", "DSC_3126 copy 2.png"),
  productLineImageSrc("tra-o-long", "DSC_3132 copy 2.png"),
] as const;

export const TEA_PRODUCT_LINES: ProductLine[] = [
  {
    slug: "bach-tra-shan-tuyet",
    name: "Bạch trà shan tuyết",
    description:
      "Bạch trà tuyển từ búp shan tuyết vùng cao — hương thanh nhẹ, vị ngọt dịu, ít chất đắng.",
    detail:
      "Bạch trà shan tuyết Nam Dương được chế biến tối giản để giữ trọn vẹn hương vị tự nhiên của búp trà vùng cao. Sắc nước trong, hương thảo mộc nhẹ và vị hậu ngọt dài — phù hợp thưởng thức nguyên chất hoặc phục vụ quán trà cao cấp.",
    href: "/dong-tra/bach-tra-shan-tuyet",
    image: BACH_TRA_SHAN_TUYET_IMAGES[0],
    gallery: [...BACH_TRA_SHAN_TUYET_IMAGES],
    hasDetailPage: true,
  },
  {
    slug: "tra-dinh-ngoc",
    name: "Trà đinh ngọc",
    description:
      "Búp non một tôm một lá, sắc xanh ngọc — đặc trưng vùng trà Nam Dương.",
    detail:
      "Trà đinh ngọc là dòng trà xanh tuyển chọn từ búp non nhất, một tôm một lá. Hương thơm tươi mát, vị thanh ngọt cân bằng — lý tưởng cho pha trà truyền thống và chuỗi F&B cần hồ sơ hương vị ổn định theo mùa.",
    href: "/dong-tra/tra-dinh-ngoc",
    image: TRA_DINH_NGOC_IMAGES[0],
    gallery: [...TRA_DINH_NGOC_IMAGES],
    hasDetailPage: true,
  },
  {
    slug: "hong-tra",
    name: "Hồng trà",
    description:
      "Hồng trà lên men vừa — hương mật ong, vị đậm đà cho pha trà và pha chế.",
    detail:
      "Hồng trà Nam Dương được lên men và sấy khô theo quy trình kiểm soát, cho sắc nước hổ phách ấm và hương ngọt tự nhiên. Phù hợp pha nóng, pha lạnh và ứng dụng đồ uống F&B cần vị trà rõ, ổn định.",
    href: "/dong-tra/hong-tra",
    image: HONG_TRA_IMAGES[0],
    gallery: [...HONG_TRA_IMAGES],
    hasDetailPage: true,
  },
  {
    slug: "tra-o-long",
    name: "Trà ô long",
    description:
      "Ô long bán lên men — hương hoa quả nhẹ, thích hợp quán trà và đại lý cao cấp.",
    detail:
      "Trà ô long Nam Dương nằm giữa trà xanh và trà đen: hương thơm đa tầng, vị ngọt thanh, hậu vị kéo dài. Dòng sản phẩm được các quán trà và nhà phân phối ưa chuộng nhờ profile hương vị nhất quán.",
    href: "/dong-tra/tra-o-long",
    image: TRA_O_LONG_IMAGES[0],
    gallery: [...TRA_O_LONG_IMAGES],
    hasDetailPage: true,
  },
];

export const TRA_QUAN_PRODUCT_LINE: ProductLine = {
  slug: "nam-duong-tra-quan",
  name: "Nam Dương trà quán",
  description:
    "Bộ quà biếu thất phẩm gỗ chạm khắc — trà tuyển chọn, trình bày sang trọng.",
  detail:
    "Nam Dương trà quán là bộ sưu tập quà biếu cao cấp gồm năm thất phẩm gỗ chạm khắc, mỗi thất phẩm kể một câu chuyện riêng về trà và nghệ thủ công đóng gói.",
  href: "/nam-duong-tra-quan",
  image: "/images/products/tet-gift-sets/nam-moc-tra-quan-hero.JPG",
  gallery: ["/images/products/tet-gift-sets/nam-moc-tra-quan-hero.JPG"],
  hasDetailPage: false,
};

/** Thứ tự hiển thị trên trang chủ và menu */
export const PRODUCT_LINES: ProductLine[] = [
  ...TEA_PRODUCT_LINES,
  TRA_QUAN_PRODUCT_LINE,
];

export function getProductLineBySlug(slug: string): ProductLine | undefined {
  return TEA_PRODUCT_LINES.find((p) => p.slug === slug);
}

/** Map catalog / Payload slugs to static image folders in public/images. */
export function canonicalTeaLineSlug(slug: string): string | null {
  if (slug === "tra-dinh-ngoc" || slug === "tra-xanh-dinh-ngoc") {
    return "tra-dinh-ngoc";
  }
  if (slug === "bach-tra-shan-tuyet" || slug === "tra-xanh-shan-tuyet") {
    return "bach-tra-shan-tuyet";
  }
  if (slug === "hong-tra" || slug === "hong-tra-len-men-vua") {
    return "hong-tra";
  }
  if (slug === "tra-o-long" || slug.startsWith("o-long-")) {
    return "tra-o-long";
  }
  return null;
}

export function getCuratedTeaImages(
  slug: string,
): { primary: string; gallery: string[] } | null {
  const canonical = canonicalTeaLineSlug(slug);
  if (!canonical) return null;
  const line = getProductLineBySlug(canonical);
  if (!line) return null;
  return { primary: line.image, gallery: [...line.gallery] };
}

/** @deprecated Dùng PRODUCT_LINES */
export const PRODUCT_CATEGORIES = PRODUCT_LINES.map((line) => ({
  name: line.name,
  slug: line.slug,
  href: line.href,
  image: line.image,
  description: line.description,
}));
