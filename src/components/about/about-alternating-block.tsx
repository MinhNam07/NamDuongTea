import Image from "next/image";

import type { AboutAlternatingBlock } from "@/lib/about-pages-content";
import { cn } from "@/lib/utils";

export function AboutAlternatingBlock({
  eyebrow,
  title,
  titleEmphasis,
  paragraphs,
  bullets,
  image,
  imagePosition = "right",
}: AboutAlternatingBlock) {
  const imageFirst = imagePosition === "left";

  return (
    <section className="bg-tea-cream py-14 md:py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className={cn(imageFirst && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-tea-olive" />
            <span className="text-sm uppercase tracking-[0.15em] text-tea-olive">
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-light leading-tight text-tea-dark-green md:text-4xl lg:text-5xl">
            {title}{" "}
            {titleEmphasis ? (
              <span className="font-serif italic font-normal text-tea-olive">
                {titleEmphasis}
              </span>
            ) : null}
          </h2>

          <div className="mt-6 space-y-4 text-base font-light leading-relaxed text-tea-ink md:text-lg">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {bullets?.length ? (
            <ul className="mt-6 space-y-3 text-sm text-tea-ink md:text-base">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tea-olive" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside
          className={cn("relative", imageFirst && "lg:order-1")}
          aria-label="Hình ảnh minh họa"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-md ring-1 ring-tea-moss/15 lg:aspect-[3/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
