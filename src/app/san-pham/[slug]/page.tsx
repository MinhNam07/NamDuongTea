import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CategoryCatalogPage } from "@/components/products/category-catalog-page";
import { TraQuanProductDetailView } from "@/components/products/tra-quan-product-detail-view";
import { ThemedProductPage } from "@/components/product/themed-product-page";
import {
  CATEGORY_LANDINGS,
  getCategoryLanding,
  isCategorySlug,
} from "@/data/content/catalog-tabs";
import {
  getProductLineContentBySlug,
  TEA_PRODUCT_LINES,
  getProductDetailTabsForSlug as getProductDetailTabs,
} from "@/data/content/product-lines";
import { buildMetadata } from "@/lib/seo";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";
import { loadTraQuanProductBySlug } from "@/lib/tra-quan-products";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return [
    ...TEA_PRODUCT_LINES.map((line) => ({ slug: line.slug })),
    ...CATEGORY_LANDINGS.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isCategorySlug(slug)) {
    const landing = getCategoryLanding(slug)!;
    return buildMetadata({
      title: landing.title,
      description: landing.description,
      path: landing.path,
    });
  }

  const line = getProductLineContentBySlug(slug);
  if (line) {
    return buildMetadata({
      title: line.name,
      description: line.description,
      path: `/san-pham/${slug}`,
    });
  }

  const traQuan = await loadTraQuanProductBySlug(slug);
  if (!traQuan) {
    return buildMetadata({
      title: "Sản phẩm không tồn tại",
      path: `/san-pham/${slug}`,
    });
  }

  return buildMetadata({
    title: `${traQuan.name} · ${TRA_QUAN_COLLECTION_NAME}`,
    description: traQuan.tagline,
    path: `/san-pham/${slug}`,
  });
}

export default async function SanPhamSlugPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  if (isCategorySlug(slug)) {
    const landing = getCategoryLanding(slug);
    if (!landing) notFound();
    return <CategoryCatalogPage landing={landing} />;
  }

  const line = getProductLineContentBySlug(slug);
  if (line?.hasDetailPage) {
    const tabs = getProductDetailTabs(slug);
    return (
      <ThemedProductPage
        line={line}
        tabs={tabs}
        specs={[]}
      />
    );
  }

  const traQuan = await loadTraQuanProductBySlug(slug);
  if (!traQuan) notFound();

  return (
    <TraQuanProductDetailView
      product={{
        name: traQuan.name,
        slug: traQuan.slug,
        shortDescription: traQuan.tagline,
        priceVnd: traQuan.priceVnd,
        giftTeas: traQuan.teas,
        giftHighlights: traQuan.giftHighlights?.map((text) => ({ text })),
        gallerySlidesReversed: traQuan.gallerySlidesReversed,
      }}
    />
  );
}
