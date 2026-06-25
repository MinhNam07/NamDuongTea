import type { CollectionConfig } from "payload";

import { isManagerOrAbove, isStaff } from "@/access";

export const Contacts: CollectionConfig = {
  slug: "contacts",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "type", "createdAt"],
    description: "Form liên hệ và đăng ký đại lý từ website.",
  },
  access: {
    read: isStaff,
    create: () => true,
    update: isStaff,
    delete: isManagerOrAbove,
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Họ tên" },
    { name: "phone", type: "text", required: true, label: "Số điện thoại" },
    { name: "email", type: "email", label: "Email" },
    { name: "company", type: "text", label: "Công ty" },
    { name: "message", type: "textarea", label: "Nội dung" },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "contact",
      options: [
        { label: "Liên hệ chung", value: "contact" },
        { label: "Đăng ký đại lý", value: "agent" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Mới", value: "new" },
        { label: "Đã liên hệ", value: "contacted" },
        { label: "Đã xử lý", value: "done" },
      ],
    },
  ],
};
