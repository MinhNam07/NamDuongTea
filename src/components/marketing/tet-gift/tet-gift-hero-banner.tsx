import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TetGiftProductImage } from "@/components/marketing/tet-gift/tet-gift-product-image";
import { Button } from "@/components/ui/button";
import { BRAND_LOGO_SRC } from "@/lib/site-assets";
import {
  TET_GIFT_SETS,
  TRA_QUAN_COLLECTION_NAME,
} from "@/lib/tet-gift-sets";

const FEATURED = TET_GIFT_SETS[0];

/**
 * Website hero — premium Tet gifting, calm luxury composition.
 */
export function TetGiftHeroBanner() {
  return (
    <section
      aria-label={`${TRA_QUAN_COLLECTION_NAME} — Nam Dương Tea`}
      className="relative overflow-hidden bg-tea-deep-brown"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, var(--tea-muted-gold) 0%, transparent 45%), radial-gradient(circle at 80% 70%, var(--tea-olive) 0%, transparent 40%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,74,12,0.92)_0%,rgba(62,52,7,0.95)_55%,rgba(37,74,12,0.88)_100%)]"
      />

      <div className="container relative mx-auto grid min-h-[min(88vh,720px)] gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:gap-12 md:px-6 md:py-24 lg:min-h-[680px]">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <div className="flex items-center gap-3">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Nam Dương Tea"
              width={48}
              height={48}
              className="rounded-full ring-1 ring-tea-gold/40"
            />
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tea-gold/90">
              Bộ sưu tập 2026
            </p>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-tea-ivory sm:text-5xl lg:text-[3.25rem]">
            {TRA_QUAN_COLLECTION_NAME}
            <span className="mt-2 block text-2xl font-semibold text-tea-gold/95 sm:text-3xl">
              Quà biếu tinh tế — từ vùng trà Nam Dương
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-tea-ivory/85 md:text-lg">
            Thất phẩm gỗ chạm khắc, đóng gói cao cấp, tôn vinh nghệ thủ công
            trà Việt. Mỗi set là một câu chuyện quà tặng sang trọng, đậm chất
            Đông phương hiện đại.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-tea-ivory/75">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-tea-gold" />
              Hộp gỗ nguyên khối
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-tea-gold" />
              Trà tuyển chọn
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-tea-gold" />
              Quà Tết doanh nghiệp
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-tea-gold text-tea-deep-brown hover:bg-tea-ivory"
            >
              <Link href="/nam-duong-tra-quan#bo-suu-tap">
                Khám phá bộ sưu tập <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-tea-ivory/35 bg-transparent text-tea-ivory hover:bg-tea-ivory/10"
            >
              <Link href="/lien-he?campaign=tet-gift#rfq">Báo giá B2B</Link>
            </Button>
          </div>
        </div>

        <div className="order-1 relative md:order-2">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-sm border border-tea-gold/25 bg-tea-ivory/5 shadow-2xl shadow-black/30 backdrop-blur-sm md:max-w-none">
            <TetGiftProductImage
              slug={FEATURED.slug}
              name={FEATURED.name}
              priority
              className="absolute inset-0"
              sizes="(min-width: 768px) 45vw, 90vw"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-tea-deep-brown/80 to-transparent px-6 pb-6 pt-16">
              <p className="text-xs uppercase tracking-[0.2em] text-tea-gold/90">
                Nổi bật
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-tea-ivory">
                {FEATURED.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
