import type { ReactNode } from "react";
import Image from "next/image";

import { TetGiftProductImage } from "@/components/marketing/tet-gift/tet-gift-product-image";
import { BRAND_LOGO_SRC } from "@/lib/site-assets";
import {
  TET_GIFT_SETS,
  TRA_QUAN_COLLECTION_NAME,
  formatVnd,
  type TetGiftSet,
} from "@/lib/tet-gift-sets";
import { cn } from "@/lib/utils";

export type SocialPostVariant = "signature" | "collection" | "craft";

type TetGiftSocialPostProps = {
  variant: SocialPostVariant;
  className?: string;
};

const VARIANT_COPY: Record<
  SocialPostVariant,
  { eyebrow: string; headline: string; subline: string }
> = {
  signature: {
    eyebrow: "Quà Tết 2026",
    headline: "Tinh hoa trong từng thất phẩm",
    subline: `${TRA_QUAN_COLLECTION_NAME} — sang trọng, tinh tế, đậm chất trà Việt.`,
  },
  collection: {
    eyebrow: "Bộ sưu tập",
    headline: "Năm thất phẩm — một câu chuyện quà tặng",
    subline: "Nam mộc · Sơn mộc · Thanh nhiên · Bạch nhiên · Vân lộ",
  },
  craft: {
    eyebrow: "Nghệ thủ công",
    headline: "Gỗ nguyên khối · Trà tuyển chọn",
    subline: "Đóng gói cao cấp dành cho biếu Tết doanh nghiệp & đại lý.",
  },
};

function SocialFrame({
  variant,
  children,
  className,
}: {
  variant: SocialPostVariant;
  children: ReactNode;
  className?: string;
}) {
  const copy = VARIANT_COPY[variant];
  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[420px] overflow-hidden rounded-sm border border-tea-gold/25 bg-tea-deep-brown shadow-xl",
        className,
      )}
    >
      {children}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tea-deep-brown via-tea-deep-brown/90 to-transparent px-5 pb-5 pt-20">
        <p className="text-[10px] uppercase tracking-[0.22em] text-tea-gold">
          {copy.eyebrow}
        </p>
        <p className="mt-2 font-display text-lg font-bold leading-snug text-tea-ivory">
          {copy.headline}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-tea-ivory/75">
          {copy.subline}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Image
            src={BRAND_LOGO_SRC}
            alt=""
            width={24}
            height={24}
            className="rounded-full opacity-90"
          />
          <span className="text-[10px] uppercase tracking-widest text-tea-ivory/60">
            namduongtea.vn
          </span>
        </div>
      </div>
    </div>
  );
}

function SignaturePost() {
  const product = TET_GIFT_SETS[0];
  return (
    <SocialFrame variant="signature">
      <TetGiftProductImage
        slug={product.slug}
        name={product.name}
        className="absolute inset-0 pt-8"
        sizes="420px"
      />
      {product.priceVnd ? (
        <p className="absolute right-4 top-4 rounded-sm bg-tea-ivory/95 px-3 py-1.5 font-display text-sm font-bold text-tea-deep-brown">
          {formatVnd(product.priceVnd)}
        </p>
      ) : null}
    </SocialFrame>
  );
}

function CollectionPost() {
  const picks = TET_GIFT_SETS.slice(0, 4);
  return (
    <SocialFrame variant="collection">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-px bg-tea-gold/20 p-px pt-10">
        {picks.map((p) => (
          <div key={p.slug} className="relative bg-tea-ivory">
            <TetGiftProductImage
              slug={p.slug}
              name={p.name}
              className="absolute inset-0"
              sizes="210px"
            />
          </div>
        ))}
      </div>
    </SocialFrame>
  );
}

function CraftPost() {
  const product: TetGiftSet = TET_GIFT_SETS[1];
  return (
    <SocialFrame variant="craft">
      <div className="absolute inset-0 grid grid-rows-[1fr_auto]">
        <TetGiftProductImage
          slug={product.slug}
          name={product.name}
          className="min-h-0"
          sizes="420px"
        />
        <div className="border-t border-tea-gold/20 bg-tea-ivory/95 px-5 py-4">
          <p className="font-display text-sm font-bold text-tea-deep-brown">
            {product.name}
          </p>
          <ul className="mt-2 space-y-0.5 text-xs text-tea-muted">
            {product.teas.map((t) => (
              <li key={t.name}>
                {t.name} · {t.weight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SocialFrame>
  );
}

export function TetGiftSocialPost({ variant, className }: TetGiftSocialPostProps) {
  return (
    <div className={className}>
      {variant === "signature" ? <SignaturePost /> : null}
      {variant === "collection" ? <CollectionPost /> : null}
      {variant === "craft" ? <CraftPost /> : null}
    </div>
  );
}

export const SOCIAL_POST_VARIANTS: SocialPostVariant[] = [
  "signature",
  "collection",
  "craft",
];
