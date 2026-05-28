"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WEBSITE_DATA } from "@/lib/website-data";

const GREEN_SLUG = "tra-xanh";
const BLACK_SLUG = "tra-den";
const TRA_QUAN_SLUG = "nam-duong-tra-quan";

type TabKey = "green" | "black" | "tra-quan";

type ProductPreviewItem = {
  id: string | number;
  name: string;
  slug: string;
  shortDescription?: string | null;
  origin?: string | null;
  moq?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  category?: { name?: string | null; slug?: string | null } | null;
};

export function ProductCollectionTilesSection() {
  const tabs = useMemo(
    () =>
      [
        { key: "green" as const, label: "Chè xanh", slug: GREEN_SLUG },
        { key: "black" as const, label: "Chè đen", slug: BLACK_SLUG },
        { key: "tra-quan" as const, label: "Nam Dương trà quán", slug: TRA_QUAN_SLUG },
      ] as const,
    [],
  );

  const [active, setActive] = useState<TabKey>("green");
  const [items, setItems] = useState<ProductPreviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeSlug = tabs.find((t) => t.key === active)?.slug ?? GREEN_SLUG;
  const activeLabel = tabs.find((t) => t.key === active)?.label ?? "";

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/public/products?category=${encodeURIComponent(activeSlug)}&limit=3`,
          {
            method: "GET",
            headers: { accept: "application/json" },
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error("products");
        const data = (await res.json()) as { items?: ProductPreviewItem[] };
        const next = Array.isArray(data.items) ? data.items : [];
        if (cancelled) return;
        setItems(next);
      } catch (e) {
        if (cancelled) return;
        const err = e as { name?: string } | null | undefined;
        if (err?.name === "AbortError") return;
        setItems([]);
        setError("Không thể tải sản phẩm lúc này.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [activeSlug]);

  return (
    <section
      id="products"
      className="w-full px-6 py-28 md:px-[5vw] md:py-32"
      aria-label="Danh mục sản phẩm"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-tea-dark-green md:text-5xl">
              Danh Mục
              <br />
              <span className="font-serif italic font-medium text-tea-olive">
                Sản Phẩm
              </span>
            </h2>
            <p className="mt-5 text-base text-tea-muted md:text-lg">
              Tuyển tập những dòng trà nguyên liệu xuất sắc nhất, đáp ứng đa dạng
              nhu cầu sản xuất và phân phối chuyên nghiệp.
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
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active === t.key
                      ? "border-tea-olive bg-tea-warm-ivory text-tea-dark-green"
                      : "border-border bg-white text-tea-muted hover:bg-tea-green-50",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <ProductCardSkeletons />
          ) : items.length > 0 ? (
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

        {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="default"
            className="rounded-full bg-tea-dark-green px-8 text-white hover:bg-tea-moss"
          >
            <Link href="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductCardSkeletons() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[28px] border border-border bg-white shadow-sm"
        >
          <div className="aspect-[4/3] w-full animate-pulse bg-tea-green-50" />
          <div className="p-7">
            <div className="h-6 w-4/5 animate-pulse rounded-md bg-tea-green-50" />
            <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-tea-green-50" />
            <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-tea-green-50" />
            <div className="mt-6 h-4 w-1/2 animate-pulse rounded-md bg-tea-green-50" />
            <div className="mt-7 flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded-md bg-tea-green-50" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-tea-green-50" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function HomeProductCard({ product }: { product: ProductPreviewItem }) {
  const href = `/san-pham/${product.slug}`;
  const imageUrl = product.image ?? WEBSITE_DATA.brand.assets.storyFarm;
  const imageAlt = product.imageAlt ?? product.name;
  const description = product.shortDescription ?? null;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] bg-tea-green-50">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-tea-dark-green backdrop-blur">
            Bán sỉ
          </span>
        </div>
      </Link>

      <div className="p-7">
        <h3 className="font-display text-2xl font-extrabold text-tea-dark-green">
          <Link href={href} className="transition-colors hover:text-tea-moss">
            {product.name}
          </Link>
        </h3>
        {description ? (
          <p className="mt-3 text-sm text-tea-muted line-clamp-3">
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

          <Button
            asChild
            size="icon"
            className="h-11 w-11 rounded-full bg-tea-dark-green text-white hover:bg-tea-moss"
          >
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

