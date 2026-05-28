import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NAM_MOC_TRA_QUAN_HERO_SRC,
  TET_GIFT_SETS,
  TRA_QUAN_COLLECTION_NAME,
} from "@/lib/tet-gift-sets";

const FEATURED = TET_GIFT_SETS[0];
const TRA_QUAN_BG_SRC = "/images/IMG_6548.JPG";

export function TetGiftHeroBanner() {
  return (
    <section
      aria-label={`${TRA_QUAN_COLLECTION_NAME} — Nam Dương Tea`}
      className="relative -mt-24 flex min-h-[calc(100svh-48px)] items-start overflow-hidden bg-tea-dark-green px-6 pb-12 pt-32 md:-mt-28 md:px-[5vw] md:pb-14 md:pt-36"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={TRA_QUAN_BG_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.84),rgba(7,27,0,0.48),rgba(246,252,235,0.9))] mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-8 px-[6vw] pt-8 md:grid-cols-[1fr_auto] md:gap-x-12 md:pt-10 lg:pt-12">
        {/* Left */}
        <div className="order-2 flex max-w-2xl flex-col justify-center text-white md:order-1">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.28em] text-white/90">
              Bộ sưu tập 2026
            </p>
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
            {TRA_QUAN_COLLECTION_NAME}

            <span className="mt-2 block text-2xl font-semibold leading-snug text-white/95 sm:text-3xl">
              Quà biếu tinh tế — bộ sản phẩm của Trà Nam Dương
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
            Thất phẩm gỗ chạm khắc, đóng gói cao cấp, tôn vinh nghệ thủ công
            trà Việt. Mỗi set là một câu chuyện quà tặng sang trọng, đậm chất
            Đông phương hiện đại.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            {["Hộp gỗ nguyên khối", "Trà tuyển chọn", "Quà Tết doanh nghiệp"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-white" />
                  {item}
                </li>
              ),
            )}
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
              <Link href="/lien-he?campaign=tet-gift#rfq">Báo giá B2B</Link>
            </Button>
          </div>
        </div>

        {/* Right */}
        {/* Right */}
        {/* Right */}
        <div className="order-1 flex items-center justify-center md:order-2 md:justify-start">
          <figure className="mx-auto md:mx-0 md:origin-center md:scale-[1.12] md:-translate-y-4 lg:scale-[1.18] lg:-translate-y-6">
            <div className="relative aspect-[2/3] h-[min(560px,68vh)] w-auto overflow-hidden rounded-lg border-2 border-white bg-black shadow-2xl">
              <Image
                src={NAM_MOC_TRA_QUAN_HERO_SRC}
                alt={FEATURED.name}
                fill
                priority
                sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 16rem"
                className="object-contain object-center"
              />

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