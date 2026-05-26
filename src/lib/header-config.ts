/** Navbar scroll thresholds (hysteresis) */
export const NAV_COLLAPSE_AT = 100;
export const NAV_EXPAND_AT = 40;

/** Fixed navbar heights — chỉ transition giữa hai giá trị này */
export const NAV_HEIGHT_EXPANDED = "h-32"; /* 128px */
export const NAV_HEIGHT_COLLAPSED = "h-24"; /* 96px */

/** Padding-top cho trang không có hero (khớp NAV_HEIGHT_EXPANDED) */
export const NAV_MAIN_OFFSET = "pt-32";

/** Hero block min-height (document flow, không animate khi scroll) */
export const HERO_MIN_HEIGHT_CLASS = "min-h-[560px] md:min-h-[720px]";
