/** Brand static assets */
export const BRAND_LOGO_SRC = "/images/logo.png";

/** Hero Nam Dương trà quán */
export const TRA_QUAN_HERO_BG_SRC = "/images/IMG_6548.JPG";

/** Hero “Giới thiệu Nam Dương Tea” */
export const GIOI_THIEU_HERO_BG_SRC = "/images/IMG_6570.JPG";

/** Nền “Nghệ Thuật Chế Tác” (home) */
export const CRAFT_TIMELINE_BG_SRC = "/images/IMG_6478.JPG";

export const TEA_HILL_HEADER_SRC = "/images/tea-hill-header.JPG";
export const TEA_HILL_FOOTER_SRC = "/images/tea-hill-footer.JPG";

export function teaHillBgSrc(variant: "header" | "footer") {
  return variant === "header" ? TEA_HILL_HEADER_SRC : TEA_HILL_FOOTER_SRC;
}
