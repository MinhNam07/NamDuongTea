import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
    description: "Bài blog SEO ngành trà.",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Tiêu đề" },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    { name: "excerpt", type: "textarea", label: "Tóm tắt" },
    { name: "coverImage", type: "upload", relationTo: "media", label: "Ảnh bìa" },
    { name: "body", type: "richText", label: "Nội dung" },
    {
      name: "publishedAt",
      type: "date",
      label: "Ngày đăng",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Nháp", value: "draft" },
        { label: "Đăng", value: "published" },
      ],
    },
  ],
};
