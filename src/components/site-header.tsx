"use client";

import { usePathname } from "next/navigation";

import { SiteNavBar } from "@/components/site-nav-bar";
import { useHeaderScrolled } from "@/hooks/use-navbar-scroll-state";
import { cn } from "@/lib/utils";

/**
 * Centered glass pill header (code.html).
 */
export function SiteHeader() {
  const scrolled = useHeaderScrolled();
  // Use the same "home hero" header styling site-wide at the very top,
  // then transition to the light glass style once the user scrolls.
  usePathname(); // keep as a reactive boundary if we later need per-route tuning
  const variant = !scrolled ? "dark-on-hero" : "dark-on-light";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "pointer-events-auto mx-auto mt-6 flex w-[90%] max-w-[1280px] items-center",
          "rounded-full border transition-[background,box-shadow,border-color,transform] duration-300 ease-out",
          "backdrop-blur-[20px] backdrop-saturate-[1.25]",
          !scrolled
            ? cn(
                "border-white/10 bg-[linear-gradient(to_right,rgba(19,50,0,0.35),rgba(7,27,0,0.78))]",
                "shadow-[0_8px_32px_0_rgba(37,74,12,0.12)]",
              )
            : cn(
                "border-black/10 bg-[rgba(246,252,235,0.72)]",
                scrolled
                  ? "shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                  : "shadow-[0_6px_22px_rgba(0,0,0,0.08)]",
                "translate-y-[-2px]",
              ),
        )}
      >
        <div className="w-full px-6 py-3 md:px-8">
          <SiteNavBar variant={variant} />
        </div>
      </div>
    </header>
  );
}
