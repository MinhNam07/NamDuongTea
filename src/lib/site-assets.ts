/** Brand static assets */
export const BRAND_LOGO_SRC = "/images/logo.png";

export const TEA_HILL_HEADER_SRC = "/images/tea-hill-header.JPG";
export const TEA_HILL_FOOTER_SRC = "/images/tea-hill-footer.JPG";

export function teaHillBgSrc(variant: "header" | "footer") {
  return variant === "header" ? TEA_HILL_HEADER_SRC : TEA_HILL_FOOTER_SRC;
}
