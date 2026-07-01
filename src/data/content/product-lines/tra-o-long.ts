import { oolongGoldTheme } from "../themes/oolong-gold";
import { DEFAULT_DETAIL_TABS } from "./detail-tabs-default";
import {
  productLineImageSrc,
  type ProductLineContent,
} from "./types";

const hero = productLineImageSrc("tra-o-long", "bo-am-tra.webp");
const galleryOnly = productLineImageSrc("tra-o-long", "la-tra-kho.webp");

export const traOLong: ProductLineContent = {
  slug: "tra-o-long",
  name: "Trà ô long",
  description:
    "Ô long bán lên men — hương hoa quả nhẹ, thích hợp quán trà và đại lý cao cấp.",
  detail:
    "Trà ô long Nam Dương nằm giữa trà xanh và trà đen: hương thơm đa tầng, vị ngọt thanh, hậu vị kéo dài. Dòng sản phẩm được các quán trà và nhà phân phối ưa chuộng nhờ profile hương vị nhất quán.",
  imageFolder: "tra-o-long",
  images: { hero, gallery: [galleryOnly] },
  theme: oolongGoldTheme,
  catalogTab: "che-xanh",
  hasDetailPage: true,
  detailTabs: [...DEFAULT_DETAIL_TABS],
};
