import Link from "next/link";

import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { ProductsHero } from "@/components/products/products-hero";
import type { CategoryLanding } from "@/data/content/catalog-tabs";
import { loadCatalogProducts } from "@/lib/product-catalog";

type CategoryCatalogPageProps = {
  landing: CategoryLanding;
};

export async function CategoryCatalogPage({ landing }: CategoryCatalogPageProps) {
  const products = await loadCatalogProducts(landing.slug);

  return (
    <div className="bg-tea-cream">
      <ProductsHero
        eyebrow="Danh mục"
        title={landing.title}
        description={landing.description}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/60 bg-white/20 text-white backdrop-blur-md hover:bg-white/30 hover:text-white"
          >
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/lien-he">Yêu cầu báo giá</Link>
          </Button>
        </div>
      </ProductsHero>

      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
