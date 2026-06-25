"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Facebook, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS, SUPPORT_CHAT_URL } from "@/lib/site-navigation";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.61 1.4 4.94 3.6 6.5L4 22l5.2-2.8c.9.15 1.85.23 2.8.23 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function SiteFloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socialBtn =
    "h-11 w-11 rounded-full border-2 border-tea-olive/70 bg-white/90 text-tea-dark-green shadow-md hover:border-tea-yellow-green hover:bg-tea-green-50";

  return (
    <>
      <aside
        className={cn(
          "fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:left-4 md:flex",
          isHome && "top-[70%] opacity-80",
        )}
        aria-label="Mạng xã hội"
      >
        <Button asChild variant="ghost" size="icon" className={socialBtn}>
          <a
            href={SOCIAL_LINKS.zalo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zalo"
          >
            <ZaloIcon className="h-5 w-5" />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon" className={socialBtn}>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <WhatsappIcon className="h-5 w-5" />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon" className={socialBtn}>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </Button>
      </aside>

      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        <Button
          asChild
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full border-2 border-tea-olive bg-tea-moss text-white shadow-lg hover:bg-tea-dark-green",
          )}
        >
          <Link
            href={SUPPORT_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hỗ trợ khách hàng"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "h-12 w-12 rounded-full border-2 border-tea-yellow-green bg-tea-dark-green text-white shadow-lg hover:bg-tea-moss transition-opacity",
            showTop ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-label="Lên đầu trang"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
