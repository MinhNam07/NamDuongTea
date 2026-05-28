export type ProductDetailTabKey = "huong-vi" | "quy-trinh" | "pha-tra";

export type ProductDetailTabBullet = {
  icon: "local_florist" | "water_drop" | "spa" | "auto_awesome" | "eco" | "schedule";
  title: string;
  text: string;
};

export type ProductDetailTabContent = {
  key: ProductDetailTabKey;
  label: string;
  heading: string;
  paragraphs: string[];
  bullets: ProductDetailTabBullet[];
  image: { src: string; alt: string };
};

export type ProductDetailTabsBySlug = Record<string, ProductDetailTabContent[]>;

const DEFAULT_TABS: ProductDetailTabContent[] = [
  {
    key: "huong-vi",
    label: "Đặc điểm hương vị",
    heading: "Bản giao hưởng của hương và vị",
    paragraphs: [
      "Mỗi mẻ trà được tuyển chọn và chế tác để giữ trọn đặc tính tự nhiên của vùng cao: hương thơm thanh, vị cân bằng và hậu ngọt sâu.",
      "Thiết kế hương vị hướng đến tính ổn định cho đối tác phân phối và chuỗi F&B: dễ ứng dụng, dễ chuẩn hoá, và nhất quán theo mùa vụ.",
    ],
    bullets: [
      {
        icon: "local_florist",
        title: "Hương",
        text: "Hương thảo mộc trong trẻo, điểm nhẹ sắc hoa và mật.",
      },
      {
        icon: "water_drop",
        title: "Vị",
        text: "Chát thanh đầu lưỡi, chuyển dần sang hậu ngọt dài.",
      },
      {
        icon: "spa",
        title: "Sắc",
        text: "Nước trong, ánh vàng xanh hoặc hổ phách tuỳ dòng trà.",
      },
    ],
    image: {
      src: "/images/tea-hill-header.webp",
      alt: "Không gian thưởng trà tối giản với ánh sáng tự nhiên.",
    },
  },
  {
    key: "quy-trinh",
    label: "Quy trình sản xuất",
    heading: "Tối ưu chất lượng, giữ trọn bản sắc",
    paragraphs: [
      "Từ khâu thu hái đến chế biến, Nam Dương tập trung vào kiểm soát điểm then chốt: thời điểm hái, nhiệt độ, độ ẩm và thời gian chế biến.",
      "Quy trình được chuẩn hoá giúp bảo toàn hương vị, đồng thời đảm bảo độ ổn định lô hàng cho nhu cầu phân phối số lượng lớn.",
    ],
    bullets: [
      { icon: "eco", title: "Thu hái", text: "Chọn búp/trà theo tiêu chuẩn và thời điểm phù hợp." },
      { icon: "schedule", title: "Chế biến", text: "Kiểm soát thời gian làm héo, vò, lên men (tuỳ loại)." },
      { icon: "auto_awesome", title: "Hoàn thiện", text: "Sấy ổn định, phân loại và đóng gói theo quy cách B2B." },
    ],
    image: {
      src: "/images/tea-hill-footer.JPG",
      alt: "Quy trình chế biến trà thủ công kết hợp kiểm soát chất lượng.",
    },
  },
  {
    key: "pha-tra",
    label: "Hướng dẫn pha trà",
    heading: "Pha chuẩn — dễ ứng dụng cho quán & đại lý",
    paragraphs: [
      "Hướng dẫn tham khảo giúp đối tác dễ chuẩn hoá chất lượng đồ uống. Tuỳ khẩu vị và thiết bị, có thể tinh chỉnh nhẹ lượng trà và thời gian.",
    ],
    bullets: [
      { icon: "water_drop", title: "Tỉ lệ", text: "3–5g trà / 150–200ml nước." },
      { icon: "schedule", title: "Thời gian", text: "45–90s cho lần đầu; tăng dần cho các lần sau." },
      { icon: "spa", title: "Nhiệt độ", text: "80–95°C tuỳ dòng trà; ưu tiên nước mềm, sạch." },
    ],
    image: {
      src: "/images/tea-hill-header.webp",
      alt: "Ly trà nóng với sắc nước trong và hương thơm dịu.",
    },
  },
];

const TABS_BY_SLUG: ProductDetailTabsBySlug = {
  "bach-tra-shan-tuyet": [
    {
      ...DEFAULT_TABS[0],
      paragraphs: [
        "Bạch trà shan tuyết thiên về hương thanh và hậu ngọt dịu. Nước trà trong, cảm giác nhẹ và sạch vị — phù hợp thưởng thức nguyên chất.",
      ],
      bullets: [
        { icon: "local_florist", title: "Hương", text: "Thanh nhẹ, thoảng hoa rừng và cỏ non." },
        { icon: "water_drop", title: "Vị", text: "Dịu, ít đắng; hậu ngọt tinh tế." },
        { icon: "spa", title: "Sắc", text: "Trong, ánh vàng nhạt." },
      ],
    },
    DEFAULT_TABS[1],
    {
      ...DEFAULT_TABS[2],
      bullets: [
        { icon: "water_drop", title: "Tỉ lệ", text: "3g / 200ml nước." },
        { icon: "schedule", title: "Thời gian", text: "60–90s lần đầu; tăng nhẹ các lần sau." },
        { icon: "spa", title: "Nhiệt độ", text: "80–85°C để giữ hương thanh." },
      ],
    },
  ],
  "tra-dinh-ngoc": [
    {
      ...DEFAULT_TABS[0],
      paragraphs: [
        "Trà đinh ngọc có hương tươi mát, vị thanh và cân bằng. Dễ ứng dụng cho pha nóng/lạnh với profile ổn định.",
      ],
      bullets: [
        { icon: "local_florist", title: "Hương", text: "Tươi mát, thảo mộc xanh." },
        { icon: "water_drop", title: "Vị", text: "Thanh nhẹ, hậu ngọt." },
        { icon: "spa", title: "Sắc", text: "Xanh vàng trong." },
      ],
    },
    DEFAULT_TABS[1],
    {
      ...DEFAULT_TABS[2],
      bullets: [
        { icon: "water_drop", title: "Tỉ lệ", text: "4g / 200ml nước." },
        { icon: "schedule", title: "Thời gian", text: "45–60s lần đầu; tăng dần." },
        { icon: "spa", title: "Nhiệt độ", text: "80–90°C." },
      ],
    },
  ],
  "hong-tra": [
    {
      ...DEFAULT_TABS[0],
      paragraphs: [
        "Hồng trà lên men vừa cho sắc nước hổ phách ấm, hương ngọt tự nhiên và vị rõ — phù hợp pha chế đồ uống cần nền trà mạnh.",
      ],
      bullets: [
        { icon: "local_florist", title: "Hương", text: "Thoảng mật ong và caramel nhẹ." },
        { icon: "water_drop", title: "Vị", text: "Đậm vừa, tròn vị, ít chát." },
        { icon: "spa", title: "Sắc", text: "Hổ phách ấm." },
      ],
    },
    DEFAULT_TABS[1],
    {
      ...DEFAULT_TABS[2],
      bullets: [
        { icon: "water_drop", title: "Tỉ lệ", text: "4–5g / 200ml nước." },
        { icon: "schedule", title: "Thời gian", text: "60–90s lần đầu; tăng dần." },
        { icon: "spa", title: "Nhiệt độ", text: "90–95°C." },
      ],
    },
  ],
  "tra-o-long": DEFAULT_TABS,
};

function canonicalTabsSlug(slug: string) {
  if (slug === "tra-xanh-dinh-ngoc") return "tra-dinh-ngoc";
  if (slug === "tra-xanh-shan-tuyet") return "bach-tra-shan-tuyet";
  if (slug === "hong-tra-len-men-vua") return "hong-tra";
  if (slug.startsWith("o-long-")) return "tra-o-long";
  return slug;
}

export function getProductDetailTabs(slug: string): ProductDetailTabContent[] {
  return TABS_BY_SLUG[canonicalTabsSlug(slug)] ?? DEFAULT_TABS;
}

