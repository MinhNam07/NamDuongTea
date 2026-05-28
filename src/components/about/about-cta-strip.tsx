import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type AboutCtaStripProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  tertiary?: { label: string; href: string };
};

export function AboutCtaStrip({
  title,
  description,
  primary,
  secondary,
  tertiary,
}: AboutCtaStripProps) {
  return (
    <section className="bg-tea-dark-green py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            className="rounded-full bg-[rgba(243,226,166,1)] px-7 text-tea-dark-green hover:bg-[rgba(214,198,140,1)]"
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>

        {tertiary ? (
          <Button
            asChild
            variant="link"
            className="mt-6 h-auto p-0 text-sm text-white/80 underline-offset-4 hover:text-white"
          >
            <Link href={tertiary.href} className="inline-flex items-center gap-1">
              {tertiary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
