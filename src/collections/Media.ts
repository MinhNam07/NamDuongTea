import type { CollectionConfig } from "payload";

import { isStaff } from "@/access";

import { isS3StorageEnabled } from "@/lib/storage";

const useS3Storage = isS3StorageEnabled();

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description: "Hình ảnh, tài liệu PDF dùng trên website.",
    group: "Nội dung",
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  upload: {
    ...(!useS3Storage
      ? { staticDir: "public/media" }
      : {}),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"],
    filesRequiredOnCreate: true,
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
      required: true,
      label: "Mô tả ảnh (alt text)",
      admin: {
        description: "Bắt buộc — mô tả ngắn cho SEO và người khiếm thị.",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Chú thích",
    },
    {
      name: "credit",
      type: "text",
      label: "Nguồn ảnh",
    },
  ],
};
