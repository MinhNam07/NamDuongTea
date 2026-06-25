import type { Media, Product } from "@/payload-types";
import type { Where } from "payload";

import type { ProductImage, SeoFields } from "@/data/types";

export function mediaToImage(
  media: Media | number | null | undefined,
  fallbackAlt: string,
): ProductImage | null {
  if (!media || typeof media === "number") return null;
  if (!media.url) return null;
  return {
    url: media.sizes?.card?.url ?? media.url,
    alt: media.alt ?? fallbackAlt,
    width: media.width ?? null,
    height: media.height ?? null,
  };
}

export function mapSeo(seo: Product["seo"]): SeoFields | null {
  if (!seo) return null;
  const og =
    seo.ogImage && typeof seo.ogImage === "object" ? seo.ogImage.url : null;
  return {
    metaTitle: seo.metaTitle ?? null,
    metaDescription: seo.metaDescription ?? null,
    ogImageUrl: og ?? null,
    canonical: seo.canonical ?? null,
  };
}

export const publishedProductWhere: Where = {
  and: [
    { status: { equals: "published" } },
    { _status: { equals: "published" } },
  ],
};

export const publishedPostWhere: Where = {
  and: [
    { status: { equals: "published" } },
    { _status: { equals: "published" } },
  ],
};
