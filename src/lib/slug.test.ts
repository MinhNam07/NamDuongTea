import { describe, expect, it } from "vitest";

import {
  canonicalTeaLineSlug,
  isProductLineSlug,
} from "@/lib/slug";

describe("canonicalTeaLineSlug", () => {
  it("maps legacy dinh ngoc slug", () => {
    expect(canonicalTeaLineSlug("tra-xanh-dinh-ngoc")).toBe("tra-dinh-ngoc");
  });

  it("maps oolong variant slugs", () => {
    expect(canonicalTeaLineSlug("o-long-ban-len-men")).toBe("tra-o-long");
  });

  it("returns null for tra quan slug", () => {
    expect(canonicalTeaLineSlug("nam-moc-tra-quan")).toBeNull();
  });
});

describe("isProductLineSlug", () => {
  it("recognizes tea line slugs", () => {
    expect(isProductLineSlug("hong-tra")).toBe(true);
  });

  it("rejects category slugs", () => {
    expect(isProductLineSlug("che-xanh")).toBe(false);
  });
});
