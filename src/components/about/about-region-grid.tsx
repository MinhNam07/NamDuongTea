import { MapPin } from "lucide-react";

import { SectionEyebrowTitle } from "@/components/marketing/section-eyebrow-title";
import type { AboutRegion } from "@/lib/about-pages-content";

type AboutRegionGridProps = {
  regions: AboutRegion[];
};

export function AboutRegionGrid({ regions }: AboutRegionGridProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionEyebrowTitle
          eyebrow="Vùng nguyên liệu"
          title="Đồi chè & nông trường hợp tác"
          centered
          tone="inverse"
          headingClassName="max-w-none"
        />

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-light leading-relaxed text-white/75 md:text-base">
          Hợp tác trực tiếp với nông hộ tại các vùng trồng trọng điểm, kiểm soát
          nguồn búp tươi từ thu hoạch đến vận chuyển về nhà máy.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {regions.map((region) => (
            <article
              key={region.id}
              className="rounded-[28px] border border-tea-moss/15 bg-white/85 p-8 shadow-[0_18px_48px_rgba(37,74,12,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,74,12,0.11)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tea-green-50 text-tea-green">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-tea-dark-green">
                {region.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-tea-muted md:text-base">
                {region.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}