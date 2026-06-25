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
    <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f3e2a6]">
          Vì sao chọn Nam Dương
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-[1.08] tracking-tight text-white md:text-5xl">
          {heading}
        </h2>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-[28px] border border-tea-moss/15 bg-white/85 p-8 shadow-[0_18px_48px_rgba(37,74,12,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,74,12,0.11)]"
          >
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-tea-moss/70">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 font-display text-xl font-bold text-tea-dark-green">
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