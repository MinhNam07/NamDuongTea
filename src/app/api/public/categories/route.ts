import { NextRequest, NextResponse } from "next/server";

import { getCategories } from "@/data/categories";

export const revalidate = 3600;

/**
 * GET /api/public/categories
 *
 * Query params:
 *   ?limit=<n>         giới hạn (max 100, mặc định 50)
 *
 * Response shape:
 *   { total: number, items: Array<{ id: string|number, name: string, slug: string }> }
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitRaw = Number(searchParams.get("limit") ?? 50);
  const limit = Math.min(Number.isFinite(limitRaw) ? limitRaw : 50, 100);

  try {
    const categories = await getCategories();
    const items = categories.slice(0, limit).map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    }));

    return NextResponse.json({
      total: categories.length,
      items,
    });
  } catch (err) {
    console.error("[GET /api/public/categories]", err);
    return NextResponse.json(
      { error: "Không thể tải danh mục." },
      { status: 500 },
    );
  }
}
