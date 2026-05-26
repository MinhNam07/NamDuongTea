import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductLinePage } from "@/components/marketing/product-line/product-line-page";
import {
  TEA_PRODUCT_LINES,
  getProductLineBySlug,
} from "@/lib/product-lines";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TEA_PRODUCT_LINES.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const line = getProductLineBySlug(slug);
  if (!line) {
    return buildMetadata({ title: "Sản phẩm", path: "/san-pham" });
  }
  return buildMetadata({
    title: line.name,
    description: line.description,
    path: line.href,
  });
}

export default async function DongTraProductLinePage({ params }: PageProps) {
  const { slug } = await params;
  const line = getProductLineBySlug(slug);
  if (!line) notFound();

  return <ProductLinePage line={line} />;
}
