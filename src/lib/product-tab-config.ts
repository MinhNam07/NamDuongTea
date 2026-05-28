import type { ProductCardProduct } from "@/components/product-card";
import { getCuratedTeaImages } from "@/lib/product-lines";

export type ProductTab =
  | "tat-ca"
  | "tra-uong-cao-cap"
  | "che-xanh"
  | "che-den"
  | "nam-duong-tra-quan";

export const PRODUCT_TABS: { value: ProductTab; label: string; href: string }[] =
  [
    { value: "tat-ca", label: "Tất cả sản phẩm", href: "/san-pham" },
    {
      value: "che-xanh",
      label: "Chè xanh",
      href: "/san-pham?category=che-xanh",
    },
    { value: "che-den", label: "Chè đen", href: "/san-pham?category=che-den" },
    {
      value: "tra-uong-cao-cap",
      label: "Trà uống cao cấp",
      href: "/san-pham?category=tra-uong-cao-cap",
    },
    {
      value: "nam-duong-tra-quan",
      label: "Nam Dương trà quán",
      href: "/san-pham?category=nam-duong-tra-quan",
    },
  ];

/** Slugs treated as the single “Trà Ô Long” product (DB may use legacy variants). */
export const OOLONG_SLUGS = [
  "tra-o-long",
  "o-long-ban-len-men",
  "o-long-rang-nhe",
] as const;

export const ALL_TEA_PICK_ORDER = {
  dinhNgoc: ["tra-dinh-ngoc", "tra-xanh-dinh-ngoc"],
  shanTuyet: ["bach-tra-shan-tuyet", "tra-xanh-shan-tuyet"],
  oLong: [...OOLONG_SLUGS],
  hongTra: ["hong-tra", "hong-tra-len-men-vua"],
} as const;

export const PRODUCT_SLUG_WHITELIST: Record<
  Exclude<ProductTab, "nam-duong-tra-quan" | "tat-ca">,
  string[]
> = {
  "tra-uong-cao-cap": [
    // Premium drinking set: green + white + black + oolong.
    ...ALL_TEA_PICK_ORDER.dinhNgoc,
    ...ALL_TEA_PICK_ORDER.shanTuyet,
    ...ALL_TEA_PICK_ORDER.hongTra,
    // Backward-compatible oolong slugs: DB may still have older variants.
    "tra-o-long",
    "o-long-ban-len-men",
    "o-long-rang-nhe",
  ],
  // Prefer canonical slugs, but keep compatibility with existing DB slugs.
  "che-xanh": [
    "tra-dinh-ngoc",
    "tra-xanh-dinh-ngoc",
    "bach-tra-shan-tuyet",
    "tra-xanh-shan-tuyet",
    ...OOLONG_SLUGS,
  ],
  "che-den": ["hong-tra", "hong-tra-len-men-vua"],
};

export function normalizeProductTab(raw?: string): ProductTab {
  if (raw === "tat-ca") return "tat-ca";
  if (raw === "tra-uong-cao-cap") return "tra-uong-cao-cap";
  if (raw === "che-den") return "che-den";
  if (raw === "nam-duong-tra-quan") return "nam-duong-tra-quan";
  if (raw === "che-xanh") return "che-xanh";
  return "tat-ca";
}

export function tabLabel(tab: ProductTab) {
  return PRODUCT_TABS.find((t) => t.value === tab)?.label ?? tab;
}

export function isOolongSlug(slug: string) {
  return slug === "tra-o-long" || slug.startsWith("o-long-");
}

/** Slugs to query from Payload for a catalog tab. */
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

/** Keep one oolong card; prefer canonical slug `tra-o-long`. */
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

/** Curated rows for catalog tabs (one card per tea line). */
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
  // tat-ca + tra-uong-cao-cap: cùng bộ 4 dòng trà
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
    .map(applyCanonicalProductName);
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
    return "Hồng Trà";
  }
  if (slug === "tra-o-long" || slug.startsWith("o-long-")) {
    return "Trà Ô Long";
  }
  return null;
}

