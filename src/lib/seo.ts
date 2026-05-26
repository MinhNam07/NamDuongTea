import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME = "Nam Dương Tea";
const SITE_DESCRIPTION =
  "Nhà cung cấp trà nguyên liệu và thành phẩm cho đại lý, nhà phân phối và xuất khẩu.";

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
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}
