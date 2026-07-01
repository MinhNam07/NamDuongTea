import "server-only";

import { unstable_cache } from "next/cache";

import { CACHE_TAGS } from "@/data/cache";
import type { TraQuanProduct } from "@/lib/tra-quan";
import { traQuanStaticImageSrc } from "@/lib/tra-quan";
import { TRA_QUAN_SEED_PRODUCTS } from "@/data/content/tra-quan";

function mapSeedProduct(
  seed: (typeof TRA_QUAN_SEED_PRODUCTS)[number],
): TraQuanProduct {
  const reversed = Boolean(seed.gallerySlidesReversed);
  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    tagline: seed.tagline,
    teas: seed.teas,
    priceVnd: seed.priceVnd,
    giftHighlights: seed.giftHighlights,
    gallerySlidesReversed: reversed,
    imageUrl: traQuanStaticImageSrc(seed.slug, reversed ? "-2" : ""),
  };
}

async function fetchTraQuanProducts(): Promise<TraQuanProduct[]> {
  return TRA_QUAN_SEED_PRODUCTS.map(mapSeedProduct);
}

export const loadTraQuanProducts = unstable_cache(
  fetchTraQuanProducts,
  ["tra-quan-products"],
  {
    tags: [CACHE_TAGS.traQuan, CACHE_TAGS.products],
    revalidate: 3600,
  },
);

export async function loadTraQuanProductBySlug(
  slug: string,
): Promise<TraQuanProduct | null> {
  const products = await loadTraQuanProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
