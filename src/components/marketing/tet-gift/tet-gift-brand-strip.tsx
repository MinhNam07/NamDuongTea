import Image from "next/image";

import { BRAND_LOGO_SRC } from "@/lib/site-assets";

export function TetGiftBrandStrip() {
  return (
    <section
      className="border-t border-tea-gold/15 bg-tea-deep-brown py-12 md:py-16"
      aria-label="Công ty TNHH Sản xuất và Thương mại Trà Nam Dương"
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
        <Image
          src={BRAND_LOGO_SRC}
          alt="Nam Dương Tea"
          width={664}
          height={376}
          className="h-14 w-auto bg-transparent md:h-16"
        />
        <div className="w-full max-w-5xl space-y-3">
          <p className="text-pretty font-display text-xl font-extrabold leading-snug text-tea-ivory md:text-2xl lg:text-3xl">
            Công ty TNHH Sản xuất và Thương mại{" "}
            <span className="whitespace-nowrap">Trà Nam Dương</span>
          </p>
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-tea-gold md:text-lg lg:text-xl">
            Nam Dương Tea Company
          </p>
        </div>
      </div>
    </section>
  );
}
