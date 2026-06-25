import { PRODUCT_LINES, TEA_PRODUCT_LINES } from "../../src/lib/product-lines";
import { TRA_QUAN_SEED_PRODUCTS } from "../../src/lib/tra-quan-seed-data";
import websiteData from "../../data/website-data.json";
import { getProductDetailTabs } from "../../src/lib/product-detail-tabs";

export function inventoryCounts() {
  const teaProducts = [
    "tra-dinh-ngoc",
    "bach-tra-shan-tuyet",
    "hong-tra",
    "tra-den-ctc-tieu-chuan",
    "tra-o-long",
  ];

  return {
    productLines: PRODUCT_LINES.length,
    teaProductLines: TEA_PRODUCT_LINES.length,
    categories: 3,
    teaProducts: teaProducts.length,
    traQuanProducts: TRA_QUAN_SEED_PRODUCTS.length,
    detailTabProducts: Object.keys(
      TEA_PRODUCT_LINES.reduce<Record<string, true>>((acc, line) => {
        if (getProductDetailTabs(line.slug).length > 0) acc[line.slug] = true;
        return acc;
      }, {}),
    ).length,
    websiteDataKeys: Object.keys(websiteData).length,
  };
}

export { websiteData, TRA_QUAN_SEED_PRODUCTS, TEA_PRODUCT_LINES, PRODUCT_LINES };
