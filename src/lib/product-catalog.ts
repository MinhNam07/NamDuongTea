import "server-only";

import type { ProductCardProduct } from "@/components/product-card";
import { getPayloadClient } from "@/lib/payload";
import {
  getWhitelistSlugsForTab,
  normalizeProductTab,
  prepareCatalogProducts,
  type ProductTab,
} from "@/lib/product-tab-config";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import { loadTraQuanProducts } from "@/lib/tra-quan-products";

export type { HomeCatalogTabKey } from "@/lib/home-catalog-tabs";
export { HOME_CATALOG_TABS } from "@/lib/home-catalog-tabs";

export type CatalogProduct = ProductCardProduct & {
  moq?: string | null;
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

function productImageUrl(image: ProductCardProduct["image"]): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.sizes?.card?.url ?? image.url ?? null;
}

function productImageAlt(
  image: ProductCardProduct["image"],
  fallback: string,
): string {
  if (!image || typeof image === "string") return fallback;
  return image.alt ?? fallback;
}

export function toPublicProductPreview(product: CatalogProduct): PublicProductPreview {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription ?? null,
    origin: product.origin ?? null,
    moq: product.moq ?? null,
    image: productImageUrl(product.image),
    imageAlt: productImageAlt(product.image, product.name),
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
  if (tab === "nam-duong-tra-quan") {
    const traQuan = await loadTraQuanProducts();
    const items: CatalogProduct[] = traQuan.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.tagline,
      origin: null,
      moq: null,
      image: p.imageUrl,
      category: { name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" },
    }));
    return options?.limit ? items.slice(0, options.limit) : items;
  }

  let products: CatalogProduct[] = [];

  try {
    const payload = await getPayloadClient();
    const slugs = getWhitelistSlugsForTab(tab);
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [{ status: { equals: "published" } }, { slug: { in: slugs } }],
      },
      depth: 1,
      limit: 50,
    });

    const candidates = docs as unknown as (ProductCardProduct & { moq?: string | null })[];
    products = prepareCatalogProducts(candidates, tab) as CatalogProduct[];
  } catch {
    products = [];
  }

  if (options?.limit) {
    return products.slice(0, options.limit);
  }
  return products;
}

export async function loadCatalogProductsByCategorySlug(
  categorySlug: string,
  options?: { limit?: number },
): Promise<CatalogProduct[]> {
  const tab = categorySlugToProductTab(categorySlug);
  if (!tab) return [];
  return loadCatalogProducts(tab, options);
}
