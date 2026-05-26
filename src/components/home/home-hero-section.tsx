import { HeaderHeroContent } from "@/components/home/header-hero-content";
import { HERO_MIN_HEIGHT_CLASS } from "@/lib/header-config";
import { TEA_HILL_HEADER_SRC } from "@/lib/site-assets";

/**
 * Hero block in normal document flow — fixed min-height, no scroll-driven resize.
 * Navbar overlays this section via fixed SiteHeader.
 */
export function HomeHeroSection() {
  return (
    <section
      aria-label="Giới thiệu Nam Dương Tea"
      className={`relative ${HERO_MIN_HEIGHT_CLASS} w-full`}
    >
      {/* Stable background — no scroll-linked blur/height */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden [transform:translateZ(0)]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm [transform:translateZ(0)]"
          style={{ backgroundImage: `url('${TEA_HILL_HEADER_SRC}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tea-dark-green/85 via-tea-deep-brown/72 to-tea-deep-brown/88" />
      </div>

      <div className="relative z-0 flex min-h-[inherit] flex-col justify-center px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-32">
        <HeaderHeroContent />
      </div>
    </section>
  );
}
