import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionEyebrowTitle } from "@/components/marketing/section-eyebrow-title";
import { TetGiftB2bCatalogue } from "@/components/marketing/tet-gift/tet-gift-b2b-catalogue";
import { TetGiftBrandStrip } from "@/components/marketing/tet-gift/tet-gift-brand-strip";
import { TetGiftHeroBanner } from "@/components/marketing/tet-gift/tet-gift-hero-banner";
import { TetGiftPremiumCard } from "@/components/marketing/tet-gift/tet-gift-premium-card";
import { buildMetadata } from "@/lib/seo";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import { loadTraQuanProducts } from "@/lib/tra-quan-products";

export const metadata: Metadata = buildMetadata({
  title: `${TRA_QUAN_COLLECTION_NAME} — Quà biếu cao cấp`,
  description: `Bộ sưu tập ${TRA_QUAN_COLLECTION_NAME} Nam Dương Tea: thất phẩm gỗ chạm khắc, trà tuyển chọn — quà biếu sang trọng cho doanh nghiệp và đại lý.`,
  path: "/nam-duong-tra-quan",
});

export default async function NamDuongTraQuanPage() {
  const products = await loadTraQuanProducts();
  if (products.length === 0) notFound();

  const featured =
    products.find((p) => p.slug === "nam-moc-tra-quan") ?? products[0]!;

  return (
    <>
      <TetGiftHeroBanner featured={featured} />

      <section
        id="bo-suu-tap"
        className="scroll-mt-24 bg-tea-ivory py-16 md:py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <header className="mx-auto max-w-4xl text-center">
            <SectionEyebrowTitle
              centered
              eyebrow="Bộ sưu tập"
              title={`Năm thất phẩm ${TRA_QUAN_COLLECTION_NAME}`}
              headingClassName="max-w-none text-[1.35rem] leading-snug sm:text-3xl md:text-4xl lg:text-[2.5rem]"
            />
            <p className="mt-5 text-tea-muted">
              Thất phẩm gỗ chạm khắc — mỗi thất phẩm là một câu chuyện quà
              biếu riêng, trình bày trung thực, tinh tế, tôn vinh bao bì và
              nghệ thủ công đóng gói.
            </p>
          </header>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <TetGiftPremiumCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TetGiftBrandStrip />

      <TetGiftB2bCatalogue products={products} />
    </>
  );
}
