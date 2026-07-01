import { bachTraShanTuyet } from "./bach-tra-shan-tuyet";
import { DEFAULT_DETAIL_TABS } from "./detail-tabs-default";
import { hongTra } from "./hong-tra";
import { traDinhNgoc } from "./tra-dinh-ngoc";
import { traOLong } from "./tra-o-long";
import { traQuanProductLine } from "./tra-quan-line";
import {
  productLineHref,
  productLineImageSrc,
  type ProductDetailTabContent,
  type ProductLineContent,
} from "./types";

export {
  productLineHref,
  productLineImageSrc,
  type ProductDetailTabContent,
  type ProductLineContent,
  type ProductThemeTokens,
  type CatalogTabKey,
} from "./types";

export { DEFAULT_DETAIL_TABS };

export const TEA_PRODUCT_LINES: ProductLineContent[] = [
  bachTraShanTuyet,
  traDinhNgoc,
  hongTra,
  traOLong,
];

export const TRA_QUAN_PRODUCT_LINE = traQuanProductLine;

export const PRODUCT_LINES: ProductLineContent[] = [
  ...TEA_PRODUCT_LINES,
  TRA_QUAN_PRODUCT_LINE,
];

const BY_SLUG = new Map(PRODUCT_LINES.map((line) => [line.slug, line]));

export function getProductLineContentBySlug(
  slug: string,
): ProductLineContent | undefined {
  const canonical = canonicalTeaLineSlug(slug);
  if (canonical) return BY_SLUG.get(canonical);
  return BY_SLUG.get(slug);
}

export function isProductLineSlug(slug: string): boolean {
  return Boolean(getProductLineContentBySlug(slug));
}

export function getCuratedTeaImages(
  slug: string,
): { primary: string; gallery: string[] } | null {
  const line = getProductLineContentBySlug(slug);
  if (!line || !line.hasDetailPage) return null;
  return { primary: line.images.hero, gallery: [...line.images.gallery] };
}

export function getProductDetailTabsForSlug(slug: string): ProductDetailTabContent[] {
  const line = getProductLineContentBySlug(slug);
  if (line?.detailTabs.length) return line.detailTabs;
  return DEFAULT_DETAIL_TABS;
}

/** Map catalog / legacy slugs to canonical product line slug. */
export function canonicalTeaLineSlug(slug: string): string | null {
  if (slug === "tra-dinh-ngoc" || slug === "tra-xanh-dinh-ngoc") {
    return "tra-dinh-ngoc";
  }
  if (slug === "bach-tra-shan-tuyet" || slug === "tra-xanh-shan-tuyet") {
    return "bach-tra-shan-tuyet";
  }
  if (slug === "hong-tra" || slug === "hong-tra-len-men-vua") {
    return "hong-tra";
  }
  if (slug === "tra-o-long" || slug.startsWith("o-long-")) {
    return "tra-o-long";
  }
  return null;
}

export function canonicalDetailTabsSlug(slug: string): string {
  const canonical = canonicalTeaLineSlug(slug);
  return canonical ?? slug;
}

/** Legacy-compatible ProductLine shape for gradual migration */
export type ProductLine = {
  slug: string;
  name: string;
  description: string;
  detail: string;
  href: string;
  image: string;
  gallery: string[];
  hasDetailPage: boolean;
};

export function toProductLine(line: ProductLineContent): ProductLine {
  return {
    slug: line.slug,
    name: line.name,
    description: line.description,
    detail: line.detail,
    href: productLineHref(line.slug),
    image: line.images.hero,
    gallery: [...line.images.gallery],
    hasDetailPage: line.hasDetailPage,
  };
}

export const PRODUCT_LINES_LEGACY: ProductLine[] = PRODUCT_LINES.map(toProductLine);

export function getProductLineBySlug(slug: string): ProductLine | undefined {
  const line = getProductLineContentBySlug(slug);
  return line ? toProductLine(line) : undefined;
}

export const PRODUCT_CATEGORIES = PRODUCT_LINES_LEGACY.map((line) => ({
  name: line.name,
  slug: line.slug,
  href: line.href,
  image: line.image,
  description: line.description,
}));
