import type { Metadata } from "next";

import { AgentRegisterForm } from "@/components/agent-register-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Đăng ký đại lý",
  description:
    "Trở thành đại lý phân phối Nam Dương Tea — chính sách rõ ràng, hỗ trợ marketing và đào tạo bài bản.",
  path: "/dang-ky-dai-ly",
});

const BENEFITS = [
  "Chiết khấu cạnh tranh theo cấp đại lý.",
  "Hỗ trợ vật phẩm POSM, catalog, sample.",
  "Đào tạo kiến thức pha chế, kiểm tra chất lượng.",
  "Giao hàng nhanh, công nợ linh hoạt.",
];

export default function DangKyDaiLyPage() {
  return (
    <div className="bg-tea-cream">
      <section className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-tea-brown-700">
            Hợp tác phân phối
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-tea-green md:text-5xl">
            Đăng ký đại lý
          </h1>
          <p className="mt-4 text-tea-muted md:text-lg">
            Cùng Nam Dương Tea xây dựng kênh phân phối trà Việt chất lượng cao
            tại địa phương của bạn.
          </p>
          <ul className="mt-8 space-y-3">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-tea-ink before:mt-2 before:h-1.5 before:w-1.5 before:flex-none before:rounded-full before:bg-tea-brown-500"
              >
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-tea-green/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-display text-2xl font-semibold text-tea-green">
            Thông tin đăng ký
          </h2>
          <p className="text-sm text-tea-muted mt-1">
            Phản hồi trong vòng 24h làm việc.
          </p>
          <div className="mt-6">
            <AgentRegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
