import dynamic from "next/dynamic";

import { getPosts } from "@/data/posts";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { NewsEventsSection } from "@/components/home/news-events-section";
import { AlternatingStorySection } from "@/components/home/alternating-story-section";
import { CraftTimelineSection } from "@/components/home/craft-timeline-section";
import { ProductCollectionTilesSection } from "@/components/home/product-collection-tiles-section";
import { HOME_CATALOG_TABS } from "@/lib/home-catalog-tabs";
import {
  loadCatalogProducts,
  toPublicProductPreview,
} from "@/lib/product-catalog";
import type { NewsCardPost } from "@/components/marketing/news-card";

const PartnerFormSection = dynamic(
  () =>
    import("@/components/home/partner-form-section").then((m) => ({
      default: m.PartnerFormSection,
    })),
  { loading: () => null },
);

export const revalidate = 300;

export default async function HomePage() {
  const [postsData, ...tabProducts] = await Promise.all([
    getPosts({ limit: 8 }),
    ...HOME_CATALOG_TABS.map((tab) =>
      loadCatalogProducts(tab.category, { limit: 3 }),
    ),
  ]);

  const posts: NewsCardPost[] = postsData.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    publishedAt: doc.publishedAt,
  }));

  const initialProductsByTab = Object.fromEntries(
    HOME_CATALOG_TABS.map((tab, index) => [
      tab.category,
      tabProducts[index]!.map(toPublicProductPreview),
    ]),
  );

  return (
    <div data-home>
      <HomeHeroSection />
      <AlternatingStorySection />
      <CraftTimelineSection />
      <ProductCollectionTilesSection
        initialProductsByTab={initialProductsByTab}
      />
      <NewsEventsSection posts={posts} />
      <PartnerFormSection />
    </div>
  );
}
