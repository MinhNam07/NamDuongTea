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
            href={SOCIAL_LINKS.messenger}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Messenger"
          >
            <MessageCircle className="h-5 w-5" />
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
