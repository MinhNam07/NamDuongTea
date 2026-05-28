import {
  ProductCard,
  type ProductCardProduct,
} from "@/components/product-card";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
}: {
  products: ProductCardProduct[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-tea-green/30 bg-white p-12 text-center">
        <p className="font-display text-xl text-tea-green">
          Chưa có sản phẩm nào
        </p>
        <p className="text-sm text-tea-muted mt-2">
          Hãy quay lại sau hoặc liên hệ trực tiếp để nhận catalog đầy đủ.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8",
        className,
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
