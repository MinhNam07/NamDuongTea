import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { TetGiftProductImage } from "@/components/marketing/tet-gift/tet-gift-product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RfqButton } from "@/components/rfq-button";
import { TRA_QUAN_COLLECTION_NAME, formatVnd } from "@/lib/tra-quan";

export type TraQuanPayloadProduct = {
  name: string;
  slug: string;
  shortDescription?: string | null;
  priceVnd?: number | null;
  giftTeas?: { name: string; weight: string }[] | null;
  giftHighlights?: { text: string }[] | null;
  gallerySlidesReversed?: boolean | null;
};

export function TraQuanProductDetailView({ product }: { product: TraQuanPayloadProduct }) {
  const price = formatVnd(product.priceVnd);
  const highlights = (product.giftHighlights ?? []).map((h) => h.text);
  const teas = product.giftTeas ?? [];

  return (
    <div className="bg-tea-cream pb-16">
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto flex items-center gap-1 px-4 py-4 text-sm text-tea-muted md:px-6"
      >
        <Link href="/" className="hover:text-tea-green">
          Trang chủ
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/san-pham" className="hover:text-tea-green">
          Sản phẩm
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-tea-ink">{product.name}</span>
      </nav>

      <section className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
            <TetGiftProductImage
              slug={product.slug}
              name={product.name}
              gallerySlidesReversed={Boolean(product.gallerySlidesReversed)}
              className="absolute inset-0"
              priority
              gallery
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        <div>
          <Badge variant="muted" className="mb-3">
            {TRA_QUAN_COLLECTION_NAME}
          </Badge>
          <h1 className="font-serif text-3xl font-light text-tea-dark-green md:text-4xl">
            {product.name}
          </h1>
          {product.shortDescription ? (
            <p className="mt-4 text-tea-muted md:text-lg">{product.shortDescription}</p>
          ) : null}

          <dl className="mt-8 grid gap-4 rounded-2xl border border-tea-green/10 bg-white p-6">
            {teas.length > 0 ? (
              <div className="space-y-2">
                <dt className="text-sm text-tea-muted">Thành phần</dt>
                <dd className="space-y-1 text-sm font-medium text-tea-ink">
                  {teas.map((t) => (
                    <div
                      key={`${t.name}-${t.weight}`}
                      className="flex justify-between gap-4"
                    >
                      <span>{t.name}</span>
                      <span className="shrink-0 text-tea-muted">{t.weight}</span>
                    </div>
                  ))}
                </dd>
              </div>
            ) : null}
            {price ? (
              <div className="space-y-1">
                <dt className="text-sm text-tea-muted">Giá tham khảo</dt>
                <dd className="font-display text-xl font-bold text-tea-dark-green">
                  {price}
                  <span className="ml-2 text-xs font-normal text-tea-muted">/ set</span>
                </dd>
              </div>
            ) : null}
            {highlights.length > 0 ? (
              <div className="space-y-2">
                <dt className="text-sm text-tea-muted">Điểm nổi bật</dt>
                <dd className="flex flex-wrap gap-2">
                  {highlights.map((h) => (
                    <Badge key={h} variant="outline">
                      {h}
                    </Badge>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <RfqButton productSlug={product.slug} productName={product.name} />
            <Button asChild variant="outline" size="lg">
              <Link href="/nam-duong-tra-quan#bo-suu-tap">Xem bộ sưu tập</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
