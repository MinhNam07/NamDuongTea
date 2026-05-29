import "server-only";

import type { TraQuanProduct } from "@/lib/tra-quan";
import {
  TRA_QUAN_CATEGORY_SLUG,
  traQuanStaticImageSrc,
} from "@/lib/tra-quan";
import { getPayloadClient } from "@/lib/payload";

type PayloadTraQuanDoc = {
  id: string | number;
  name: string;
  slug: string;
  shortDescription?: string | null;
  priceVnd?: number | null;
  giftTeas?: { name: string; weight: string }[] | null;
  giftHighlights?: { text: string }[] | null;
  gallerySlidesReversed?: boolean | null;
  image?: { url?: string | null } | null;
};

function mapTraQuanProduct(doc: PayloadTraQuanDoc): TraQuanProduct {
  const reversed = Boolean(doc.gallerySlidesReversed);
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    tagline: doc.shortDescription ?? "",
    teas: doc.giftTeas ?? [],
    priceVnd: doc.priceVnd ?? null,
    giftHighlights: (doc.giftHighlights ?? []).map((h) => h.text),
    gallerySlidesReversed: reversed,
    imageUrl:
      doc.image?.url ??
      traQuanStaticImageSrc(
        doc.slug,
        reversed ? "-2" : "",
      ),
  };
}

async function findTraQuanCategoryId(): Promise<number | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    where: { slug: { equals: TRA_QUAN_CATEGORY_SLUG } },
    limit: 1,
  });
  const rawId = docs[0]?.id;
  if (rawId == null) return null;
  const id = typeof rawId === "number" ? rawId : Number.parseInt(String(rawId), 10);
  return Number.isFinite(id) ? id : null;
}

export async function loadTraQuanProducts(): Promise<TraQuanProduct[]> {
  const payload = await getPayloadClient();
  const categoryId = await findTraQuanCategoryId();
  if (categoryId == null) return [];

  const { docs } = await payload.find({
    collection: "products",
    where: {
      and: [
        { status: { equals: "published" } },
        { category: { equals: categoryId } },
      ],
    },
    depth: 1,
    limit: 50,
    sort: "name",
  });

  return (docs as unknown as PayloadTraQuanDoc[]).map(mapTraQuanProduct);
}

export async function loadTraQuanProductBySlug(
  slug: string,
): Promise<TraQuanProduct | null> {
  const payload = await getPayloadClient();
  const categoryId = await findTraQuanCategoryId();

  const { docs } = await payload.find({
    collection: "products",
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: "published" } },
        ...(categoryId != null ? [{ category: { equals: categoryId } }] : []),
      ],
    },
    depth: 1,
    limit: 1,
  });

  const doc = docs[0] as unknown as PayloadTraQuanDoc | undefined;
  return doc ? mapTraQuanProduct(doc) : null;
}

export async function isTraQuanProductSlug(slug: string): Promise<boolean> {
  const product = await loadTraQuanProductBySlug(slug);
  return product != null;
}
