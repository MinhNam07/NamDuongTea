/** Nam Dương trà quán — hằng số UI (không chứa danh sách sản phẩm). */

export const TRA_QUAN_COLLECTION_NAME = "Nam Dương trà quán";
export const TRA_QUAN_CATEGORY_SLUG = "nam-duong-tra-quan";

export const NAM_MOC_TRA_QUAN_HERO_SRC =
  "/images/products/tet-gift-sets/nam-moc-tra-quan-hero.JPG";

export type TraQuanTeaLine = {
  name: string;
  weight: string;
};

export type TraQuanProduct = {
  id: string | number;
  slug: string;
  name: string;
  tagline: string;
  teas: TraQuanTeaLine[];
  priceVnd: number | null;
  giftHighlights: string[];
  gallerySlidesReversed: boolean;
  imageUrl: string | null;
};

export type TetGiftSlideSuffix = "" | "-2";

export function formatVnd(amount: number | null | undefined) {
  if (amount == null) return null;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function traQuanStaticImageSrc(
  slug: string,
  suffix: TetGiftSlideSuffix = "",
): string {
  return `/images/products/tet-gift-sets/${slug}${suffix}.png`;
}

export function traQuanSlideSuffixes(
  slug: string,
  gallerySlidesReversed: boolean,
  gallery = true,
): TetGiftSlideSuffix[] {
  const order: TetGiftSlideSuffix[] = gallerySlidesReversed
    ? ["-2", ""]
    : ["", "-2"];
  return gallery ? order : [order[0]];
}
