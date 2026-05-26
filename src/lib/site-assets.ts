/** Brand static assets */
export const BRAND_LOGO_SRC = "/images/logo.png";

/** Hero Nam Dương trà quán — từ IMG_6442.CR2 */
export const TRA_QUAN_HERO_BG_SRC = "/images/IMG_6548.JPG";

export const TEA_HILL_HEADER_SRC = "/images/tea-hill-header.JPG";
export const TEA_HILL_FOOTER_SRC = "/images/tea-hill-footer.JPG";

export function teaHillBgSrc(variant: "header" | "footer") {
  return variant === "header" ? TEA_HILL_HEADER_SRC : TEA_HILL_FOOTER_SRC;
}
