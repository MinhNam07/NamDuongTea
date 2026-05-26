"use client";

import { usePathname } from "next/navigation";

import { SiteNavBar } from "@/components/site-nav-bar";
import { TeaHillBackdrop } from "@/components/ui/tea-hill-backdrop";
import { useNavbarCollapsed } from "@/hooks/use-navbar-scroll-state";
import {
  NAV_HEIGHT_COLLAPSED,
  NAV_HEIGHT_EXPANDED,
} from "@/lib/header-config";
import { cn } from "@/lib/utils";

/**
 * Fixed sticky navbar — overlays hero on home.
 * Only toggles between two fixed heights (no per-pixel hero resize).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const collapsed = useNavbarCollapsed(isHome);

  const showSolidBar = !isHome || collapsed;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] w-full overflow-visible leading-none will-change-[height]",
        "transition-[height,box-shadow] duration-300 ease-out",
        collapsed ? NAV_HEIGHT_COLLAPSED : NAV_HEIGHT_EXPANDED,
        showSolidBar && "shadow-lg shadow-tea-deep-brown/25",
      )}
    >
      {showSolidBar ? (
        <TeaHillBackdrop
          variant="header"
          imageBlurClass="blur-sm"
          className="h-full overflow-visible"
        >
          <SiteNavBar collapsed={collapsed} />
        </TeaHillBackdrop>
      ) : (
        <div className="h-full overflow-visible bg-gradient-to-b from-tea-deep-brown/25 to-transparent">
          <SiteNavBar collapsed={false} transparent />
        </div>
      )}
    </header>
  );
}
