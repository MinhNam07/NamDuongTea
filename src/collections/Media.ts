import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description: "Hình ảnh, tài liệu PDF dùng trên website.",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
      { name: "card", width: 768, height: 576, position: "centre" },
      { name: "feature", width: 1280, height: 720, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Mô tả ảnh (alt text)",
    },
    {
      name: "caption",
      type: "text",
      label: "Chú thích",
    },
  ],
};
