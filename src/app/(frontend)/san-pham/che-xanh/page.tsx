import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { ProductsHero } from "@/components/products/products-hero";
import { loadCatalogProducts } from "@/lib/product-catalog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Chè xanh",
  description:
    "Bộ sưu tập Chè xanh Nam Dương Tea — hương tươi mát, hậu vị thanh, phù hợp thưởng trà và kênh phân phối.",
  path: "/san-pham/che-xanh",
});

export default async function CheXanhPage() {
  const products = await loadCatalogProducts("che-xanh");

  return (
    <div className="bg-tea-cream">
      <ProductsHero
        eyebrow="Danh mục"
        title="Chè xanh"
        description="Profile hương vị tươi mát, hậu vị thanh. Tuyển chọn phù hợp kênh đại lý và mô hình F&B cần chất lượng ổn định theo mùa."
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

      <section className="container mx-auto px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-14">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
