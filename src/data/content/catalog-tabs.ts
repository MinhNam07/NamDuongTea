import type { CatalogTabKey } from "./product-lines/types";
import { TEA_PRODUCT_LINES } from "./product-lines";

export type ProductTab =
  | "tat-ca"
  | "tra-uong-cao-cap"
  | "che-xanh"
  | "che-den"
  | "nam-duong-tra-quan";

export type CategoryLanding = {
  slug: Exclude<ProductTab, "tat-ca" | "nam-duong-tra-quan">;
  title: string;
  description: string;
  path: string;
};

export const CATEGORY_LANDINGS: CategoryLanding[] = [
  {
    slug: "che-xanh",
    title: "Chè xanh",
    description:
      "Profile hương vị tươi mát, hậu vị thanh. Tuyển chọn phù hợp kênh đại lý và mô hình F&B cần chất lượng ổn định theo mùa.",
    path: "/san-pham/che-xanh",
  },
  {
    slug: "che-den",
    title: "Chè đen",
    description:
      "Hồng trà và trà lên men — hương ngọt ấm, vị đậm đà cho pha trà và pha chế đồ uống.",
    path: "/san-pham/che-den",
  },
  {
    slug: "tra-uong-cao-cap",
    title: "Trà uống cao cấp",
    description:
      "Bộ sưu tập trà uống cao cấp Nam Dương — đủ bốn dòng trà chủ lực cho đại lý và xuất khẩu.",
    path: "/san-pham/tra-uong-cao-cap",
  },
];

export const CATEGORY_SLUGS = new Set(
  CATEGORY_LANDINGS.map((c) => c.slug),
);

export function isCategorySlug(slug: string): slug is CategoryLanding["slug"] {
  return CATEGORY_SLUGS.has(slug as CategoryLanding["slug"]);
}

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

/** Client-safe tabs for home “Danh Mục Sản Phẩm”. */
export const HOME_CATALOG_TABS = [
  { key: "green" as const, label: "Chè xanh", category: "che-xanh" as const },
  { key: "black" as const, label: "Chè đen", category: "che-den" as const },
  {
    key: "tra-quan" as const,
    label: "Nam Dương trà quán",
    category: "nam-duong-tra-quan" as const,
  },
] as const;

export type HomeCatalogTabKey = (typeof HOME_CATALOG_TABS)[number]["key"];

export const OOLONG_SLUGS = [
  "tra-o-long",
  "o-long-ban-len-men",
  "o-long-rang-nhe",
] as const;

/** Legacy slug aliases per tea line */
export const LEGACY_SLUG_ALIASES: Record<string, readonly string[]> = {
  "tra-dinh-ngoc": ["tra-xanh-dinh-ngoc"],
  "bach-tra-shan-tuyet": ["tra-xanh-shan-tuyet"],
  "hong-tra": ["hong-tra-len-men-vua"],
  "tra-o-long": [...OOLONG_SLUGS],
};

export const ALL_TEA_PICK_ORDER = {
  dinhNgoc: ["tra-dinh-ngoc", "tra-xanh-dinh-ngoc"],
  shanTuyet: ["bach-tra-shan-tuyet", "tra-xanh-shan-tuyet"],
  oLong: [...OOLONG_SLUGS],
  hongTra: ["hong-tra", "hong-tra-len-men-vua"] as const,
} as const;

/** Derive whitelist from product line catalogTab metadata */
function slugsForCatalogTab(
  tab: Exclude<ProductTab, "nam-duong-tra-quan" | "tat-ca">,
): string[] {
  const fromLines = TEA_PRODUCT_LINES.filter((line) => {
    if (tab === "tra-uong-cao-cap") return true;
    if (tab === "che-den") return line.catalogTab === "che-den";
    return line.catalogTab === "che-xanh";
  }).flatMap((line) => [
    line.slug,
    ...(LEGACY_SLUG_ALIASES[line.slug] ?? []),
  ]);

  if (tab === "tra-uong-cao-cap") {
    return [...new Set(Object.values(ALL_TEA_PICK_ORDER).flat())];
  }

  return [...new Set(fromLines)];
}

export const PRODUCT_SLUG_WHITELIST: Record<
  Exclude<ProductTab, "nam-duong-tra-quan" | "tat-ca">,
  string[]
> = {
  "tra-uong-cao-cap": slugsForCatalogTab("tra-uong-cao-cap"),
  "che-xanh": slugsForCatalogTab("che-xanh"),
  "che-den": slugsForCatalogTab("che-den"),
};

export function getCategoryLanding(
  slug: string,
): CategoryLanding | undefined {
  return CATEGORY_LANDINGS.find((c) => c.slug === slug);
}

export function normalizeProductTab(raw?: string): ProductTab {
  if (raw === "tat-ca") return "tat-ca";
  if (raw === "tra-uong-cao-cap") return "tra-uong-cao-cap";
  if (raw === "che-den" || raw === "tra-den") return "che-den";
  if (raw === "nam-duong-tra-quan") return "nam-duong-tra-quan";
  if (raw === "che-xanh" || raw === "tra-xanh" || raw === "tra-o-long") {
    return "che-xanh";
  }
  return "tat-ca";
}

export function tabLabel(tab: ProductTab) {
  return PRODUCT_TABS.find((t) => t.value === tab)?.label ?? tab;
}

export function catalogTabForProductSlug(slug: string): CatalogTabKey | null {
  const line = TEA_PRODUCT_LINES.find(
    (l) =>
      l.slug === slug ||
      (LEGACY_SLUG_ALIASES[l.slug] ?? []).includes(slug),
  );
  return line?.catalogTab ?? null;
}
