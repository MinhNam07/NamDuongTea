"use client";

import Image from "next/image";
import { useState } from "react";

import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tet-gift-sets";
import { cn } from "@/lib/utils";
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

function imageCandidates(slug: string) {
  return EXTENSIONS.map(
    (ext) => `/images/products/tet-gift-sets/${slug}${ext}`,
  );
}

type TetGiftProductImageProps = {
  slug: string;
  name: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Product cutout — object-contain only (no stretch/distort).
 * Falls back to premium placeholder until photos are imported.
 */
export function TetGiftProductImage({
  slug,
  name,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: TetGiftProductImageProps) {
  const candidates = imageCandidates(slug);
  const [index, setIndex] = useState(0);
  const failed = index >= candidates.length;
  const src = candidates[Math.min(index, candidates.length - 1)];

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-gradient-to-b from-tea-ivory to-tea-cream px-6 text-center",
          className,
        )}
        aria-label={name}
      >
        <div className="h-px w-12 bg-tea-gold/60" />
        <p className="mt-4 font-display text-lg font-semibold tracking-wide text-tea-deep-brown">
          {name}
        </p>
        <p className="mt-2 max-w-[14rem] text-xs uppercase tracking-[0.2em] text-tea-muted">
          {TRA_QUAN_COLLECTION_NAME} · Nam Dương Tea
        </p>
        <div className="mt-4 h-px w-12 bg-tea-gold/60" />
      </div>
    );
  }

  return (
    <div className={cn("relative bg-tea-ivory", className)}>
      <Image
        src={src}
        alt={name}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain object-center p-4 md:p-6"
        onError={() => setIndex((i) => i + 1)}
      />
    </div>
  );
}
