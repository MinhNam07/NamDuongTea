import { describe, expect, it } from "vitest";

import { prepareCatalogProducts } from "@/lib/product-tab-config";

const candidates = [
  {
    id: "tra-dinh-ngoc",
    name: "Trà đinh ngọc",
    slug: "tra-dinh-ngoc",
    shortDescription: "x",
    image: "/images/tra-dinh-ngoc/a.png",
    category: null,
  },
  {
    id: "bach-tra-shan-tuyet",
    name: "Bạch trà",
    slug: "bach-tra-shan-tuyet",
    shortDescription: "x",
    image: "/images/bach-tra-shan-tuyet/a.png",
    category: null,
  },
  {
    id: "tra-o-long",
    name: "Ô long",
    slug: "tra-o-long",
    shortDescription: "x",
    image: "/images/tra-o-long/a.png",
    category: null,
  },
  {
    id: "hong-tra",
    name: "Hồng trà",
    slug: "hong-tra",
    shortDescription: "x",
    image: "/images/hong-tra/a.png",
    category: null,
  },
];

describe("prepareCatalogProducts", () => {
  it("returns only hong tra for che-den tab", () => {
    const rows = prepareCatalogProducts(candidates, "che-den");
    expect(rows.map((p) => p.slug)).toEqual(["hong-tra"]);
  });

  it("returns three green-line products for che-xanh", () => {
    const rows = prepareCatalogProducts(candidates, "che-xanh");
    expect(rows.map((p) => p.slug).sort()).toEqual(
      ["bach-tra-shan-tuyet", "hong-tra", "tra-dinh-ngoc", "tra-o-long"]
        .filter((s) => s !== "hong-tra")
        .sort(),
    );
  });
});
