import type { GlobalConfig } from "payload";

import { isStaff, staffOrPublishedDraftOnly } from "@/access";
import { seoGroupField } from "@/fields/seoFields";
import { revalidateSiteSettingsAfterChange } from "@/hooks/revalidateContent";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Cài đặt website",
  admin: {
    group: "Cài đặt",
    description: "Thông tin công ty, liên hệ, mạng xã hội và điều hướng.",
  },
  access: {
    read: staffOrPublishedDraftOnly,
    update: isStaff,
    readVersions: isStaff,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateSiteSettingsAfterChange],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Công ty",
          fields: [
            {
              name: "siteName",
              type: "text",
              label: "Tên website",
              defaultValue: "Nam Dương Tea",
            },
            {
              name: "defaultTitle",
              type: "text",
              label: "Tiêu đề mặc định",
            },
            {
              name: "defaultDescription",
              type: "textarea",
              label: "Mô tả mặc định",
            },
            {
              name: "footerTagline",
              type: "textarea",
              label: "Tagline chân trang",
            },
          ],
        },
        {
          label: "Liên hệ",
          fields: [
            {
              name: "contact",
              type: "group",
              label: "Thông tin liên hệ",
              fields: [
                { name: "location", type: "text", label: "Địa chỉ" },
                { name: "email", type: "email", label: "Email" },
                { name: "phone", type: "text", label: "Điện thoại" },
              ],
            },
            {
              name: "social",
              type: "group",
              label: "Mạng xã hội",
              fields: [
                { name: "facebook", type: "text", label: "Facebook" },
                { name: "zalo", type: "text", label: "Zalo" },
                { name: "whatsapp", type: "text", label: "WhatsApp" },
                { name: "youtube", type: "text", label: "YouTube" },
                { name: "supportChatUrl", type: "text", label: "Link chat hỗ trợ" },
              ],
            },
          ],
        },
        {
          label: "Điều hướng",
          fields: [
            {
              name: "announcement",
              type: "textarea",
              label: "Thông báo trên website",
              admin: {
                description: "Hiển thị banner thông báo (nếu có).",
              },
            },
            {
              name: "primaryNav",
              type: "array",
              label: "Menu chính",
              fields: [
                { name: "label", type: "text", required: true, label: "Nhãn" },
                { name: "href", type: "text", label: "Đường dẫn" },
                {
                  name: "children",
                  type: "array",
                  label: "Menu con",
                  fields: [
                    { name: "label", type: "text", required: true, label: "Nhãn" },
                    { name: "href", type: "text", required: true, label: "Đường dẫn" },
                  ],
                },
              ],
            },
            {
              name: "footerQuickLinks",
              type: "array",
              label: "Footer — Liên kết nhanh",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "footerProductLinks",
              type: "array",
              label: "Footer — Sản phẩm",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
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
