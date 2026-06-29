import Image from "next/image";

import { cn } from "@/lib/utils";

type ProductsHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

const DEFAULT_BG_SRC = "/images/IMG_6548.JPG";

export function ProductsHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: ProductsHeroProps) {
  return (
    <section
      className={cn(
        // Full-bleed hero; top padding clears the fixed navbar pill.
        "relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-tea-dark-green px-4 pb-16 pt-24 md:min-h-[100svh] md:px-[5vw] md:pb-20 md:pt-32",
        className,
      )}
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src={DEFAULT_BG_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Deep overlay for text legibility (match home hero) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.82),rgba(7,27,0,0.45),rgba(246,252,235,0.92))] mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center text-center">
        <header className="mx-auto max-w-4xl text-center text-white">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-4 text-hero-clamp font-serif leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base md:leading-relaxed">
              {description}
            </p>
          ) : null}

          {children ? <div className="mt-9 flex justify-center">{children}</div> : null}
        </header>
      </div>
    </section>
  );
}

