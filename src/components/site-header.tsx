"use client";

import { usePathname } from "next/navigation";

import { SiteNavBar } from "@/components/site-nav-bar";
import { TeaHillBackdrop } from "@/components/ui/tea-hill-backdrop";
import { useNavbarCollapsed } from "@/hooks/use-navbar-scroll-state";
import { NAV_HEIGHT_EXPANDED } from "@/lib/header-config";
import { cn } from "@/lib/utils";

/**
 * Fixed sticky navbar — overlays hero on home.
 * Kích thước header/logo giống mọi trang; trang chủ chỉ đổi nền trong suốt khi ở đầu hero.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeAtHero = isHome && !useNavbarCollapsed(isHome);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] w-full overflow-visible leading-none",
        NAV_HEIGHT_EXPANDED,
        "shadow-lg shadow-tea-deep-brown/25",
      )}
    >
      <TeaHillBackdrop
        variant="header"
        imageBlurClass="blur-sm"
        className="h-full overflow-visible"
      >
        <SiteNavBar collapsed={false} transparent={homeAtHero} />
      </TeaHillBackdrop>
    </header>
  );
}
