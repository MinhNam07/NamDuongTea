"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import {
  Clock,
  Droplets,
  Leaf,
  Sparkles,
  Sprout,
  Flower2,
} from "lucide-react";

import type { ProductDetailTabContent } from "@/lib/product-detail-tabs";
import { cn } from "@/lib/utils";

function BulletIcon({ name }: { name: string }) {
  const common = "h-5 w-5 text-foreground";
  switch (name) {
    case "local_florist":
      return <Flower2 className={common} aria-hidden />;
    case "water_drop":
      return <Droplets className={common} aria-hidden />;
    case "spa":
      return <Leaf className={common} aria-hidden />;
    case "eco":
      return <Sprout className={common} aria-hidden />;
    case "schedule":
      return <Clock className={common} aria-hidden />;
    case "auto_awesome":
    default:
      return <Sparkles className={common} aria-hidden />;
  }
}

export function ProductDetailTabs({
  tabs,
  className,
}: {
  tabs: ProductDetailTabContent[];
  className?: string;
}) {
  const reactId = useId();
  const safeTabs = useMemo(() => tabs ?? [], [tabs]);
  const [active, setActive] = useState(0);

  if (safeTabs.length === 0) return null;

  const current = safeTabs[Math.min(active, safeTabs.length - 1)];

  return (
    <section className={cn("mt-24", className)}>
      <div
        role="tablist"
        aria-label="Thông tin chi tiết"
        className={cn(
          "flex gap-8 overflow-x-auto border-b border-border/60 pb-0",
          "scrollbar-hide",
        )}
      >
        {safeTabs.map((t, idx) => {
          const selected = idx === active;
          return (
            <button
              key={t.key}
              id={`${reactId}-tab-${t.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${reactId}-panel-${t.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(idx)}
              className={cn(
                "whitespace-nowrap pb-4 font-display text-xl font-bold transition-colors",
                selected
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${reactId}-panel-${current.key}`}
        role="tabpanel"
        aria-labelledby={`${reactId}-tab-${current.key}`}
        className="pt-10"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground md:text-4xl">
              {current.heading}
            </h3>

            {current.paragraphs?.length ? (
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {current.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}

            {current.bullets?.length ? (
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {current.bullets.map((b) => (
                  <li key={`${b.title}-${b.icon}`} className="flex gap-3">
                    <div className="mt-0.5">
                      <BulletIcon name={b.icon} />
                    </div>
                    <p className="text-sm leading-relaxed md:text-base">
                      <span className="font-semibold text-foreground">
                        {b.title}:
                      </span>{" "}
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div
            className={cn(
              "relative h-[320px] overflow-hidden rounded-2xl glass-panel md:h-[420px]",
              "shadow-[0_8px_32px_0_rgba(37,74,12,0.08)]",
            )}
          >
            <Image
              src={current.image.src}
              alt={current.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

