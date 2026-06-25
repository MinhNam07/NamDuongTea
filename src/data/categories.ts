import "server-only";

import { unstable_cache } from "next/cache";

import { CACHE_TAGS } from "@/data/cache";
import { legacyGetCategories } from "@/data/legacy-fallback";
import { mediaToImage } from "@/data/mappers";
import { getPayloadClient } from "@/data/payload";
import { getContentSource } from "@/data/types";
import type { StorefrontCategory } from "@/data/types";

async function fetchCategories(): Promise<StorefrontCategory[]> {
  if (getContentSource() === "legacy") {
    return legacyGetCategories();
  }

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "categories",
      where: { active: { not_equals: false } },
      depth: 1,
      limit: 50,
      sort: "order",
    });

    if (docs.length === 0) {
      return legacyGetCategories();
    }

    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
      description: doc.description ?? null,
      order: doc.order ?? 0,
      active: doc.active !== false,
      imageUrl:
        doc.image && typeof doc.image === "object"
          ? mediaToImage(doc.image, doc.name)?.url ?? null
          : null,
    }));
  } catch {
    return legacyGetCategories();
  }
}

export async function getCategories(): Promise<StorefrontCategory[]> {
  const cached = unstable_cache(
    () => fetchCategories(),
    ["categories"],
    { tags: [CACHE_TAGS.categories], revalidate: 300 },
  );
  return cached();
}
