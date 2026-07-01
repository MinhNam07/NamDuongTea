import { NextResponse } from "next/server";

import { getProductBySlug } from "@/data/products";
import { canonicalCategoryForProductSlug } from "@/lib/product-tab-config";

export const revalidate = 3600;

/**
 * GET /api/public/products/:slug — chi tiết 1 sản phẩm.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription ?? null,
      origin: product.origin ?? null,
      moq: product.moq ?? null,
      image: product.image?.url ?? null,
      gallery: product.gallery.map((img) => img.url).filter(Boolean),
      specs: product.specs,
      category:
        canonicalCategoryForProductSlug(product.slug) ??
        (product.category
          ? { name: product.category.name ?? null, slug: product.category.slug ?? null }
          : null),
    });
  } catch (err) {
    console.error("[GET /api/public/products/:slug]", err);
    return NextResponse.json(
      { error: "Không thể tải sản phẩm." },
      { status: 500 },
    );
  }
}
