import { MapPin } from "lucide-react";

import type { AboutRegion } from "@/lib/about-pages-content";

type AboutRegionGridProps = {
  regions: AboutRegion[];
};

export function AboutRegionGrid({ regions }: AboutRegionGridProps) {
  return (
    <section className="bg-[#f6fcec] py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tea-olive">
            Vùng nguyên liệu
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-deep-brown md:text-4xl">
            Đồi chè & nông trường hợp tác
          </h2>
          <p className="mt-4 text-tea-muted">
            Hợp tác trực tiếp với nông hộ tại các vùng trồng trọng điểm — kiểm soát
            nguồn búp tươi từ thu hoạch đến vận chuyển về nhà máy.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {regions.map((region) => (
            <article
              key={region.id}
              className="rounded-2xl border border-tea-moss/15 bg-white p-8 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tea-green-50 text-tea-green">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-tea-dark-green">
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
