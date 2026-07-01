import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên."),
  phone: z.string().min(8, "Số điện thoại không hợp lệ."),
  email: z.string().email("Email không hợp lệ.").optional().or(z.literal("")),
  company: z.string().optional(),
  message: z.string().optional(),
  type: z.enum(["contact", "agent"]).default("contact"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    console.info("[POST /api/public/contact]", parsed.data);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/public/contact]", err);
    return NextResponse.json(
      { error: "Không thể gửi liên hệ. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
