import { NextResponse } from "next/server";
import { z } from "zod";

import { getPayloadClient } from "@/lib/payload";

const QuoteSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên."),
  phone: z.string().min(8, "Số điện thoại không hợp lệ."),
  email: z.string().email("Email không hợp lệ.").optional().or(z.literal("")),
  company: z.string().optional(),
  productSlug: z.string().optional(),
  quantity: z.string().min(1, "Vui lòng nhập số lượng dự kiến."),
  note: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = QuoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();

    let productId: number | undefined;
    if (parsed.data.productSlug) {
      const { docs } = await payload.find({
        collection: "products",
        where: { slug: { equals: parsed.data.productSlug } },
        limit: 1,
      });
      const raw = docs[0]?.id;
      if (typeof raw === "number") productId = raw;
      else if (typeof raw === "string") {
        const n = Number(raw);
        if (!Number.isNaN(n)) productId = n;
      }
    }

    const created = await payload.create({
      collection: "quote-requests",
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || undefined,
        company: parsed.data.company,
        product: productId ?? null,
        quantity: parsed.data.quantity,
        note: parsed.data.note,
        status: "new",
      },
    });

    return NextResponse.json(
      { ok: true, id: created.id },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/public/quote-request]", err);
    return NextResponse.json(
      { error: "Không thể gửi yêu cầu báo giá. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
