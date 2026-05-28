import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RfqButton } from "@/components/rfq-button";
import { TetGiftProductImage } from "@/components/marketing/tet-gift/tet-gift-product-image";
import { ProductDetailGallery } from "@/components/products/product-detail-gallery";
import { ProductDetailStickyPanel } from "@/components/products/product-detail-sticky-panel";
import { ProductDetailTabs } from "@/components/products/product-detail-tabs";
import { getPayloadClient } from "@/lib/payload";
import { getProductDetailTabs } from "@/lib/product-detail-tabs";
import { getCuratedTeaImages } from "@/lib/product-lines";
import { buildMetadata } from "@/lib/seo";
import { TET_GIFT_SETS, TRA_QUAN_COLLECTION_NAME } from "@/lib/tet-gift-sets";

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
    const tetGift = TET_GIFT_SETS.find((s) => s.slug === slug);
    if (tetGift) {
      return buildMetadata({
        title: `${tetGift.name} · ${TRA_QUAN_COLLECTION_NAME}`,
        description: tetGift.tagline,
        path: `/san-pham/${slug}`,
      });
    }
    return buildMetadata({
      title: "Sản phẩm không tồn tại",
      path: `/san-pham/${slug}`,
    });
  }
  const seo = (product as { seo?: { metaTitle?: string; metaDescription?: string } }).seo;
  return buildMetadata({
    title: seo?.metaTitle || (product.name as string),
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
  if (!product) {
    const tetGift = TET_GIFT_SETS.find((s) => s.slug === slug);
    if (!tetGift) notFound();

    return (
      <div className="bg-tea-cream pb-16">
        <nav
          aria-label="Breadcrumb"
          className="container mx-auto flex items-center gap-1 px-4 py-4 text-sm text-tea-muted md:px-6"
        >
          <Link href="/" className="hover:text-tea-green">
            Trang chủ
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/san-pham" className="hover:text-tea-green">
            Sản phẩm
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-tea-ink">{tetGift.name}</span>
        </nav>

        <section className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
              <TetGiftProductImage
                slug={tetGift.slug}
                name={tetGift.name}
                className="absolute inset-0"
                priority
                gallery
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>

          <div>
            <Badge variant="muted" className="mb-3">
              {TRA_QUAN_COLLECTION_NAME}
            </Badge>
            <h1 className="font-display text-3xl font-bold text-tea-green md:text-4xl">
              {tetGift.name}
            </h1>
            <p className="mt-4 text-tea-muted md:text-lg">{tetGift.tagline}</p>

            <dl className="mt-8 grid gap-4 rounded-2xl border border-tea-green/10 bg-white p-6">
              {tetGift.teas.length > 0 ? (
                <div className="space-y-2">
                  <dt className="text-sm text-tea-muted">Thành phần</dt>
                  <dd className="space-y-1 text-sm font-medium text-tea-ink">
                    {tetGift.teas.map((t) => (
                      <div key={`${t.name}-${t.weight}`} className="flex justify-between gap-4">
                        <span>{t.name}</span>
                        <span className="shrink-0 text-tea-muted">{t.weight}</span>
                      </div>
                    ))}
                  </dd>
                </div>
              ) : null}
              {tetGift.giftHighlights.length > 0 ? (
                <div className="space-y-2">
                  <dt className="text-sm text-tea-muted">Điểm nổi bật</dt>
                  <dd className="flex flex-wrap gap-2">
                    {tetGift.giftHighlights.map((h) => (
                      <Badge key={h} variant="outline">
                        {h}
                      </Badge>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <RfqButton productSlug={tetGift.slug} productName={tetGift.name} />
              <Button asChild variant="outline" size="lg">
                <Link href="/nam-duong-tra-quan#bo-suu-tap">Xem bộ sưu tập</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const p = product as unknown as {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    origin?: string;
    moq?: string;
    image?: { url?: string; alt?: string } | null;
    gallery?: { image?: { url?: string; alt?: string } }[];
    specs?: { label: string; value: string }[];
    category?: { name?: string; slug?: string } | null;
  };

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
              badge={p.category?.name ?? null}
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
