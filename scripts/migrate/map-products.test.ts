import { describe, expect, it } from "vitest";

import { mapDetailTabs } from "./map-products";

describe("mapDetailTabs", () => {
  it("maps static tabs for known product slug", () => {
    const tabs = mapDetailTabs("tra-dinh-ngoc");
    expect(tabs.length).toBeGreaterThan(0);
    expect(tabs[0]?.key).toBe("huong-vi");
  });

  it("returns stable tab keys for idempotent migration", () => {
    const first = mapDetailTabs("hong-tra").map((tab) => tab.key);
    const second = mapDetailTabs("hong-tra").map((tab) => tab.key);
    expect(first).toEqual(second);
  });
});
