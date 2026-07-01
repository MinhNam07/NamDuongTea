import { jadeTheme } from "../themes/jade";
import { DEFAULT_DETAIL_TABS } from "./detail-tabs-default";
import {
  productLineImageSrc,
  type ProductLineContent,
} from "./types";

const hero = productLineImageSrc("tra-dinh-ngoc", "bo-am-tra.webp");
const galleryOnly = productLineImageSrc("tra-dinh-ngoc", "la-tra-kho.webp");

export const traDinhNgoc: ProductLineContent = {
  slug: "tra-dinh-ngoc",
  name: "Trà đinh ngọc",
  description:
    "Búp non một tôm một lá, sắc xanh ngọc — đặc trưng vùng trà Nam Dương.",
  detail:
    "Trà đinh ngọc là dòng trà xanh tuyển chọn từ búp non nhất, một tôm một lá. Hương thơm tươi mát, vị thanh ngọt cân bằng — lý tưởng cho pha trà truyền thống và chuỗi F&B cần hồ sơ hương vị ổn định theo mùa.",
  imageFolder: "tra-dinh-ngoc",
  images: { hero, gallery: [galleryOnly] },
  theme: jadeTheme,
  catalogTab: "che-xanh",
  hasDetailPage: true,
  detailTabs: [
    {
      ...DEFAULT_DETAIL_TABS[0],
      paragraphs: [
        "Trà đinh ngọc có hương tươi mát, vị thanh và cân bằng. Dễ ứng dụng cho pha nóng/lạnh với profile ổn định.",
      ],
      bullets: [
        { icon: "local_florist", title: "Hương", text: "Tươi mát, thảo mộc xanh." },
        { icon: "water_drop", title: "Vị", text: "Thanh nhẹ, hậu ngọt." },
        { icon: "spa", title: "Sắc", text: "Xanh vàng trong." },
      ],
    },
    DEFAULT_DETAIL_TABS[1],
    {
      ...DEFAULT_DETAIL_TABS[2],
      bullets: [
        { icon: "water_drop", title: "Tỉ lệ", text: "4g / 200ml nước." },
        { icon: "schedule", title: "Thời gian", text: "45–60s lần đầu; tăng dần." },
        { icon: "spa", title: "Nhiệt độ", text: "80–90°C." },
      ],
    },
  ],
};
