import Link from "next/link";

import { cn } from "@/lib/utils";

type Params = Record<string, string | number | null | undefined>;

function hrefWithParams(baseHref: string, params: Params) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === null || v === undefined) continue;
    const s = String(v).trim();
    if (!s) continue;
    sp.set(k, s);
  }
  const qs = sp.toString();
  return qs ? `${baseHref}?${qs}` : baseHref;
}

function rangeAround(page: number, totalPages: number, width: number) {
  const half = Math.floor(width / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + width - 1);
  start = Math.max(1, end - width + 1);
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export function ProductsPagination({
  page,
  totalPages,
  baseHref,
  params,
  className,
}: {
  page: number;
  totalPages: number;
  baseHref: string;
  params?: Params;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const p = Math.min(Math.max(1, page), totalPages);
  const pages = rangeAround(p, totalPages, 5);
  const common = params ?? {};

  const pill =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors";

  return (
    <nav
      aria-label="Phân trang"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <PageButton
        disabled={p <= 1}
        href={hrefWithParams(baseHref, { ...common, page: p - 1 })}
        ariaLabel="Trang trước"
      >
        ‹
      </PageButton>

      {pages[0] !== 1 ? (
        <>
          <Link
            href={hrefWithParams(baseHref, { ...common, page: 1 })}
            className={cn(
              pill,
              "border-border/70 bg-white/60 text-tea-dark-green hover:bg-white",
            )}
          >
            1
          </Link>
          <span className="px-1 text-tea-muted">…</span>
        </>
      ) : null}

      {pages.map((n) => {
        const active = n === p;
        return (
          <Link
            key={n}
            href={hrefWithParams(baseHref, { ...common, page: n })}
            aria-current={active ? "page" : undefined}
            className={cn(
              pill,
              active
                ? "border-tea-dark-green bg-tea-dark-green text-white"
                : "border-border/70 bg-white/60 text-tea-dark-green hover:bg-white",
            )}
          >
            {n}
          </Link>
        );
      })}

      {pages[pages.length - 1] !== totalPages ? (
        <>
          <span className="px-1 text-tea-muted">…</span>
          <Link
            href={hrefWithParams(baseHref, { ...common, page: totalPages })}
            className={cn(
              pill,
              "border-border/70 bg-white/60 text-tea-dark-green hover:bg-white",
            )}
          >
            {totalPages}
          </Link>
        </>
      ) : null}

      <PageButton
        disabled={p >= totalPages}
        href={hrefWithParams(baseHref, { ...common, page: p + 1 })}
        ariaLabel="Trang sau"
      >
        ›
      </PageButton>
    </nav>
  );
}

function PageButton({
  href,
  disabled,
  ariaLabel,
  children,
}: {
  href: string;
  disabled: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold transition-colors";

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, "border-border/40 bg-white/30 text-tea-muted/70")}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        base,
        "border-border/70 bg-white/60 text-tea-dark-green hover:bg-white",
      )}
    >
      {children}
    </Link>
  );
}

