import "server-only";

import type { ProductCardProduct } from "@/components/product-card";
import { getProducts } from "@/data/products";
import type { StorefrontProduct } from "@/data/types";
import {
  normalizeProductTab,
  type ProductTab,
} from "@/lib/product-tab-config";

export type { HomeCatalogTabKey } from "@/lib/home-catalog-tabs";
export { HOME_CATALOG_TABS } from "@/lib/home-catalog-tabs";

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

/** Legacy Payload category slugs and query params → catalog tab. */
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
