import "server-only";

import { unstable_cache } from "next/cache";

import { CACHE_TAGS } from "@/data/cache";
import { getCategories as fetchCategories } from "@/data/queries/catalog";
import type { StorefrontCategory } from "@/data/types";

export async function getCategories(): Promise<StorefrontCategory[]> {
  const cached = unstable_cache(
    () => fetchCategories(),
    ["categories"],
    { tags: [CACHE_TAGS.categories], revalidate: 3600 },
  );
  return cached();
}
