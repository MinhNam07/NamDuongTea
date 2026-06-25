import type { GlobalConfig } from "payload";

import { isStaff, publishedDraftOnly } from "@/access";
import { seoGroupField } from "@/fields/seoFields";
import { revalidateHomePageAfterChange } from "@/hooks/revalidateContent";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Trang chủ",
  admin: {
    group: "Nội dung",
    description: "Hero, sản phẩm nổi bật và các khối nội dung trang chủ.",
  },
  access: {
    read: publishedDraftOnly,
    update: isStaff,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateHomePageAfterChange],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Banner chính",
              fields: [
                { name: "eyebrow", type: "text", label: "Dòng phụ" },
                { name: "title", type: "text", label: "Tiêu đề" },
                { name: "subtitle", type: "textarea", label: "Mô tả" },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: "Ảnh nền",
                },
                { name: "ctaLabel", type: "text", label: "Nút CTA" },
                { name: "ctaHref", type: "text", label: "Link CTA" },
              ],
            },
          ],
        },
        {
          label: "Nổi bật",
          fields: [
            {
              name: "featuredProductLines",
              type: "relationship",
              relationTo: "product-lines",
              hasMany: true,
              label: "Dòng trà nổi bật",
            },
            {
              name: "featuredProducts",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              label: "Sản phẩm nổi bật",
            },
          ],
        },
        {
          label: "Nội dung",
          fields: [
            {
              name: "alternatingStories",
              type: "array",
              label: "Câu chuyện xen kẽ",
              fields: [
                { name: "title", type: "text", label: "Tiêu đề" },
                { name: "body", type: "textarea", label: "Nội dung" },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: "Ảnh",
                },
                { name: "ctaLabel", type: "text", label: "Nút CTA" },
                { name: "ctaHref", type: "text", label: "Link CTA" },
              ],
            },
            {
              name: "craftTimeline",
              type: "array",
              label: "Timeline chế biến",
              fields: [
                { name: "step", type: "text", label: "Bước" },
                { name: "title", type: "text", label: "Tiêu đề" },
                { name: "description", type: "textarea", label: "Mô tả" },
              ],
            },
            {
              name: "cta",
              type: "group",
              label: "Khối CTA cuối trang",
              fields: [
                { name: "title", type: "text", label: "Tiêu đề" },
                { name: "description", type: "textarea", label: "Mô tả" },
                { name: "primaryLabel", type: "text", label: "Nút chính" },
                { name: "primaryHref", type: "text", label: "Link chính" },
                { name: "secondaryLabel", type: "text", label: "Nút phụ" },
                { name: "secondaryHref", type: "text", label: "Link phụ" },
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
