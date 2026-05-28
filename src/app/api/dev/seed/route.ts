import fs from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload";

type SeedCategory = {
  name: string;
  slug: string;
  description?: string;
};

type SeedProduct = {
  name: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  origin?: string;
  moq?: string;
  imagePath?: string; // absolute file path in workspace
};

const CATEGORIES: SeedCategory[] = [
  {
    name: "Trà xanh",
    slug: "tra-xanh",
    description: "Búp tươi, hương thanh mát từ vùng trà Nam Dương.",
  },
  {
    name: "Trà đen",
    slug: "tra-den",
    description: "Đậm vị, ổn định cho pha trà và pha chế F&B.",
  },
  {
    name: "Trà ô-long",
    slug: "tra-o-long",
    description: "Hương hoa quả nhẹ, phù hợp quán trà cao cấp.",
  },
];

function repoPath(...parts: string[]) {
  return path.join(process.cwd(), ...parts);
}

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function uploadMediaFromFile(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  filePath: string,
  alt: string,
) {
  const filename = path.basename(filePath);
  const buf = await fs.readFile(filePath);

  // Payload upload API expects a file object; this shape works with Payload v3.
  const created = await payload.create({
    collection: "media",
    data: { alt },
    file: {
      data: buf,
      mimetype: filename.toLowerCase().endsWith(".png")
        ? "image/png"
        : filename.toLowerCase().endsWith(".webp")
          ? "image/webp"
          : "image/jpeg",
      name: filename,
      size: buf.byteLength,
    },
  });

  const rawId = created.id as unknown;
  const id =
    typeof rawId === "number" ? rawId : Number.parseInt(String(rawId), 10);
  return Number.isFinite(id) ? id : null;
}

function seedProducts(): SeedProduct[] {
  // Prefer curated product-line images if present, fallback to site hero.
  const candidates = [
    repoPath("public/images/bach-tra-shan-tuyet/DSC_3122 copy 2.png"),
    repoPath("public/images/tra-dinh-ngoc/DSC_3112 copy 2.png"),
    repoPath("public/images/hong-tra/DSC_3117 copy 2.png"),
    repoPath("public/images/tra-o-long/DSC_3126 copy 2.png"),
    repoPath("public/images/hero.JPG"),
    repoPath("public/images/tea-hill-header.webp"),
  ];

  return [
    {
      name: "Trà Đinh Ngọc",
      slug: "tra-dinh-ngoc",
      categorySlug: "tra-xanh",
      shortDescription:
        "Búp non một tôm một lá, hương cốm thanh — phù hợp pha nóng/lạnh và chuỗi F&B cần chất lượng ổn định.",
      origin: "Vùng Cao, Việt Nam",
      moq: "50kg",
      imagePath: candidates[1],
    },
    {
      name: "Bạch Trà Shan Tuyết",
      slug: "bach-tra-shan-tuyet",
      categorySlug: "tra-xanh",
      shortDescription:
        "Hương thảo mộc dịu, vị ngọt hậu — lựa chọn premium cho trà nguyên liệu và quà tặng.",
      origin: "Vùng Cao, Việt Nam",
      moq: "30kg",
      imagePath: candidates[0],
    },
    {
      name: "Hồng trà",
      slug: "hong-tra",
      categorySlug: "tra-den",
      shortDescription:
        "Sắc nước hổ phách, hương mật ong nhẹ — nền trà rõ vị cho trà sữa và đồ uống đóng chai.",
      origin: "Vùng Cao, Việt Nam",
      moq: "100kg",
      imagePath: candidates[2],
    },
    {
      name: "Trà Đen CTC Tiêu Chuẩn",
      slug: "tra-den-ctc-tieu-chuan",
      categorySlug: "tra-den",
      shortDescription:
        "Vị đậm, hậu ngọt — tối ưu chi phí cho pha chế số lượng lớn và hệ thống phân phối.",
      origin: "Vùng Cao, Việt Nam",
      moq: "200kg",
      imagePath: candidates[4],
    },
    {
      name: "Trà Ô Long",
      slug: "tra-o-long",
      categorySlug: "tra-o-long",
      shortDescription:
        "Hương hoa quả nhẹ, hậu vị dài — phù hợp quán trà cao cấp và kênh phân phối premium.",
      origin: "Vùng Cao, Việt Nam",
      moq: "50kg",
      imagePath: candidates[3],
    },
  ];
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token || token !== (process.env.SEED_TOKEN ?? "dev")) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await getPayloadClient();

  // Upsert categories
  const categoryIdBySlug = new Map<string, number>();
  for (const c of CATEGORIES) {
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: c.slug } },
      limit: 1,
    });

    const rawId =
      existing.docs[0]?.id ??
      (
        await payload.create({
          collection: "categories",
          data: {
            name: c.name,
            slug: c.slug,
            description: c.description,
          },
        })
      ).id;

    const id = typeof rawId === "number" ? rawId : Number.parseInt(String(rawId), 10);
    if (Number.isFinite(id)) {
      categoryIdBySlug.set(c.slug, id);
    }
  }

  const products = seedProducts();
  let createdCount = 0;
  let skippedCount = 0;

  for (const p of products) {
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    if (existing.docs[0]) {
      skippedCount += 1;
      continue;
    }

    const categoryId = categoryIdBySlug.get(p.categorySlug) ?? null;
    let mediaId: number | null = null;

    if (p.imagePath && (await fileExists(p.imagePath))) {
      try {
        mediaId = await uploadMediaFromFile(payload, p.imagePath, p.name);
      } catch {
        mediaId = null;
      }
    }

    await payload.create({
      collection: "products",
      data: {
        name: p.name,
        slug: p.slug,
        category: categoryId,
        shortDescription: p.shortDescription,
        origin: p.origin,
        moq: p.moq,
        image: mediaId,
        status: "published",
        isFeatured: true,
        seo: {
          metaTitle: p.name,
          metaDescription: p.shortDescription,
        },
      },
    });
    createdCount += 1;
  }

  return NextResponse.json({
    ok: true,
    categories: CATEGORIES.length,
    productsCreated: createdCount,
    productsSkipped: skippedCount,
  });
}

