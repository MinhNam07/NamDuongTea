import type { CSSProperties, ReactNode } from "react";

import type { ProductLineContent } from "@/data/content/product-lines";
import { cn } from "@/lib/utils";

type ProductThemeShellProps = {
  line: ProductLineContent;
  children: ReactNode;
  className?: string;
};

export function ProductThemeShell({
  line,
  children,
  className,
}: ProductThemeShellProps) {
  return (
    <div
      data-product-line={line.slug}
      style={line.theme.cssVars as CSSProperties}
      className={cn("product-themed min-h-screen", line.theme.surfaceClass, className)}
    >
      {children}
    </div>
  );
}
