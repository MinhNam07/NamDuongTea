import type { ProductThemeTokens } from "../product-lines/types";

/** Bạch trà shan tuyết — trắng tuyết, bạc xanh */
export const snowWhiteTheme: ProductThemeTokens = {
  id: "snow-white",
  cssVars: {
    "--line-primary": "#4A6B7C",
    "--line-surface": "#FAFCFE",
    "--line-accent": "#A8C4D4",
    "--line-on-primary": "#1A2830",
    "--line-muted": "#5A6B75",
    "--line-hero-tint": "rgba(232, 238, 242, 0.85)",
  },
  heroOverlay: "bg-[#4A6B7C]/75",
  heroGradient:
    "bg-gradient-to-t from-[#2C3E47] via-[#4A6B7C]/70 to-[#A8C4D4]/40",
  accentClass: "text-[#A8C4D4]",
  surfaceClass: "bg-[#FAFCFE]",
  heroTextClass: "text-white",
};
