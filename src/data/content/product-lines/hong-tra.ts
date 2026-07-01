import { roseAmberTheme } from "../themes/rose-amber";
import { DEFAULT_DETAIL_TABS } from "./detail-tabs-default";
import {
  productLineImageSrc,
  type ProductLineContent,
} from "./types";

const hero = productLineImageSrc("hong-tra", "bo-am-tra.webp");
const galleryOnly = productLineImageSrc("hong-tra", "la-tra-kho.webp");

export const hongTra: ProductLineContent = {
  slug: "hong-tra",
  name: "Hồng trà",
  description:
    "Hồng trà lên men vừa — hương mật ong, vị đậm đà cho pha trà và pha chế.",
  detail:
    "Hồng trà Nam Dương được lên men và sấy khô theo quy trình kiểm soát, cho sắc nước hổ phách ấm và hương ngọt tự nhiên. Phù hợp pha nóng, pha lạnh và ứng dụng đồ uống F&B cần vị trà rõ, ổn định.",
  imageFolder: "hong-tra",
  images: { hero, gallery: [galleryOnly] },
  theme: roseAmberTheme,
  catalogTab: "che-den",
  hasDetailPage: true,
  detailTabs: [
    {
      ...DEFAULT_DETAIL_TABS[0],
      paragraphs: [
        "Hồng trà lên men vừa cho sắc nước hổ phách ấm, hương ngọt tự nhiên và vị rõ — phù hợp pha chế đồ uống cần nền trà mạnh.",
      ],
      bullets: [
        { icon: "local_florist", title: "Hương", text: "Thoảng mật ong và caramel nhẹ." },
        { icon: "water_drop", title: "Vị", text: "Đậm vừa, tròn vị, ít chát." },
        { icon: "spa", title: "Sắc", text: "Hổ phách ấm." },
      ],
    },
    DEFAULT_DETAIL_TABS[1],
    {
      ...DEFAULT_DETAIL_TABS[2],
      bullets: [
        { icon: "water_drop", title: "Tỉ lệ", text: "4–5g / 200ml nước." },
        { icon: "schedule", title: "Thời gian", text: "60–90s lần đầu; tăng dần." },
        { icon: "spa", title: "Nhiệt độ", text: "90–95°C." },
      ],
    },
  ],
};
