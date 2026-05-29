import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductLine } from "@/lib/product-lines";

type ProductLinePageProps = {
  line: ProductLine;
};

export function ProductLinePage({ line }: ProductLinePageProps) {
  return (
    <div className="bg-tea-cream">
      <section className="relative overflow-hidden bg-tea-dark-green">
        <div className="absolute inset-0">
          <Image
            src={line.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-tea-dark-green/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-tea-dark-green via-tea-dark-green/70 to-tea-dark-green/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-16 md:px-6 md:py-24">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả sản phẩm
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-tea-yellow-green">
            Dòng trà Nam Dương
          </p>
          <h1 className="mt-2 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-white md:text-5xl">
            {line.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{line.description}</p>
          <Button asChild className="mt-8" variant="secondary">
            <Link href={`/lien-he?product=${line.slug}#rfq`}>
              Nhận báo giá & mẫu thử
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-tea-dark-green md:text-3xl">
            Giới thiệu
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tea-muted md:text-lg">
            {line.detail}
          </p>
        </div>

        {line.gallery.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-center font-display text-2xl font-bold text-tea-dark-green">
              Hình ảnh sản phẩm
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {line.gallery.map((src) => (
                <li
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-tea-moss/25 bg-white shadow-sm"
                >
                  <Image
                    src={src}
                    alt={line.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-16 rounded-3xl border border-tea-moss/30 bg-white p-8 text-center md:p-12">
          <p className="font-display text-xl font-bold text-tea-dark-green">
            Đại lý & đơn hàng số lượng lớn
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-tea-muted">
            Liên hệ để nhận bảng giá theo MOQ, chứng nhận chất lượng và mẫu thử
            miễn phí.
          </p>
          <Button asChild className="mt-6">
            <Link href={`/lien-he?product=${line.slug}#rfq`}>Liên hệ ngay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
