import type { ProductCardProduct } from "@/components/product-card";
import { getCuratedTeaImages } from "@/data/content/product-lines";

export type {
  CategoryLanding,
  HomeCatalogTabKey,
  ProductTab,
} from "@/data/content/catalog-tabs";

export {
  ALL_TEA_PICK_ORDER,
  CATEGORY_LANDINGS,
  CATEGORY_SLUGS,
  HOME_CATALOG_TABS,
  OOLONG_SLUGS,
  PRODUCT_SLUG_WHITELIST,
  PRODUCT_TABS,
  getCategoryLanding,
  isCategorySlug,
  normalizeProductTab,
  tabLabel,
  catalogTabForProductSlug,
} from "@/data/content/catalog-tabs";

import {
  ALL_TEA_PICK_ORDER,
  OOLONG_SLUGS,
  PRODUCT_SLUG_WHITELIST,
  type ProductTab,
} from "@/data/content/catalog-tabs";

export function isOolongSlug(slug: string) {
  return slug === "tra-o-long" || slug.startsWith("o-long-");
}

export function getWhitelistSlugsForTab(tab: ProductTab): string[] {
  if (tab === "nam-duong-tra-quan") return [];
  if (tab === "tat-ca") return [...PRODUCT_SLUG_WHITELIST["tra-uong-cao-cap"]];
  return [...PRODUCT_SLUG_WHITELIST[tab]];
}

export function withCatalogProductImage(p: ProductCardProduct): ProductCardProduct {
  const curated = getCuratedTeaImages(p.slug);
  if (curated) return { ...p, image: curated.primary };
  return p;
}

export function collapseOolongProducts(
  items: ProductCardProduct[],
): ProductCardProduct[] {
  const oolongs = items.filter((p) =>
    OOLONG_SLUGS.includes(p.slug as (typeof OOLONG_SLUGS)[number]),
  );
  if (oolongs.length <= 1) return items;
  const preferred =
    oolongs.find((p) => p.slug === "tra-o-long") ?? oolongs[0] ?? null;
  if (!preferred) return items;
  return items
    .filter(
      (p) => !OOLONG_SLUGS.includes(p.slug as (typeof OOLONG_SLUGS)[number]),
    )
    .concat([{ ...preferred, name: "Trà Ô Long" }]);
}

export function applyCanonicalProductName(p: ProductCardProduct): ProductCardProduct {
  const canonical = canonicalNameForProductSlug(p.slug);
  return canonical ? { ...p, name: canonical } : p;
}

export const GREEN_TEA_CATEGORY = {
  name: "Trà xanh",
  slug: "tra-xanh",
} as const;

export function canonicalCategoryForProductSlug(
  slug: string,
): { name: string; slug: string } | null {
  if (isOolongSlug(slug)) return GREEN_TEA_CATEGORY;
  return null;
}

export function applyCanonicalProductCategory(
  p: ProductCardProduct,
): ProductCardProduct {
  const category = canonicalCategoryForProductSlug(p.slug);
  return category ? { ...p, category } : p;
}

export function pickFirstProduct(
  candidates: ProductCardProduct[],
  preferredSlugs: readonly string[],
) {
  for (const slug of preferredSlugs) {
    const found = candidates.find((p) => p.slug === slug);
    if (found) return found;
  }
  return null;
}

export function pickCuratedCatalogProducts(
  candidates: ProductCardProduct[],
  tab: Exclude<ProductTab, "nam-duong-tra-quan">,
): ProductCardProduct[] {
  const dinhNgoc = pickFirstProduct(candidates, ALL_TEA_PICK_ORDER.dinhNgoc);
  const shanTuyet = pickFirstProduct(candidates, ALL_TEA_PICK_ORDER.shanTuyet);
  const oLong = pickFirstProduct(candidates, ALL_TEA_PICK_ORDER.oLong);
  const hongTra = pickFirstProduct(candidates, ALL_TEA_PICK_ORDER.hongTra);

  if (tab === "che-den") {
    return hongTra ? [hongTra] : [];
  }
  if (tab === "che-xanh") {
    return [dinhNgoc, shanTuyet, oLong].filter((p): p is ProductCardProduct =>
      Boolean(p),
    );
  }
  return [dinhNgoc, shanTuyet, oLong, hongTra].filter(
    (p): p is ProductCardProduct => Boolean(p),
  );
}

export function prepareCatalogProducts(
  candidates: ProductCardProduct[],
  tab: ProductTab,
): ProductCardProduct[] {
  if (tab === "nam-duong-tra-quan") return [];

  const rows = pickCuratedCatalogProducts(
    candidates,
    tab as Exclude<ProductTab, "nam-duong-tra-quan">,
  );

  return rows
    .map(withCatalogProductImage)
    .map(applyCanonicalProductName)
    .map(applyCanonicalProductCategory);
}

export function fallbackImageForProductSlug(slug: string): string | null {
  return getCuratedTeaImages(slug)?.primary ?? null;
}

export function canonicalNameForProductSlug(slug: string): string | null {
  if (slug === "tra-dinh-ngoc" || slug === "tra-xanh-dinh-ngoc") {
    return "Trà Đinh Ngọc";
  }
  if (slug === "bach-tra-shan-tuyet" || slug === "tra-xanh-shan-tuyet") {
    return "Bạch Trà Shan Tuyết";
  }
  if (slug === "hong-tra" || slug === "hong-tra-len-men-vua") {
    return "Hồng trà";
  }
  if (slug === "tra-o-long" || slug.startsWith("o-long-")) {
    return "Trà Ô Long";
  }
  return null;
}
