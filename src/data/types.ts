export type SeoFields = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
  canonical?: string | null;
};

export type ProductCategoryRef = {
  id?: string | number;
  name?: string | null;
  slug?: string | null;
};

export type ProductImage = {
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
};

export type ProductDetailTab = {
  key: "huong-vi" | "quy-trinh" | "pha-tra";
  label: string;
  heading?: string | null;
  paragraphs: string[];
  bullets: { title: string; text: string }[];
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export type StorefrontProduct = {
  id: string | number;
  name: string;
  slug: string;
  sku?: string | null;
  shortDescription?: string | null;
  description?: unknown;
  origin?: string | null;
  moq?: string | null;
  priceVnd?: number | null;
  priceNote?: string | null;
  packaging?: string | null;
  image?: ProductImage | null;
  gallery: ProductImage[];
  category?: ProductCategoryRef | null;
  categories: ProductCategoryRef[];
  productLineSlug?: string | null;
  isFeatured: boolean;
  giftTeas?: { name: string; weight: string }[];
  giftHighlights?: string[];
  gallerySlidesReversed?: boolean;
  detailTabs: ProductDetailTab[];
  specs: { label: string; value: string }[];
  seo?: SeoFields | null;
  legacyImagePath?: string | null;
  theme?: import("@/data/content/product-lines/types").ProductThemeTokens | null;
};

export type StorefrontProductLine = {
  slug: string;
  title: string;
  shortDescription?: string | null;
  description?: unknown;
  href: string;
  hasDetailPage: boolean;
  order: number;
  active: boolean;
  heroImageUrl?: string | null;
  cardImageUrl?: string | null;
  gallery: string[];
  legacyImagePath?: string | null;
  seo?: SeoFields | null;
};

export type StorefrontCategory = {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
  order?: number;
  active?: boolean;
  imageUrl?: string | null;
};

export type StorefrontPost = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: unknown;
  author?: string | null;
  publishedAt?: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  tags: string[];
  seo?: SeoFields | null;
};

export type NavLink = {
  label: string;
  href?: string | null;
  children?: NavLink[];
};

export type SiteSettingsData = {
  siteName?: string | null;
  defaultTitle?: string | null;
  defaultDescription?: string | null;
  footerTagline?: string | null;
  contact?: {
    location?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  social?: {
    facebook?: string | null;
    zalo?: string | null;
    whatsapp?: string | null;
    youtube?: string | null;
    supportChatUrl?: string | null;
  };
  announcement?: string | null;
  primaryNav: NavLink[];
  footerQuickLinks: NavLink[];
  footerProductLinks: NavLink[];
  seo?: SeoFields | null;
};

export type HomePageData = {
  hero?: {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    imageUrl?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  };
  featuredProductLineSlugs: string[];
  featuredProductSlugs: string[];
  alternatingStories: {
    title?: string | null;
    body?: string | null;
    imageUrl?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  }[];
  craftTimeline: {
    step?: string | null;
    title?: string | null;
    description?: string | null;
  }[];
  cta?: {
    title?: string | null;
    description?: string | null;
    primaryLabel?: string | null;
    primaryHref?: string | null;
    secondaryLabel?: string | null;
    secondaryHref?: string | null;
  };
  seo?: SeoFields | null;
};
