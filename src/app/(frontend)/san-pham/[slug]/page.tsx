import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RfqButton } from "@/components/rfq-button";
import { getPayloadClient } from "@/lib/payload";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

async function loadProduct(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: "published" } },
        ],
      },
      depth: 2,
      limit: 1,
    });
    return docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) {
    return buildMetadata({
      title: "Sản phẩm không tồn tại",
      path: `/san-pham/${slug}`,
    });
  }
  const seo = (product as { seo?: { metaTitle?: string; metaDescription?: string } }).seo;
  return buildMetadata({
    title: seo?.metaTitle || (product.name as string),
    description:
      seo?.metaDescription ||
      ((product as { shortDescription?: string }).shortDescription ?? undefined),
    path: `/san-pham/${slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const p = product as unknown as {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    origin?: string;
    moq?: string;
    image?: { url?: string; alt?: string } | null;
    gallery?: { image?: { url?: string; alt?: string } }[];
    specs?: { label: string; value: string }[];
    category?: { name?: string; slug?: string } | null;
  };

  const heroUrl = p.image?.url ?? p.gallery?.[0]?.image?.url ?? null;
  const heroAlt = p.image?.alt ?? p.name;

  return (
    <div className="bg-tea-cream pb-16">
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto flex items-center gap-1 px-4 py-4 text-sm text-tea-muted md:px-6"
      >
        <Link href="/" className="hover:text-tea-green">Trang chủ</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/san-pham" className="hover:text-tea-green">Sản phẩm</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-tea-ink">{p.name}</span>
      </nav>

      <section className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tea-green-50">
            {heroUrl ? (
              <Image
                src={heroUrl}
                alt={heroAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-tea-green/40">
                <Leaf className="h-16 w-16" />
              </div>
            )}
          </div>
          {p.gallery && p.gallery.length > 0 ? (
            <div className="grid grid-cols-4 gap-3">
              {p.gallery.slice(0, 4).map((g, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl bg-tea-green-50"
                >
                  {g.image?.url ? (
                    <Image
                      src={g.image.url}
                      alt={g.image.alt ?? `${p.name} - ${i + 1}`}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          {p.category?.name ? (
            <Badge variant="muted" className="mb-3">
              {p.category.name}
            </Badge>
          ) : null}
          <h1 className="font-display text-3xl font-bold text-tea-green md:text-4xl">
            {p.name}
          </h1>
          {p.shortDescription ? (
            <p className="mt-4 text-tea-muted md:text-lg">{p.shortDescription}</p>
          ) : null}

          <dl className="mt-8 grid gap-4 rounded-2xl border border-tea-green/10 bg-white p-6">
            {p.origin ? (
              <div className="flex justify-between gap-4">
                <dt className="text-sm text-tea-muted">Vùng nguyên liệu</dt>
                <dd className="text-sm font-medium text-tea-ink">{p.origin}</dd>
              </div>
            ) : null}
            {p.moq ? (
              <div className="flex justify-between gap-4">
                <dt className="text-sm text-tea-muted">MOQ</dt>
                <dd className="text-sm font-medium text-tea-ink">{p.moq}</dd>
              </div>
            ) : null}
            {p.specs?.map((s) => (
              <div key={s.label} className="flex justify-between gap-4">
                <dt className="text-sm text-tea-muted">{s.label}</dt>
                <dd className="text-sm font-medium text-tea-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <RfqButton productSlug={p.slug} productName={p.name} />
            <Button asChild variant="outline" size="lg">
              <Link href="/lien-he">Liên hệ tư vấn</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
