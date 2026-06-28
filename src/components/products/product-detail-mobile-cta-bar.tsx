"use client";

import { RfqButton } from "@/components/rfq-button";
import { cn } from "@/lib/utils";

export function ProductDetailMobileCtaBar({
  productSlug,
  productName,
  className,
}: {
  productSlug: string;
  productName: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-[rgba(246,252,235,0.95)] p-4 backdrop-blur-md safe-bottom md:hidden",
        className,
      )}
      aria-label="Yêu cầu báo giá nhanh"
    >
      <RfqButton
        productSlug={productSlug}
        productName={productName}
        className="w-full rounded-2xl"
        showIcon
      />
    </div>
  );
}
