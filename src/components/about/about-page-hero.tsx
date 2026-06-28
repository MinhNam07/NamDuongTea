import Image from "next/image";

import { AboutStatBand } from "@/components/about/about-stat-band";
import type { AboutStat } from "@/lib/about-pages-content";

type AboutPageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  stats?: AboutStat[];
};

function HeroBackground({ image }: { image: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover object-center blur-[1px]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.78)_0%,rgba(7,27,0,0.48)_46%,rgba(7,27,0,0.74)_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(243,226,166,0.10)_0%,transparent_34%,rgba(4,14,6,0.50)_100%)]" />
    </div>
  );
}

export function AboutPageHero({
  eyebrow,
  title,
  subtitle,
  image,
  stats,
}: AboutPageHeroProps) {
  const hasStats = Boolean(stats?.length);

  const heroCopy = (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-[rgba(243,226,166,0.82)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/90">
          {eyebrow}
        </p>
        <span className="h-px w-10 bg-[rgba(243,226,166,0.82)]" />
      </div>

      <h1 className="text-hero-clamp font-serif font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
        {title}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-tea-gold md:text-base">
        {subtitle}
      </p>
    </div>
  );

  if (hasStats) {
    return (
      <div className="relative min-h-[80svh] md:min-h-[100svh]">
        <section className="relative flex min-h-[80svh] flex-col overflow-hidden bg-tea-dark-green px-4 pt-24 md:min-h-[100svh] md:px-6 md:pt-32">
          <HeroBackground image={image} />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center justify-center pb-8 pt-4 md:pb-52 md:pt-4">
            {heroCopy}
          </div>
        </section>

        <AboutStatBand
          stats={stats!}
          overlapping
          className="relative z-20 mt-8 px-4 md:absolute md:inset-x-0 md:bottom-10 md:mt-0 md:px-6"
        />
      </div>
    );
  }

  return (
    <section className="relative flex min-h-[80svh] flex-col overflow-hidden bg-tea-dark-green px-4 pb-14 pt-24 md:min-h-[100svh] md:px-6 md:pb-20 md:pt-32">
      <HeroBackground image={image} />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-center">
        {heroCopy}
      </div>
    </section>
  );
}