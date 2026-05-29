import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Leaf } from "lucide-react";

import { TraQuanProductDetailView } from "@/components/products/tra-quan-product-detail-view";
import { ProductDetailGallery } from "@/components/products/product-detail-gallery";
import { ProductDetailStickyPanel } from "@/components/products/product-detail-sticky-panel";
import { ProductDetailTabs } from "@/components/products/product-detail-tabs";
import { getPayloadClient } from "@/lib/payload";
import { getProductDetailTabs } from "@/lib/product-detail-tabs";
import { getCuratedTeaImages } from "@/lib/product-lines";
import { canonicalCategoryForProductSlug } from "@/lib/product-tab-config";
import { buildMetadata } from "@/lib/seo";
import { TRA_QUAN_CATEGORY_SLUG, TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

async function loadProduct(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: "published" } },
        ],
      },
      depth: 2,
      limit: 1,
    });
    return docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) {
    return buildMetadata({
      title: "Sản phẩm không tồn tại",
      path: `/san-pham/${slug}`,
    });
  }
  const seo = (product as { seo?: { metaTitle?: string; metaDescription?: string } }).seo;
  const categorySlug = (product as { category?: { slug?: string } }).category?.slug;
  const title =
    seo?.metaTitle ||
    (categorySlug === TRA_QUAN_CATEGORY_SLUG
      ? `${product.name as string} · ${TRA_QUAN_COLLECTION_NAME}`
      : (product.name as string));
  return buildMetadata({
    title,
    description:
      seo?.metaDescription ||
      ((product as { shortDescription?: string }).shortDescription ?? undefined),
    path: `/san-pham/${slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const p = product as unknown as {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    origin?: string;
    moq?: string;
    priceVnd?: number | null;
    giftTeas?: { name: string; weight: string }[] | null;
    giftHighlights?: { text: string }[] | null;
    gallerySlidesReversed?: boolean | null;
    image?: { url?: string; alt?: string } | null;
    gallery?: { image?: { url?: string; alt?: string } }[];
    specs?: { label: string; value: string }[];
    category?: { name?: string; slug?: string } | null;
  };

  if (p.category?.slug === TRA_QUAN_CATEGORY_SLUG) {
    return <TraQuanProductDetailView product={p} />;
  }

  const curated = getCuratedTeaImages(p.slug);
  const rawHeroUrl = p.image?.url ?? p.gallery?.[0]?.image?.url ?? null;
  const heroUrl = curated?.primary ?? rawHeroUrl;
  const heroAlt = p.image?.alt ?? p.name;
  const tabs = getProductDetailTabs(p.slug);
  const galleryImages = curated
    ? curated.gallery.map((src, i) => ({
        src,
        alt: i === 0 ? heroAlt : `${p.name} — ảnh ${i + 1}`,
      }))
    : [
        ...(heroUrl ? [{ src: heroUrl, alt: heroAlt }] : []),
        ...(p.gallery ?? [])
          .map((g, i) => ({
            src: g.image?.url ?? "",
            alt: g.image?.alt ?? `${p.name} - ${i + 1}`,
          }))
          .filter((i) => Boolean(i.src)),
      ];

  const specs = [
    ...(p.origin ? [{ label: "Xuất xứ", value: "Vùng Cao, Việt Nam" }] : []),
    ...(p.moq ? [{ label: "MOQ", value: p.moq }] : []),
    ...(p.specs ?? []).map((s) => ({ label: s.label, value: s.value })),
  ];

  return (
    <div className="bg-background">
      <main className="flex-grow pb-20 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-muted-foreground"
        >
          <Link href="/" className="text-xs font-medium hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/san-pham"
            className="text-xs font-medium hover:text-foreground"
          >
            Sản phẩm
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-xs font-semibold text-foreground">
            {p.name}
          </span>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-20">
          <div className="lg:col-span-7">
            {galleryImages.length > 0 ? (
              <ProductDetailGallery images={galleryImages} />
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-2xl bg-muted text-muted-foreground/60">
                <Leaf className="h-16 w-16" />
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <ProductDetailStickyPanel
              badge={
                canonicalCategoryForProductSlug(p.slug)?.name ??
                p.category?.name ??
                null
              }
              title={p.name}
              description={p.shortDescription ?? null}
              specs={specs}
              productSlug={p.slug}
              productName={p.name}
            />
          </div>
        </section>

        <ProductDetailTabs tabs={tabs} />
      </main>
    </div>
  );
}
