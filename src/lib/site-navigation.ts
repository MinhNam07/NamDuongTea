export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Về Nam Dương",
    children: [
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Từ đồi chè đến tách trà", href: "/gioi-thieu#nguyen-lieu" },
    ],
  },
  {
    label: "Sản phẩm",
    children: [
      { label: "Tất cả sản phẩm", href: "/san-pham" },
      { label: "Nam Dương trà quán", href: "/nam-duong-tra-quan" },
      { label: "Trà xanh", href: "/san-pham?category=tra-xanh" },
      { label: "Trà đen", href: "/san-pham?category=tra-den" },
      { label: "Trà ô-long", href: "/san-pham?category=tra-o-long" },
    ],
  },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Đại lý", href: "/dang-ky-dai-ly" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const FOOTER_QUICK_LINKS: NavChild[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Đăng ký đại lý", href: "/dang-ky-dai-ly" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const FOOTER_PRODUCT_LINKS: NavChild[] = [
  { label: "Trà xanh", href: "/san-pham?category=tra-xanh" },
  { label: "Trà đen", href: "/san-pham?category=tra-den" },
  { label: "Trà ô-long", href: "/san-pham?category=tra-o-long" },
];

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/",
  zalo: "https://zalo.me/",
  messenger: "https://m.me/",
  youtube: "https://youtube.com/",
} as const;

export const SUPPORT_CHAT_URL = SOCIAL_LINKS.zalo;

export const PRODUCT_CATEGORIES = [
  {
    name: "Trà xanh",
    slug: "tra-xanh",
    href: "/san-pham?category=tra-xanh",
    image: "/images/story-farm.webp",
    description: "Búp tươi, hương thanh mát từ vùng trà Nam Dương.",
  },
  {
    name: "Trà đen",
    slug: "tra-den",
    href: "/san-pham?category=tra-den",
    image: "/images/hero.JPG",
    description: "Đậm vị, ổn định cho pha trà và pha chế F&B.",
  },
  {
    name: "Trà ô-long",
    slug: "tra-o-long",
    href: "/san-pham?category=tra-o-long",
    image: "/images/story-farm.webp",
    description: "Hương hoa quả nhẹ, phù hợp quán trà cao cấp.",
  },
  {
    name: "Nguyên liệu B2B",
    slug: "nguyen-lieu",
    href: "/san-pham",
    image: "/images/hero.JPG",
    description: "Cung ứng số lượng lớn cho đại lý và xuất khẩu.",
  },
] as const;
