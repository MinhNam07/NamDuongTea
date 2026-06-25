import "server-only";

import { unstable_cache } from "next/cache";

import { CACHE_TAGS } from "@/data/cache";
import { legacyGetHomePage } from "@/data/legacy-fallback";
import { mapSeo, mediaToImage } from "@/data/mappers";
import { getPayloadClient } from "@/data/payload";
import { getContentSource } from "@/data/types";
import type { HomePageData } from "@/data/types";

async function fetchHomePage(): Promise<HomePageData> {
  if (getContentSource() === "legacy") {
    return legacyGetHomePage();
  }

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    });

    if (!global) return legacyGetHomePage();

    const heroImage = global.hero?.image;

    return {
      hero: global.hero
        ? {
            eyebrow: global.hero.eyebrow ?? null,
            title: global.hero.title ?? null,
            subtitle: global.hero.subtitle ?? null,
            imageUrl:
              heroImage && typeof heroImage === "object"
                ? mediaToImage(heroImage, global.hero.title ?? "Hero")?.url ?? null
                : null,
            ctaLabel: global.hero.ctaLabel ?? null,
            ctaHref: global.hero.ctaHref ?? null,
          }
        : undefined,
      featuredProductLineSlugs: (global.featuredProductLines ?? [])
        .filter((line) => line && typeof line === "object")
        .map((line) => (line as { slug: string }).slug),
      featuredProductSlugs: (global.featuredProducts ?? [])
        .filter((p) => p && typeof p === "object")
        .map((p) => (p as { slug: string }).slug),
      alternatingStories: (global.alternatingStories ?? []).map((story) => ({
        title: story.title ?? null,
        body: story.body ?? null,
        imageUrl:
          story.image && typeof story.image === "object"
            ? mediaToImage(story.image, story.title ?? "Story")?.url ?? null
            : null,
        ctaLabel: story.ctaLabel ?? null,
        ctaHref: story.ctaHref ?? null,
      })),
      craftTimeline: global.craftTimeline ?? [],
      cta: global.cta ?? undefined,
      seo: mapSeo(global.seo),
    };
  } catch {
    return legacyGetHomePage();
  }
}

export async function getHomePage(): Promise<HomePageData> {
  const cached = unstable_cache(
    () => fetchHomePage(),
    ["home-page"],
    { tags: [CACHE_TAGS.homePage], revalidate: 300 },
  );
  return cached();
}
