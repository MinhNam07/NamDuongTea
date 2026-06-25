type SendEmailInput = {
  subject: string;
  html: string;
  text: string;
};

/**
 * Gửi email thông báo lead qua Resend API.
 * Bỏ qua im lặng nếu chưa cấu hình RESEND_API_KEY hoặc LEAD_NOTIFICATION_EMAIL.
 */
export async function sendLeadNotification(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from =
    process.env.EMAIL_FROM ?? "Nam Dương Tea <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.info("[email] skipped — set RESEND_API_KEY and LEAD_NOTIFICATION_EMAIL to enable");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[email] Resend error:", res.status, body);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
