import { NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

/**
 * GET /api/public/products/:slug — chi tiết 1 sản phẩm.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

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

    const product = docs[0];
    if (!product) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm." },
        { status: 404 },
      );
    }

    const p = product as unknown as {
      id: string | number;
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

    return NextResponse.json({
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription ?? null,
      origin: p.origin ?? null,
      moq: p.moq ?? null,
      image: p.image?.url ?? null,
      gallery: p.gallery?.map((g) => g.image?.url).filter(Boolean) ?? [],
      specs: p.specs ?? [],
      category: p.category
        ? { name: p.category.name ?? null, slug: p.category.slug ?? null }
        : null,
    });
  } catch (err) {
    console.error("[GET /api/public/products/:slug]", err);
    return NextResponse.json(
      { error: "Không thể tải sản phẩm." },
      { status: 500 },
    );
  }
}
