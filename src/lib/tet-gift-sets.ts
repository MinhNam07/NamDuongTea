/** Tên bộ sưu tập (hiển thị trên site) */
export const TRA_QUAN_COLLECTION_NAME = "Nam Dương trà quán";

export type TetGiftTeaLine = {
  name: string;
  weight: string;
};

export type TetGiftSet = {
  slug: string;
  name: string;
  teas: TetGiftTeaLine[];
  priceVnd: number | null;
  stockNote: string | null;
  tagline: string;
  giftHighlights: string[];
};

/** Source: set trà tết.xlsx — Nam Dương trà quán */
export const TET_GIFT_SETS: TetGiftSet[] = [
  {
    slug: "nam-moc-tra-quan",
    name: "Nam mộc trà quán",
    teas: [
      { name: "Bạch trà shan tuyết", weight: "80gr" },
      { name: "Hồng trà", weight: "80gr" },
    ],
    priceVnd: 950_000,
    stockNote: "25 set",
    tagline: "Tinh hoa trà shan & hồng trà trong thất phẩm gỗ",
    giftHighlights: [
      "Hộp gỗ chạm khắc tinh xảo",
      "Hai dòng trà cao cấp",
      "Quà biếu Tết sang trọng",
    ],
  },
  {
    slug: "son-moc-tra-quan",
    name: "Sơn mộc trà quán",
    teas: [
      { name: "Bạch trà shan tuyết", weight: "80gr" },
      { name: "Trà đinh ngọc", weight: "100gr" },
    ],
    priceVnd: 820_000,
    stockNote: "25 set",
    tagline: "Shan tuyết thanh khiết cùng đinh ngọc quý phái",
    giftHighlights: [
      "Cân bằng vị trà trắng & trà xanh",
      "Thiết kế quán trà cổ điển",
      "Phù hợp biếu đối tác B2B",
    ],
  },
  {
    slug: "thanh-nhien-tra-quan",
    name: "Thanh nhiên trà quán",
    teas: [
      { name: "Trà ô long", weight: "150gr" },
      { name: "Trà đinh ngọc", weight: "100gr" },
    ],
    priceVnd: 750_000,
    stockNote: "20 set",
    tagline: "Ô long thơm lâu, đinh ngọc thanh nhã",
    giftHighlights: [
      "Dung lượng ô long hào phóng",
      "Hương vị đa tầng",
      "Set quà Tết tinh tế",
    ],
  },
  {
    slug: "bach-nhien-tra-quan",
    name: "Bạch nhiên trà quán",
    teas: [
      { name: "Trà ô long", weight: "100gr" },
      { name: "Trà đinh ngọc", weight: "50gr" },
      { name: "Hồng trà", weight: "30gr" },
    ],
    priceVnd: 620_000,
    stockNote: "25 set",
    tagline: "Ba sắc trà trong một thất phẩm thanh nhã",
    giftHighlights: [
      "Trải nghiệm ba dòng trà",
      "Giá trị quà tặng linh hoạt",
      "Đóng gói cao cấp",
    ],
  },
  {
    slug: "van-lo-tra-quan",
    name: "Vân lộ trà quán",
    teas: [
      { name: "Trà ô long", weight: "100gr" },
      { name: "Trà đinh ngọc", weight: "50gr" },
      { name: "Bạch trà shan tuyết", weight: "30gr" },
    ],
    priceVnd: 690_000,
    stockNote: "Hết",
    tagline: "Tứ vị trà — bộ sưu tập giới hạn",
    giftHighlights: [
      "Kết hợp ô long, đinh ngọc, shan",
      "Thiết kế vân lộ tinh xảo",
      "Phiên bản đặc biệt",
    ],
  },
];

export function formatVnd(amount: number | null) {
  if (amount == null) return null;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}
