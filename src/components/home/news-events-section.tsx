"use client";

import { useState } from "react";
import Link from "next/link";

import { NewsCard, type NewsCardPost } from "@/components/marketing/news-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "news" | "events";

export function NewsEventsSection({ posts }: { posts: NewsCardPost[] }) {
  const [tab, setTab] = useState<Tab>("news");

  const filtered =
    tab === "events"
      ? posts.filter(
          (p) =>
            /sự kiện|su-kien|event|khuyến mãi/i.test(p.title) ||
            /sự kiện|su-kien/i.test(p.slug),
        )
      : posts;

  const display = filtered.length > 0 ? filtered.slice(0, 4) : posts.slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-tea-olive">
            Tin tức & sự kiện
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-dark-green md:text-4xl">
            Tin tức mới nhất
          </h2>
        </div>
        <div
          className="inline-flex rounded-2xl border border-tea-moss/25 bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="Lọc tin tức"
        >
          {(
            [
              ["news", "Tin tức"],
              ["events", "Sự kiện"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "rounded-xl px-5 py-2 text-sm font-semibold transition-colors",
                tab === id
                  ? "bg-tea-dark-green text-white"
                  : "text-tea-muted hover:text-tea-dark-green",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {display.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {display.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-tea-muted">
          Chưa có bài viết. Vui lòng quay lại sau.
        </p>
      )}

      <div className="mt-10 text-center">
        <Button asChild variant="outline">
          <Link href="/tin-tuc">Xem tất cả tin tức</Link>
        </Button>
      </div>
    </section>
  );
}
