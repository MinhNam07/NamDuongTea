import { HeaderHeroContent } from "@/components/home/header-hero-content";

/**
 * Cinematic hero (code.html) — full-bleed, fixed header overlays.
 */
export function HomeHeroSection() {
  return (
    <header
      aria-label="Giới thiệu Nam Dương Tea"
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 pb-20 pt-32 md:px-[5vw]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center [transform:translateZ(0)]"
          style={{
            backgroundImage: "url('/images/hero.JPG')",
          }}
        />
        {/* Deep overlay for text legibility (DESIGN.md) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,27,0,0.82),rgba(7,27,0,0.45),rgba(246,252,235,0.92))] mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center text-center">
        <HeaderHeroContent />
      </div>
    </header>
  );
}
