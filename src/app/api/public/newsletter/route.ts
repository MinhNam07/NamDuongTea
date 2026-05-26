import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);
    // Stub: log until CRM integration
    console.info("[newsletter]", email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid email" },
      { status: 400 },
    );
  }
}
