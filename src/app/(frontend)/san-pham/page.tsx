import Link from "next/link";
import type { Metadata } from "next";

import { ProductCategoryCard } from "@/components/marketing/product-category-card";
import { ProductGrid } from "@/components/product-grid";
import type { ProductCardProduct } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { getPayloadClient } from "@/lib/payload";
import { PRODUCT_LINES } from "@/lib/product-lines";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Sản phẩm trà",
  description:
    "Bạch trà shan tuyết, trà đinh ngọc, hồng trà, trà ô long và Nam Dương trà quán — phục vụ đại lý, nhà phân phối và xuất khẩu.",
  path: "/san-pham",
});

type SearchParams = Promise<{ category?: string }>;

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;

  let products: ProductCardProduct[] = [];
  let categories: { id: string; name: string; slug: string }[] = [];

  try {
    const payload = await getPayloadClient();

    const [{ docs: categoryDocs }, { docs: productDocs }] = await Promise.all([
      payload.find({ collection: "categories", limit: 50, sort: "name" }),
      payload.find({
        collection: "products",
        where: {
          and: [
            { status: { equals: "published" } },
            ...(category
              ? [{ "category.slug": { equals: category } }]
              : []),
          ],
        },
        depth: 1,
        limit: 24,
        sort: "-updatedAt",
      }),
    ]);

    categories = categoryDocs.map((c) => ({
      id: String(c.id),
      name: c.name as string,
      slug: c.slug as string,
    }));
    products = productDocs as unknown as ProductCardProduct[];
  } catch {
    products = [];
    categories = [];
  }

  return (
    <div className="bg-tea-cream">
      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-tea-brown-700">
            Catalog
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-tea-green md:text-5xl">
            Sản phẩm trà
          </h1>
          <p className="mt-4 text-tea-muted md:text-lg">
            Bạch trà shan tuyết, trà đinh ngọc, hồng trà, trà ô long và bộ quà
            Nam Dương trà quán — tuyển chọn từ vùng nguyên liệu Nam Dương.
            Liên hệ để nhận bảng giá theo MOQ và mẫu thử miễn phí.
          </p>
        </header>

        <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

        {categories.length > 0 || products.length > 0 ? (
          <>
        <nav
          aria-label="Lọc theo danh mục"
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <FilterPill href="/san-pham" active={!category}>
            Tất cả
          </FilterPill>
          {categories.map((c) => (
            <FilterPill
              key={c.id}
              href={`/san-pham?category=${c.slug}`}
              active={category === c.slug}
            >
              {c.name}
            </FilterPill>
          ))}
        </nav>

        <ProductGrid products={products} />

        <p className="mt-12 text-sm text-tea-muted">
          Đang hiển thị {products.length} sản phẩm
          {category ? ` · danh mục "${category}"` : ""}.
        </p>
          </>
        ) : null}
      </section>
    </div>
  );
}

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Badge
        variant={active ? "default" : "outline"}
        className={cn(
          "cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors",
          !active && "hover:bg-tea-green-50",
        )}
      >
        {children}
      </Badge>
    </Link>
  );
}
