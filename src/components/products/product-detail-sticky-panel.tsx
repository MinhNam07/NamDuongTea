import Link from "next/link";

import { Download, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RfqButton } from "@/components/rfq-button";
import { cn } from "@/lib/utils";

export type ProductDetailStickySpec = { label: string; value: string };

export function ProductDetailStickyPanel({
  badge,
  title,
  description,
  specs,
  productSlug,
  productName,
  className,
}: {
  badge?: string | null;
  title: string;
  description?: string | null;
  specs: ProductDetailStickySpec[];
  productSlug: string;
  productName: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="sticky top-40 flex flex-col gap-8">
        <div>
          {badge ? (
            <Badge
              variant="outline"
              className={cn(
                "mb-4 rounded-full bg-background/60 text-foreground backdrop-blur",
              )}
            >
              {badge}
            </Badge>
          ) : null}

          <h1 className="font-display text-3xl font-extrabold text-foreground md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        {specs.length > 0 ? (
          <div className="border-y border-border/60 py-4">
            <dl className="grid grid-cols-2 gap-y-4 text-sm md:text-base">
              {specs.map((s) => (
                <div key={s.label} className="contents">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-right font-semibold text-foreground">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <div
          className={cn(
            "glass-panel rounded-2xl p-6",
            "shadow-[0_6px_24px_rgba(37,74,12,0.08)]",
          )}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Liên hệ để nhận chính sách giá sỉ tốt nhất
          </p>

          <div className="mt-4">
            <RfqButton
              productSlug={productSlug}
              productName={productName}
              className="w-full rounded-2xl"
              showIcon
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              asChild
              variant="outline"
              className="w-full rounded-2xl bg-background/80 hover:bg-background"
            >
              <Link href="/lien-he" className="inline-flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" aria-hidden />
                <span>Tư vấn ngay</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-2xl bg-background/80 hover:bg-background"
            >
              <Link
                href={`/lien-he?product=${productSlug}#rfq`}
                className="inline-flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" aria-hidden />
                <span>Tải Catalogue</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

