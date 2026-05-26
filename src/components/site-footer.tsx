import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { Separator } from "@/components/ui/separator";
import { TeaHillBackdrop } from "@/components/ui/tea-hill-backdrop";
import { BRAND_LOGO_SRC } from "@/lib/site-assets";
import {
  FOOTER_PRODUCT_LINKS,
  FOOTER_QUICK_LINKS,
  SOCIAL_LINKS,
} from "@/lib/site-navigation";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.61 1.4 4.94 3.6 6.5L4 22l5.2-2.8c.9.15 1.85.23 2.8.23 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20">
      <TeaHillBackdrop variant="footer">
        <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:py-16">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={BRAND_LOGO_SRC}
                alt="Nam Dương Tea"
                width={664}
                height={376}
                className="h-11 w-auto bg-transparent"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/85">
              Nhà cung cấp trà Việt cho đại lý, nhà phân phối, quán trà và đơn
              vị xuất khẩu — từ đồi chè Nam Dương đến tách trà trên bàn bạn.
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-tea-olive/60 text-tea-yellow-green transition-colors hover:bg-tea-olive/30 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-tea-olive/60 text-tea-yellow-green transition-colors hover:bg-tea-olive/30 hover:text-white"
                aria-label="Zalo"
              >
                <ZaloIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-tea-olive/60 text-tea-yellow-green transition-colors hover:bg-tea-olive/30 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Liên hệ
            </h3>
            <Separator className="my-3 bg-tea-olive/50" />
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tea-yellow-green" />
                <span>Vùng nguyên liệu Nam Dương, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-tea-yellow-green" />
                <a href="tel:+84000000000" className="hover:text-tea-yellow-green">
                  +84 000 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-tea-yellow-green" />
                <a
                  href="mailto:hello@namduongtea.vn"
                  className="hover:text-tea-yellow-green"
                >
                  hello@namduongtea.vn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Liên kết nhanh
            </h3>
            <Separator className="my-3 bg-tea-olive/50" />
            <ul className="space-y-2 text-sm text-white/85">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-tea-yellow-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-6 font-display text-sm font-bold text-tea-olive">
              Sản phẩm
            </h4>
            <ul className="mt-2 space-y-2 text-sm text-white/85">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-tea-yellow-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Nhận tin tức
            </h3>
            <Separator className="my-3 bg-tea-olive/50" />
            <p className="mb-4 text-sm text-white/85">
              Đăng ký để nhận tin về sản phẩm mới, sự kiện và ưu đãi đại lý.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-tea-olive/30">
          <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/70 md:flex-row md:px-6">
            <p>© {new Date().getFullYear()} Nam Dương Tea. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/lien-he" className="hover:text-tea-yellow-green">
                Liên hệ
              </Link>
              <span className="text-tea-olive/60">·</span>
              <span className="text-white/50">Chính sách bảo mật (sắp ra mắt)</span>
            </div>
          </div>
        </div>
      </TeaHillBackdrop>
    </footer>
  );
}
