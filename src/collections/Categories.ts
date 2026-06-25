import type { CollectionConfig } from "payload";

import { isManagerOrAbove, isStaff } from "@/access";
import { generateSlugFromField } from "@/hooks/generateSlug";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Danh mục",
    plural: "Danh mục",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "active", "order"],
    description: "Danh mục catalog sản phẩm (chè xanh, chè đen, trà quán...).",
    group: "Nội dung",
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isManagerOrAbove,
  },
  hooks: {
    beforeValidate: [generateSlugFromField("name")],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cơ bản",
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
              label: "Slug URL",
              admin: {
                description: "URL friendly. Ví dụ: che-xanh",
              },
            },
            {
              name: "description",
              type: "textarea",
              label: "Mô tả ngắn",
            },
            {
              name: "parent",
              type: "relationship",
              relationTo: "categories",
              label: "Danh mục cha",
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
          ],
        },
        {
          label: "Ảnh",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Ảnh danh mục",
            },
          ],
        },
      ],
    },
  ],
};
