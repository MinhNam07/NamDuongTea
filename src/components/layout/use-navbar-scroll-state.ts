"use client";

import { useEffect, useState } from "react";

const DEFAULT_SCROLL_THRESHOLD_PX = 12;

export function useHeaderScrolled(threshold = DEFAULT_SCROLL_THRESHOLD_PX): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
