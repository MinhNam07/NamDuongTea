import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCategoryCard } from "@/components/marketing/product-category-card";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { PRODUCT_LINES } from "@/lib/product-lines";
import type { ProductCardProduct } from "@/components/product-card";

type ProductOverviewSectionProps = {
  featured?: ProductCardProduct[];
};

export function ProductOverviewSection({
  featured = [],
}: ProductOverviewSectionProps) {
  return (
    <section className="bg-white/60 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tea-olive">
            Sản phẩm
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-dark-green md:text-4xl">
            Trà Nam Dương
          </h2>
          <p className="mt-4 text-base text-tea-muted md:text-lg">
            Tinh hoa trà Việt từ vùng đồi chè Nam Dương — phục vụ đại lý, nhà
            phân phối và chuỗi F&B với dải sản phẩm đa dạng, chất lượng ổn
            định.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/san-pham">
              Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRODUCT_LINES.map((line) => (
            <ProductCategoryCard
              key={line.slug}
              name={line.name}
              href={line.href}
              image={line.image}
              description={line.description}
            />
          ))}
        </div>

        {featured.length > 0 ? (
          <div className="mt-20">
            <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-tea-olive">
                  Nổi bật
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-tea-dark-green md:text-3xl">
                  Sản phẩm được chọn lọc
                </h3>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/san-pham">Xem tất cả</Link>
              </Button>
            </header>
            <ProductGrid products={featured} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
