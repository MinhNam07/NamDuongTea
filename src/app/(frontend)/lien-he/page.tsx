import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { QuoteRequestForm } from "@/components/quote-request-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Liên hệ & Yêu cầu báo giá",
  description:
    "Liên hệ Nam Dương Tea để nhận catalog, mẫu thử và báo giá B2B theo nhu cầu.",
  path: "/lien-he",
});

type SearchParams = Promise<{ product?: string }>;

export default async function LienHePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { product } = await searchParams;

  return (
    <div className="bg-tea-cream">
      <section className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-tea-brown-700">
            Liên hệ
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-tea-green md:text-5xl">
            Sẵn sàng phục vụ
          </h1>
          <p className="mt-4 text-tea-muted md:text-lg">
            Gửi yêu cầu báo giá hoặc liên hệ trực tiếp — đội ngũ Nam Dương Tea
            sẽ phản hồi trong vòng 24h.
          </p>

          <ul className="mt-8 space-y-5 text-tea-ink">
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tea-green-50 text-tea-green">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">Văn phòng</p>
                <p className="text-sm text-tea-muted">
                Khối 1, Xã Sóc Sơn, Hà Nội, Việt Nam
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tea-green-50 text-tea-green">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">Hotline</p>
                <a
                  href="tel:+84913303668"
                  className="text-sm text-tea-muted hover:text-tea-green"
                >
                  +84 913 303 668
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tea-green-50 text-tea-green">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">Email B2B</p>
                <a
                  href="mailto:thuynamduong64@gmail.com"
                  className="text-sm text-tea-muted hover:text-tea-green"
                >
                  thuynamduong64@gmail.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div
          id="rfq"
          className="rounded-2xl border border-tea-green/10 bg-white p-6 shadow-sm md:p-8 scroll-mt-24"
        >
          <h2 className="font-display text-2xl font-semibold text-tea-green">
            Yêu cầu báo giá
          </h2>
          <p className="text-sm text-tea-muted mt-1">
            Cung cấp số lượng dự kiến để nhận bảng giá theo MOQ.
          </p>
          <div className="mt-6">
            <QuoteRequestForm productSlug={product} />
          </div>
        </div>
      </section>
    </div>
  );
}
