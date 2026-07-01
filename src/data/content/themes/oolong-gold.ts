import type { ProductThemeTokens } from "../product-lines/types";

/** Trà ô long — vàng hổ phách */
export const oolongGoldTheme: ProductThemeTokens = {
  id: "oolong-gold",
  cssVars: {
    "--line-primary": "#5C4A1F",
    "--line-surface": "#FBF6ED",
    "--line-accent": "#C9A84C",
    "--line-on-primary": "#ffffff",
    "--line-muted": "#6B5A32",
    "--line-hero-tint": "rgba(92, 74, 31, 0.82)",
  },
  heroOverlay: "bg-[#5C4A1F]/80",
  heroGradient:
    "bg-gradient-to-t from-[#3D3014] via-[#5C4A1F]/75 to-[#C9A84C]/30",
  accentClass: "text-[#E8D08A]",
  surfaceClass: "bg-[#FBF6ED]",
  heroTextClass: "text-white",
};
