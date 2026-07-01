import type { ProductThemeTokens } from "../product-lines/types";

export const defaultTheme: ProductThemeTokens = {
  id: "default",
  cssVars: {
    "--line-primary": "var(--nd-primary)",
    "--line-surface": "var(--cream-50)",
    "--line-accent": "var(--nd-tertiary-container)",
    "--line-on-primary": "#ffffff",
    "--line-muted": "var(--text-muted)",
  },
  heroOverlay: "bg-tea-dark-green/80",
  heroGradient:
    "bg-gradient-to-t from-tea-dark-green via-tea-dark-green/70 to-tea-dark-green/50",
  accentClass: "text-tea-yellow-green",
  surfaceClass: "bg-tea-cream",
  heroTextClass: "text-white",
};
