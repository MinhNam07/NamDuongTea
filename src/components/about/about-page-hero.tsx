import Image from "next/image";

import { AboutStatBand } from "@/components/about/about-stat-band";
import type { AboutStat } from "@/lib/about-pages-content";
import { cn } from "@/lib/utils";

type AboutPageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  stats?: AboutStat[];
};

export function AboutPageHero({
  eyebrow,
  title,
  subtitle,
  image,
  stats,
}: AboutPageHeroProps) {
  const hasStats = Boolean(stats?.length);

  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0F1F12] px-4 pt-28 md:px-6 md:pt-32",
        hasStats ? "pb-0" : "pb-20",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-center blur-[1px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,30,13,0.84)_0%,rgba(15,31,18,0.62)_42%,rgba(15,31,18,0.18)_68%,rgba(251,249,243,0.58)_90%,#fbf9f3_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.08)_0%,transparent_32%,rgba(4,14,6,0.54)_100%)]" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center",
          hasStats ? "min-h-0 flex-1" : "min-h-0 flex-1",
        )}
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-white/70" />
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/90">
              {eyebrow}
            </p>
            <span className="h-px w-10 bg-white/70" />
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {hasStats ? (
        <div className="relative z-10">
          <AboutStatBand stats={stats!} embedded />
        </div>
      ) : null}
    </section>
  );
}