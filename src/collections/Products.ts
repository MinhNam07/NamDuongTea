import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "updatedAt"],
    description: "Sản phẩm trà — phục vụ catalog và RFQ.",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên sản phẩm",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL friendly. Ví dụ: tra-xanh-thai-nguyen",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Danh mục",
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Mô tả ngắn",
      admin: {
        description: "Hiển thị trên thẻ sản phẩm và meta description.",
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Mô tả chi tiết",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Ảnh đại diện",
    },
    {
      name: "gallery",
      type: "array",
      label: "Bộ sưu tập ảnh",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "specs",
      type: "array",
      label: "Thông số kỹ thuật",
      labels: {
        singular: "Thông số",
        plural: "Thông số",
      },
      fields: [
        { name: "label", type: "text", required: true, label: "Tên" },
        { name: "value", type: "text", required: true, label: "Giá trị" },
      ],
    },
    {
      name: "moq",
      type: "text",
      label: "MOQ (số lượng đặt tối thiểu)",
      admin: {
        description: "Ví dụ: 100kg, 1 container 20ft",
      },
    },
    {
      name: "origin",
      type: "text",
      label: "Vùng nguyên liệu",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "Sản phẩm nổi bật (hiển thị trên trang chủ)",
      defaultValue: false,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Nháp", value: "draft" },
        { label: "Đăng", value: "published" },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
      ],
    },
  ],
};
