import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import { CACHE_TAGS, productLineTag } from "@/data/cache";
import {
  legacyGetProductLineBySlug,
  legacyGetProductLines,
} from "@/data/legacy-fallback";
import { mapSeo, mediaToImage } from "@/data/mappers";
import { getPayloadClient } from "@/data/payload";
import { getContentSource } from "@/data/types";
import type { StorefrontProductLine } from "@/data/types";

function mapProductLine(doc: Record<string, unknown>): StorefrontProductLine {
  const title = String(doc.title ?? "");
  const slug = String(doc.slug ?? "");
  const heroImage = doc.heroImage;
  const cardImage = doc.cardImage;
  const gallery = Array.isArray(doc.gallery) ? doc.gallery : [];

  return {
    slug,
    title,
    shortDescription: (doc.shortDescription as string) ?? null,
    description: doc.description,
    href:
      typeof doc.href === "string" && doc.href.trim()
        ? doc.href
        : `/dong-tra/${slug}`,
    hasDetailPage: doc.hasDetailPage !== false,
    order: typeof doc.order === "number" ? doc.order : 0,
    active: doc.active !== false,
    heroImageUrl:
      heroImage && typeof heroImage === "object"
        ? mediaToImage(heroImage as Parameters<typeof mediaToImage>[0], title)?.url ??
          null
        : (doc.legacyImagePath as string) ?? null,
    cardImageUrl:
      cardImage && typeof cardImage === "object"
        ? mediaToImage(cardImage as Parameters<typeof mediaToImage>[0], title)?.url ??
          null
        : (doc.legacyImagePath as string) ?? null,
    gallery: gallery
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const img = (item as { image?: unknown }).image;
        if (img && typeof img === "object") {
          return mediaToImage(img as Parameters<typeof mediaToImage>[0], title)?.url;
        }
        return null;
      })
      .filter((url): url is string => Boolean(url)),
    legacyImagePath: (doc.legacyImagePath as string) ?? null,
    seo: mapSeo(doc.seo as Parameters<typeof mapSeo>[0]),
  };
}

async function fetchProductLines(): Promise<StorefrontProductLine[]> {
  if (getContentSource() === "legacy") {
    return legacyGetProductLines();
  }

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "product-lines",
      where: {
        and: [
          { active: { equals: true } },
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
        ],
      },
      depth: 2,
      limit: 20,
      sort: "order",
    });

    if (docs.length === 0) {
      return legacyGetProductLines();
    }

    return docs.map((doc) =>
      mapProductLine(doc as unknown as Record<string, unknown>),
    );
  } catch {
    return legacyGetProductLines();
  }
}

async function fetchProductLineBySlug(
  slug: string,
): Promise<StorefrontProductLine | null> {
  if (getContentSource() === "legacy") {
    return legacyGetProductLineBySlug(slug);
  }

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "product-lines",
      where: {
        and: [
          { slug: { equals: slug } },
          { active: { equals: true } },
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
        ],
      },
      depth: 2,
      limit: 1,
    });
    const doc = docs[0];
    if (!doc) return legacyGetProductLineBySlug(slug);
    return mapProductLine(doc as unknown as Record<string, unknown>);
  } catch {
    return legacyGetProductLineBySlug(slug);
  }
}

export const getProductLines = cache(async function getProductLines(): Promise<
  StorefrontProductLine[]
> {
  const cached = unstable_cache(
    () => fetchProductLines(),
    ["product-lines"],
    { tags: [CACHE_TAGS.productLines], revalidate: 300 },
  );
  return cached();
});

export const getProductLineBySlug = cache(async function getProductLineBySlug(
  slug: string,
): Promise<StorefrontProductLine | null> {
  const cached = unstable_cache(
    () => fetchProductLineBySlug(slug),
    ["product-line", slug],
    {
      tags: [CACHE_TAGS.productLines, productLineTag(slug)],
      revalidate: 300,
    },
  );
  return cached();
});
