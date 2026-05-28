import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product-grid";
import {
  loadCatalogProducts,
  type CatalogProduct,
} from "@/lib/product-catalog";
import {
  normalizeProductTab,
  PRODUCT_TABS,
  tabLabel,
} from "@/lib/product-tab-config";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { WEBSITE_DATA } from "@/lib/website-data";
import { ProductCatalogSearch } from "@/components/products/product-catalog-search";
import { ProductsPagination } from "@/components/products/products-pagination/index";
import { ProductsHero } from "@/components/products/products-hero";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: WEBSITE_DATA.pages.products.title,
  description: WEBSITE_DATA.pages.products.description,
  path: "/san-pham",
});

type SearchParams = Promise<{ category?: string; q?: string; page?: string }>;

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, q, page } = await searchParams;
  const tab = normalizeProductTab(category);
  const query = (q ?? "").trim();
  const currentPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const pageSize = 8;

  const traQuanProducts = await loadCatalogProducts("nam-duong-tra-quan");

  let products: CatalogProduct[] = [];
  if (tab === "nam-duong-tra-quan") {
    products = traQuanProducts;
  } else if (tab !== "tat-ca") {
    products = await loadCatalogProducts(tab);
  } else {
    products = await loadCatalogProducts("tra-uong-cao-cap");
  }

  const filteredProducts = query
    ? products.filter((p) => {
        const haystack = `${p.name ?? ""} ${p.shortDescription ?? ""} ${p.description ?? ""}`
          .toLowerCase()
          .normalize("NFKD");
        const needle = query.toLowerCase().normalize("NFKD");
        return haystack.includes(needle);
      })
    : products;

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedProducts = filteredProducts.slice(start, start + pageSize);

  return (
    <div className="bg-tea-cream">
      <ProductsHero
        eyebrow={WEBSITE_DATA.pages.products.eyebrow}
        title="Danh mục Sản phẩm"
        description="Khám phá bộ sưu tập trà tinh hoa từ những vùng nguyên liệu thượng hạng nhất Việt Nam, được chế tác theo câu chuyện biệt dành cho đối tác doanh nghiệp và nhà phân phối."
      >
        <div className="w-full max-w-xl">
          <ProductCatalogSearch defaultValue={query} />
        </div>
      </ProductsHero>

      <section className="container mx-auto px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-14">
        {filteredProducts.length > 0 ? (
          <>
            <nav
              aria-label="Lọc theo danh mục"
              className="mb-10 flex flex-wrap items-center justify-center gap-3 md:mb-12"
            >
              {PRODUCT_TABS.map((t) => (
                <FilterChip
                  key={t.value}
                  href={t.href}
                  active={tab === t.value}
                >
                  {t.label}
                </FilterChip>
              ))}
            </nav>

            <ProductGrid products={pagedProducts} />

            {tab === "tat-ca" ? (
              <div className="mt-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border/70" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tea-muted">
                    Nam Dương trà quán
                  </p>
                  <div className="h-px flex-1 bg-border/70" />
                </div>
                <ProductGrid products={traQuanProducts} />
              </div>
            ) : null}

            <div className="mt-12 flex flex-col items-center gap-4">
              <ProductsPagination
                page={safePage}
                totalPages={totalPages}
                baseHref="/san-pham"
                params={{
                  ...(tab && tab !== "tat-ca" ? { category: tab } : {}),
                  ...(query ? { q: query } : {}),
                }}
              />

              <p className="text-sm text-tea-muted">
                Đang hiển thị {pagedProducts.length} / {filteredProducts.length}{" "}
                sản phẩm
                {tab ? ` · ${tabLabel(tab)}` : ""}.
              </p>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
        "border bg-white/40 text-tea-muted backdrop-blur",
        "border-border/70 hover:border-border hover:bg-white/70 hover:text-tea-dark-green",
        active
          ? "border-tea-dark-green/20 bg-tea-yellow-green/20 text-tea-dark-green"
          : "",
      )}
    >
      {children}
    </Link>
  );
}
