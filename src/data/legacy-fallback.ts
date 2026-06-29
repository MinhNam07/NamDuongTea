import "server-only";

import {
  PRODUCT_LINES,
  TEA_PRODUCT_LINES,
  type ProductLine,
} from "@/lib/product-lines";
import { getProductDetailTabs } from "@/lib/product-detail-tabs";
import {
  getWhitelistSlugsForTab,
  prepareCatalogProducts,
  type ProductTab,
} from "@/lib/product-tab-config";
import { WEBSITE_DATA } from "@/lib/website-data";
import { loadTraQuanProducts } from "@/lib/tra-quan-products";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";

import type {
  HomePageData,
  SiteSettingsData,
  StorefrontCategory,
  StorefrontPost,
  StorefrontProduct,
  StorefrontProductLine,
} from "@/data/types";

function mapProductLine(line: ProductLine, order: number): StorefrontProductLine {
  return {
    slug: line.slug,
    title: line.name,
    shortDescription: line.description,
    description: line.detail,
    href: line.href,
    hasDetailPage: line.hasDetailPage,
    order,
    active: true,
    heroImageUrl: line.image,
    cardImageUrl: line.image,
    gallery: [...line.gallery],
    legacyImagePath: line.image,
  };
}

function productLineToStorefrontProduct(line: ProductLine): StorefrontProduct {
  const tabs = getProductDetailTabs(line.slug);
  return {
    id: line.slug,
    name: line.name,
    slug: line.slug,
    shortDescription: line.description,
    description: line.detail,
    origin: null,
    moq: null,
    image: { url: line.image, alt: line.name },
    gallery: line.gallery.map((url) => ({ url, alt: line.name })),
    category: null,
    categories: [],
    isFeatured: false,
    detailTabs: tabs.map((t) => ({
      key: t.key,
      label: t.label,
      heading: t.heading,
      paragraphs: t.paragraphs,
      bullets: t.bullets.map((b) => ({ title: b.title, text: b.text })),
      imageUrl: t.image.src,
      imageAlt: t.image.alt,
    })),
    specs: [],
    legacyImagePath: line.image,
  };
}

/** Static seed data when Payload/DB is unreachable or empty. */
export function staticTeaProductsForTab(
  tab: ProductTab,
  options?: { limit?: number },
): StorefrontProduct[] {
  if (tab === "nam-duong-tra-quan") return [];

  const candidates = TEA_PRODUCT_LINES.map((line) => ({
    id: line.slug,
    name: line.name,
    slug: line.slug,
    shortDescription: line.description,
    image: line.image,
    category: null,
  }));

  const prepared = prepareCatalogProducts(
    candidates as Parameters<typeof prepareCatalogProducts>[0],
    tab as Exclude<ProductTab, "nam-duong-tra-quan">,
  );

  const bySlug = new Map(
    TEA_PRODUCT_LINES.map((line) => [line.slug, productLineToStorefrontProduct(line)]),
  );

  const items = prepared
    .map((p) => bySlug.get(p.slug))
    .filter((p): p is StorefrontProduct => Boolean(p));

  return options?.limit ? items.slice(0, options.limit) : items;
}

export async function legacyGetProductLines(): Promise<StorefrontProductLine[]> {
  return PRODUCT_LINES.map((line, index) => mapProductLine(line, index));
}

export async function legacyGetProductLineBySlug(
  slug: string,
): Promise<StorefrontProductLine | null> {
  const line = TEA_PRODUCT_LINES.find((p) => p.slug === slug);
  if (!line) return null;
  return mapProductLine(line, 0);
}

export async function legacyGetProductsForTab(
  tab: ProductTab,
  options?: { limit?: number },
): Promise<StorefrontProduct[]> {
  if (tab === "nam-duong-tra-quan") {
    const traQuan = await loadTraQuanProducts();
    const items = traQuan.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.tagline,
      origin: null,
      moq: null,
      priceVnd: p.priceVnd,
      image: p.imageUrl
        ? { url: p.imageUrl, alt: p.name }
        : null,
      gallery: [],
      category: { name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" },
      categories: [{ name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" }],
      isFeatured: false,
      giftTeas: p.teas,
      giftHighlights: p.giftHighlights,
      gallerySlidesReversed: p.gallerySlidesReversed,
      detailTabs: [],
      specs: [],
    }));
    return options?.limit ? items.slice(0, options.limit) : items;
  }

  const { getPayloadClient } = await import("@/data/payload");
  const slugs = getWhitelistSlugsForTab(tab);

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [
          { status: { equals: "published" } },
          { slug: { in: slugs } },
        ],
      },
      depth: 1,
      limit: 50,
    });

    const prepared = prepareCatalogProducts(
      docs as Parameters<typeof prepareCatalogProducts>[0],
      tab,
    );

    const mapped: StorefrontProduct[] = prepared.map((doc) => ({
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
      shortDescription: doc.shortDescription ?? null,
      origin: (doc as { origin?: string }).origin ?? null,
      moq: (doc as { moq?: string }).moq ?? null,
      image:
        typeof doc.image === "string"
          ? { url: doc.image, alt: doc.name }
          : doc.image?.url
            ? {
                url: doc.image.sizes?.card?.url ?? doc.image.url,
                alt: doc.image.alt ?? doc.name,
              }
            : null,
      gallery: [],
      category:
        doc.category && typeof doc.category === "object"
          ? {
              name: doc.category.name ?? null,
              slug: doc.category.slug ?? null,
            }
          : null,
      categories: [],
      isFeatured: false,
      detailTabs: [],
      specs: [],
    }));

    const result = options?.limit ? mapped.slice(0, options.limit) : mapped;
    return result.length > 0 ? result : staticTeaProductsForTab(tab, options);
  } catch {
    return staticTeaProductsForTab(tab, options);
  }
}

export async function legacyGetSiteSettings(): Promise<SiteSettingsData> {
  const nav = WEBSITE_DATA.navigation;
  return {
    siteName: WEBSITE_DATA.site.name,
    defaultTitle: WEBSITE_DATA.site.defaultTitle,
    defaultDescription: WEBSITE_DATA.site.defaultDescription,
    footerTagline: WEBSITE_DATA.brand.footerTagline,
    contact: nav.footer.contact,
    social: nav.social,
    primaryNav: nav.primary.map((item) => ({
      label: item.label,
      href: "href" in item ? item.href : null,
      children: "children" in item ? item.children : undefined,
    })),
    footerQuickLinks: nav.footer.quickLinks,
    footerProductLinks: nav.footer.productLinks,
  };
}

export async function legacyGetHomePage(): Promise<HomePageData> {
  const home = WEBSITE_DATA.pages.home;
  return {
    hero: {
      title: WEBSITE_DATA.site.defaultTitle,
      subtitle: WEBSITE_DATA.site.defaultDescription,
      imageUrl: WEBSITE_DATA.brand.assets.hero,
    },
    featuredProductLineSlugs: PRODUCT_LINES.map((l) => l.slug),
    featuredProductSlugs: [],
    alternatingStories: (home.alternatingStories ?? []).map((story) => ({
      title: story.title,
      body: story.paragraphs?.join("\n\n") ?? "",
      ctaLabel: story.link?.label,
      ctaHref: story.link?.href,
    })),
    craftTimeline: (home.craftTimeline ?? []).map((step) => ({
      step: step.id,
      title: step.title,
      description: step.description,
    })),
  };
}

export async function legacyGetPosts(options?: {
  limit?: number;
}): Promise<StorefrontPost[]> {
  try {
    const { getPayloadClient } = await import("@/data/payload");
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: options?.limit ?? 20,
      depth: 1,
    });

    return docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt ?? null,
      body: doc.body,
      publishedAt: doc.publishedAt ?? null,
      coverImageUrl:
        typeof doc.coverImage === "object" && doc.coverImage?.url
          ? doc.coverImage.url
          : null,
      coverImageAlt:
        typeof doc.coverImage === "object"
          ? doc.coverImage?.alt ?? doc.title
          : doc.title,
      tags: [],
    }));
  } catch {
    return [];
  }
}

export async function legacyGetPostBySlug(
  slug: string,
): Promise<StorefrontPost | null> {
  const posts = await legacyGetPosts({ limit: 100 });
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function legacyGetProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  const traQuan = await loadTraQuanProducts();
  const tq = traQuan.find((p) => p.slug === slug);
  if (tq) {
    return {
      id: tq.id,
      name: tq.name,
      slug: tq.slug,
      shortDescription: tq.tagline,
      priceVnd: tq.priceVnd,
      image: tq.imageUrl ? { url: tq.imageUrl, alt: tq.name } : null,
      gallery: [],
      category: { name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" },
      categories: [],
      isFeatured: false,
      giftTeas: tq.teas,
      giftHighlights: tq.giftHighlights,
      gallerySlidesReversed: tq.gallerySlidesReversed,
      detailTabs: [],
      specs: [],
    };
  }

  try {
    const { getPayloadClient } = await import("@/data/payload");
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "products",
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      },
      depth: 2,
      limit: 1,
    });
    const doc = docs[0];
    if (!doc) return null;

    const tabs = getProductDetailTabs(slug);
    return {
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
      shortDescription: doc.shortDescription ?? null,
      description: doc.description,
      origin: doc.origin ?? null,
      moq: doc.moq ?? null,
      priceVnd: doc.priceVnd ?? null,
      image:
        typeof doc.image === "object" && doc.image?.url
          ? {
              url: doc.image.url,
              alt: doc.image.alt ?? doc.name,
            }
          : null,
      gallery: [],
      category:
        typeof doc.category === "object" && doc.category
          ? { name: doc.category.name, slug: doc.category.slug }
          : null,
      categories: [],
      isFeatured: Boolean(doc.isFeatured),
      detailTabs: tabs.map((t) => ({
        key: t.key,
        label: t.label,
        heading: t.heading,
        paragraphs: t.paragraphs,
        bullets: t.bullets.map((b) => ({ title: b.title, text: b.text })),
        imageUrl: t.image.src,
        imageAlt: t.image.alt,
      })),
      specs: (doc.specs ?? []).map((s) => ({
        label: s.label,
        value: s.value,
      })),
      seo: doc.seo
        ? {
            metaTitle: doc.seo.metaTitle,
            metaDescription: doc.seo.metaDescription,
          }
        : null,
    };
  } catch {
    return null;
  }
}

export async function legacyGetCategories(): Promise<StorefrontCategory[]> {
  try {
    const { getPayloadClient } = await import("@/data/payload");
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "categories",
      limit: 50,
      sort: "name",
    });
    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
      description: doc.description ?? null,
    }));
  } catch {
    return [];
  }
}
