import type { Metadata } from "next";

import { TetGiftB2bCatalogue } from "@/components/marketing/tet-gift/tet-gift-b2b-catalogue";
import { TetGiftBrandStrip } from "@/components/marketing/tet-gift/tet-gift-brand-strip";
import { TetGiftHeroBanner } from "@/components/marketing/tet-gift/tet-gift-hero-banner";
import { TetGiftPremiumCard } from "@/components/marketing/tet-gift/tet-gift-premium-card";
import { buildMetadata } from "@/lib/seo";
import {
  TET_GIFT_SETS,
  TRA_QUAN_COLLECTION_NAME,
} from "@/lib/tet-gift-sets";

export const metadata: Metadata = buildMetadata({
  title: `${TRA_QUAN_COLLECTION_NAME} — Quà biếu cao cấp`,
  description: `Bộ sưu tập ${TRA_QUAN_COLLECTION_NAME} Nam Dương Tea: thất phẩm gỗ chạm khắc, trà tuyển chọn — quà biếu sang trọng cho doanh nghiệp và đại lý.`,
  path: "/nam-duong-tra-quan",
});

export default function NamDuongTraQuanPage() {
  return (
    <>
      <TetGiftHeroBanner />

      <section
        id="bo-suu-tap"
        className="scroll-mt-24 bg-tea-ivory py-16 md:py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tea-olive">
              Bộ sưu tập
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-deep-brown md:text-4xl">
              Năm thất phẩm {TRA_QUAN_COLLECTION_NAME}
            </h2>
            <p className="mt-4 text-tea-muted">
              Thất phẩm gỗ chạm khắc — mỗi thất phẩm là một câu chuyện quà
              biếu riêng, trình bày trung thực, tinh tế, tôn vinh bao bì và
              nghệ thủ công đóng gói.
            </p>
          </header>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {TET_GIFT_SETS.map((product) => (
              <TetGiftPremiumCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TetGiftBrandStrip />

      <TetGiftB2bCatalogue />
    </>
  );
}
