/** Dữ liệu khởi tạo dev — chỉ dùng cho `/api/dev/seed`, không dùng trên frontend. */

export type TraQuanSeedProduct = {
  name: string;
  slug: string;
  tagline: string;
  teas: { name: string; weight: string }[];
  priceVnd: number | null;
  giftHighlights: string[];
  gallerySlidesReversed: boolean;
  isFeatured?: boolean;
};

export const TRA_QUAN_SEED_PRODUCTS: TraQuanSeedProduct[] = [
  {
    name: "Nam mộc trà quán",
    slug: "nam-moc-tra-quan",
    teas: [
      { name: "Bạch trà shan tuyết", weight: "80gr" },
      { name: "Hồng trà", weight: "80gr" },
    ],
    priceVnd: 950_000,
    tagline: "Tinh hoa trà shan & hồng trà trong thất phẩm gỗ",
    giftHighlights: [
      "Hộp gỗ chạm khắc tinh xảo",
      "Hai dòng trà cao cấp",
      "Quà biếu Tết sang trọng",
    ],
    gallerySlidesReversed: false,
    isFeatured: true,
  },
  {
    name: "Sơn mộc trà quán",
    slug: "son-moc-tra-quan",
    teas: [
      { name: "Bạch trà shan tuyết", weight: "80gr" },
      { name: "Trà đinh ngọc", weight: "100gr" },
    ],
    priceVnd: 820_000,
    tagline: "Shan tuyết thanh khiết cùng đinh ngọc quý phái",
    giftHighlights: [
      "Cân bằng vị trà trắng & trà xanh",
      "Thiết kế quán trà cổ điển",
      "Phù hợp biếu đối tác B2B",
    ],
    gallerySlidesReversed: true,
  },
  {
    name: "Thanh nhiên trà quán",
    slug: "thanh-nhien-tra-quan",
    teas: [
      { name: "Trà ô long", weight: "150gr" },
      { name: "Trà đinh ngọc", weight: "100gr" },
    ],
    priceVnd: 750_000,
    tagline: "Ô long thơm lâu, đinh ngọc thanh nhã",
    giftHighlights: [
      "Dung lượng ô long hào phóng",
      "Hương vị đa tầng",
      "Set quà Tết tinh tế",
    ],
    gallerySlidesReversed: true,
  },
  {
    name: "Bạch nhiên trà quán",
    slug: "bach-nhien-tra-quan",
    teas: [
      { name: "Trà ô long", weight: "100gr" },
      { name: "Trà đinh ngọc", weight: "50gr" },
      { name: "Hồng trà", weight: "30gr" },
    ],
    priceVnd: 620_000,
    tagline: "Ba sắc trà trong một thất phẩm thanh nhã",
    giftHighlights: [
      "Trải nghiệm ba dòng trà",
      "Giá trị quà tặng linh hoạt",
      "Đóng gói cao cấp",
    ],
    gallerySlidesReversed: true,
  },
  {
    name: "Vân lộ trà quán",
    slug: "van-lo-tra-quan",
    teas: [
      { name: "Trà ô long", weight: "100gr" },
      { name: "Trà đinh ngọc", weight: "50gr" },
      { name: "Bạch trà shan tuyết", weight: "30gr" },
    ],
    priceVnd: 690_000,
    tagline: "Tứ vị trà — bộ sưu tập giới hạn",
    giftHighlights: [
      "Kết hợp ô long, đinh ngọc, shan",
      "Thiết kế vân lộ tinh xảo",
      "Phiên bản đặc biệt",
    ],
    gallerySlidesReversed: false,
  },
];
