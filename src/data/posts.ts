import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import { CACHE_TAGS, postTag } from "@/data/cache";
import { getPostBySlug as fetchPostBySlug, getPosts as fetchPosts } from "@/data/queries/catalog";
import type { StorefrontPost } from "@/data/types";

export const getPosts = cache(async function getPosts(options?: {
  limit?: number;
}): Promise<StorefrontPost[]> {
  const limit = options?.limit ?? 20;
  const cached = unstable_cache(
    () => fetchPosts({ limit }),
    ["posts", String(limit)],
    { tags: [CACHE_TAGS.posts], revalidate: 3600 },
  );
  return cached();
});

export const getPostBySlug = cache(async function getPostBySlug(
  slug: string,
): Promise<StorefrontPost | null> {
  const cached = unstable_cache(
    () => fetchPostBySlug(slug),
    ["post", slug],
    { tags: [CACHE_TAGS.posts, postTag(slug)], revalidate: 3600 },
  );
  return cached();
});
