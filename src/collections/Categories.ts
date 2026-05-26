import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    description: "Danh mục sản phẩm (ví dụ: trà xanh, trà đen, trà ô-long).",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên danh mục",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL friendly. Ví dụ: tra-xanh",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô tả ngắn",
    },
  ],
};
