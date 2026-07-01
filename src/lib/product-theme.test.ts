import { describe, expect, it } from "vitest";

import { resolveProductTheme } from "@/lib/product-theme";

describe("resolveProductTheme", () => {
  it("returns rose theme for hong-tra", () => {
    const theme = resolveProductTheme("hong-tra");
    expect(theme?.id).toBe("rose-amber");
    expect(theme?.cssVars["--line-primary"]).toBe("#8B3A4A");
  });

  it("returns snow theme for bach-tra-shan-tuyet", () => {
    const theme = resolveProductTheme("bach-tra-shan-tuyet");
    expect(theme?.id).toBe("snow-white");
    expect(theme?.cssVars["--line-surface"]).toBe("#FAFCFE");
  });

  it("returns null for unknown slug", () => {
    expect(resolveProductTheme("not-a-tea")).toBeNull();
  });
});
