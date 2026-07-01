import { defaultTheme } from "../themes/default";
import type { ProductLineContent } from "./types";

/** Trà quán — landing riêng, không có trang /san-pham/[slug] themed */
export const traQuanProductLine: ProductLineContent = {
  slug: "nam-duong-tra-quan",
  name: "Nam Dương trà quán",
  description:
    "Bộ quà biếu thất phẩm gỗ chạm khắc — trà tuyển chọn, trình bày sang trọng.",
  detail:
    "Nam Dương trà quán là bộ sưu tập quà biếu cao cấp gồm năm thất phẩm gỗ chạm khắc, mỗi thất phẩm kể một câu chuyện riêng về trà và nghệ thủ công đóng gói.",
  imageFolder: "products/tet-gift-sets",
  images: {
    hero: "/images/products/tet-gift-sets/nam-moc-tra-quan-hero.webp",
    gallery: ["/images/products/tet-gift-sets/nam-moc-tra-quan-hero.webp"],
  },
  theme: defaultTheme,
  catalogTab: "che-xanh",
  hasDetailPage: false,
  detailTabs: [],
};
