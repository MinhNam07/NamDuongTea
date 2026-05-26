import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPayloadClient } from "@/lib/payload";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

async function loadPost(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: "published" } },
        ],
      },
      limit: 1,
    });
    return docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) {
    return buildMetadata({ title: "Bài viết không tồn tại", path: `/tin-tuc/${slug}` });
  }
  return buildMetadata({
    title: post.title as string,
    description: (post as { excerpt?: string }).excerpt,
    path: `/tin-tuc/${slug}`,
  });
}

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const p = post as unknown as {
    title: string;
    excerpt?: string;
    publishedAt?: string;
  };

  return (
    <article className="bg-tea-cream">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <h1 className="font-display text-4xl font-bold text-tea-green md:text-5xl">
          {p.title}
        </h1>
        {p.publishedAt ? (
          <p className="mt-3 text-sm text-tea-muted">
            {new Date(p.publishedAt).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
        {p.excerpt ? (
          <p className="mt-6 text-tea-muted md:text-lg">{p.excerpt}</p>
        ) : null}

        <div className="mt-8 prose prose-tea max-w-none">
          {/* TODO: render lexical richText cho post.body */}
          <p className="text-tea-ink">
            Nội dung chi tiết sẽ render từ Payload Lexical editor sau khi có dữ liệu.
          </p>
        </div>
      </div>
    </article>
  );
}
