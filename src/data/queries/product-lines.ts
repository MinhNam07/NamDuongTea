import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import {
  PRODUCT_LINES,
  getProductLineContentBySlug,
} from "@/data/content/product-lines";
import { CACHE_TAGS, productLineTag } from "@/data/cache";
import {
  toStorefrontProductLine,
} from "@/data/mappers/to-storefront";
import type { StorefrontProductLine } from "@/data/types";

async function fetchProductLines(): Promise<StorefrontProductLine[]> {
  return PRODUCT_LINES.map((line, index) => toStorefrontProductLine(line, index));
}

async function fetchProductLineBySlug(
  slug: string,
): Promise<StorefrontProductLine | null> {
  const line = getProductLineContentBySlug(slug);
  if (!line || !line.hasDetailPage) return null;
  return toStorefrontProductLine(line, 0);
}

export const getProductLines = cache(async function getProductLines(): Promise<
  StorefrontProductLine[]
> {
  const cached = unstable_cache(
    () => fetchProductLines(),
    ["product-lines"],
    { tags: [CACHE_TAGS.productLines], revalidate: 3600 },
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
      revalidate: 3600,
    },
  );
  return cached();
});
