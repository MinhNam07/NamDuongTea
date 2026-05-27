"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { NAV_COLLAPSE_AT, NAV_EXPAND_AT } from "@/lib/header-config";

/**
 * Trang chủ: true khi đã scroll qua hero (tắt overlay trong suốt).
 * Các trang khác luôn false.
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

/**
 * Main-branch header glass style:
 * `true` once user has started scrolling down (small threshold),
 * independent of hero logic.
 */
function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function useHeaderScrolled(threshold: number = 12) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
