"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BRAND_LOGO_SRC } from "@/lib/site-assets";
import { cn } from "@/lib/utils";

const MOBILE_PANEL_CLASS =
  "overflow-y-auto border-l border-white/10 bg-[rgba(7,27,0,0.96)] text-white backdrop-blur-md backdrop-saturate-[1.25]";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SimpleNavItem = { label: string; href: string };

const HOME_NAV_BEFORE_PRODUCTS: SimpleNavItem[] = [
  { label: "Câu chuyện", href: "/#story" },
  { label: "Về Nam Dương", href: "/gioi-thieu" },
];

const HOME_NAV_AFTER_PRODUCTS: SimpleNavItem[] = [
  { label: "Liên hệ", href: "/lien-he" },
];

const PRODUCT_DROPDOWN_ITEMS: SimpleNavItem[] = [
  { label: "Tất cả sản phẩm", href: "/san-pham" },
  { label: "Chè xanh", href: "/san-pham/che-xanh" },
  { label: "Chè đen", href: "/san-pham/che-den" },
  { label: "Trà uống cao cấp", href: "/san-pham/tra-uong-cao-cap" },
  { label: "Nam Dương trà quán", href: "/nam-duong-tra-quan" },
];

type SiteNavBarProps = {
  // kept for backwards compatibility with existing imports;
  // design from main doesn't need these flags.
  collapsed?: boolean;
  transparent?: boolean;
  variant?: "dark-on-hero" | "dark-on-light";
};

export function SiteNavBar({ variant = "dark-on-light" }: SiteNavBarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const onHero = variant === "dark-on-hero";
  const navText = onHero
    ? "text-[rgba(255,255,255,0.86)] hover:text-white hover:bg-white/10"
    : "text-[rgba(7,27,0,0.78)] hover:text-[rgba(7,27,0,1)] hover:bg-black/5";
  const navActive = onHero ? "text-white bg-white/10" : "text-[rgba(7,27,0,1)] bg-black/5";
  const brandText = onHero ? "text-[rgba(255,255,255,0.92)]" : "text-[rgba(7,27,0,0.92)]";
  const focusRing = onHero ? "focus-visible:ring-white/40" : "focus-visible:ring-black/20";
  const mobileTrigger =
    onHero
      ? "text-white hover:bg-white/10 hover:text-white"
      : "text-[rgba(7,27,0,0.86)] hover:bg-black/5 hover:text-[rgba(7,27,0,1)]";

  const isProductsActive = pathname === "/san-pham" || pathname.startsWith("/san-pham/");

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2",
            focusRing,
          )}
        >
          <Image
            src={BRAND_LOGO_SRC}
            alt="Nam Dương Tea"
            width={664}
            height={376}
            className="h-9 w-auto bg-transparent md:h-10"
            priority
          />
          <span className={cn("hidden text-lg font-bold tracking-tight md:inline", brandText)}>
            Nam Dương Tea
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex" aria-label="Điều hướng">
          <NavigationMenuList className="gap-2">
            {HOME_NAV_BEFORE_PRODUCTS.map((it) => {
              const active = isActive(pathname, it.href.split("#")[0] ?? it.href);
              return (
                <NavigationMenuItem key={it.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={it.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                        navText,
                        active && navActive,
                      )}
                    >
                      {it.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                  navText,
                  isProductsActive && navActive,
                )}
              >
                Sản phẩm
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2">
                <div className="grid gap-1">
                  {PRODUCT_DROPDOWN_ITEMS.map((it) => (
                    <NavigationMenuLink asChild key={it.href}>
                      <Link
                        href={it.href}
                        className={cn(
                          "rounded-xl px-3 py-2 text-sm font-medium text-tea-ink transition-colors",
                          "hover:bg-black/5 hover:text-tea-dark-green",
                        )}
                      >
                        {it.label}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {HOME_NAV_AFTER_PRODUCTS.map((it) => {
              const active = isActive(pathname, it.href.split("#")[0] ?? it.href);
              return (
                <NavigationMenuItem key={it.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={it.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                        navText,
                        active && navActive,
                      )}
                    >
                      {it.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-[rgba(243,226,166,1)] px-7 py-2.5 text-sm font-medium text-[rgba(7,27,0,1)] hover:bg-[rgba(214,198,140,1)] md:inline-flex"
          >
            <Link href="/lien-he">Yêu cầu báo giá</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("rounded-full md:hidden", mobileTrigger)}
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={MOBILE_PANEL_CLASS}>
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-2" aria-label="Menu di động">
                {HOME_NAV_BEFORE_PRODUCTS.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 text-base font-medium",
                      "text-white/90 transition-colors hover:bg-white/10 hover:text-white",
                      isActive(pathname, it.href.split("#")[0] ?? it.href) &&
                        "bg-white/10 text-white",
                    )}
                  >
                    {it.label}
                  </Link>
                ))}

                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className={cn(
                      "flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-medium",
                      "text-white/90 transition-colors hover:bg-white/10 hover:text-white",
                      isProductsActive && "bg-white/10 text-white",
                    )}
                    aria-expanded={mobileProductsOpen}
                  >
                    <span>Sản phẩm</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        mobileProductsOpen ? "rotate-180" : "rotate-0",
                      )}
                      aria-hidden
                    />
                  </button>

                  {mobileProductsOpen ? (
                    <div className="mt-1 flex flex-col gap-1 pl-2">
                      {PRODUCT_DROPDOWN_ITEMS.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex min-h-10 items-center rounded-xl px-3 text-sm font-medium",
                            "text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                          )}
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>

                {HOME_NAV_AFTER_PRODUCTS.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 text-base font-medium",
                      "text-white/90 transition-colors hover:bg-white/10 hover:text-white",
                      isActive(pathname, it.href.split("#")[0] ?? it.href) &&
                        "bg-white/10 text-white",
                    )}
                  >
                    {it.label}
                  </Link>
                ))}

                <Button
                  asChild
                  className="mt-3 w-full rounded-xl bg-[rgba(243,226,166,1)] text-[rgba(7,27,0,1)] hover:bg-[rgba(214,198,140,1)]"
                >
                  <Link href="/lien-he" onClick={() => setMobileOpen(false)}>
                    Yêu cầu báo giá
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
