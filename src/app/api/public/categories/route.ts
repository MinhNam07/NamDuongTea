import { NextRequest, NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

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
    const payload = await getPayloadClient();
    const { docs, totalDocs } = await payload.find({
      collection: "categories",
      limit,
      sort: "name",
    });

    return NextResponse.json({
      total: totalDocs,
      items: docs.map((c) => {
        const category = c as unknown as {
          id: string | number;
          name: string;
          slug: string;
        };
        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
        };
      }),
    });
  } catch (err) {
    console.error("[GET /api/public/categories]", err);
    return NextResponse.json(
      { error: "Không thể tải danh mục." },
      { status: 500 },
    );
  }
}

