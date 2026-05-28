import type { Metadata } from "next";
import Image from "next/image";

import { buildMetadata } from "@/lib/seo";
import { GIOI_THIEU_HERO_BG_SRC } from "@/lib/site-assets";

export const metadata: Metadata = buildMetadata({
  title: "Giới thiệu Nam Dương Tea",
  description:
    "Câu chuyện vùng trà Nam Dương — từ búp tươi đến đối tác tin cậy của ngành trà Việt.",
  path: "/gioi-thieu",
});

export default function GioiThieuPage() {
  return (
    <div className="bg-tea-cream">
      <section
        aria-label="Giới thiệu Nam Dương Tea"
        className="relative -mt-24 flex min-h-[60svh] items-center overflow-hidden bg-tea-dark-green px-4 pb-16 pt-28 md:-mt-28 md:min-h-[70svh] md:px-6 md:pb-20 md:pt-32"
      >
        {/* Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={GIOI_THIEU_HERO_BG_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.82),rgba(7,27,0,0.45),rgba(246,252,235,0.92))] mix-blend-multiply" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
            Câu chuyện
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            Từ các đồi chè vùng cao
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base md:leading-relaxed">
            Nam Dương Tea bắt đầu từ tâm huyết gìn giữ hương vị trà truyền thống
            Việt Nam, kết hợp quy trình sản xuất hiện đại để phục vụ thị trường
            B2B ngày càng khắt khe.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
        <div className="space-y-5 text-tea-ink leading-relaxed md:text-lg">
          <p>
            Chúng tôi hợp tác trực tiếp với các nông hộ tại vùng nguyên liệu tại
            Phú Thọ, Yên Bái và các vùng khác — kiểm soát toàn bộ chuỗi cung ứng
            từ búp tươi, sao sấy, đóng gói cho tới giao hàng.
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
