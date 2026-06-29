import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import { CACHE_TAGS, productTag } from "@/data/cache";
import { getContentSource } from "@/data/types";
import {
  legacyGetProductBySlug,
  legacyGetProductsForTab,
  staticTeaProductsForTab,
} from "@/data/legacy-fallback";
import { mapSeo, mediaToImage } from "@/data/mappers";
import { getPayloadClient } from "@/data/payload";
import type { StorefrontProduct } from "@/data/types";
import {
  getWhitelistSlugsForTab,
  prepareCatalogProducts,
  type ProductTab,
} from "@/lib/product-tab-config";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import { loadTraQuanProducts } from "@/lib/tra-quan-products";

function mapPayloadProduct(doc: Record<string, unknown>): StorefrontProduct {
  const name = String(doc.name ?? "");
  const image = doc.image;
  const category = doc.category;
  const categories = Array.isArray(doc.categories) ? doc.categories : [];
  const productLine = doc.productLine;
  const gallery = Array.isArray(doc.gallery) ? doc.gallery : [];
  const detailTabs = Array.isArray(doc.detailTabs) ? doc.detailTabs : [];
  const specs = Array.isArray(doc.specs) ? doc.specs : [];

  return {
    id: doc.id as string | number,
    name,
    slug: String(doc.slug ?? ""),
    sku: (doc.sku as string) ?? null,
    shortDescription: (doc.shortDescription as string) ?? null,
    description: doc.description,
    origin: (doc.origin as string) ?? null,
    moq: (doc.moq as string) ?? null,
    priceVnd: (doc.priceVnd as number) ?? null,
    priceNote: (doc.priceNote as string) ?? null,
    packaging: (doc.packaging as string) ?? null,
    image:
      image && typeof image === "object"
        ? mediaToImage(image as Parameters<typeof mediaToImage>[0], name)
        : typeof doc.legacyImagePath === "string"
          ? { url: doc.legacyImagePath, alt: name }
          : null,
    gallery: gallery
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const img = (item as { image?: unknown }).image;
        return img && typeof img === "object"
          ? mediaToImage(img as Parameters<typeof mediaToImage>[0], name)
          : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null),
    category:
      category && typeof category === "object"
        ? {
            id: (category as { id?: string | number }).id,
            name: (category as { name?: string }).name ?? null,
            slug: (category as { slug?: string }).slug ?? null,
          }
        : null,
    categories: categories
      .filter((c) => c && typeof c === "object")
      .map((c) => ({
        id: (c as { id?: string | number }).id,
        name: (c as { name?: string }).name ?? null,
        slug: (c as { slug?: string }).slug ?? null,
      })),
    productLineSlug:
      productLine && typeof productLine === "object"
        ? ((productLine as { slug?: string }).slug ?? null)
        : null,
    isFeatured: Boolean(doc.isFeatured),
    giftTeas: Array.isArray(doc.giftTeas)
      ? (doc.giftTeas as { name: string; weight: string }[])
      : undefined,
    giftHighlights: Array.isArray(doc.giftHighlights)
      ? (doc.giftHighlights as { text: string }[]).map((h) => h.text)
      : undefined,
    gallerySlidesReversed: Boolean(doc.gallerySlidesReversed),
    detailTabs: detailTabs.map((tab) => {
      const t = tab as Record<string, unknown>;
      const paragraphs = Array.isArray(t.paragraphs)
        ? (t.paragraphs as { text: string }[]).map((p) => p.text)
        : [];
      const bullets = Array.isArray(t.bullets)
        ? (t.bullets as { title: string; text: string }[])
        : [];
      const tabImage = t.image;
      const imageUrl =
        tabImage && typeof tabImage === "object"
          ? ((tabImage as { url?: string }).url ?? null)
          : null;
      return {
        key: t.key as StorefrontProduct["detailTabs"][number]["key"],
        label: String(t.label ?? ""),
        heading: (t.heading as string) ?? null,
        paragraphs,
        bullets,
        imageUrl,
        imageAlt: name,
      };
    }),
    specs: specs.map((s) => {
      const spec = s as { label: string; value: string };
      return { label: spec.label, value: spec.value };
    }),
    seo: mapSeo(doc.seo as Parameters<typeof mapSeo>[0]),
    legacyImagePath: (doc.legacyImagePath as string) ?? null,
  };
}

async function fetchProductsForTab(
  tab: ProductTab,
  limit?: number,
): Promise<StorefrontProduct[]> {
  if (getContentSource() === "legacy") {
    return legacyGetProductsForTab(tab, { limit });
  }

  if (tab === "nam-duong-tra-quan") {
    const traQuan = await loadTraQuanProducts();
    const items: StorefrontProduct[] = traQuan.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.tagline,
      priceVnd: p.priceVnd,
      image: p.imageUrl ? { url: p.imageUrl, alt: p.name } : null,
      gallery: [],
      category: { name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" },
      categories: [{ name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" }],
      isFeatured: false,
      giftTeas: p.teas,
      giftHighlights: p.giftHighlights,
      gallerySlidesReversed: p.gallerySlidesReversed,
      detailTabs: [],
      specs: [],
    }));
    return limit ? items.slice(0, limit) : items;
  }

  try {
    const payload = await getPayloadClient();
    const slugs = getWhitelistSlugsForTab(tab);
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
          { slug: { in: slugs } },
        ],
      },
      depth: 2,
      limit: 50,
    });

    const prepared = prepareCatalogProducts(
      docs as Parameters<typeof prepareCatalogProducts>[0],
      tab,
    );

    const mapped = prepared.map((doc) =>
      mapPayloadProduct(doc as unknown as Record<string, unknown>),
    );
    const result = limit ? mapped.slice(0, limit) : mapped;
    return result.length > 0 ? result : staticTeaProductsForTab(tab, { limit });
  } catch {
    return legacyGetProductsForTab(tab, { limit });
  }
}

async function fetchProductBySlug(slug: string): Promise<StorefrontProduct | null> {
  if (getContentSource() === "legacy") {
    return legacyGetProductBySlug(slug);
  }

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
          { slug: { equals: slug } },
        ],
      },
      depth: 2,
      limit: 1,
    });
    const doc = docs[0];
    if (!doc) {
      return legacyGetProductBySlug(slug);
    }
    return mapPayloadProduct(doc as unknown as Record<string, unknown>);
  } catch {
    return legacyGetProductBySlug(slug);
  }
}

async function fetchFeaturedProducts(limit = 6): Promise<StorefrontProduct[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
          { isFeatured: { equals: true } },
        ],
      },
      depth: 2,
      limit,
      sort: "-updatedAt",
    });
    return docs.map((doc) =>
      mapPayloadProduct(doc as unknown as Record<string, unknown>),
    );
  } catch {
    return [];
  }
}

export const getProducts = cache(async function getProducts(
  tab: ProductTab,
  options?: { limit?: number },
): Promise<StorefrontProduct[]> {
  const cached = unstable_cache(
    () => fetchProductsForTab(tab, options?.limit),
    ["products", tab, String(options?.limit ?? "all")],
    { tags: [CACHE_TAGS.products], revalidate: 300 },
  );
  return cached();
});

export const getProductBySlug = cache(async function getProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  const cached = unstable_cache(
    () => fetchProductBySlug(slug),
    ["product", slug],
    { tags: [CACHE_TAGS.products, productTag(slug)], revalidate: 300 },
  );
  return cached();
});

export const getFeaturedProducts = cache(async function getFeaturedProducts(
  limit = 6,
): Promise<StorefrontProduct[]> {
  const cached = unstable_cache(
    () => fetchFeaturedProducts(limit),
    ["products", "featured", String(limit)],
    { tags: [CACHE_TAGS.products], revalidate: 300 },
  );
  return cached();
});
