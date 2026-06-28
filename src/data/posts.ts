import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import { CACHE_TAGS, postTag } from "@/data/cache";
import { legacyGetPostBySlug, legacyGetPosts } from "@/data/legacy-fallback";
import { mapSeo, mediaToImage } from "@/data/mappers";
import { getPayloadClient } from "@/data/payload";
import { getContentSource } from "@/data/types";
import type { StorefrontPost } from "@/data/types";

function mapPost(doc: Record<string, unknown>): StorefrontPost {
  const title = String(doc.title ?? "");
  const coverImage = doc.coverImage;
  const tags = Array.isArray(doc.tags) ? doc.tags : [];

  return {
    id: doc.id as string | number,
    title,
    slug: String(doc.slug ?? ""),
    excerpt: (doc.excerpt as string) ?? null,
    body: doc.body,
    author: (doc.author as string) ?? null,
    publishedAt: (doc.publishedAt as string) ?? null,
    coverImageUrl:
      coverImage && typeof coverImage === "object"
        ? mediaToImage(coverImage as Parameters<typeof mediaToImage>[0], title)?.url ??
          null
        : null,
    coverImageAlt:
      coverImage && typeof coverImage === "object"
        ? ((coverImage as { alt?: string }).alt ?? title)
        : title,
    tags: tags.map((t) =>
      typeof t === "object" && t && "tag" in t
        ? String((t as { tag: string }).tag)
        : String(t),
    ),
    seo: mapSeo(doc.seo as Parameters<typeof mapSeo>[0]),
  };
}

async function fetchPosts(limit = 20): Promise<StorefrontPost[]> {
  if (getContentSource() === "legacy") {
    return legacyGetPosts({ limit });
  }

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: {
        and: [
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
        ],
      },
      sort: "-publishedAt",
      limit,
      depth: 1,
    });
    return docs.map((doc) =>
      mapPost(doc as unknown as Record<string, unknown>),
    );
  } catch {
    return legacyGetPosts({ limit });
  }
}

async function fetchPostBySlug(slug: string): Promise<StorefrontPost | null> {
  if (getContentSource() === "legacy") {
    return legacyGetPostBySlug(slug);
  }

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: {
        and: [
          { status: { equals: "published" } },
          { _status: { equals: "published" } },
          { slug: { equals: slug } },
        ],
      },
      depth: 1,
      limit: 1,
    });
    const doc = docs[0];
    if (!doc) return legacyGetPostBySlug(slug);
    return mapPost(doc as unknown as Record<string, unknown>);
  } catch {
    return legacyGetPostBySlug(slug);
  }
}

export const getPosts = cache(async function getPosts(options?: {
  limit?: number;
}): Promise<StorefrontPost[]> {
  const limit = options?.limit ?? 20;
  const cached = unstable_cache(
    () => fetchPosts(limit),
    ["posts", String(limit)],
    { tags: [CACHE_TAGS.posts], revalidate: 300 },
  );
  return cached();
});

export const getPostBySlug = cache(async function getPostBySlug(
  slug: string,
): Promise<StorefrontPost | null> {
  const cached = unstable_cache(
    () => fetchPostBySlug(slug),
    ["post", slug],
    { tags: [CACHE_TAGS.posts, postTag(slug)], revalidate: 300 },
  );
  return cached();
});
