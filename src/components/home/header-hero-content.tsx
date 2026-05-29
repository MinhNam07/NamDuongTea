import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WEBSITE_DATA } from "@/lib/website-data";

export function HeaderHeroContent() {
  const hero = WEBSITE_DATA.pages.home.hero;
  return (
    <div className="w-full max-w-5xl">
      <div className="opacity-0 motion-safe-fade-up">
        <span className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[rgba(243,226,166,0.95)] md:text-sm">
          <span className="h-px w-8 bg-[rgba(243,226,166,0.95)]" />
          {hero.eyebrow}
          <span className="h-px w-8 bg-[rgba(243,226,166,0.95)]" />
        </span>
      </div>

      <h1 className="opacity-0 motion-safe-fade-up [animation-delay:100ms] font-serif text-5xl font-light leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
        {hero.title}{" "}
        <span className="italic font-normal text-[rgba(214,198,140,1)]">
          {hero.titleEmphasis}
        </span>
      </h1>

      <p className="opacity-0 motion-safe-fade-up [animation-delay:200ms] mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-[rgba(223,229,212,1)] md:text-xl">
        {hero.subtitle}
      </p>

      <div className="opacity-0 motion-safe-fade-up [animation-delay:300ms] mt-12 flex w-full flex-col items-center justify-center gap-5 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="w-full rounded-full bg-[rgba(243,226,166,1)] px-10 py-6 text-sm font-medium text-[rgba(7,27,0,1)] hover:bg-[rgba(214,198,140,1)] sm:w-auto"
        >
          <Link href={hero.primaryCta.href}>
            {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Link
        href={hero.scrollHint.href}
        className="opacity-0 motion-safe-fade-up [animation-delay:300ms] motion-safe-float absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[rgba(223,229,212,0.6)] transition-colors hover:text-[rgba(223,229,212,0.9)]"
      >
        <span className="text-xs uppercase tracking-[0.15em]">
          {hero.scrollHint.label}
        </span>
        <ChevronDown className="h-8 w-8" aria-hidden />
      </Link>
    </div>
  );
}
