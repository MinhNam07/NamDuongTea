import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type NewsCardPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
};

function formatDate(date?: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsCard({
  post,
  className,
}: {
  post: NewsCardPost;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border border-tea-moss/20 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      {post.publishedAt ? (
        <time
          dateTime={post.publishedAt}
          className="text-xs font-medium uppercase tracking-wider text-tea-olive"
        >
          {formatDate(post.publishedAt)}
        </time>
      ) : null}
      <h3 className="mt-2 font-display text-lg font-bold text-tea-dark-green line-clamp-2">
        <Link href={`/tin-tuc/${post.slug}`} className="hover:text-tea-moss">
          {post.title}
        </Link>
      </h3>
      {post.excerpt ? (
        <p className="mt-2 flex-1 text-sm text-tea-muted line-clamp-3">
          {post.excerpt}
        </p>
      ) : null}
      <Link
        href={`/tin-tuc/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tea-moss hover:text-tea-dark-green"
      >
        Đọc thêm <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
