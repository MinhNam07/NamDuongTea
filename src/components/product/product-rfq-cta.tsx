import Link from "next/link";

import type { ProductLineContent } from "@/data/content/product-lines";
import { Button } from "@/components/ui/button";

type ProductRfqCtaProps = {
  line: ProductLineContent;
};

export function ProductRfqCta({ line }: ProductRfqCtaProps) {
  return (
    <section className="container mx-auto px-4 pb-16 md:px-6 md:pb-24">
      <div className="rounded-3xl border border-line-accent/30 bg-white p-8 text-center md:p-12">
        <p className="font-display text-xl font-bold text-line-primary">
          Đại lý & đơn hàng số lượng lớn
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm text-line-muted">
          Liên hệ để nhận bảng giá theo MOQ, chứng nhận chất lượng và mẫu thử
          miễn phí.
        </p>
        <Button asChild className="mt-6">
          <Link href={`/lien-he?product=${line.slug}#rfq`}>Liên hệ ngay</Link>
        </Button>
      </div>
    </section>
  );
}
