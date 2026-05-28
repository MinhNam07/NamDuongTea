import { Leaf, Sun, Flame, RotateCw } from "lucide-react";

import { CRAFT_TIMELINE_BG_SRC } from "@/lib/site-assets";
import { WEBSITE_DATA } from "@/lib/website-data";
import { cn } from "@/lib/utils";

const HERO_GRADIENT_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(7,27,0,0.82),rgba(7,27,0,0.45),rgba(246,252,235,0.92))] mix-blend-multiply";

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
      className="relative w-full overflow-hidden py-28 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center [transform:translateZ(0)]"
          style={{ backgroundImage: `url('${CRAFT_TIMELINE_BG_SRC}')` }}
        />
        <div className={cn("absolute inset-0", HERO_GRADIENT_OVERLAY)} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-[5vw]">
        <header className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="font-display text-3xl font-light tracking-tight text-white md:text-5xl">
            Nghệ Thuật{" "}
            <span className="font-serif italic text-[rgba(214,198,140,1)]">
              Chế Tác
            </span>
          </h2>
          <p className="mt-6 text-lg font-light text-[rgba(223,229,212,1)]">
            Quy trình tỉ mỉ để đánh thức hương vị tiềm ẩn trong từng búp trà.
          </p>
        </header>

        <ol className="relative grid gap-8 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[60px] hidden h-px bg-white/35 md:block"
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
                <div className="mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-full border border-white/50 bg-[rgba(246,252,235,0.92)] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:shadow-md">
                  <Icon className="h-10 w-10 text-[rgba(106,94,46,1)]" />
                </div>
                <h3 className="font-display text-xl font-light text-white">
                  {it.title}
                </h3>
                <p className="mt-3 px-4 text-sm font-light leading-relaxed text-[rgba(223,229,212,0.95)]">
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

