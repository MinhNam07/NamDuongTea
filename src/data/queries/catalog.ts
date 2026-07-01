import "server-only";

import {
  PRODUCT_LINES,
  TEA_PRODUCT_LINES,
  getProductLineContentBySlug,
} from "@/data/content/product-lines";
import { WEBSITE_DATA } from "@/data/content/site";
import { prepareCatalogProducts, type ProductTab } from "@/lib/product-tab-config";
import { loadTraQuanProducts } from "@/lib/tra-quan-products";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import {
  toStorefrontProduct,
  traQuanToStorefrontProduct,
} from "@/data/mappers/to-storefront";

import type {
  SiteSettingsData,
  StorefrontCategory,
  StorefrontPost,
  StorefrontProduct,
} from "@/data/types";

/** Static seed data for catalog tabs. */
export function staticTeaProductsForTab(
  tab: ProductTab,
  options?: { limit?: number },
): StorefrontProduct[] {
  if (tab === "nam-duong-tra-quan") return [];

  const candidates = TEA_PRODUCT_LINES.map((line) => ({
    id: line.slug,
    name: line.name,
    slug: line.slug,
    shortDescription: line.description,
    image: line.images.hero,
    category: null,
  }));

  const prepared = prepareCatalogProducts(
    candidates as Parameters<typeof prepareCatalogProducts>[0],
    tab as Exclude<ProductTab, "nam-duong-tra-quan">,
  );

  const bySlug = new Map(
    TEA_PRODUCT_LINES.map((line) => [line.slug, toStorefrontProduct(line)]),
  );

  const items = prepared
    .map((p) => bySlug.get(p.slug))
    .filter((p): p is StorefrontProduct => Boolean(p));

  return options?.limit ? items.slice(0, options.limit) : items;
}

export async function getCatalogProductsForTab(
  tab: ProductTab,
  options?: { limit?: number },
): Promise<StorefrontProduct[]> {
  if (tab === "nam-duong-tra-quan") {
    const traQuan = await loadTraQuanProducts();
    const items = traQuan.map(traQuanToStorefrontProduct);
    return options?.limit ? items.slice(0, options.limit) : items;
  }

  return staticTeaProductsForTab(tab, options);
}

export async function getProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  const traQuan = await loadTraQuanProducts();
  const tq = traQuan.find((p) => p.slug === slug);
  if (tq) {
    return traQuanToStorefrontProduct(tq);
  }

  const line = getProductLineContentBySlug(slug);
  if (line?.hasDetailPage) {
    return toStorefrontProduct(line);
  }

  return null;
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const nav = WEBSITE_DATA.navigation;
  return {
    siteName: WEBSITE_DATA.site.name,
    defaultTitle: WEBSITE_DATA.site.defaultTitle,
    defaultDescription: WEBSITE_DATA.site.defaultDescription,
    footerTagline: WEBSITE_DATA.brand.footerTagline,
    contact: nav.footer.contact,
    social: nav.social,
    primaryNav: nav.primary.map((item) => ({
      label: item.label,
      href: "href" in item ? item.href : null,
      children: "children" in item ? item.children : undefined,
    })),
    footerQuickLinks: nav.footer.quickLinks,
    footerProductLinks: nav.footer.productLinks,
  };
}

export async function getPosts(_options?: {
  limit?: number;
}): Promise<StorefrontPost[]> {
  return [];
}

export async function getPostBySlug(
  slug: string,
): Promise<StorefrontPost | null> {
  const posts = await getPosts({ limit: 100 });
  return posts.find((p) => p.slug === slug) ?? null;
}

const STATIC_CATEGORIES: StorefrontCategory[] = [
  {
    id: "che-xanh",
    name: "Chè xanh",
    slug: "che-xanh",
    description: null,
    order: 1,
    active: true,
  },
  {
    id: "che-den",
    name: "Chè đen",
    slug: "che-den",
    description: null,
    order: 2,
    active: true,
  },
  {
    id: "nam-duong-tra-quan",
    name: TRA_QUAN_COLLECTION_NAME,
    slug: "nam-duong-tra-quan",
    description: null,
    order: 3,
    active: true,
  },
];

export async function getCategories(): Promise<StorefrontCategory[]> {
  return STATIC_CATEGORIES;
}
