"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

import { SectionEyebrowTitle } from "@/components/marketing/section-eyebrow-title";
import { Button } from "@/components/ui/button";
import {
  HOME_CATALOG_TABS,
  type HomeCatalogTabKey,
} from "@/lib/home-catalog-tabs";
import type { PublicProductPreview } from "@/lib/product-catalog";
import { cn } from "@/lib/utils";
import { WEBSITE_DATA } from "@/lib/website-data";

type TabKey = HomeCatalogTabKey;

export function ProductCollectionTilesSection({
  initialProductsByTab,
}: {
  initialProductsByTab: Record<string, PublicProductPreview[]>;
}) {
  const tabs = useMemo(() => HOME_CATALOG_TABS, []);

  const [active, setActive] = useState<TabKey>("green");

  const activeTab = tabs.find((t) => t.key === active);
  const activeSlug = activeTab?.category ?? "che-xanh";
  const activeLabel = activeTab?.label ?? "";
  const items = initialProductsByTab[activeSlug] ?? [];

  return (
    <section
      id="products"
      aria-label="Danh mục sản phẩm"
      className="w-full bg-tea-ivory px-6 py-24 md:px-[5vw] md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-12 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div className="max-w-2xl">
            <SectionEyebrowTitle
              eyebrow="Danh mục sản phẩm"
              title="Những dòng trà"
              titleEmphasis="chủ lực"
            />

            <p className="mt-5 max-w-xl text-base leading-relaxed text-tea-muted md:text-lg">
              Tuyển tập những dòng trà nguyên liệu xuất sắc nhất, đáp ứng đa
              dạng nhu cầu sản xuất và phân phối chuyên nghiệp.
            </p>
          </div>

          <div className="md:justify-self-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    active === t.key
                      ? "border-tea-olive bg-tea-dark-green text-white"
                      : "border-border bg-white text-tea-muted hover:bg-tea-green-50 hover:text-tea-dark-green",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.length > 0 ? (
            items.map((p) => <HomeProductCard key={String(p.id)} product={p} />)
          ) : (
            <div className="rounded-[28px] border border-dashed border-tea-moss/25 bg-white p-10 text-center md:col-span-2 lg:col-span-3">
              <p className="font-display text-xl font-bold text-tea-dark-green">
                Chưa có sản phẩm
              </p>
              <p className="mt-2 text-sm text-tea-muted">
                Không có sản phẩm cho danh mục “{activeLabel}” ở thời điểm hiện tại.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            className="rounded-full bg-tea-dark-green px-8 text-white hover:bg-tea-moss"
          >
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function HomeProductCard({ product }: { product: PublicProductPreview }) {
  const href = `/san-pham/${product.slug}`;
  const imageUrl = product.image ?? WEBSITE_DATA.brand.assets.storyFarm;
  const imageAlt = product.imageAlt ?? product.name;
  const description = product.shortDescription ?? null;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] bg-tea-green-50">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="p-7">
        <h3 className="font-display text-2xl font-extrabold text-tea-dark-green">
          <Link href={href} className="transition-colors hover:text-tea-moss">
            {product.name}
          </Link>
        </h3>

        {description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-tea-muted">
            {description}
          </p>
        ) : null}

        <p className="mt-6 text-sm font-semibold text-tea-deep-brown">
          <span className="text-tea-muted">Quy cách:</span>{" "}
          {product.moq ?? "Liên hệ để nhận MOQ"}
        </p>

        <div className="mt-7 flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-tea-dark-green transition-colors hover:text-tea-moss"
          >
            <span>Xem thêm</span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          <Button asChild size="icon" className="h-11 w-11 rounded-full bg-tea-dark-green text-white hover:bg-tea-moss">
            <Link href={`/lien-he?product=${product.slug}#rfq`}>
              <Plus className="h-5 w-5" aria-hidden />
              <span className="sr-only">Yêu cầu báo giá</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
