import type { CollectionConfig } from "payload";

import {
  isManagerOrAbove,
  isStaff,
  publishedOnly,
} from "@/access";
import { canPublish } from "@/access/roles";
import { seoGroupField } from "@/fields/seoFields";
import { generateSlugFromField } from "@/hooks/generateSlug";
import {
  revalidatePostAfterChange,
  revalidatePostAfterDelete,
} from "@/hooks/revalidateContent";
import { syncPublishStatus } from "@/hooks/syncPublishStatus";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Bài viết",
    plural: "Bài viết",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
    description: "Bài blog SEO ngành trà.",
    group: "Nội dung",
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
        return `${base}/tin-tuc/${data?.slug ?? ""}`;
      },
    },
  },
  access: {
    read: publishedOnly,
    create: isStaff,
    update: isStaff,
    delete: isManagerOrAbove,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1500,
      },
    },
  },
  hooks: {
    beforeValidate: [generateSlugFromField("title")],
    beforeChange: [syncPublishStatus],
    afterChange: [revalidatePostAfterChange],
    afterDelete: [revalidatePostAfterDelete],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cơ bản",
          fields: [
            { name: "title", type: "text", required: true, label: "Tiêu đề" },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Slug URL",
            },
            { name: "excerpt", type: "textarea", label: "Tóm tắt" },
            {
              name: "author",
              type: "text",
              label: "Tác giả",
            },
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
              label: "Trạng thái",
              options: [
                { label: "Nháp", value: "draft" },
                { label: "Đăng", value: "published" },
              ],
              access: {
                update: ({ req: { user } }) => canPublish(user),
              },
            },
          ],
        },
        {
          label: "Nội dung",
          fields: [
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: "Ảnh bìa",
            },
            { name: "body", type: "richText", label: "Nội dung" },
            {
              name: "tags",
              type: "array",
              label: "Thẻ",
              fields: [{ name: "tag", type: "text", required: true }],
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
