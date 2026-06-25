export const CACHE_TAGS = {
  products: "products",
  productLines: "product-lines",
  categories: "categories",
  siteSettings: "site-settings",
  homePage: "home-page",
  posts: "posts",
} as const;

export function productTag(slug: string): string {
  return `product:${slug}`;
}

export function postTag(slug: string): string {
  return `post:${slug}`;
}

export function productLineTag(slug: string): string {
  return `product-line:${slug}`;
}
