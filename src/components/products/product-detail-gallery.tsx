"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type ProductDetailGalleryImage = {
  src: string;
  alt: string;
};

export function ProductDetailGallery({
  images,
  className,
}: {
  images: ProductDetailGalleryImage[];
  className?: string;
}) {
  const safeImages = useMemo(() => images.filter((i) => Boolean(i.src)), [images]);
  const [active, setActive] = useState(0);

  if (safeImages.length === 0) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl bg-muted text-muted-foreground",
          "flex h-[420px] items-center justify-center",
          className,
        )}
      >
        Không có hình ảnh
      </div>
    );
  }

  const activeImage = safeImages[Math.min(active, safeImages.length - 1)];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl glass-panel",
          "h-[420px] md:h-[560px]",
          "shadow-[0_8px_32px_0_rgba(37,74,12,0.10)]",
        )}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>

      {safeImages.length > 1 ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {safeImages.slice(0, 8).map((img, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={`${img.src}-${idx}`}
                type="button"
                onClick={() => setActive(idx)}
                className={cn(
                  "relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                  isActive
                    ? "border-ring/70"
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-border",
                )}
                aria-label={`Xem ảnh ${idx + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

