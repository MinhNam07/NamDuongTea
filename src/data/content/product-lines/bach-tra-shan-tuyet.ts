import { snowWhiteTheme } from "../themes/snow-white";
import { DEFAULT_DETAIL_TABS } from "./detail-tabs-default";
import {
  productLineImageSrc,
  type ProductLineContent,
} from "./types";

const hero = productLineImageSrc("bach-tra-shan-tuyet", "bo-am-tra.webp");
const galleryOnly = productLineImageSrc("bach-tra-shan-tuyet", "la-tra-kho.webp");

export const bachTraShanTuyet: ProductLineContent = {
  slug: "bach-tra-shan-tuyet",
  name: "Bạch trà shan tuyết",
  description:
    "Bạch trà tuyển từ búp shan tuyết vùng cao — hương thanh nhẹ, vị ngọt dịu, ít chất đắng.",
  detail:
    "Bạch trà shan tuyết Nam Dương được chế biến tối giản để giữ trọn vẹn hương vị tự nhiên của búp trà vùng cao. Sắc nước trong, hương thảo mộc nhẹ và vị hậu ngọt dài — phù hợp thưởng thức nguyên chất hoặc phục vụ quán trà cao cấp.",
  imageFolder: "bach-tra-shan-tuyet",
  images: { hero, gallery: [galleryOnly] },
  theme: snowWhiteTheme,
  catalogTab: "che-xanh",
  hasDetailPage: true,
  detailTabs: [
    {
      ...DEFAULT_DETAIL_TABS[0],
      paragraphs: [
        "Bạch trà shan tuyết thiên về hương thanh và hậu ngọt dịu. Nước trà trong, cảm giác nhẹ và sạch vị — phù hợp thưởng thức nguyên chất.",
      ],
      bullets: [
        { icon: "local_florist", title: "Hương", text: "Thanh nhẹ, thoảng hoa rừng và cỏ non." },
        { icon: "water_drop", title: "Vị", text: "Dịu, ít đắng; hậu ngọt tinh tế." },
        { icon: "spa", title: "Sắc", text: "Trong, ánh vàng nhạt." },
      ],
    },
    DEFAULT_DETAIL_TABS[1],
    {
      ...DEFAULT_DETAIL_TABS[2],
      bullets: [
        { icon: "water_drop", title: "Tỉ lệ", text: "3g / 200ml nước." },
        { icon: "schedule", title: "Thời gian", text: "60–90s lần đầu; tăng nhẹ các lần sau." },
        { icon: "spa", title: "Nhiệt độ", text: "80–85°C để giữ hương thanh." },
      ],
    },
  ],
};
