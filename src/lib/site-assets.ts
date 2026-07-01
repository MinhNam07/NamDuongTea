/** Brand static assets */
export const BRAND_LOGO_SRC = "/images/logo.png";

/** Nền “Nghệ Thuật Chế Tác” (home) */
export const CRAFT_TIMELINE_BG_SRC = "/images/che-tac-nen.webp";

export const TEA_HILL_HEADER_SRC = "/images/tea-hill-header.webp";
export const TEA_HILL_FOOTER_SRC = "/images/tea-hill-footer.webp";

export function teaHillBgSrc(variant: "header" | "footer") {
  return variant === "header" ? TEA_HILL_HEADER_SRC : TEA_HILL_FOOTER_SRC;
}
