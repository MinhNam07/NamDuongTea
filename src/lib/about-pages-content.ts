export type AboutStat = {
  value: string;
  label: string;
  description?: string;
};

export type AboutValueCard = {
  title: string;
  description: string;
};

export type AboutRegion = {
  id: string;
  name: string;
  description: string;
};

export type AboutAlternatingBlock = {
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  paragraphs: string[];
  bullets?: string[];
  image: { src: string; alt: string };
  imagePosition?: "left" | "right";
};

export const COMPANY_INTRO_PAGE = {
  hero: {
    eyebrow: "Giới thiệu",
    title: "Công ty Trà Nam Dương",
    subtitle:
      "Tinh hoa trà Việt — đối tác tin cậy cho đại lý, nhà phân phối và đơn vị xuất khẩu với chất lượng ổn định và nguồn gốc minh bạch.",
    image: "/images/IMG_6570.JPG",
  },
  stats: [
    { value: "8", label: "Quốc gia", description: "Xuất khẩu" },
    { value: "HACCP", label: "Chứng nhận", description: "An toàn thực phẩm" },
    { value: "ISO 22000", label: "Hệ thống", description: "Quản lý chất lượng" },
  ] satisfies AboutStat[],
  values: [
    {
      title: "Chất lượng kế thừa",
      description:
        "Gìn giữ phương pháp chế biến truyền thống, kết hợp quy chuẩn hiện đại để mỗi lô trà đạt tiêu chuẩn khắt khe của thị trường B2B.",
    },
    {
      title: "Phát triển bền vững",
      description:
        "Nông nghiệp sinh thái, bảo vệ đất đai và hệ sinh thái — sự phát triển của Nam Dương gắn với cộng đồng nông dân địa phương.",
    },
    {
      title: "Đối tác tin cậy",
      description:
        "Minh bạch nguồn gốc, MOQ linh hoạt, hỗ trợ mẫu thử và báo giá nhanh — đồng hành cùng chuỗi phân phối và F&B.",
    },
  ] satisfies AboutValueCard[],
  story: {
    eyebrow: "Câu chuyện",
    title: "Từ các đồi chè",
    titleEmphasis: "vùng cao",
    paragraphs: [
      "Nam Dương Tea bắt đầu từ tâm huyết gìn giữ hương vị trà truyền thống Việt Nam, kết hợp quy trình sản xuất hiện đại để phục vụ thị trường B2B ngày càng khắt khe.",
      "Chúng tôi hợp tác trực tiếp với các nông hộ tại vùng nguyên liệu — kiểm soát toàn bộ chuỗi cung ứng từ búp tươi, sao sấy, đóng gói cho tới giao hàng.",
    ],
    image: {
      src: "/images/IMG_6547.JPG",
      alt: "Lá trà tươi được tuyển chọn thủ công",
    },
    imagePosition: "right" as const,
  } satisfies AboutAlternatingBlock,
  cta: {
    title: "Sẵn sàng hợp tác cùng Nam Dương Tea?",
    description:
      "Khám phá catalog sản phẩm hoặc gửi yêu cầu báo giá — đội ngũ sẽ phản hồi trong vòng 24 giờ.",
    primary: { label: "Xem sản phẩm", href: "/san-pham" },
    secondary: { label: "Liên hệ báo giá", href: "/lien-he" },
    tertiary: { label: "Tìm hiểu về vùng trồng", href: "/tim-hieu-vung-trong" },
  },
} as const;

export const GROWING_REGION_PAGE = {
  hero: {
    eyebrow: "Vùng trồng & nhà máy",
    title: "Tìm hiểu về vùng trồng",
    subtitle:
      "Minh bạch chuỗi giá trị từ đồi chè, cơ sở chế biến đến nguyên liệu thành phẩm — nền tảng cho đối tác B2B tin tưởng.",
    image: "/images/tea-hill-header.webp",
  },
  regions: [
    {
      id: "phu-tho",
      name: "Phú Thọ",
      description:
        "Vùng nguyên liệu truyền thống với đồi chè cổ thụ, khí hậu mát mẻ phù hợp chè xanh và chè đen chất lượng cao.",
    },
    {
      id: "yen-bai",
      name: "Yên Bái",
      description:
        "Cao nguyên sương mù — búp trà tươi được thu hái thủ công theo tiêu chuẩn 1 tôm 2 lá vào sáng sớm.",
    },
    {
      id: "son-la",
      name: "Sơn La",
      description:
        "Vùng nguyên liệu truyền thống với đồi chè cổ thụ, khí hậu mát mẻ phù hợp chè xanh và chè đen chất lượng cao.",
    },
  ] satisfies AboutRegion[],
  factory: {
    eyebrow: "Cơ sở sản xuất",
    title: "Nhà máy &",
    titleEmphasis: "cơ sở hạ tầng",
    paragraphs: [
      "Nhà máy Nam Dương Tea được trang bị dây chuyền sao sấy, sấy khô và đóng gói hiện đại, đảm bảo quy trình khép kín từ nguyên liệu đến thành phẩm.",
    ],
    bullets: [
      "Dây chuyền sao sấy và chế biến theo từng dòng sản phẩm",
      "Khu vực đóng gói đạt chuẩn vệ sinh an toàn thực phẩm",
      "Phòng kiểm định chất lượng từng lô trước khi xuất kho",
      "Văn phòng & nhà máy: Khối 1, Xã Sóc Sơn, Hà Nội, Việt Nam",
    ],
    image: {
      src: "/images/IMG_6548.JPG",
      alt: "Cơ sở chế biến và đóng gói trà Nam Dương",
    },
    imagePosition: "left" as const,
  } satisfies AboutAlternatingBlock,
  quality: {
    eyebrow: "Nguyên liệu",
    title: "Kiểm soát",
    titleEmphasis: "chất lượng",
    paragraphs: [
      "Mỗi lô nguyên liệu được truy xuất nguồn gốc rõ ràng — từ vùng trồng, thời điểm thu hoạch đến quy trình chế biến, phục vụ yêu cầu minh bạch của đối tác B2B và xuất khẩu.",
    ],
    bullets: [
      "Tuyển chọn búp tươi theo tiêu chí 1 tôm 2 lá",
      "Kiểm tra độ ẩm, màu sắc và hương vị từng mẻ",
      "Chứng nhận HACCP, ISO 22000",
      "Hỗ trợ hồ sơ CO, kiểm nghiệm theo yêu cầu xuất khẩu",
    ],
    image: {
      src: "/images/IMG_6559.JPG",
      alt: "Đồi chè và nguyên liệu tươi tại vùng trồng",
    },
    imagePosition: "right" as const,
  } satisfies AboutAlternatingBlock,
  cta: {
    title: "Muốn tham quan vùng trồng hoặc nhà máy?",
    description:
      "Liên hệ đội ngũ Nam Dương Tea để đặt lịch tham quan hoặc nhận hồ sơ năng lực sản xuất.",
    primary: { label: "Liên hệ hợp tác", href: "/lien-he" },
    secondary: { label: "Giới thiệu công ty", href: "/gioi-thieu" },
    tertiary: { label: "Xem sản phẩm", href: "/san-pham" },
  },
} as const;
