import type { Payload } from "payload";

import { getProductDetailTabs } from "../../src/lib/product-detail-tabs";
import { TRA_QUAN_SEED_PRODUCTS } from "../../src/lib/tra-quan-seed-data";
import type { MigrationReport } from "./report";
import { addEntry } from "./report";

const TEA_PRODUCTS = [
  {
    name: "Trà Đinh Ngọc",
    slug: "tra-dinh-ngoc",
    categorySlug: "tra-xanh",
    shortDescription:
      "Búp non một tôm một lá, hương cốm thanh — phù hợp pha nóng/lạnh và chuỗi F&B cần chất lượng ổn định.",
    origin: "Vùng Cao, Việt Nam",
    moq: "50kg",
    legacyImagePath: "/images/tra-dinh-ngoc/DSC_3112 copy 2.png",
  },
  {
    name: "Bạch Trà Shan Tuyết",
    slug: "bach-tra-shan-tuyet",
    categorySlug: "tra-xanh",
    shortDescription:
      "Hương thảo mộc dịu, vị ngọt hậu — lựa chọn premium cho trà nguyên liệu và quà tặng.",
    origin: "Vùng Cao, Việt Nam",
    moq: "30kg",
    legacyImagePath: "/images/bach-tra-shan-tuyet/DSC_3122 copy 2.png",
  },
  {
    name: "Hồng trà",
    slug: "hong-tra",
    categorySlug: "tra-den",
    shortDescription:
      "Sắc nước hổ phách, hương mật ong nhẹ — nền trà rõ vị cho trà sữa và đồ uống đóng chai.",
    origin: "Vùng Cao, Việt Nam",
    moq: "100kg",
    legacyImagePath: "/images/hong-tra/DSC_3117 copy 2.png",
  },
  {
    name: "Trà Đen CTC Tiêu Chuẩn",
    slug: "tra-den-ctc-tieu-chuan",
    categorySlug: "tra-den",
    shortDescription:
      "Vị đậm, hậu ngọt — tối ưu chi phí cho pha chế số lượng lớn và hệ thống phân phối.",
    origin: "Vùng Cao, Việt Nam",
    moq: "200kg",
    legacyImagePath: "/images/tra-o-long/DSC_3126 copy 2.png",
  },
  {
    name: "Trà Ô Long",
    slug: "tra-o-long",
    categorySlug: "tra-xanh",
    shortDescription:
      "Hương hoa quả nhẹ, hậu vị dài — phù hợp quán trà cao cấp và kênh phân phối premium.",
    origin: "Vùng Cao, Việt Nam",
    moq: "50kg",
    legacyImagePath: "/images/tra-o-long/DSC_3126 copy 2.png",
  },
] as const;

const CATEGORIES = [
  { name: "Trà xanh", slug: "tra-xanh", description: "Chè xanh, trà xanh cao cấp" },
  { name: "Trà đen", slug: "tra-den", description: "Chè đen, hồng trà" },
  {
    name: "Nam Dương trà quán",
    slug: "nam-duong-tra-quan",
    description: "Bộ quà biếu thất phẩm gỗ",
  },
] as const;

export function mapDetailTabs(slug: string) {
  return getProductDetailTabs(slug).map((tab) => ({
    key: tab.key,
    label: tab.label,
    heading: tab.heading,
    paragraphs: tab.paragraphs.map((text) => ({ text })),
    bullets: tab.bullets.map((b) => ({ title: b.title, text: b.text })),
  }));
}

export async function migrateCategories(
  payload: Payload,
  report: MigrationReport,
  dryRun: boolean,
): Promise<Map<string, number>> {
  const map = new Map<string, number>();

  for (const category of CATEGORIES) {
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: category.slug } },
      limit: 1,
    });

    if (existing.docs[0]) {
      map.set(category.slug, Number(existing.docs[0].id));
      addEntry(report, {
        collection: "categories",
        key: category.slug,
        status: "skipped",
        message: "already exists",
      });
      continue;
    }

    if (dryRun) {
      addEntry(report, {
        collection: "categories",
        key: category.slug,
        status: "dry-run",
      });
      continue;
    }

    const created = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        active: true,
        order: map.size,
      },
    });
    map.set(category.slug, Number(created.id));
    addEntry(report, {
      collection: "categories",
      key: category.slug,
      status: "imported",
    });
  }

  return map;
}

export async function migrateProducts(
  payload: Payload,
  report: MigrationReport,
  dryRun: boolean,
  categoryIds: Map<string, number>,
): Promise<void> {
  type MigrationProduct = {
    name: string;
    slug: string;
    categorySlug: string;
    shortDescription: string;
    origin: string | null;
    moq: string | null;
    legacyImagePath: string;
    isTraQuan: boolean;
    priceVnd?: number | null;
    giftTeas?: { name: string; weight: string }[];
    giftHighlights?: { text: string }[];
    gallerySlidesReversed?: boolean;
  };

  const allProducts: MigrationProduct[] = [
    ...TEA_PRODUCTS.map((p) => ({ ...p, isTraQuan: false })),
    ...TRA_QUAN_SEED_PRODUCTS.map((p) => ({
      name: p.name,
      slug: p.slug,
      categorySlug: "nam-duong-tra-quan",
      shortDescription: p.tagline,
      origin: null,
      moq: null,
      legacyImagePath: `/images/products/tet-gift-sets/${p.slug}.png`,
      priceVnd: p.priceVnd,
      giftTeas: p.teas,
      giftHighlights: p.giftHighlights.map((text) => ({ text })),
      gallerySlidesReversed: p.gallerySlidesReversed,
      isTraQuan: true,
    })),
  ];

  for (const product of allProducts) {
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: product.slug } },
      limit: 1,
    });

    if (existing.docs[0]) {
      addEntry(report, {
        collection: "products",
        key: product.slug,
        status: "skipped",
        message: "already exists",
      });
      report.duplicate += 1;
      continue;
    }

    const categoryId = categoryIds.get(product.categorySlug);
    if (!categoryId) {
      addEntry(report, {
        collection: "products",
        key: product.slug,
        status: "failed",
        message: `category not found: ${product.categorySlug}`,
      });
      report.relationUnresolved += 1;
      continue;
    }

    if (dryRun) {
      addEntry(report, {
        collection: "products",
        key: product.slug,
        status: "dry-run",
      });
      continue;
    }

    const detailTabs = product.isTraQuan ? [] : mapDetailTabs(product.slug);

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        slug: product.slug,
        category: categoryId,
        categories: [categoryId],
        shortDescription: product.shortDescription,
        origin: product.origin ?? undefined,
        moq: product.moq ?? undefined,
        legacyImagePath: product.legacyImagePath,
        status: "published",
        _status: "published",
        isFeatured: false,
        detailTabs,
        ...(product.isTraQuan
          ? {
              priceVnd: product.priceVnd,
              giftTeas: product.giftTeas,
              giftHighlights: product.giftHighlights,
              gallerySlidesReversed: product.gallerySlidesReversed,
            }
          : {}),
      },
    });

    addEntry(report, {
      collection: "products",
      key: product.slug,
      status: "imported",
    });
  }
}

export { TEA_PRODUCTS, CATEGORIES };
