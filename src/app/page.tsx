import dynamic from "next/dynamic";

import { HomeHeroSection } from "@/components/home/home-hero-section";
import { AlternatingStorySection } from "@/components/home/alternating-story-section";
import { CraftTimelineSection } from "@/components/home/craft-timeline-section";
import { ProductCollectionTilesSection } from "@/components/home/product-collection-tiles-section";
import { getHomeCatalogPreviews } from "@/lib/product-catalog";

const PartnerFormSection = dynamic(
  () =>
    import("@/components/home/partner-form-section").then((m) => ({
      default: m.PartnerFormSection,
    })),
  { loading: () => null },
);

export const revalidate = 3600;

export default async function HomePage() {
  const initialProductsByTab = await getHomeCatalogPreviews();

  return (
    <div data-home>
      <HomeHeroSection />
      <AlternatingStorySection />
      <CraftTimelineSection />
      <ProductCollectionTilesSection
        initialProductsByTab={initialProductsByTab}
      />
      <PartnerFormSection />
    </div>
  );
}
