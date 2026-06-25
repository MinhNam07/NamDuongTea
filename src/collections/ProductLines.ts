import type { CollectionConfig } from "payload";

import {
  isManagerOrAbove,
  isStaff,
  publishedDraftOnly,
} from "@/access";
import { seoGroupField } from "@/fields/seoFields";
import { generateSlugFromField } from "@/hooks/generateSlug";
import {
  revalidateProductLineAfterChange,
  revalidateProductLineAfterDelete,
} from "@/hooks/revalidateContent";
import { syncPublishStatus } from "@/hooks/syncPublishStatus";

export const ProductLines: CollectionConfig = {
  slug: "product-lines",
  labels: {
    singular: "Dòng trà",
    plural: "Dòng trà",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "active", "order", "updatedAt"],
    description: "Dòng trà marketing — trang /dong-tra/[slug].",
    group: "Nội dung",
  },
  access: {
    read: publishedDraftOnly,
    create: isStaff,
    update: isStaff,
    delete: isManagerOrAbove,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [generateSlugFromField("title")],
    beforeChange: [syncPublishStatus],
    afterChange: [revalidateProductLineAfterChange],
    afterDelete: [revalidateProductLineAfterDelete],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cơ bản",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Tên dòng trà",
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Slug URL",
              admin: {
                description: "Ví dụ: bach-tra-shan-tuyet → /dong-tra/bach-tra-shan-tuyet",
              },
            },
            {
              name: "shortDescription",
              type: "textarea",
              label: "Mô tả ngắn",
              admin: {
                description: "Hiển thị trên thẻ và danh sách.",
              },
            },
            {
              name: "description",
              type: "richText",
              label: "Mô tả chi tiết",
            },
            {
              name: "href",
              type: "text",
              label: "Đường dẫn",
              admin: {
                description: "Để trống để tự sinh /dong-tra/{slug}",
              },
            },
            {
              name: "hasDetailPage",
              type: "checkbox",
              label: "Có trang chi tiết /dong-tra",
              defaultValue: true,
            },
            {
              name: "order",
              type: "number",
              label: "Thứ tự hiển thị",
              defaultValue: 0,
            },
            {
              name: "active",
              type: "checkbox",
              label: "Đang hiển thị",
              defaultValue: true,
            },
            {
              name: "status",
              type: "select",
              defaultValue: "draft",
              required: true,
              label: "Trạng thái",
              options: [
                { label: "Nháp", value: "draft" },
                { label: "Đăng", value: "published" },
              ],
              access: {
                update: ({ req: { user } }) => {
                  if (!user) return false;
                  return user.role === "admin" || user.role === "manager";
                },
              },
            },
          ],
        },
        {
          label: "Ảnh",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Ảnh hero",
            },
            {
              name: "cardImage",
              type: "upload",
              relationTo: "media",
              label: "Ảnh thẻ",
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
              name: "legacyImagePath",
              type: "text",
              label: "Đường dẫn ảnh cũ (migration)",
              admin: {
                description: "Chỉ dùng khi chưa upload media. Ví dụ: /images/bach-tra-shan-tuyet/...",
                readOnly: true,
              },
            },
          ],
        },
        {
          label: "SEO",
          fields: [seoGroupField],
        },
      ],
    },
  ],
};
