import { NextRequest, NextResponse } from "next/server";

import {
  categorySlugToProductTab,
  loadCatalogProducts,
  toPublicProductPreview,
} from "@/lib/product-catalog";

export const revalidate = 60;

/**
 * GET /api/public/products
 *
 * Query params:
 *   ?category=<slug>   che-xanh | che-den | nam-duong-tra-quan (legacy: tra-xanh, tra-den)
 *   ?limit=<n>         giới hạn (max 50, mặc định 24)
 *   ?featured=true     (reserved — catalog tabs ignore for now)
 *
 * Response: { total: number, items: PublicProductPreview[] }
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limitRaw = Number(searchParams.get("limit") ?? 24);
  const limit = Math.min(Number.isFinite(limitRaw) ? limitRaw : 24, 50);

  try {
    const tab = categorySlugToProductTab(category);
    if (!tab) {
      return NextResponse.json({ total: 0, items: [] });
    }

    const products = await loadCatalogProducts(tab, { limit });
    const items = products.map(toPublicProductPreview);

    return NextResponse.json({
      total: items.length,
      items,
    });
  } catch (err) {
    console.error("[GET /api/public/products]", err);
    return NextResponse.json(
      { error: "Không thể tải danh sách sản phẩm." },
      { status: 500 },
    );
  }
}
