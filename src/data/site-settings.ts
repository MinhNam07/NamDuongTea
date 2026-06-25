import "server-only";

import { unstable_cache } from "next/cache";

import { CACHE_TAGS } from "@/data/cache";
import { legacyGetSiteSettings } from "@/data/legacy-fallback";
import { mapSeo } from "@/data/mappers";
import { getPayloadClient } from "@/data/payload";
import { getContentSource } from "@/data/types";
import type { SiteSettingsData } from "@/data/types";

async function fetchSiteSettings(): Promise<SiteSettingsData> {
  if (getContentSource() === "legacy") {
    return legacyGetSiteSettings();
  }

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });

    if (!global) return legacyGetSiteSettings();

    return {
      siteName: global.siteName ?? null,
      defaultTitle: global.defaultTitle ?? null,
      defaultDescription: global.defaultDescription ?? null,
      footerTagline: global.footerTagline ?? null,
      contact: global.contact ?? undefined,
      social: global.social ?? undefined,
      announcement: global.announcement ?? null,
      primaryNav: (global.primaryNav ?? []).map((item) => ({
        label: item.label,
        href: item.href ?? null,
        children: item.children?.map((child) => ({
          label: child.label,
          href: child.href,
        })),
      })),
      footerQuickLinks: (global.footerQuickLinks ?? []).map((item) => ({
        label: item.label,
        href: item.href,
      })),
      footerProductLinks: (global.footerProductLinks ?? []).map((item) => ({
        label: item.label,
        href: item.href,
      })),
      seo: mapSeo(global.seo),
    };
  } catch {
    return legacyGetSiteSettings();
  }
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const cached = unstable_cache(
    () => fetchSiteSettings(),
    ["site-settings"],
    { tags: [CACHE_TAGS.siteSettings], revalidate: 300 },
  );
  return cached();
}
