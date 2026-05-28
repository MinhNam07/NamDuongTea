import type { AboutStat } from "@/lib/about-pages-content";

type AboutStatBandProps = {
  stats: AboutStat[];
};

export function AboutStatBand({ stats }: AboutStatBandProps) {
  return (
    <section className="border-y border-tea-moss/15 bg-tea-ivory py-12 md:py-16">
      <div className="container mx-auto grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-extrabold text-tea-dark-green md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-tea-olive">
              {stat.label}
            </p>
            {stat.description ? (
              <p className="mt-2 text-sm text-tea-muted">{stat.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
