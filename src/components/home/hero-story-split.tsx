import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const STORIES = [
  {
    title: "Tinh hoa trà Việt",
    description:
      "Hành trình xây dựng thương hiệu Nam Dương Tea — am hiểu văn hóa trà, đam mê chất lượng và sáng tạo cho thị trường hiện đại.",
    image: "/images/hero.JPG",
    href: "/gioi-thieu",
  },
  {
    title: "Từ nông trường đến tách trà",
    description:
      "Kiểm soát từ vùng nguyên liệu, quy trình chế biến đến đóng gói — minh bạch nguồn gốc cho đối tác B2B.",
    image: "/images/IMG_6559.JPG",
    href: "/gioi-thieu#nguyen-lieu",
  },
] as const;

export function HeroStorySplit() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="grid gap-8 md:grid-cols-2">
        {STORIES.map((story) => (
          <article
            key={story.href}
            className="group overflow-hidden rounded-[2rem] bg-white shadow-md ring-1 ring-tea-moss/15"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={story.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tea-deep-brown/70 via-transparent to-transparent" />
              <h2 className="absolute bottom-4 left-6 right-6 font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                {story.title}
              </h2>
            </div>
            <div className="space-y-4 p-8">
              <p className="text-sm leading-relaxed text-tea-muted md:text-base">
                {story.description}
              </p>
              <Button asChild variant="outline" className="group/btn">
                <Link href={story.href}>
                  Tìm hiểu thêm
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
