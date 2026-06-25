import { getPosts } from "@/data/posts";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { NewsEventsSection } from "@/components/home/news-events-section";
import { AlternatingStorySection } from "@/components/home/alternating-story-section";
import { CraftTimelineSection } from "@/components/home/craft-timeline-section";
import { PartnerFormSection } from "@/components/home/partner-form-section";
import { ProductCollectionTilesSection } from "@/components/home/product-collection-tiles-section";
import type { NewsCardPost } from "@/components/marketing/news-card";

export const revalidate = 300;

export default async function HomePage() {
  const postsData = await getPosts({ limit: 8 });
  const posts: NewsCardPost[] = postsData.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    publishedAt: doc.publishedAt,
  }));

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
