"use client";

import { usePathname } from "next/navigation";

import { SiteNavBar } from "@/components/site-nav-bar";
import { useHeaderScrolled } from "@/hooks/use-navbar-scroll-state";
import { cn } from "@/lib/utils";

/**
 * Full-width white glass header (no pill).
 */
export function SiteHeader() {
  const scrolled = useHeaderScrolled();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "pointer-events-auto flex h-16 w-full items-center px-4 transition-[background,box-shadow,border-color] duration-300 ease-out sm:h-18 sm:px-6",
          isHome && !scrolled
            ? cn("border-b border-transparent bg-transparent shadow-none")
            : cn(
                "border-b border-black/10 backdrop-blur-xl backdrop-saturate-[1.25]",
                scrolled
                  ? cn("bg-zinc-100/55", "shadow-[0_10px_30px_rgba(0,0,0,0.12)]")
                  : cn("bg-zinc-100/35", "shadow-[0_6px_22px_rgba(0,0,0,0.08)]"),
              ),
        )}
      >
        <SiteNavBar />
      </div>
    </header>
  );
}
