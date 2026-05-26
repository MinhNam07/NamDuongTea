import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND_LOGO_SRC, TRA_QUAN_HERO_BG_SRC } from "@/lib/site-assets";
import {
  NAM_MOC_TRA_QUAN_HERO_SRC,
  TET_GIFT_SETS,
  TRA_QUAN_COLLECTION_NAME,
} from "@/lib/tet-gift-sets";

const FEATURED = TET_GIFT_SETS[0];

export function TetGiftHeroBanner() {
  return (
    <section
      aria-label={`${TRA_QUAN_COLLECTION_NAME} — Nam Dương Tea`}
      className="relative -mt-32 overflow-hidden bg-tea-dark-green pt-32"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={TRA_QUAN_HERO_BG_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-tea-dark-green/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-tea-dark-green/90 via-tea-dark-green/70 to-tea-dark-green/55" />
      </div>

      {/* Container */}
      <div className="container relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-h-[min(calc(100svh-8rem),520px)] items-center gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:gap-x-12 md:px-6 md:py-12">
        
        {/* LEFT CONTENT */}
        <div className="order-2 flex flex-col justify-center text-white md:order-1">
          <div className="flex items-center gap-3">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Nam Dương Tea"
              width={664}
              height={376}
              className="h-10 w-auto bg-transparent md:h-11"
            />
            <p className="text-xs uppercase tracking-[0.28em] text-white/90">
              Bộ sưu tập 2026
            </p>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
            {TRA_QUAN_COLLECTION_NAME}
            <span className="mt-2 block text-2xl font-semibold text-white/95 sm:text-3xl">
              Quà biếu tinh tế — từ vùng trà Nam Dương
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
            Thất phẩm gỗ chạm khắc, đóng gói cao cấp, tôn vinh nghệ thủ công
            trà Việt. Mỗi set là một câu chuyện quà tặng sang trọng, đậm chất
            Đông phương hiện đại.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white" />
              Hộp gỗ nguyên khối
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white" />
              Trà tuyển chọn
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white" />
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
                Khám phá bộ sưu tập
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-tea-ivory/35 text-tea-ivory hover:bg-tea-ivory/10"
            >
              <Link href="/lien-he?campaign=tet-gift#rfq">
                Báo giá B2B
              </Link>
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 flex items-center justify-center md:order-2 md:justify-end">
          <figure className="w-[14rem] sm:w-[16rem] md:w-[23rem] lg:w-[27rem]">
            
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border-2 border-white bg-black shadow-2xl">
              
              {/* ✅ FIX: full cover */}
              <Image
                src={NAM_MOC_TRA_QUAN_HERO_SRC}
                alt={FEATURED.name}
                fill
                priority
                sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem"
                className="object-cover object-center"
              />

              {/* overlay */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                  Nổi bật
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
                  {FEATURED.name}
                </p>
              </figcaption>
            </div>

          </figure>
        </div>
      </div>
    </section>
  );
}