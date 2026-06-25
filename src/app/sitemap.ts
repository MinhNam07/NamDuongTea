import type { MetadataRoute } from "next";

import { getProductLines } from "@/data/product-lines";
import { getPosts } from "@/data/posts";
import { getProducts } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/gioi-thieu", changeFrequency: "monthly", priority: 0.9 },
  { path: "/tim-hieu-vung-trong", changeFrequency: "monthly", priority: 0.8 },
  { path: "/san-pham", changeFrequency: "weekly", priority: 0.9 },
  { path: "/san-pham/che-xanh", changeFrequency: "weekly", priority: 0.8 },
  { path: "/san-pham/che-den", changeFrequency: "weekly", priority: 0.8 },
  { path: "/san-pham/tra-uong-cao-cap", changeFrequency: "weekly", priority: 0.8 },
  { path: "/nam-duong-tra-quan", changeFrequency: "weekly", priority: 0.85 },
  { path: "/lien-he", changeFrequency: "monthly", priority: 0.7 },
  { path: "/dang-ky-dai-ly", changeFrequency: "monthly", priority: 0.7 },
  { path: "/tin-tuc", changeFrequency: "weekly", priority: 0.75 },
];

function toSitemapEntry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified?: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) =>
    toSitemapEntry(route.path, route.changeFrequency, route.priority),
  );

  try {
    const [productLines, products, posts] = await Promise.all([
      getProductLines(),
      getProducts("tra-uong-cao-cap"),
      getPosts({ limit: 500 }),
    ]);

    for (const line of productLines) {
      if (line.hasDetailPage) {
        entries.push(toSitemapEntry(line.href, "monthly", 0.75));
      }
    }

    for (const product of products) {
      entries.push(toSitemapEntry(`/san-pham/${product.slug}`, "weekly", 0.7));
    }

    const traQuanProducts = await getProducts("nam-duong-tra-quan");
    for (const product of traQuanProducts) {
      entries.push(toSitemapEntry(`/san-pham/${product.slug}`, "weekly", 0.7));
    }

    for (const post of posts) {
      entries.push(toSitemapEntry(`/tin-tuc/${post.slug}`, "weekly", 0.6));
    }
  } catch (err) {
    console.warn("[sitemap] CMS unavailable — serving static routes only.", err);
  }

  return entries;
}
