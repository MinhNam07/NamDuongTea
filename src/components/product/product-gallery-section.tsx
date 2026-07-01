import Image from "next/image";

import type { ProductLineContent } from "@/data/content/product-lines";

type ProductGallerySectionProps = {
  line: ProductLineContent;
};

export function ProductGallerySection({ line }: ProductGallerySectionProps) {
  if (line.images.gallery.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pb-14 md:px-6 md:pb-20">
      <h2 className="text-center font-display text-2xl font-bold text-line-primary">
        Hình ảnh sản phẩm
      </h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {line.images.gallery.map((src) => (
          <li
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line-accent/25 bg-white shadow-sm"
          >
            <Image
              src={src}
              alt={line.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
