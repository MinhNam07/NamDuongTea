import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { ProductsHero } from "@/components/products/products-hero";
import { loadCatalogProducts } from "@/lib/product-catalog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Trà uống cao cấp",
  description:
    "Bộ sưu tập Trà uống cao cấp Nam Dương Tea — tuyển chọn tinh hoa, phù hợp quà tặng doanh nghiệp và phân phối cao cấp.",
  path: "/san-pham/tra-uong-cao-cap",
});

export default async function TraUongCaoCapPage() {
  const products = await loadCatalogProducts("tra-uong-cao-cap");

  return (
    <div className="bg-tea-cream">
      <ProductsHero
        eyebrow="Danh mục"
        title="Trà uống cao cấp"
        description="Tuyển chọn tinh hoa từ các dòng trà chủ lực, ưu tiên trải nghiệm hương vị cân bằng và chất lượng ổn định cho phân phối cao cấp."
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
