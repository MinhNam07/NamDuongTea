import { getProductLineBySlug } from "@/lib/product-lines";

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

export const ALL_TEA_PICK_ORDER = {
  dinhNgoc: ["tra-dinh-ngoc", "tra-xanh-dinh-ngoc"],
  shanTuyet: ["bach-tra-shan-tuyet", "tra-xanh-shan-tuyet"],
  oLong: ["tra-o-long", "o-long-ban-len-men", "o-long-rang-nhe"],
  hongTra: ["hong-tra", "hong-tra-len-men-vua"],
} as const;

export const PRODUCT_SLUG_WHITELIST: Record<
  Exclude<ProductTab, "nam-duong-tra-quan" | "tat-ca">,
  string[]
> = {
  "tra-uong-cao-cap": [
    // Mix of green/oolong/black teas in the premium drinking set.
    ...ALL_TEA_PICK_ORDER.dinhNgoc,
    ...ALL_TEA_PICK_ORDER.shanTuyet,
    ...ALL_TEA_PICK_ORDER.oLong,
    ...ALL_TEA_PICK_ORDER.hongTra,
  ],
  // Prefer canonical slugs, but keep compatibility with existing DB slugs.
  "che-xanh": [
    "tra-dinh-ngoc",
    "tra-xanh-dinh-ngoc",
    "bach-tra-shan-tuyet",
    "tra-xanh-shan-tuyet",
    "tra-o-long",
    "o-long-ban-len-men",
    "o-long-rang-nhe",
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

export function fallbackImageForProductSlug(slug: string): string | null {
  const canonical =
    slug === "tra-xanh-dinh-ngoc"
      ? "tra-dinh-ngoc"
      : slug === "tra-xanh-shan-tuyet"
        ? "bach-tra-shan-tuyet"
        : slug === "hong-tra-len-men-vua"
          ? "hong-tra"
          : slug.startsWith("o-long-")
            ? "tra-o-long"
            : slug;
  const line = getProductLineBySlug(canonical);
  return line?.image ?? null;
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

