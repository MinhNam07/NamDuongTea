import "server-only";

import { unstable_cache } from "next/cache";

import type { ProductCardProduct } from "@/components/product-card";
import { CACHE_TAGS } from "@/data/cache";
import { getProducts } from "@/data/products";
import type { StorefrontProduct } from "@/data/types";
import {
  normalizeProductTab,
  type ProductTab,
} from "@/lib/product-tab-config";

export type { HomeCatalogTabKey } from "@/data/content/catalog-tabs";
export { HOME_CATALOG_TABS } from "@/data/content/catalog-tabs";

import { HOME_CATALOG_TABS } from "@/data/content/catalog-tabs";

export type CatalogProduct = ProductCardProduct & {
  moq?: string | null;
  origin?: string | null;
};

export type PublicProductPreview = {
  id: string | number;
  name: string;
  slug: string;
  shortDescription?: string | null;
  origin?: string | null;
  moq?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  category?: { name?: string | null; slug?: string | null } | null;
};

/** Legacy category slugs and query params → catalog tab. */
export function categorySlugToProductTab(raw?: string | null): ProductTab | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  if (normalized === "tra-xanh" || normalized === "tra-o-long") {
    return "che-xanh";
  }
  if (normalized === "tra-den") return "che-den";
  return normalizeProductTab(normalized);
}

function storefrontToCatalogProduct(product: StorefrontProduct): CatalogProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription ?? null,
    origin: product.origin ?? null,
    moq: product.moq ?? null,
    image: product.image
      ? {
          url: product.image.url,
          alt: product.image.alt,
          sizes: { card: { url: product.image.url } },
        }
      : null,
    category: product.category ?? null,
  };
}

export function toPublicProductPreview(product: CatalogProduct): PublicProductPreview {
  const image =
    product.image && typeof product.image === "object"
      ? (product.image.sizes?.card?.url ?? product.image.url ?? null)
      : typeof product.image === "string"
        ? product.image
        : null;

  const imageAlt =
    product.image && typeof product.image === "object"
      ? (product.image.alt ?? product.name)
      : product.name;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription ?? null,
    origin: product.origin ?? null,
    moq: product.moq ?? null,
    image,
    imageAlt,
    category:
      product.category && typeof product.category === "object"
        ? {
            name: product.category.name ?? null,
            slug: product.category.slug ?? null,
          }
        : typeof product.category === "string"
          ? { name: product.category, slug: null }
          : null,
  };
}

/**
 * Curated catalog rows shared by /san-pham, category pages, and home API.
 */
export async function loadCatalogProducts(
  tab: ProductTab,
  options?: { limit?: number },
): Promise<CatalogProduct[]> {
  const products = await getProducts(tab, options);
  return products.map(storefrontToCatalogProduct);
}

export async function loadCatalogProductsByCategorySlug(
  categorySlug: string,
  options?: { limit?: number },
): Promise<CatalogProduct[]> {
  const tab = categorySlugToProductTab(categorySlug);
  if (!tab) return [];
  return loadCatalogProducts(tab, options);
}

const HOME_PREVIEW_LIMIT = 3;

/** Single cached fetch for all home catalog tabs. */
export async function getHomeCatalogPreviews(): Promise<
  Record<string, PublicProductPreview[]>
> {
  const cached = unstable_cache(
    async () => {
      const entries = await Promise.all(
        HOME_CATALOG_TABS.map(async (tab) => {
          const products = await loadCatalogProducts(tab.category, {
            limit: HOME_PREVIEW_LIMIT,
          });
          return [tab.category, products.map(toPublicProductPreview)] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<string, PublicProductPreview[]>;
    },
    ["home-catalog-previews"],
    { tags: [CACHE_TAGS.products], revalidate: 3600 },
  );
  return cached();
}
