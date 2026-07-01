import {
  getProductLineContentBySlug,
  type ProductLineContent,
  type ProductThemeTokens,
} from "@/data/content/product-lines";

export type { ProductThemeTokens };

export function resolveProductTheme(slug: string): ProductThemeTokens | null {
  const line = getProductLineContentBySlug(slug);
  return line?.theme ?? null;
}

export function getProductLineForPage(slug: string): ProductLineContent | null {
  return getProductLineContentBySlug(slug) ?? null;
}
