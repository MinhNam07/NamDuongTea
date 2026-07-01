import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Tin tức",
  description:
    "Tin tức và sự kiện từ Nam Dương Tea — cập nhật về sản phẩm, vùng trồng và hoạt động thương hiệu.",
  path: "/tin-tuc",
});

export default function TinTucPage() {
  return (
    <div className="bg-tea-cream pt-header-offset">
      <section className="container mx-auto px-4 py-14 text-center md:px-6 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-tea-brown-700">
          Tin tức & sự kiện
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-tea-green md:text-5xl">
          Tin tức
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-tea-muted md:text-lg">
          Nội dung đang được cập nhật. Vui lòng quay lại sau hoặc liên hệ
          trực tiếp nếu bạn cần thông tin về sản phẩm và chính sách đối tác.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="default">
            <Link href="/">Về trang chủ</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/lien-he">Liên hệ</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
