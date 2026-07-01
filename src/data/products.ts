import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import { CACHE_TAGS, productTag } from "@/data/cache";
import {
  getCatalogProductsForTab,
  getProductBySlug as fetchProductBySlug,
} from "@/data/queries/catalog";
import type { StorefrontProduct } from "@/data/types";
import type { ProductTab } from "@/lib/product-tab-config";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import { loadTraQuanProducts } from "@/lib/tra-quan-products";

const TRA_QUAN_SEED_IS_FEATURED = new Set(["nam-moc-tra-quan"]);

async function fetchProductsForTab(
  tab: ProductTab,
  limit?: number,
): Promise<StorefrontProduct[]> {
  return getCatalogProductsForTab(tab, { limit });
}

async function fetchFeaturedProducts(limit = 6): Promise<StorefrontProduct[]> {
  const traQuan = await loadTraQuanProducts();
  const featured = traQuan.filter((p) =>
    TRA_QUAN_SEED_IS_FEATURED.has(p.slug),
  );

  return featured.slice(0, limit).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    shortDescription: p.tagline,
    priceVnd: p.priceVnd,
    image: p.imageUrl ? { url: p.imageUrl, alt: p.name } : null,
    gallery: [],
    category: { name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" },
    categories: [{ name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" }],
    isFeatured: true,
    giftTeas: p.teas,
    giftHighlights: p.giftHighlights,
    gallerySlidesReversed: p.gallerySlidesReversed,
    detailTabs: [],
    specs: [],
  }));
}

export const getProducts = cache(async function getProducts(
  tab: ProductTab,
  options?: { limit?: number },
): Promise<StorefrontProduct[]> {
  const cached = unstable_cache(
    () => fetchProductsForTab(tab, options?.limit),
    ["products", tab, String(options?.limit ?? "all")],
    { tags: [CACHE_TAGS.products], revalidate: 3600 },
  );
  return cached();
});

export const getProductBySlug = cache(async function getProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  const cached = unstable_cache(
    () => fetchProductBySlug(slug),
    ["product", slug],
    { tags: [CACHE_TAGS.products, productTag(slug)], revalidate: 3600 },
  );
  return cached();
});

export const getFeaturedProducts = cache(async function getFeaturedProducts(
  limit = 6,
): Promise<StorefrontProduct[]> {
  const cached = unstable_cache(
    () => fetchFeaturedProducts(limit),
    ["products", "featured", String(limit)],
    { tags: [CACHE_TAGS.products], revalidate: 3600 },
  );
  return cached();
});
