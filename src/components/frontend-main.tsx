"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** Offset for fixed navbar on pages without in-flow hero */
export function FrontendMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={cn("flex-1", isHome ? "pt-0" : "pt-20")}>{children}</main>
  );
}
