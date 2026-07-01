import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { FacebookIcon } from "@/components/icons/facebook-icon";

import {
  FOOTER_QUICK_LINKS,
  FOOTER_PRODUCT_LINKS,
  SOCIAL_LINKS,
} from "@/data/content/site";
import { WEBSITE_DATA } from "@/data/content/site";
import { cn } from "@/lib/utils";

const footerLinkClass = cn(
  "w-fit text-sm font-light text-tea-muted transition-all duration-300",
  "hover:translate-x-1 hover:text-tea-dark-green",
);

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-tea-dark-green">
        {title}
      </h4>
      {children}
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 -mt-12 w-full">
      <div
        className={cn(
          "w-full rounded-t-[40px] border border-border/50",
          "bg-[#f4f0e6] shadow-[0_-8px_32px_rgba(22,48,6,0.12)]",
        )}
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 md:px-10 md:py-20 lg:px-14">
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-tea-dark-green transition-colors hover:text-tea-moss"
            >
              Nam Dương Tea
            </Link>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-tea-muted">
              {WEBSITE_DATA.brand.footerTagline}
            </p>
            <div className="mt-6 flex items-center gap-3 md:hidden">
              <SocialLink href={SOCIAL_LINKS.zalo} label="Zalo">
                Z
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS.facebook} label="Facebook">
                <FacebookIcon className="h-5 w-5" aria-hidden />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Khám phá">
            <nav className="flex flex-col gap-4" aria-label="Khám phá">
              {FOOTER_QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="Sản phẩm">
            <nav className="flex flex-col gap-4" aria-label="Sản phẩm">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="Liên hệ">
            <ul className="flex flex-col gap-4 text-sm font-light text-tea-muted">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-tea-olive"
                  aria-hidden
                />
                <span>{WEBSITE_DATA.navigation.footer.contact.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-tea-olive"
                  aria-hidden
                />
                <a
                  href={`mailto:${WEBSITE_DATA.navigation.footer.contact.email}`}
                  className={cn(footerLinkClass, "hover:translate-x-0")}
                >
                  {WEBSITE_DATA.navigation.footer.contact.email}
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="border-t border-border/60 px-4 py-6 text-center md:px-10 md:py-8">
          <p className="text-sm font-light text-tea-muted">
            © {year} Nam Dương Tea. Tinh hoa trà Việt.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-tea-olive/50 bg-white text-sm font-semibold text-tea-dark-green transition-colors hover:border-tea-yellow-green hover:bg-tea-green-50"
    >
      {children}
    </a>
  );
}
