import Image from "next/image";

import { HeaderHeroContent } from "@/components/home/header-hero-content";

/**
 * Cinematic hero (code.html) — full-bleed, fixed header overlays.
 */
export function HomeHeroSection() {
  return (
    <header
      aria-label="Giới thiệu Nam Dương Tea"
      className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-4 pb-16 pt-24 md:min-h-[100svh] md:px-[5vw] md:pb-20 md:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src="/images/hero.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top [transform:translateZ(0)]"
          aria-hidden
        />
        {/* Lighten the top so the photo reaches behind the fixed nav */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.28)_0%,rgba(7,27,0,0.45)_38%,rgba(246,252,235,0.92)_100%)] mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center text-center">
        <HeaderHeroContent />
      </div>
    </header>
  );
}
