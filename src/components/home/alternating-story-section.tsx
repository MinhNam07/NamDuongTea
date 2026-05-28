import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { WEBSITE_DATA } from "@/lib/website-data";

const STORY_IMAGES: Record<string, { src: string; alt: string }> = {
  quality: {
    src: "/images/IMG_6547.JPG",
    alt: "Lá trà tươi được tuyển chọn thủ công",
  },
  sustainability: {
    src: "/images/IMG_6437.png",
    alt: "Đồi chè xanh mướt trong làn sương sớm",
  },
};

export function AlternatingStorySection() {
  const items = WEBSITE_DATA.pages.home.alternatingStories;

  return (
    <section
      id="story"
      className="w-full bg-[#133200] px-6 py-28 md:px-[5vw] md:py-32"
      aria-label="Câu chuyện thương hiệu"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-32">
          {items.map((item, idx) => (
            <article
              key={item.id}
              className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24"
            >
              <div
                className={idx % 2 === 1 ? "order-2 lg:order-2" : "order-2 lg:order-1"}
              >
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-[#f3e2a6]/80" />
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#f3e2a6]">
                    {item.label}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-white lg:text-5xl">
                  {item.title} <br />
                  <span className="font-serif italic font-normal text-tea-olive">
                    {item.emphasis}
                  </span>
                </h2>

                <div className="mt-6 space-y-6 text-lg font-light leading-relaxed text-white/75">
                  {item.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {item.statCard ? (
                  <div className="mt-10 inline-block rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="mb-2 flex items-end gap-4">
                      <span className="font-display text-4xl font-light text-white">
                        {item.statCard.value}
                      </span>
                      <span className="text-sm uppercase tracking-wide text-white/70">
                        {item.statCard.label}
                      </span>
                    </div>
                    <p className="text-sm font-light text-white/65">
                      {item.statCard.description}
                    </p>
                  </div>
                ) : null}

                {item.link ? (
                  <div className="mt-10">
                    <Button
                      asChild
                      variant="link"
                      className="h-auto p-0 text-sm font-medium text-white underline-offset-8 hover:text-[#f3e2a6]"
                    >
                      <Link href={item.link.href}>{item.link.label}</Link>
                    </Button>
                  </div>
                ) : null}
              </div>

              <aside
                className={idx % 2 === 1 ? "order-1 lg:order-1" : "order-1 lg:order-2"}
                aria-label="Hình ảnh minh họa"
              >
                <div className="group relative h-[420px] max-h-[70vh] overflow-hidden rounded-[40px] sm:h-[520px] lg:h-[600px]">
                  <Image
                    src={(STORY_IMAGES[item.id]?.src ?? WEBSITE_DATA.brand.assets.storyFarm) as string}
                    alt={STORY_IMAGES[item.id]?.alt ?? "Hình ảnh vùng trà"}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[rgba(7,27,0,0.08)]" />
                </div>
              </aside>
            </article>
          ))}
      </div>
    </section>
  );
}

