import type { Metadata } from "next";

import { TetGiftB2bCatalogue } from "@/components/marketing/tet-gift/tet-gift-b2b-catalogue";
import { TetGiftHeroBanner } from "@/components/marketing/tet-gift/tet-gift-hero-banner";
import { TetGiftPremiumCard } from "@/components/marketing/tet-gift/tet-gift-premium-card";
import {
  SOCIAL_POST_VARIANTS,
  TetGiftSocialPost,
} from "@/components/marketing/tet-gift/tet-gift-social-post";
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

const SOCIAL_LABELS: Record<string, string> = {
  signature: "Concept 01 — Signature hero",
  collection: "Concept 02 — Full collection grid",
  craft: "Concept 03 — Craftsmanship & composition",
};

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

      <section className="border-t border-tea-gold/15 bg-tea-deep-brown py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tea-gold">
              Social media
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-ivory">
              Ba concept bài đăng
            </h2>
            <p className="mt-4 text-tea-ivory/70">
              Tỷ lệ 1:1 — xuất screenshot hoặc mở rộng component cho
              Facebook / Instagram / Zalo OA.
            </p>
          </header>

          <div className="mt-12 flex flex-wrap justify-center gap-10">
            {SOCIAL_POST_VARIANTS.map((variant) => (
              <div key={variant} className="flex flex-col items-center gap-3">
                <TetGiftSocialPost variant={variant} />
                <p className="text-center text-xs uppercase tracking-widest text-tea-ivory/50">
                  {SOCIAL_LABELS[variant]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TetGiftB2bCatalogue />
    </>
  );
}
