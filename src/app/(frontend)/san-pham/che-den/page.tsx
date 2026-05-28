import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { ProductsHero } from "@/components/products/products-hero";
import { loadCatalogProducts } from "@/lib/product-catalog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Chè đen",
  description:
    "Bộ sưu tập Chè đen Nam Dương Tea — sắc nước hổ phách, vị đậm đà, phù hợp pha nóng/lạnh và ứng dụng pha chế.",
  path: "/san-pham/che-den",
});

export default async function CheDenPage() {
  const products = await loadCatalogProducts("che-den");

  return (
    <div className="bg-tea-ivory">
      <ProductsHero
        eyebrow="Danh mục"
        title="Chè đen"
        description="Hương ngọt tự nhiên, vị đậm rõ. Phù hợp hệ đồ uống cần vị trà nền tốt cho pha chế và phục vụ số lượng lớn."
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
