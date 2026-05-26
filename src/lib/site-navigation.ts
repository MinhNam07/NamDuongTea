import { PRODUCT_LINES } from "@/lib/product-lines";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const PRODUCT_NAV_CHILDREN: NavChild[] = [
  { label: "Tất cả sản phẩm", href: "/san-pham" },
  ...PRODUCT_LINES.map((line) => ({
    label: line.name,
    href: line.href,
  })),
];

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
    children: PRODUCT_NAV_CHILDREN,
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

export const FOOTER_PRODUCT_LINKS: NavChild[] = PRODUCT_LINES.map((line) => ({
  label: line.name,
  href: line.href,
}));

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/",
  zalo: "https://zalo.me/",
  messenger: "https://m.me/",
  youtube: "https://youtube.com/",
} as const;

export const SUPPORT_CHAT_URL = SOCIAL_LINKS.zalo;

export { PRODUCT_LINES as PRODUCT_CATEGORIES } from "@/lib/product-lines";
