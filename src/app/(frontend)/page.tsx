import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HeroStorySplit } from "@/components/home/hero-story-split";
import { NewsEventsSection } from "@/components/home/news-events-section";
import { ProductOverviewSection } from "@/components/home/product-overview-section";
import { PartnerCTA } from "@/components/marketing/partner-cta";
import type { NewsCardPost } from "@/components/marketing/news-card";
import type { ProductCardProduct } from "@/components/product-card";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 300;

export default async function HomePage() {
  let featured: ProductCardProduct[] = [];
  let posts: NewsCardPost[] = [];

  try {
    const payload = await getPayloadClient();
    const [productsResult, postsResult] = await Promise.all([
      payload.find({
        collection: "products",
        where: {
          and: [
            { status: { equals: "published" } },
            { isFeatured: { equals: true } },
          ],
        },
        depth: 1,
        limit: 6,
      }),
      payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 8,
      }),
    ]);
    featured = productsResult.docs as unknown as ProductCardProduct[];
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
    featured = [];
    posts = [];
  }

  return (
    <>
      <HomeHeroSection />
      <HeroStorySplit />
      <ProductOverviewSection featured={featured} />
      <NewsEventsSection posts={posts} />
      <PartnerCTA />
    </>
  );
}
