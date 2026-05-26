import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductCategoryCardProps = {
  name: string;
  href: string;
  image: string;
  description: string;
  className?: string;
};

export function ProductCategoryCard({
  name,
  href,
  image,
  description,
  className,
}: ProductCategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-tea-moss/30 bg-white shadow-sm transition-all hover:border-tea-yellow-green hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-tea-green-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-tea-dark-green">
          {name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-tea-muted">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tea-moss group-hover:text-tea-dark-green">
          Xem thêm <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
