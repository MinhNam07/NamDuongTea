import type { Payload } from "payload";

import { websiteData } from "./inventory";
import type { MigrationReport } from "./report";
import { addEntry } from "./report";

export async function migrateGlobals(
  payload: Payload,
  report: MigrationReport,
  dryRun: boolean,
): Promise<void> {
  const siteSettingsData = {
    siteName: websiteData.site.name,
    defaultTitle: websiteData.site.defaultTitle,
    defaultDescription: websiteData.site.defaultDescription,
    footerTagline: websiteData.brand.footerTagline,
    contact: websiteData.navigation.footer.contact,
    social: websiteData.navigation.social,
    primaryNav: websiteData.navigation.primary.map((item) => ({
      label: item.label,
      href: "href" in item ? item.href : undefined,
      children:
        "children" in item && item.children
          ? item.children.map((child) => ({
              label: child.label,
              href: child.href,
            }))
          : undefined,
    })),
    footerQuickLinks: websiteData.navigation.footer.quickLinks,
    footerProductLinks: websiteData.navigation.footer.productLinks,
    _status: "published" as const,
  };

  const home = websiteData.pages.home;
  const homePageData = {
    hero: {
      eyebrow: home.hero.eyebrow,
      title: `${home.hero.title} ${home.hero.titleEmphasis}`.trim(),
      subtitle: home.hero.subtitle,
    },
    alternatingStories: (home.alternatingStories ?? []).map((story) => ({
      title: story.title,
      body: story.paragraphs?.join("\n\n") ?? "",
      ctaLabel: story.link?.label,
      ctaHref: story.link?.href,
    })),
    craftTimeline: (home.craftTimeline ?? []).map((step) => ({
      step: step.id,
      title: step.title,
      description: step.description,
    })),
    _status: "published" as const,
  };

  if (dryRun) {
    addEntry(report, {
      collection: "globals",
      key: "site-settings",
      status: "dry-run",
    });
    addEntry(report, {
      collection: "globals",
      key: "home-page",
      status: "dry-run",
    });
    return;
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: siteSettingsData,
  });
  addEntry(report, {
    collection: "globals",
    key: "site-settings",
    status: "imported",
  });

  await payload.updateGlobal({
    slug: "home-page",
    data: homePageData,
  });
  addEntry(report, {
    collection: "globals",
    key: "home-page",
    status: "imported",
  });
}
