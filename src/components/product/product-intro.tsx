import type { ProductLineContent } from "@/data/content/product-lines";

type ProductIntroProps = {
  line: ProductLineContent;
};

export function ProductIntro({ line }: ProductIntroProps) {
  return (
    <section className="container mx-auto px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-line-primary md:text-3xl">
          Giới thiệu
        </h2>
        <p className="mt-4 text-base leading-relaxed text-line-muted md:text-lg">
          {line.detail}
        </p>
      </div>
    </section>
  );
}
