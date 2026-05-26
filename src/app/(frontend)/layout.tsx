import type { Metadata, Viewport } from "next";

import { FrontendMain } from "@/components/frontend-main";
import { SiteFloatingActions } from "@/components/site-floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "sonner";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "Nam Dương Tea — Trà Việt cho đại lý & xuất khẩu",
  description:
    "Nhà cung cấp trà nguyên liệu và thành phẩm: trà xanh, trà đen, trà ô-long. Phục vụ đại lý, nhà phân phối, quán trà, đơn vị xuất khẩu.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#254A0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <SiteHeader />
        <FrontendMain>{children}</FrontendMain>
        <SiteFooter />
        <SiteFloatingActions />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
