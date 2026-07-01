import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronRight, Leaf } from "lucide-react";

import type { ProductLineContent } from "@/data/content/product-lines";
import type { ProductDetailTabContent } from "@/data/content/product-lines/types";
import { ProductDetailStickyPanel } from "@/components/products/product-detail-sticky-panel";
import { ProductDetailMobileCtaBar } from "@/components/products/product-detail-mobile-cta-bar";
import { ProductDetailTabs } from "@/components/products/product-detail-tabs";
import { canonicalCategoryForProductSlug } from "@/lib/product-tab-config";
import { ProductHero } from "@/components/product/product-hero";
import { ProductIntro } from "@/components/product/product-intro";
import { ProductRfqCta } from "@/components/product/product-rfq-cta";
import { ProductThemeShell } from "@/components/product/product-theme-shell";

const ProductDetailGallery = dynamic(
  () =>
    import("@/components/products/product-detail-gallery").then((m) => ({
      default: m.ProductDetailGallery,
    })),
  {
    loading: () => (
      <div
        className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-muted"
        aria-hidden
      />
    ),
  },
);

type ThemedProductPageProps = {
  line: ProductLineContent;
  tabs: ProductDetailTabContent[];
  specs: { label: string; value: string }[];
};

export function ThemedProductPage({ line, tabs, specs }: ThemedProductPageProps) {
  const galleryImages = line.images.gallery.map((src, i) => ({
    src,
    alt: i === 0 ? line.name : `${line.name} — ảnh ${i + 1}`,
  }));

  return (
    <ProductThemeShell line={line}>
      <ProductHero line={line} />

      <ProductIntro line={line} />

      <section className="container mx-auto px-4 md:px-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex min-w-0 flex-wrap items-center gap-2 text-line-muted"
        >
          <Link href="/" className="shrink-0 text-xs font-medium hover:text-line-primary">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link
            href="/san-pham"
            className="shrink-0 text-xs font-medium hover:text-line-primary"
          >
            Sản phẩm
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="min-w-0 truncate text-xs font-semibold text-line-primary">
            {line.name}
          </span>
        </nav>

        <section className="mb-20 grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            {galleryImages.length > 0 ? (
              <ProductDetailGallery images={galleryImages} />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-muted text-muted-foreground/60">
                <Leaf className="h-16 w-16" />
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <ProductDetailStickyPanel
              badge={
                canonicalCategoryForProductSlug(line.slug)?.name ?? null
              }
              title={line.name}
              description={line.description}
              specs={specs}
              productSlug={line.slug}
              productName={line.name}
            />
          </div>
        </section>
      </section>

      <section className="container mx-auto px-4 pb-14 md:px-6">
        <ProductDetailTabs tabs={tabs} />
      </section>

      <ProductRfqCta line={line} />

      <ProductDetailMobileCtaBar
        productSlug={line.slug}
        productName={line.name}
      />
    </ProductThemeShell>
  );
}
