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
  "mx-auto flex h-full w-full max-w-[1280px] items-center gap-4 pl-2 pr-4 md:pl-3 md:pr-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pl-4";

/** Chỉ nhãn menu trên thanh header (desktop), không áp dropdown / sheet mobile */
const HEADER_NAV_ITEM_CLASS = cn(
  navigationMenuTriggerStyle,
  "h-auto min-h-0 px-5 py-2 text-lg leading-snug md:text-xl [&_svg]:size-6",
);

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
  collapsed: boolean;
  /** Transparent overlay on hero (expanded home) */
  transparent?: boolean;
};

export function SiteNavBar({ collapsed, transparent = false }: SiteNavBarProps) {
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

  const iconBtnClass = transparent
    ? "rounded-full text-white hover:bg-white/10 hover:text-tea-yellow-green"
    : "rounded-full text-white hover:bg-white/10 hover:text-tea-yellow-green";

  return (
    <>
      <div className={HEADER_INNER_CLASS}>
        <Link
          href="/"
          className="-ml-2 flex shrink-0 items-center md:-ml-4 lg:-ml-6 lg:justify-self-start"
        >
          <Image
            src={BRAND_LOGO_SRC}
            alt="Nam Dương Tea"
            width={200}
            height={48}
            className={cn(
              "w-auto bg-transparent transition-[height] duration-300 ease-out",
              collapsed ? "h-10 md:h-12" : "h-14 md:h-[7rem]",
            )}
            priority
          />
        </Link>

        <nav
          className="hidden overflow-visible lg:flex lg:justify-center"
          aria-label="Điều hướng chính"
        >
          <NavigationMenu className="flex-none">
            <NavigationMenuList className="gap-2">
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={cn(
                        HEADER_NAV_ITEM_CLASS,
                        isNavItemActive(pathname, item) &&
                          "text-tea-yellow-green",
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block rounded-xl px-3 py-2.5 text-base font-medium text-tea-ink hover:bg-tea-green-50 hover:text-tea-dark-green",
                                  isActive(
                                    pathname,
                                    child.href.split("#")[0] ?? child.href,
                                  ) && "font-bold text-tea-dark-green",
                                )}
                              >
                                {child.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <Link
                      href={item.href!}
                      className={cn(
                        HEADER_NAV_ITEM_CLASS,
                        isActive(pathname, item.href!) &&
                          "text-tea-yellow-green underline decoration-tea-yellow-green decoration-2 underline-offset-4",
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

        <div className="ml-auto flex items-center gap-3 lg:justify-self-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(iconBtnClass, "h-12 w-12 [&_svg]:size-6")}
            onClick={() => setSearchOpen(true)}
            aria-label="Tìm kiếm"
          >
            <Search />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(iconBtnClass, "h-12 w-12 [&_svg]:size-6 lg:hidden")}
                aria-label="Mở menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4" aria-label="Menu di động">
                {PRIMARY_NAV.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-lg font-bold text-tea-dark-green"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p className="flex items-center gap-1 font-display text-lg font-bold text-tea-dark-green">
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </p>
                    )}
                    {item.children ? (
                      <ul className="mt-2 space-y-2 border-l-2 border-tea-olive/40 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-tea-muted hover:text-tea-dark-green"
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tìm kiếm sản phẩm</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Nhập tên sản phẩm…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit">Tìm</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
