import Link from "next/link";

import { TetGiftProductImage } from "@/components/marketing/tet-gift/tet-gift-product-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TRA_QUAN_COLLECTION_NAME, formatVnd, type TraQuanProduct } from "@/lib/tra-quan";

type TetGiftPremiumCardProps = {
  product: TraQuanProduct;
  className?: string;
};

export function TetGiftPremiumCard({
  product,
  className,
}: TetGiftPremiumCardProps) {
  const price = formatVnd(product.priceVnd);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-sm border border-tea-gold/20 bg-tea-ivory shadow-sm transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full border-b border-tea-gold/15 bg-black">
        <TetGiftProductImage
          slug={product.slug}
          name={product.name}
          gallerySlidesReversed={product.gallerySlidesReversed}
          className="absolute inset-0"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-tea-olive">
          {TRA_QUAN_COLLECTION_NAME}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-tea-deep-brown">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-tea-muted">
          {product.tagline}
        </p>

        <ul className="mt-4 space-y-1.5 border-t border-tea-gold/15 pt-4">
          {product.teas.map((tea) => (
            <li
              key={`${tea.name}-${tea.weight}`}
              className="flex justify-between gap-4 text-sm text-tea-ink"
            >
              <span>{tea.name}</span>
              <span className="shrink-0 text-tea-muted">{tea.weight}</span>
            </li>
          ))}
        </ul>

        {product.giftHighlights.length > 0 ? (
          <ul className="mt-4 space-y-1 text-xs text-tea-muted">
            {product.giftHighlights.map((h) => (
              <li key={h} className="flex gap-2 before:text-tea-gold before:content-['·']">
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-col gap-3 pt-6">
          {price ? (
            <p className="font-display text-xl font-bold text-tea-dark-green">
              {price}
              <span className="ml-2 text-xs font-normal text-tea-muted">
                / set
              </span>
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-tea-dark-green hover:bg-tea-moss"
            >
              <Link href={`/lien-he?product=${product.slug}&campaign=tet-gift#rfq`}>
                Yêu cầu báo giá
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-tea-gold/40">
              <Link href={`/san-pham/${product.slug}`}>Chi tiết</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
