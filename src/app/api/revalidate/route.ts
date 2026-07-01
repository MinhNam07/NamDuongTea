import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { CACHE_TAGS, postTag, productLineTag, productTag } from "@/data/cache";

const ALLOWED_TAGS = new Set<string>([
  CACHE_TAGS.products,
  CACHE_TAGS.productLines,
  CACHE_TAGS.categories,
  CACHE_TAGS.siteSettings,
  CACHE_TAGS.homePage,
  CACHE_TAGS.posts,
]);

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidation-secret");
  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    tag?: string;
    slug?: string;
    path?: string;
    collection?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (body.tag && ALLOWED_TAGS.has(body.tag)) {
    revalidateTag(body.tag, { expire: 0 });
    revalidated.push(`tag:${body.tag}`);
  }

  if (body.slug && body.collection === "products") {
    revalidateTag(productTag(body.slug), { expire: 0 });
    revalidatePath(`/san-pham/${body.slug}`);
    revalidated.push(`product:${body.slug}`);
  }

  if (body.slug && body.collection === "posts") {
    revalidateTag(postTag(body.slug), { expire: 0 });
    revalidatePath(`/tin-tuc/${body.slug}`);
    revalidated.push(`post:${body.slug}`);
  }

  if (body.slug && body.collection === "product-lines") {
    revalidateTag(productLineTag(body.slug), { expire: 0 });
    revalidatePath(`/san-pham/${body.slug}`);
    revalidated.push(`product-line:${body.slug}`);
  }

  if (body.path) {
    revalidatePath(body.path);
    revalidated.push(`path:${body.path}`);
  }

  if (revalidated.length === 0) {
    return NextResponse.json({ error: "No valid targets" }, { status: 400 });
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
