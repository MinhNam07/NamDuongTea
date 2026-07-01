import websiteData from "../../../data/website-data.json";

import { CATEGORY_LANDINGS } from "./catalog-tabs";
import { PRODUCT_LINES_LEGACY, productLineHref } from "./product-lines";

export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const SITE = websiteData.site;
export const BRAND = websiteData.brand;
export const PAGES = websiteData.pages;

export const ABOUT_NAV_CHILDREN: NavChild[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Tìm hiểu về vùng trồng", href: "/tim-hieu-vung-trong" },
];

export const PRODUCT_DROPDOWN_ITEMS: NavChild[] = [
  { label: "Tất cả sản phẩm", href: "/san-pham" },
  ...CATEGORY_LANDINGS.map((c) => ({ label: c.title, href: c.path })),
  { label: "Nam Dương trà quán", href: "/nam-duong-tra-quan" },
];

export const FOOTER_PRODUCT_LINKS: NavChild[] = [
  ...CATEGORY_LANDINGS.map((c) => ({ label: c.title, href: c.path })),
  ...PRODUCT_LINES_LEGACY.filter((l) => l.hasDetailPage).map((l) => ({
    label: l.name,
    href: productLineHref(l.slug),
  })),
];

export const FOOTER_QUICK_LINKS: NavChild[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Đăng ký đại lý", href: "/dang-ky-dai-ly" },
  { label: "Liên hệ", href: "/lien-he" },
];

const PRODUCT_NAV_CHILDREN: NavChild[] = [
  ...PRODUCT_DROPDOWN_ITEMS,
  ...PRODUCT_LINES_LEGACY.filter((l) => l.hasDetailPage).map((l) => ({
    label: l.name,
    href: productLineHref(l.slug),
  })),
];

export const PRIMARY_NAV: NavItem[] = [
  { label: "Về Nam Dương", children: ABOUT_NAV_CHILDREN },
  { label: "Sản phẩm", children: PRODUCT_NAV_CHILDREN },
  { label: "Đại lý", href: "/dang-ky-dai-ly" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const SOCIAL_LINKS = websiteData.navigation.social;

export const SUPPORT_CHAT_URL = websiteData.navigation.social.supportChatUrl;

/** Full site payload for data loaders */
export const WEBSITE_DATA = websiteData;
