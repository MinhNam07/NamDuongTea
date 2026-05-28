import { WEBSITE_DATA } from "@/lib/website-data";

/** Navbar scroll thresholds (hysteresis) */
export const NAV_COLLAPSE_AT = WEBSITE_DATA.brand.header.scrollThresholdPx;
export const NAV_EXPAND_AT = WEBSITE_DATA.brand.header.scrollThresholdPx;

/** Padding-top cho trang không có hero */
export const NAV_MAIN_OFFSET = WEBSITE_DATA.brand.header.layoutOffsetClass;

/** Hero block min-height (document flow, không animate khi scroll) */
export const HERO_MIN_HEIGHT_CLASS = WEBSITE_DATA.brand.header.heroMinHeightClass;
