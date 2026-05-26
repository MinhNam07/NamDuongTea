import Link from "next/link";
import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPayloadClient } from "@/lib/payload";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Tin tức ngành trà",
  description:
    "Cập nhật về văn hóa thưởng trà, kỹ thuật canh tác và xu hướng thị trường trà Việt.",
  path: "/tin-tuc",
});

export default async function TinTucPage() {
  let posts: { id: string | number; title: string; slug: string; excerpt?: string }[] = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 12,
    });
    posts = docs as unknown as typeof posts;
  } catch {
    posts = [];
  }

  return (
    <div className="bg-tea-cream">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-20">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-tea-brown-700">
            Blog
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-tea-green md:text-5xl">
            Tin tức & câu chuyện trà
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-tea-green/30 bg-white p-12 text-center text-tea-muted">
            Sắp có bài viết đầu tiên. Hãy quay lại sau.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Card key={p.id} className="bg-white">
                <CardHeader>
                  <CardTitle>
                    <Link href={`/tin-tuc/${p.slug}`} className="hover:text-tea-green">
                      {p.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-tea-muted line-clamp-3">{p.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
