import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeaderHeroContent() {
  return (
    <div className="container mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tea-yellow-green/95">
        Trà Việt · Nam Dương
      </p>
      <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[3.25rem]">
        Hương vị bền vững từ vùng trà Nam Dương
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
        Cung cấp trà nguyên liệu và thành phẩm cho đại lý, nhà phân phối, quán
        trà và đơn vị xuất khẩu — chất lượng ổn định, nguồn gốc rõ ràng.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          asChild
          size="lg"
          className="bg-tea-yellow-green text-tea-deep-brown shadow-lg hover:bg-tea-olive hover:ring-2 hover:ring-white/30"
        >
          <Link href="/san-pham">
            Xem catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-white/50 bg-white/5 text-white hover:bg-white/15 hover:text-white"
        >
          <Link href="/lien-he#rfq">Yêu cầu báo giá B2B</Link>
        </Button>
      </div>
    </div>
  );
}
