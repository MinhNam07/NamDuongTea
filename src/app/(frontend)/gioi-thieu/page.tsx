import type { Metadata } from "next";

import { AboutAlternatingBlock } from "@/components/about/about-alternating-block";
import { AboutCtaStrip } from "@/components/about/about-cta-strip";
import { AboutPageHero } from "@/components/about/about-page-hero";
import { AboutValueCards } from "@/components/about/about-value-cards";
import { COMPANY_INTRO_PAGE } from "@/lib/about-pages-content";
import { buildMetadata } from "@/lib/seo";

const content = COMPANY_INTRO_PAGE;

export const metadata: Metadata = buildMetadata({
  title: "Giới thiệu — Công ty Trà Nam Dương",
  description:
    "Giới thiệu về Công ty Trà Nam Dương — tinh hoa trà Việt, phục vụ đại lý, nhà phân phối và xuất khẩu với chứng nhận HACCP, ISO 22000.",
  path: "/gioi-thieu",
});

export default function GioiThieuPage() {
  return (
    <div className="bg-tea-cream">
      <AboutPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        image={content.hero.image}
        stats={[...content.stats]}
      />
      <AboutValueCards items={[...content.values]} />
      <AboutAlternatingBlock {...content.story} />
      <AboutCtaStrip {...content.cta} />
    </div>
  );
}
