import type { Metadata } from "next";

import { AboutAlternatingBlock } from "@/components/about/about-alternating-block";
import { AboutCtaStrip } from "@/components/about/about-cta-strip";
import { AboutPageHero } from "@/components/about/about-page-hero";
import { AboutRegionGrid } from "@/components/about/about-region-grid";
import { GROWING_REGION_PAGE } from "@/lib/about-pages-content";
import { buildMetadata } from "@/lib/seo";

const content = GROWING_REGION_PAGE;

export const metadata: Metadata = buildMetadata({
  title: "Tìm hiểu về vùng trồng — Nam Dương Tea",
  description:
    "Giới thiệu cơ sở hạ tầng, nhà máy, vùng trồng và nguyên liệu của Công ty Trà Nam Dương — minh bạch chuỗi cung ứng cho đối tác B2B.",
  path: "/tim-hieu-vung-trong",
});

export default function TimHieuVungTrongPage() {
  return (
    <div className="bg-tea-cream">
      <AboutPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        image={content.hero.image}
      />
      <AboutRegionGrid regions={[...content.regions]} />
      <AboutAlternatingBlock {...content.factory} />
      <AboutAlternatingBlock {...content.quality} />
      <AboutCtaStrip {...content.cta} />
    </div>
  );
}
