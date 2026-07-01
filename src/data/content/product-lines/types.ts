export type ProductDetailTabKey = "huong-vi" | "quy-trinh" | "pha-tra";

export type ProductDetailTabBullet = {
  icon:
    | "local_florist"
    | "water_drop"
    | "spa"
    | "auto_awesome"
    | "eco"
    | "schedule";
  title: string;
  text: string;
};

export type ProductDetailTabContent = {
  key: ProductDetailTabKey;
  label: string;
  heading: string;
  paragraphs: string[];
  bullets: ProductDetailTabBullet[];
  image: { src: string; alt: string };
};

export type ProductThemeTokens = {
  id: string;
  cssVars: Record<string, string>;
  heroOverlay: string;
  heroGradient: string;
  accentClass: string;
  surfaceClass: string;
  heroTextClass: string;
};

export type CatalogTabKey =
  | "che-xanh"
  | "che-den"
  | "tra-uong-cao-cap"
  | "nam-duong-tra-quan";

export type ProductLineContent = {
  slug: string;
  name: string;
  description: string;
  detail: string;
  imageFolder: string;
  images: { hero: string; gallery: string[] };
  theme: ProductThemeTokens;
  detailTabs: ProductDetailTabContent[];
  catalogTab: Exclude<CatalogTabKey, "nam-duong-tra-quan" | "tra-uong-cao-cap">;
  hasDetailPage: boolean;
};

export function productLineHref(slug: string) {
  return `/san-pham/${slug}`;
}

export function productLineImageSrc(folder: string, filename: string) {
  return `/images/${folder}/${encodeURIComponent(filename)}`;
}
