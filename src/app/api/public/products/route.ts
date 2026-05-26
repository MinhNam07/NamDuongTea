import { NextRequest, NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

/**
 * GET /api/public/products
 *
 * Query params:
 *   ?category=<slug>   lọc theo slug danh mục
 *   ?limit=<n>         giới hạn (max 50, mặc định 24)
 *   ?featured=true     chỉ lấy sản phẩm nổi bật
 *
 * Response shape (gọn cho FE / đối tác):
 *   { total: number, items: Array<{...}> }
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";
  const limitRaw = Number(searchParams.get("limit") ?? 24);
  const limit = Math.min(Number.isFinite(limitRaw) ? limitRaw : 24, 50);

  try {
    const payload = await getPayloadClient();
    const { docs, totalDocs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { status: { equals: "published" } },
          ...(category ? [{ "category.slug": { equals: category } }] : []),
          ...(featured ? [{ isFeatured: { equals: true } }] : []),
        ],
      },
      depth: 1,
      limit,
      sort: "-updatedAt",
    });

    return NextResponse.json({
      total: totalDocs,
      items: docs.map((p) => {
        const product = p as unknown as {
          id: string | number;
          name: string;
          slug: string;
          shortDescription?: string;
          origin?: string;
          moq?: string;
          image?: { url?: string; alt?: string } | null;
          category?: { name?: string; slug?: string } | null;
        };
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription ?? null,
          origin: product.origin ?? null,
          moq: product.moq ?? null,
          image: product.image?.url ?? null,
          imageAlt: product.image?.alt ?? null,
          category: product.category
            ? {
                name: product.category.name ?? null,
                slug: product.category.slug ?? null,
              }
            : null,
        };
      }),
    });
  } catch (err) {
    console.error("[GET /api/public/products]", err);
    return NextResponse.json(
      { error: "Không thể tải danh sách sản phẩm." },
      { status: 500 },
    );
  }
}
