import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductLineBySlug } from "@/data/product-lines";
import type { StorefrontProductLine } from "@/data/types";
import { ProductLinePage } from "@/components/marketing/product-line/product-line-page";
import type { ProductLine } from "@/lib/product-lines";
import { TEA_PRODUCT_LINES } from "@/lib/product-lines";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function toProductLine(line: StorefrontProductLine): ProductLine {
  const image =
    line.heroImageUrl ?? line.cardImageUrl ?? line.legacyImagePath ?? "";
  return {
    slug: line.slug,
    name: line.title,
    description: line.shortDescription ?? "",
    detail:
      typeof line.description === "string"
        ? line.description
        : (line.shortDescription ?? ""),
    href: line.href,
    image,
    gallery: line.gallery.length > 0 ? line.gallery : image ? [image] : [],
    hasDetailPage: line.hasDetailPage,
  };
}

export function generateStaticParams() {
  return TEA_PRODUCT_LINES.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const line = await getProductLineBySlug(slug);
  if (!line) {
    return buildMetadata({ title: "Sản phẩm", path: "/san-pham" });
  }
  return buildMetadata({
    title: line.title,
    description: line.shortDescription ?? undefined,
    path: line.href,
  });
}

export default async function DongTraProductLinePage({ params }: PageProps) {
  const { slug } = await params;
  const line = await getProductLineBySlug(slug);
  if (!line) notFound();

  return <ProductLinePage line={toProductLine(line)} />;
}
