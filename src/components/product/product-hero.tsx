import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ProductLineContent } from "@/data/content/product-lines";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductHeroProps = {
  line: ProductLineContent;
};

export function ProductHero({ line }: ProductHeroProps) {
  const { theme } = line;

  return (
    <section className="relative -mt-24 overflow-hidden md:-mt-28">
      <div className="absolute inset-0">
        <Image
          src={line.images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className={cn("product-hero-overlay absolute inset-0", theme.heroOverlay)} />
        <div className={cn("absolute inset-0", theme.heroGradient)} />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:px-6 md:py-24">
        <Link
          href="/san-pham"
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium transition-colors",
            theme.heroTextClass,
            "opacity-80 hover:opacity-100",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Tất cả sản phẩm
        </Link>
        <p
          className={cn(
            "mt-8 text-sm font-semibold uppercase tracking-[0.2em]",
            theme.accentClass,
          )}
        >
          Dòng trà Nam Dương
        </p>
        <h1
          className={cn(
            "mt-2 max-w-2xl text-hero-clamp font-serif leading-[1.05] tracking-tight md:text-5xl",
            theme.heroTextClass,
          )}
        >
          {line.name}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-xl text-lg opacity-90",
            theme.heroTextClass,
          )}
        >
          {line.description}
        </p>
        <Button asChild className="mt-8" variant="secondary">
          <Link href={`/lien-he?product=${line.slug}#rfq`}>
            Nhận báo giá & mẫu thử
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
