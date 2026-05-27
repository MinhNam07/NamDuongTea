"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BRAND_LOGO_SRC } from "@/lib/site-assets";
import { PRIMARY_NAV } from "@/lib/site-navigation";
import { cn } from "@/lib/utils";

const HEADER_INNER_CLASS =
  "flex h-full w-full items-center gap-3 md:gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]";

const TEXT_SHADOW = "";

const NAV_TEXT_CLASS = cn(
  "text-sm font-semibold text-white transition-colors duration-200",
  TEXT_SHADOW,
  "hover:text-[#d8c83a]",
);

const ICON_BTN_CLASS = cn(
  NAV_TEXT_CLASS,
  "min-h-11 min-w-11 shrink-0 rounded-full hover:bg-black/15",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c83a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#163006]",
);

const NAV_ACTIVE_CLASS = cn(
  "rounded-full border border-[#d8c83a]/70 bg-[#253b08]/90 text-[#d8c83a]",
  "shadow-[inset_0_1px_0_rgba(216,200,58,0.14),0_2px_8px_rgba(0,0,0,0.25)]",
  TEXT_SHADOW,
);

const DROPDOWN_PANEL_CLASS =
  "min-w-[240px] rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_48px_rgba(0,0,0,0.18)]";

const DROPDOWN_LINK_CLASS =
  "flex min-h-10 items-center rounded-xl px-3 py-2 text-sm font-semibold text-[#163006] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163006]/30";

const DROPDOWN_LINK_ACTIVE_CLASS =
  "bg-[#163006] text-[#d8c83a] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]";

const MOBILE_PANEL_CLASS =
  "overflow-y-auto border-l border-white/10 bg-[#163006]/98 text-white backdrop-blur-md backdrop-saturate-[1.25] [&>button]:text-white [&>button]:hover:text-[#d8c83a]";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(pathname: string, item: (typeof PRIMARY_NAV)[0]) {
  if (item.href && isActive(pathname, item.href)) return true;
  return (
    item.children?.some((c) =>
      isActive(pathname, c.href.split("#")[0] ?? c.href),
    ) ?? false
  );
}

type SiteNavBarProps = {
  // kept for backwards compatibility with existing imports;
  // design from main doesn't need these flags.
  collapsed?: boolean;
  transparent?: boolean;
};

export function SiteNavBar(_: SiteNavBarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    window.location.href = q
      ? `/san-pham?q=${encodeURIComponent(q)}`
      : "/san-pham";
  }

  const navTriggerClass = (active: boolean) =>
    cn(
      navigationMenuTriggerStyle,
      NAV_TEXT_CLASS,
      active && NAV_ACTIVE_CLASS,
      !active && "hover:bg-black/12",
    );

  return (
    <>
      <div className={HEADER_INNER_CLASS}>
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c83a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#163006] lg:justify-self-start"
        >
          <Image
            src={BRAND_LOGO_SRC}
            alt="Nam Dương Tea"
            width={664}
            height={376}
            className={cn(
              "h-10 w-auto bg-transparent md:h-11",
            )}
            priority
          />
        </Link>

        <nav
          className="hidden overflow-visible lg:flex lg:justify-center"
          aria-label="Điều hướng chính"
        >
          <NavigationMenu className="flex-none">
            <NavigationMenuList className="gap-0.5">
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={navTriggerClass(isNavItemActive(pathname, item))}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={DROPDOWN_PANEL_CLASS}>
                      <ul className="grid gap-0.5">
                        {item.children.map((child) => {
                          const childActive = isActive(
                            pathname,
                            child.href.split("#")[0] ?? child.href,
                          );
                          return (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    DROPDOWN_LINK_CLASS,
                                    childActive && DROPDOWN_LINK_ACTIVE_CLASS,
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <Link
                      href={item.href!}
                      className={cn(
                        navigationMenuTriggerStyle,
                        NAV_TEXT_CLASS,
                        isActive(pathname, item.href!) && NAV_ACTIVE_CLASS,
                        !isActive(pathname, item.href!) && "hover:bg-black/12",
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:justify-self-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={ICON_BTN_CLASS}
            onClick={() => setSearchOpen(true)}
            aria-label="Tìm kiếm"
          >
            <Search className="h-5 w-5" aria-hidden />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(ICON_BTN_CLASS, "lg:hidden")}
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={MOBILE_PANEL_CLASS}>
              <SheetHeader>
                <SheetTitle className={cn("text-white", TEXT_SHADOW)}>
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Menu di động">
                {PRIMARY_NAV.map((item) => (
                  <div key={item.label} className="py-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex min-h-11 items-center rounded-xl px-3 text-lg font-semibold text-white transition-colors hover:bg-black/15 hover:text-[#d8c83a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c83a]/60",
                          TEXT_SHADOW,
                          isActive(pathname, item.href) && NAV_ACTIVE_CLASS,
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p
                        className={cn(
                          "flex min-h-11 items-center gap-1 px-3 text-lg font-semibold text-white",
                          TEXT_SHADOW,
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </p>
                    )}
                    {item.children ? (
                      <ul className="mt-1 space-y-0.5 border-l border-white/15 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-white/90 transition-colors hover:bg-black/15 hover:text-[#d8c83a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c83a]/60",
                                TEXT_SHADOW,
                                isActive(
                                  pathname,
                                  child.href.split("#")[0] ?? child.href,
                                ) && "font-semibold text-[#d8c83a]",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="border-white/10 bg-[#163006]/98 text-white backdrop-blur-md backdrop-saturate-[1.25]">
          <DialogHeader>
            <DialogTitle className={cn("text-white", TEXT_SHADOW)}>
              Tìm kiếm sản phẩm
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Nhập tên sản phẩm…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="border-white/10 bg-[#253b08]/90 text-white placeholder:text-white/50"
            />
            <Button type="submit">Tìm</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
