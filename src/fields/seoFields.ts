import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    name: "metaTitle",
    type: "text",
    label: "Tiêu đề SEO",
    admin: {
      description: "Hiển thị trên tab trình duyệt và kết quả tìm kiếm.",
    },
  },
  {
    name: "metaDescription",
    type: "textarea",
    label: "Mô tả SEO",
    admin: {
      description: "Tóm tắt ngắn cho Google và mạng xã hội.",
    },
  },
  {
    name: "ogImage",
    type: "upload",
    relationTo: "media",
    label: "Ảnh chia sẻ (OG)",
    admin: {
      description: "Ảnh hiển thị khi chia sẻ link trên Facebook/Zalo.",
    },
  },
  {
    name: "canonical",
    type: "text",
    label: "URL chuẩn (canonical)",
    admin: {
      description: "Để trống nếu dùng URL mặc định của trang.",
    },
  },
];

export const seoGroupField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  fields: seoFields,
};
