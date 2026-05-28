import type { AboutValueCard } from "@/lib/about-pages-content";

type AboutValueCardsProps = {
  items: AboutValueCard[];
  heading?: string;
};

export function AboutValueCards({
  items,
  heading = "Sứ mệnh & giá trị",
}: AboutValueCardsProps) {
  return (
    <section className="container mx-auto px-4 py-14 md:px-6 md:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tea-olive">
          Vì sao chọn Nam Dương
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-deep-brown md:text-4xl">
          {heading}
        </h2>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-tea-moss/15 bg-white p-8 shadow-sm"
          >
            <h3 className="font-display text-xl font-bold text-tea-dark-green">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-tea-muted md:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
