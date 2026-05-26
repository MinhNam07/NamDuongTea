"use client";

import { useCallback, useEffect, useState } from "react";

import { NAV_COLLAPSE_AT, NAV_EXPAND_AT } from "@/lib/header-config";

/**
 * Threshold + hysteresis: collapse at 100px, expand only below 40px.
 * Between 40–100px the state does not flip (prevents jitter).
 */
export function useNavbarCollapsed(isHome: boolean) {
  const [collapsed, setCollapsed] = useState(!isHome);

  const update = useCallback(() => {
    if (!isHome) {
      setCollapsed(true);
      return;
    }
    const y = window.scrollY;
    setCollapsed((prev) => {
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

  return collapsed;
}
