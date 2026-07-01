import type { ProductLineContent } from "@/data/content/product-lines";
import { productLineHref } from "@/data/content/product-lines";
import { TRA_QUAN_COLLECTION_NAME } from "@/lib/tra-quan";

import type {
  StorefrontProduct,
  StorefrontProductLine,
} from "@/data/types";

export function toStorefrontProductLine(
  line: ProductLineContent,
  order: number,
): StorefrontProductLine {
  return {
    slug: line.slug,
    title: line.name,
    shortDescription: line.description,
    description: line.detail,
    href: productLineHref(line.slug),
    hasDetailPage: line.hasDetailPage,
    order,
    active: true,
    heroImageUrl: line.images.hero,
    cardImageUrl: line.images.hero,
    gallery: [...line.images.gallery],
    legacyImagePath: line.images.hero,
  };
}

export function toStorefrontProduct(line: ProductLineContent): StorefrontProduct {
  return {
    id: line.slug,
    name: line.name,
    slug: line.slug,
    shortDescription: line.description,
    description: line.detail,
    origin: null,
    moq: null,
    image: { url: line.images.hero, alt: line.name },
    gallery: line.images.gallery.map((url) => ({ url, alt: line.name })),
    category: null,
    categories: [],
    isFeatured: false,
    detailTabs: line.detailTabs.map((t) => ({
      key: t.key,
      label: t.label,
      heading: t.heading,
      paragraphs: t.paragraphs,
      bullets: t.bullets.map((b) => ({ title: b.title, text: b.text })),
      imageUrl: t.image.src,
      imageAlt: t.image.alt,
    })),
    specs: [],
    legacyImagePath: line.images.hero,
    theme: line.theme,
  };
}

export function traQuanToStorefrontProduct(tq: {
  id: string | number;
  name: string;
  slug: string;
  tagline: string;
  priceVnd: number | null;
  imageUrl: string | null;
  teas: { name: string; weight: string }[];
  giftHighlights: string[];
  gallerySlidesReversed: boolean;
}): StorefrontProduct {
  return {
    id: tq.id,
    name: tq.name,
    slug: tq.slug,
    shortDescription: tq.tagline,
    priceVnd: tq.priceVnd,
    image: tq.imageUrl ? { url: tq.imageUrl, alt: tq.name } : null,
    gallery: [],
    category: { name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" },
    categories: [{ name: TRA_QUAN_COLLECTION_NAME, slug: "nam-duong-tra-quan" }],
    isFeatured: false,
    giftTeas: tq.teas,
    giftHighlights: tq.giftHighlights,
    gallerySlidesReversed: tq.gallerySlidesReversed,
    detailTabs: [],
    specs: [],
  };
}
