import { Leaf, Sun, Flame, RotateCw } from "lucide-react";

import { WEBSITE_DATA } from "@/lib/website-data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  eco: Leaf,
  wb_sunny: Sun,
  local_fire_department: Flame,
  blur_on: RotateCw,
};

export function CraftTimelineSection() {
  const items = WEBSITE_DATA.pages.home.craftTimeline;

  return (
    <section
      id="craft"
      aria-label="Quy trình chế tác"
      className="w-full border-y border-[rgba(195,200,186,0.4)] bg-[rgba(234,240,223,1)] py-28 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-[5vw]">
        <header className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="font-display text-3xl font-light tracking-tight text-[rgba(7,27,0,1)] md:text-5xl">
            Nghệ Thuật <span className="font-serif italic">Chế Tác</span>
          </h2>
          <p className="mt-6 text-lg font-light text-[rgba(67,73,61,1)]">
            Quy trình tỉ mỉ để đánh thức hương vị tiềm ẩn trong từng búp trà.
          </p>
        </header>

        <ol className="relative grid gap-8 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[60px] hidden h-px bg-[rgba(195,200,186,0.7)] md:block"
          />
          {items.map((it) => {
            const Icon = ICONS[it.icon] ?? Leaf;
            return (
              <li
                key={it.id}
                className={cn(
                  "relative z-10 flex flex-col items-center text-center",
                )}
              >
                <div className="mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-full border border-[rgba(195,200,186,0.7)] bg-[rgba(246,252,235,1)] shadow-sm transition-all duration-300 group-hover:scale-105 hover:border-[rgba(7,27,0,0.45)]">
                  <Icon className="h-10 w-10 text-[rgba(106,94,46,1)]" />
                </div>
                <h3 className="font-display text-xl font-light text-[rgba(7,27,0,1)]">
                  {it.title}
                </h3>
                <p className="mt-3 px-4 text-sm font-light leading-relaxed text-[rgba(67,73,61,1)]">
                  {it.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

