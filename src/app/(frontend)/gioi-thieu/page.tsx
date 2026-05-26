import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Giới thiệu Nam Dương Tea",
  description:
    "Câu chuyện vùng trà Nam Dương — từ búp tươi đến đối tác tin cậy của ngành trà Việt.",
  path: "/gioi-thieu",
});

export default function GioiThieuPage() {
  return (
    <div className="bg-tea-cream">
      <section className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-tea-brown-700">
          Câu chuyện
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-tea-green md:text-5xl">
          Vùng trà Nam Dương
        </h1>
        <div className="mt-8 space-y-5 text-tea-ink leading-relaxed md:text-lg">
          <p>
            Nam Dương Tea bắt đầu từ tâm huyết gìn giữ hương vị trà truyền thống
            Việt Nam, kết hợp quy trình sản xuất hiện đại để phục vụ thị trường
            B2B ngày càng khắt khe.
          </p>
          <p>
            Chúng tôi hợp tác trực tiếp với các nông hộ tại vùng nguyên liệu Nam
            Dương — kiểm soát toàn bộ chuỗi cung ứng từ búp tươi, sao sấy, đóng
            gói cho tới giao hàng.
          </p>
          <p>
            Sản phẩm Nam Dương Tea hiện có mặt tại hơn 120 đại lý trong nước và
            xuất khẩu sang 8 quốc gia, đáp ứng đầy đủ chứng nhận HACCP, ISO
            22000.
          </p>
        </div>
      </section>
    </div>
  );
}
