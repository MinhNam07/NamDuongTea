"use client";

import { useCallback, useEffect, useState } from "react";

import { NAV_COLLAPSE_AT, NAV_EXPAND_AT } from "@/lib/header-config";

/**
 * Thu gọn header khi scroll — chỉ áp dụng trang chủ.
 * Các trang khác luôn dùng kích thước header mở rộng.
 */
export function useNavbarCollapsed(isHome: boolean) {
  const [homeScrolled, setHomeScrolled] = useState(false);

  const update = useCallback(() => {
    if (!isHome) {
      setHomeScrolled(false);
      return;
    }
    const y = window.scrollY;
    setHomeScrolled((prev) => {
      if (y < NAV_EXPAND_AT) return false;
      if (y >= NAV_COLLAPSE_AT) return true;
      return prev;
    });
  }, [isHome]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  return isHome && homeScrolled;
}
