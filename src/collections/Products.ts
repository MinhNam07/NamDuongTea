import type { CollectionConfig } from "payload";

import {
  isManagerOrAbove,
  isStaff,
  staffOrPublishedOnly,
} from "@/access";
import { canPublish } from "@/access/roles";
import { seoGroupField } from "@/fields/seoFields";
import { generateSlugFromField } from "@/hooks/generateSlug";
import {
  revalidateProductAfterChange,
  revalidateProductAfterDelete,
} from "@/hooks/revalidateContent";
import { syncPublishStatus } from "@/hooks/syncPublishStatus";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Sản phẩm",
    plural: "Sản phẩm",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "updatedAt"],
    description: "Sản phẩm trà — phục vụ catalog và RFQ.",
    group: "Nội dung",
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
        return `${base}/san-pham/${data?.slug ?? ""}`;
      },
    },
  },
  access: {
    read: staffOrPublishedOnly,
    create: isStaff,
    update: isStaff,
    delete: isManagerOrAbove,
    readVersions: isStaff,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1500,
      },
    },
  },
  hooks: {
    beforeValidate: [generateSlugFromField("name")],
    beforeChange: [syncPublishStatus],
    afterChange: [revalidateProductAfterChange],
    afterDelete: [revalidateProductAfterDelete],
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
              label: "Tên sản phẩm",
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Slug URL",
              admin: {
                description: "URL friendly. Ví dụ: tra-dinh-ngoc",
              },
            },
            {
              name: "sku",
              type: "text",
              unique: true,
              index: true,
              label: "Mã SKU",
              admin: {
                description: "Mã nội bộ (tùy chọn).",
              },
            },
            {
              name: "productLine",
              type: "relationship",
              relationTo: "product-lines",
              label: "Dòng trà",
            },
            {
              name: "category",
              type: "relationship",
              relationTo: "categories",
              label: "Danh mục chính",
              admin: {
                description: "Danh mục catalog chính (giữ tương thích).",
              },
            },
            {
              name: "categories",
              type: "relationship",
              relationTo: "categories",
              hasMany: true,
              label: "Danh mục bổ sung",
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
              name: "origin",
              type: "text",
              label: "Vùng nguyên liệu",
            },
            {
              name: "isFeatured",
              type: "checkbox",
              label: "Sản phẩm nổi bật",
              defaultValue: false,
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
                update: ({ req: { user } }) => canPublish(user),
              },
            },
          ],
        },
        {
          label: "Bán hàng",
          fields: [
            {
              name: "priceVnd",
              type: "number",
              label: "Giá bán (VND)",
              admin: {
                description: "Chủ yếu cho set quà Nam Dương trà quán.",
              },
            },
            {
              name: "priceNote",
              type: "text",
              label: "Ghi chú giá",
              admin: {
                description: "Ví dụ: Giá đại lý, liên hệ báo giá.",
              },
            },
            {
              name: "currency",
              type: "select",
              label: "Tiền tệ",
              defaultValue: "VND",
              options: [
                { label: "VND", value: "VND" },
                { label: "USD", value: "USD" },
              ],
            },
            {
              name: "moq",
              type: "text",
              label: "MOQ",
              admin: {
                description: "Ví dụ: 100kg, 1 container 20ft",
              },
            },
            {
              name: "moqUnit",
              type: "text",
              label: "Đơn vị MOQ",
            },
            {
              name: "packaging",
              type: "text",
              label: "Quy cách đóng gói",
            },
            {
              name: "availability",
              type: "text",
              label: "Tình trạng / mùa vụ",
            },
            {
              name: "giftTeas",
              type: "array",
              label: "Trà trong set (trà quán)",
              fields: [
                { name: "name", type: "text", required: true, label: "Loại trà" },
                { name: "weight", type: "text", required: true, label: "Định lượng" },
              ],
            },
            {
              name: "giftHighlights",
              type: "array",
              label: "Điểm nổi bật (trà quán)",
              fields: [{ name: "text", type: "text", required: true, label: "Nội dung" }],
            },
            {
              name: "gallerySlidesReversed",
              type: "checkbox",
              label: "Đảo thứ tự ảnh gallery",
              defaultValue: false,
            },
          ],
        },
        {
          label: "Nội dung",
          fields: [
            {
              name: "description",
              type: "richText",
              label: "Mô tả chi tiết",
            },
            {
              name: "specs",
              type: "array",
              label: "Thông số kỹ thuật",
              labels: { singular: "Thông số", plural: "Thông số" },
              fields: [
                { name: "label", type: "text", required: true, label: "Tên" },
                { name: "value", type: "text", required: true, label: "Giá trị" },
              ],
            },
            {
              name: "ingredients",
              type: "textarea",
              label: "Thành phần",
            },
            {
              name: "brewingGuide",
              type: "textarea",
              label: "Hướng dẫn pha",
            },
            {
              name: "certifications",
              type: "array",
              label: "Chứng nhận",
              fields: [{ name: "name", type: "text", required: true, label: "Tên" }],
            },
            {
              name: "detailTabs",
              type: "array",
              label: "Tab chi tiết sản phẩm",
              admin: {
                description: "Nội dung tab Hương vị, Quy trình, Pha trà trên trang chi tiết.",
              },
              fields: [
                {
                  name: "key",
                  type: "select",
                  required: true,
                  label: "Loại tab",
                  options: [
                    { label: "Đặc điểm hương vị", value: "huong-vi" },
                    { label: "Quy trình sản xuất", value: "quy-trinh" },
                    { label: "Hướng dẫn pha trà", value: "pha-tra" },
                  ],
                },
                { name: "label", type: "text", required: true, label: "Nhãn tab" },
                { name: "heading", type: "text", label: "Tiêu đề" },
                {
                  name: "paragraphs",
                  type: "array",
                  label: "Đoạn văn",
                  fields: [{ name: "text", type: "textarea", required: true }],
                },
                {
                  name: "bullets",
                  type: "array",
                  label: "Điểm nổi bật",
                  fields: [
                    { name: "title", type: "text", required: true, label: "Tiêu đề" },
                    { name: "text", type: "textarea", required: true, label: "Nội dung" },
                  ],
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: "Ảnh tab",
                },
              ],
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
              name: "legacyImagePath",
              type: "text",
              label: "Đường dẫn ảnh cũ (migration)",
              admin: {
                description: "Fallback static path trong giai đoạn chuyển đổi.",
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
