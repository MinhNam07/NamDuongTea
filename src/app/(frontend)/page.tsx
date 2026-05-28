import { HomeHeroSection } from "@/components/home/home-hero-section";
import { NewsEventsSection } from "@/components/home/news-events-section";
import { AlternatingStorySection } from "@/components/home/alternating-story-section";
import { CraftTimelineSection } from "@/components/home/craft-timeline-section";
import { PartnerFormSection } from "@/components/home/partner-form-section";
import { ProductCollectionTilesSection } from "@/components/home/product-collection-tiles-section";
import type { NewsCardPost } from "@/components/marketing/news-card";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 300;

export default async function HomePage() {
  let posts: NewsCardPost[] = [];

  try {
    const payload = await getPayloadClient();
    const postsResult = await payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 8,
      });
    posts = postsResult.docs.map((doc) => {
      const d = doc as {
        slug: string;
        title: string;
        excerpt?: string | null;
        publishedAt?: string | null;
      };
      return {
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt,
        publishedAt: d.publishedAt,
      };
    });
  } catch {
    posts = [];
  }

  return (
    <>
      <HomeHeroSection />
      <AlternatingStorySection />
      <CraftTimelineSection />
      <ProductCollectionTilesSection />
      <NewsEventsSection posts={posts} />
      <PartnerFormSection />
    </>
  );
}
