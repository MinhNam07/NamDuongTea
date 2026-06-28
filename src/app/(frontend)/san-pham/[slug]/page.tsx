import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Leaf } from "lucide-react";

import { getProductBySlug } from "@/data/products";
import { TraQuanProductDetailView } from "@/components/products/tra-quan-product-detail-view";
import { ProductDetailStickyPanel } from "@/components/products/product-detail-sticky-panel";
import { ProductDetailMobileCtaBar } from "@/components/products/product-detail-mobile-cta-bar";
import { ProductDetailTabs } from "@/components/products/product-detail-tabs";
import {
  getProductDetailTabs,
  type ProductDetailTabContent,
} from "@/lib/product-detail-tabs";
import { getCuratedTeaImages } from "@/lib/product-lines";
import { canonicalCategoryForProductSlug } from "@/lib/product-tab-config";
import { buildMetadata } from "@/lib/seo";
import { TRA_QUAN_CATEGORY_SLUG, TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import type { StorefrontProduct } from "@/data/types";

export const revalidate = 300;

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

type Params = Promise<{ slug: string }>;

function resolveDetailTabs(
  slug: string,
  cmsTabs: StorefrontProduct["detailTabs"],
): ProductDetailTabContent[] {
  if (cmsTabs.length > 0) {
    return cmsTabs.map((tab) => ({
      key: tab.key,
      label: tab.label,
      heading: tab.heading ?? tab.label,
      paragraphs: tab.paragraphs,
      bullets: tab.bullets.map((bullet) => ({
        icon: "local_florist" as const,
        title: bullet.title,
        text: bullet.text,
      })),
      image: {
        src: tab.imageUrl ?? "/images/tea-hill-header.webp",
        alt: tab.imageAlt ?? tab.label,
      },
    }));
  }
  return getProductDetailTabs(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return buildMetadata({
      title: "Sản phẩm không tồn tại",
      path: `/san-pham/${slug}`,
    });
  }
  const title =
    product.seo?.metaTitle ||
    (product.category?.slug === TRA_QUAN_CATEGORY_SLUG
      ? `${product.name} · ${TRA_QUAN_COLLECTION_NAME}`
      : product.name);
  return buildMetadata({
    title,
    description: product.seo?.metaDescription || product.shortDescription || undefined,
    path: `/san-pham/${slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  if (product.category?.slug === TRA_QUAN_CATEGORY_SLUG) {
    return (
      <TraQuanProductDetailView
        product={{
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription,
          priceVnd: product.priceVnd,
          giftTeas: product.giftTeas,
          giftHighlights: product.giftHighlights?.map((text) => ({ text })),
          gallerySlidesReversed: product.gallerySlidesReversed,
        }}
      />
    );
  }

  const curated = getCuratedTeaImages(product.slug);
  const rawHeroUrl = product.image?.url ?? product.gallery[0]?.url ?? null;
  const heroUrl = curated?.primary ?? rawHeroUrl ?? product.legacyImagePath;
  const heroAlt = product.image?.alt ?? product.name;
  const tabs = resolveDetailTabs(product.slug, product.detailTabs);
  const galleryImages = curated
    ? curated.gallery.map((src, i) => ({
        src,
        alt: i === 0 ? heroAlt : `${product.name} — ảnh ${i + 1}`,
      }))
    : [
        ...(heroUrl ? [{ src: heroUrl, alt: heroAlt }] : []),
        ...product.gallery.map((img, i) => ({
          src: img.url,
          alt: img.alt ?? `${product.name} - ${i + 1}`,
        })),
      ].filter((item) => Boolean(item.src));

  const specs = [
    ...(product.origin ? [{ label: "Xuất xứ", value: product.origin }] : []),
    ...(product.moq ? [{ label: "MOQ", value: product.moq }] : []),
    ...product.specs,
  ];

  return (
    <div className="bg-background">
      <main className="flex-grow px-margin-mobile pb-28 md:px-margin-desktop md:pb-20 max-w-max-width mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex min-w-0 flex-wrap items-center gap-2 text-muted-foreground"
        >
          <Link href="/" className="shrink-0 text-xs font-medium hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link
            href="/san-pham"
            className="shrink-0 text-xs font-medium hover:text-foreground"
          >
            Sản phẩm
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="min-w-0 truncate text-xs font-semibold text-foreground">
            {product.name}
          </span>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-20">
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
                canonicalCategoryForProductSlug(product.slug)?.name ??
                product.category?.name ??
                null
              }
              title={product.name}
              description={product.shortDescription ?? null}
              specs={specs}
              productSlug={product.slug}
              productName={product.name}
            />
          </div>
        </section>

        <ProductDetailTabs tabs={tabs} />
      </main>

      <ProductDetailMobileCtaBar
        productSlug={product.slug}
        productName={product.name}
      />
    </div>
  );
}
