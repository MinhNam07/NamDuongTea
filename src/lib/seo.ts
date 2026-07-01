import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME = "Nam Dương Tea";
const SITE_DESCRIPTION =
  "Nhà cung cấp trà nguyên liệu và thành phẩm cho đại lý, nhà phân phối và xuất khẩu.";
const DEFAULT_OG_IMAGE = "/images/hero.webp";

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const desc = description ?? SITE_DESCRIPTION;
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
      url,
      locale: "vi_VN",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}
