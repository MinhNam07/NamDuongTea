import type { ProductThemeTokens } from "../product-lines/types";

/** Trà đinh ngọc — xanh ngọc */
export const jadeTheme: ProductThemeTokens = {
  id: "jade",
  cssVars: {
    "--line-primary": "#1A4D3E",
    "--line-surface": "#F2FAF6",
    "--line-accent": "#6BB89A",
    "--line-on-primary": "#ffffff",
    "--line-muted": "#3D6B5A",
    "--line-hero-tint": "rgba(26, 77, 62, 0.82)",
  },
  heroOverlay: "bg-[#1A4D3E]/80",
  heroGradient:
    "bg-gradient-to-t from-[#0F2E25] via-[#1A4D3E]/75 to-[#6BB89A]/30",
  accentClass: "text-[#9DD4BC]",
  surfaceClass: "bg-[#F2FAF6]",
  heroTextClass: "text-white",
};
