"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export function ProductCatalogSearch({
  defaultValue,
  className,
  placeholder = "Tìm kiếm tên trà, loại trà...",
}: {
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initial = defaultValue ?? searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const paramsSnapshot = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const commit = (next: string) => {
    const params = new URLSearchParams(paramsSnapshot);
    const trimmed = next.trim();

    if (trimmed) params.set("q", trimmed);
    else params.delete("q");

    // reset page whenever search changes
    params.delete("page");

    const qs = params.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname));
  };

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-tea-muted">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit(value);
          if (e.key === "Escape") {
            setValue("");
            commit("");
          }
        }}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-full border border-border/70 bg-white/70 px-12 py-3 text-sm text-tea-dark-green shadow-sm outline-none backdrop-blur",
          "placeholder:text-tea-muted/80",
          "focus:border-tea-dark-green/20 focus:ring-4 focus:ring-tea-yellow-green/15",
          isPending && "opacity-80",
        )}
        aria-label="Tìm kiếm sản phẩm"
      />

      {value ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            commit("");
          }}
          className={cn(
            "absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-full px-3 text-tea-muted",
            "hover:bg-black/5 hover:text-tea-dark-green",
            (isPending || value === "") && "pointer-events-none opacity-60",
          )}
          aria-label="Xoá tìm kiếm"
        >
          <span className="text-xl leading-none">×</span>
        </button>
      ) : null}
    </div>
  );
}

