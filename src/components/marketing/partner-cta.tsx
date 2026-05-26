import Link from "next/link";

import { Button } from "@/components/ui/button";

export function PartnerCTA() {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-tea-dark-green via-tea-moss to-tea-deep-brown px-8 py-14 text-center text-white shadow-xl md:px-16">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Bạn muốn trở thành đối tác của chúng tôi?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
          Hãy liên hệ với chúng tôi ngay — rất hân hạnh được đồng hành cùng
          đại lý, nhà phân phối và đơn vị xuất khẩu trên toàn quốc.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-tea-yellow-green text-tea-deep-brown hover:bg-tea-olive"
          >
            <Link href="/lien-he">Liên hệ với chúng tôi</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/dang-ky-dai-ly">Đăng ký đại lý</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
