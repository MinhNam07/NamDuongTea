import { PRODUCT_LINES } from "@/lib/product-lines";
import { WEBSITE_DATA } from "@/lib/website-data";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const ABOUT_NAV_CHILDREN: NavChild[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Tìm hiểu về vùng trồng", href: "/tim-hieu-vung-trong" },
];

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
    children: ABOUT_NAV_CHILDREN,
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
  facebook: WEBSITE_DATA.navigation.social.facebook,
  zalo: WEBSITE_DATA.navigation.social.zalo,
  messenger: WEBSITE_DATA.navigation.social.messenger,
  youtube: WEBSITE_DATA.navigation.social.youtube,
} as const;

export const SUPPORT_CHAT_URL = WEBSITE_DATA.navigation.social.supportChatUrl;

export { PRODUCT_LINES as PRODUCT_CATEGORIES } from "@/lib/product-lines";
