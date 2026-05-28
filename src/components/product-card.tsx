import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProductCardProduct = {
  id: string | number;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  origin?: string | null;
  image?:
    | {
        url?: string | null;
        alt?: string | null;
        sizes?: { card?: { url?: string | null } | null } | null;
      }
    | string
    | null;
  category?: { name?: string | null; slug?: string | null } | string | null;
};

function imageUrl(image: ProductCardProduct["image"]) {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.sizes?.card?.url ?? image.url ?? null;
}

function imageAlt(image: ProductCardProduct["image"], fallback: string) {
  if (!image || typeof image === "string") return fallback;
  return image.alt ?? fallback;
}

function categoryName(c: ProductCardProduct["category"]) {
  if (!c) return null;
  if (typeof c === "string") return c;
  return c.name ?? null;
}

export function ProductCard({
  product,
  className,
}: {
  product: ProductCardProduct;
  className?: string;
}) {
  const url = imageUrl(product.image);
  const alt = imageAlt(product.image, product.name);
  const category = categoryName(product.category);
  const description = product.shortDescription ?? product.description ?? null;

  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden rounded-[28px] border border-border/60 bg-white/85 transition-all",
        "shadow-[0_10px_34px_rgba(37,74,12,0.06)] hover:shadow-[0_18px_60px_rgba(37,74,12,0.10)]",
        "hover:border-border",
        className,
      )}
    >
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-tea-green-50">
          {url ? (
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-tea-green/50 font-display text-2xl">
              Nam Dương Tea
            </div>
          )}
          {category ? (
            <Badge
              variant="muted"
              className="absolute left-4 top-4 border border-border/40 bg-white/70 text-tea-dark-green backdrop-blur-md"
            >
              {category}
            </Badge>
          ) : null}
        </div>
      </Link>

      <CardHeader className="pb-2 pt-6">
        <CardTitle className="line-clamp-2 text-lg font-extrabold text-tea-dark-green md:text-xl">
          <Link
            href={`/san-pham/${product.slug}`}
            className="transition-colors hover:text-tea-moss"
          >
            {product.name}
          </Link>
        </CardTitle>
        {product.origin ? (
          <p className="text-xs text-tea-muted uppercase tracking-wide">
            Vùng Cao, Việt Nam
          </p>
        ) : null}
      </CardHeader>

      <CardContent className="flex-1">
        {description ? (
          <p className="text-sm leading-relaxed text-tea-muted line-clamp-3">
            {description}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-2.5 pt-3">
        <Button
          asChild
          variant="default"
          size="default"
          className="w-full rounded-full"
        >
          <Link href={`/lien-he?product=${product.slug}#rfq`}>Yêu cầu báo giá</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="default"
          className="w-full rounded-full bg-white hover:bg-tea-dark-green"
        >
          <Link href={`/san-pham/${product.slug}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
