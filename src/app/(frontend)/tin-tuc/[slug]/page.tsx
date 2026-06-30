import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPostBySlug } from "@/data/posts";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return buildMetadata({ title: "Bài viết không tồn tại", path: `/tin-tuc/${slug}` });
  }
  return buildMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
    path: `/tin-tuc/${slug}`,
  });
}

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-tea-cream pt-header-offset">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <h1 className="font-display text-4xl font-bold text-tea-green md:text-5xl">
          {post.title}
        </h1>
        {post.publishedAt ? (
          <p className="mt-3 text-sm text-tea-muted">
            {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
        {post.author ? (
          <p className="mt-2 text-sm text-tea-muted">Tác giả: {post.author}</p>
        ) : null}
        {post.excerpt ? (
          <p className="mt-6 text-tea-muted md:text-lg">{post.excerpt}</p>
        ) : null}

        <div className="mt-8 prose prose-tea max-w-none">
          <p className="text-tea-ink">
            Nội dung chi tiết sẽ render từ Payload Lexical editor sau khi có dữ liệu.
          </p>
        </div>
      </div>
    </article>
  );
}
