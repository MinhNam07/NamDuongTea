import { NextResponse } from "next/server";
import { z } from "zod";

import { escapeHtml, sendLeadNotification } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";

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

    const payload = await getPayloadClient();
    const created = await payload.create({
      collection: "contacts",
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || undefined,
        company: parsed.data.company,
        message: parsed.data.message,
        type: parsed.data.type,
        status: "new",
      },
    });

    const typeLabel =
      parsed.data.type === "agent" ? "Đăng ký đại lý" : "Liên hệ";
    const fields = [
      ["Loại", typeLabel],
      ["Họ tên", parsed.data.name],
      ["Điện thoại", parsed.data.phone],
      ["Email", parsed.data.email || "—"],
      ["Công ty", parsed.data.company || "—"],
      ["Nội dung", parsed.data.message || "—"],
    ] as const;

    void sendLeadNotification({
      subject: `[Nam Dương Tea] ${typeLabel} mới — ${parsed.data.name}`,
      html: fields
        .map(
          ([label, value]) =>
            `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
        )
        .join(""),
      text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
    });

    return NextResponse.json(
      { ok: true, id: created.id },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/public/contact]", err);
    return NextResponse.json(
      { error: "Không thể gửi liên hệ. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
