import type { ProductThemeTokens } from "../product-lines/types";

/** Hồng trà — hồng ấm, hổ phách */
export const roseAmberTheme: ProductThemeTokens = {
  id: "rose-amber",
  cssVars: {
    "--line-primary": "#8B3A4A",
    "--line-surface": "#FFF5F3",
    "--line-accent": "#E8A598",
    "--line-on-primary": "#ffffff",
    "--line-muted": "#7A4A52",
    "--line-hero-tint": "rgba(139, 58, 74, 0.82)",
  },
  heroOverlay: "bg-[#8B3A4A]/80",
  heroGradient:
    "bg-gradient-to-t from-[#5C2430] via-[#8B3A4A]/75 to-[#E8A598]/35",
  accentClass: "text-[#F5C4B8]",
  surfaceClass: "bg-[#FFF5F3]",
  heroTextClass: "text-white",
};
