import type { Metadata, Viewport } from "next";

import { FrontendMain } from "@/components/frontend-main";
import { SiteFloatingActions } from "@/components/site-floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "sonner";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { WEBSITE_DATA } from "@/lib/website-data";

import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: WEBSITE_DATA.site.defaultTitle,
  description: WEBSITE_DATA.site.defaultDescription,
  path: "/",
});

export const viewport: Viewport = {
  themeColor: WEBSITE_DATA.brand.colors.teaDarkGreen,
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
