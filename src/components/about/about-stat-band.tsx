import type { AboutStat } from "@/lib/about-pages-content";
import { cn } from "@/lib/utils";

type AboutStatBandProps = {
  stats: AboutStat[];
  /** Chồng lên đáy hero — box kem nổi, không dùng chung nền ảnh */
  overlapping?: boolean;
  className?: string;
};

export function AboutStatBand({
  stats,
  overlapping = false,
  className,
}: AboutStatBandProps) {
  const gridClassName = cn(
    "grid gap-8 sm:grid-cols-2",
    stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
  );

  if (overlapping) {
    return (
      <section className={cn("relative z-20 px-4 md:px-6", className)}>
        <div
          className={cn(
            "mx-auto w-full max-w-[1440px] rounded-2xl border border-tea-moss/15 bg-tea-ivory px-4 py-10 shadow-lg md:px-8 md:py-12",
            gridClassName,
          )}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-tea-moss/15 bg-tea-ivory py-12 md:py-16">
      <div className={cn("container mx-auto px-4 md:px-6", gridClassName)}>
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: AboutStat }) {
  return (
    <div className="text-center">
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
  );
}
