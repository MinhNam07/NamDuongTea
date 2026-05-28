import type { AboutStat } from "@/lib/about-pages-content";
import { cn } from "@/lib/utils";

type AboutStatBandProps = {
  stats: AboutStat[];
  /** Nằm trong hero — nền trong suốt, dùng chung background ảnh */
  embedded?: boolean;
};

export function AboutStatBand({ stats, embedded = false }: AboutStatBandProps) {
  return (
    <section
      className={cn(
        embedded
          ? "relative z-10 mt-auto w-full shrink-0 pb-8 pt-10 md:pb-10 md:pt-12"
          : "border-y border-tea-moss/15 bg-tea-ivory py-12 md:py-16",
      )}
    >
      <div className={cn(embedded && "relative")}>
        <div
          className={cn(
            "container mx-auto grid gap-8 px-4 sm:grid-cols-2 md:px-6",
            stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-tea-dark-green md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-tea-brown-700">
                {stat.label}
              </p>
              {stat.description ? (
                <p className="mt-2 text-sm text-tea-muted">{stat.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
