"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** Offset for fixed navbar on pages without in-flow hero */
/** Routes whose first section is a full-bleed hero (no main top padding). */
function hasFullBleedHero(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/nam-duong-tra-quan" ||
    pathname === "/gioi-thieu" ||
    pathname === "/tim-hieu-vung-trong"
  );
}

export function FrontendMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      className={cn("flex-1", hasFullBleedHero(pathname) ? "pt-0" : "pt-24 md:pt-28")}
    >
      {children}
    </main>
  );
}
